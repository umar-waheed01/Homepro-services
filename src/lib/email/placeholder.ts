import type { QuoteFormInput } from "@/lib/validations/quote";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export type QuoteEmailPayload = QuoteFormInput & {
  attachmentMeta?: { name: string; size: number; type: string } | null;
  attachment?: { name: string; type: string; content: Buffer } | null;
};

let transporters: nodemailer.Transporter[] | null = null;

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildTransporters(): nodemailer.Transporter[] {
  if (transporters) return transporters;
  const host = requireEnv("SMTP_HOST");
  const portRaw = requireEnv("SMTP_PORT");
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");
  const port = Number(portRaw);
  if (!Number.isFinite(port)) {
    throw new Error("SMTP_PORT must be a valid number");
  }

  const base: SMTPTransport.Options = {
    host,
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
  };

  const primary = nodemailer.createTransport({
    ...base,
    port,
    secure: port === 465,
  });

  // Gmail commonly supports both 587 (STARTTLS) and 465 (TLS). Try both
  // to avoid hard failure when one port is blocked on a network.
  const fallbackPort = port === 587 ? 465 : 587;
  const secondary = nodemailer.createTransport({
    ...base,
    port: fallbackPort,
    secure: fallbackPort === 465,
  });

  transporters = [primary, secondary];
  return transporters;
}

async function sendWithFallback(
  transportPool: nodemailer.Transporter[],
  mail: nodemailer.SendMailOptions,
): Promise<nodemailer.SentMessageInfo> {
  let lastError: unknown;
  for (const transporter of transportPool) {
    try {
      return await transporter.sendMail(mail);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

export async function sendQuoteEmails(payload: QuoteEmailPayload): Promise<{
  ownerSent: boolean;
  customerSent: boolean;
}> {
  const ownerTo = requireEnv("QUOTE_NOTIFY_EMAIL");
  const from = requireEnv("EMAIL_FROM");
  const mailers = buildTransporters();

  const ownerHtml = `
    <h2>New HomePro Quote Request</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Service:</strong> ${escapeHtml(payload.serviceNeeded)}</p>
    <p><strong>Preferred contact time:</strong> ${escapeHtml(payload.preferredContactTime || "No preference")}</p>
    <p><strong>How they heard about us:</strong> ${escapeHtml(payload.howDidYouHear || "Prefer not to say")}</p>
    <p><strong>Description:</strong></p>
    <p>${escapeHtml(payload.description).replaceAll("\n", "<br/>")}</p>
    ${
      payload.attachmentMeta
        ? `<p><strong>Attachment:</strong> ${escapeHtml(payload.attachmentMeta.name)} (${payload.attachmentMeta.type}, ${payload.attachmentMeta.size} bytes)</p>`
        : "<p><strong>Attachment:</strong> None</p>"
    }
  `;

  const customerHtml = `
    <p>Hi ${escapeHtml(payload.fullName)},</p>
    <p>Thanks for your quote request with HomePro. We have received your details and will contact you within 24 hours.</p>
    <p><strong>Service requested:</strong> ${escapeHtml(payload.serviceNeeded)}</p>
    <p>Kind regards,<br/>HomePro Team</p>
  `;

  const ownerResult = await sendWithFallback(mailers, {
    from,
    to: ownerTo,
    replyTo: payload.email,
    subject: `New quote request: ${payload.serviceNeeded} (${payload.fullName})`,
    html: ownerHtml,
    attachments: payload.attachment
      ? [
          {
            filename: payload.attachment.name,
            content: payload.attachment.content,
            contentType: payload.attachment.type,
          },
        ]
      : [],
  });

  const customerResult = await sendWithFallback(mailers, {
    from,
    to: payload.email,
    subject: "We received your HomePro quote request",
    html: customerHtml,
  });

  return {
    ownerSent: Boolean(ownerResult.messageId),
    customerSent: Boolean(customerResult.messageId),
  };
}
