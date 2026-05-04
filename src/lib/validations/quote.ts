import { z } from "zod";

const serviceEnum = z.enum([
  "Gardening",
  "Electrical",
  "Plumbing",
  "EPC Survey",
  "Solar Installation",
  "Other",
]);

/** Normalise to leading 0 UK mobile (11 digits: 07xxxxxxxxx) */
export function normalizeUkPhone(input: string): string {
  let s = input.trim().replace(/\s/g, "");
  if (s.startsWith("+44")) s = "0" + s.slice(3);
  else if (s.startsWith("0044")) s = "0" + s.slice(4);
  else if (/^44\d{10}$/.test(s)) s = "0" + s.slice(2);
  return s;
}

export const ukMobileLocalRegex = /^07\d{9}$/;

export const preferredContactTimeSchema = z.enum([
  "",
  "morning",
  "afternoon",
  "evening",
]);

export const howDidYouHearSchema = z.enum([
  "",
  "google",
  "facebook",
  "instagram",
  "word_of_mouth",
  "leaflet",
  "other",
]);

export const quoteFormSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter at least 2 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((val) => ukMobileLocalRegex.test(normalizeUkPhone(val)), {
      message: "Enter a valid UK number (e.g. 07123 456789 or +44 7123 456789)",
    }),
  email: z.string().trim().email("Enter a valid email address"),
  serviceNeeded: serviceEnum,
  description: z
    .string()
    .trim()
    .min(30, "Please describe the work in at least 30 characters"),
  preferredContactTime: preferredContactTimeSchema.optional(),
  howDidYouHear: howDidYouHearSchema.optional(),
});

export type QuoteFormInput = z.infer<typeof quoteFormSchema>;

const allowedMime = new Set([
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
  "application/pdf",
]);

const maxBytes = 10 * 1024 * 1024;

export function validateQuoteAttachment(file: File | null): string | null {
  if (!file || file.size === 0) return null;
  if (file.size > maxBytes) return "File must be 10MB or smaller";
  const type = file.type.toLowerCase();
  if (!allowedMime.has(type) && !file.name.toLowerCase().endsWith(".heic")) {
    return "Use JPG, PNG, PDF, or HEIC";
  }
  return null;
}

/** Server-side body (multipart parsed to strings + optional file) */
export const quoteServerSchema = quoteFormSchema.extend({
  attachment: z.custom<File | null>().optional(),
});

export type QuoteServerInput = z.infer<typeof quoteServerSchema>;
