import type { QuoteFormInput } from "@/lib/validations/quote";

export type QuoteEmailPayload = QuoteFormInput & {
  attachmentMeta?: { name: string; size: number; type: string } | null;
};

/**
 * Placeholder email sender — replace with a real provider when ready.
 *
 * Resend: https://resend.com — set RESEND_API_KEY, use `resend.emails.send({ from, to, subject, html })`
 * Nodemailer: set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS — create transporter and sendMail
 * Formspree: POST from client to Formspree endpoint (less ideal for file uploads)
 * EmailJS: browser SDK (not recommended for secrets; prefer server route + provider above)
 */
export async function sendQuoteEmails(payload: QuoteEmailPayload): Promise<{
  ownerSent: boolean;
  customerSent: boolean;
}> {
  const ownerTo =
    process.env.QUOTE_NOTIFY_EMAIL ?? process.env.OWNER_EMAIL ?? "owner@example.com";
  const from =
    process.env.EMAIL_FROM ?? "HomePro <noreply@example.com>";

  // When RESEND_API_KEY is set, wire Resend here instead of logging.
  if (process.env.RESEND_API_KEY) {
    // Example (uncomment after `npm install resend`):
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from, to: ownerTo, subject: "...", html: "..." });
  }

  const summary = {
    from,
    ownerTo,
    customerTo: payload.email,
    body: payload,
  };

  if (process.env.NODE_ENV === "development") {
    console.info("[quote-email:placeholder]", JSON.stringify(summary, null, 2));
  }

  return { ownerSent: true, customerSent: true };
}
