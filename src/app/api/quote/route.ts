import { NextResponse } from "next/server";
import { sendQuoteEmails } from "@/lib/email/placeholder";
import {
  quoteFormSchema,
  validateQuoteAttachment,
} from "@/lib/validations/quote";

export const runtime = "nodejs";

function parseFormData(fd: FormData): {
  data: Record<string, unknown>;
  file: File | null;
} {
  const fileEntry = fd.get("attachment");
  const file =
    fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

  const data = {
    fullName: String(fd.get("fullName") ?? "").trim(),
    phone: String(fd.get("phone") ?? "").trim(),
    email: String(fd.get("email") ?? "").trim(),
    serviceNeeded: String(fd.get("serviceNeeded") ?? "").trim(),
    description: String(fd.get("description") ?? "").trim(),
    preferredContactTime: String(fd.get("preferredContactTime") ?? ""),
    howDidYouHear: String(fd.get("howDidYouHear") ?? ""),
  };

  return { data, file };
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") ?? "";
    if (!ct.includes("multipart/form-data")) {
      return NextResponse.json(
        { ok: false, message: "Expected multipart form data" },
        { status: 400 },
      );
    }

    const fd = await req.formData();
    const { data, file } = parseFormData(fd);

    const parsed = quoteFormSchema.safeParse(data);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid form data";
      return NextResponse.json({ ok: false, message: msg }, { status: 422 });
    }

    const fileErr = validateQuoteAttachment(file);
    if (fileErr) {
      return NextResponse.json(
        { ok: false, message: fileErr },
        { status: 422 },
      );
    }

    const attachmentMeta = file
      ? { name: file.name, size: file.size, type: file.type }
      : null;
    const attachment = file
      ? {
          name: file.name,
          type: file.type,
          content: Buffer.from(await file.arrayBuffer()),
        }
      : null;

    await sendQuoteEmails({
      ...parsed.data,
      attachmentMeta,
      attachment,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/quote]", e);
    return NextResponse.json(
      { ok: false, message: "Server error. Please try again later." },
      { status: 500 },
    );
  }
}
