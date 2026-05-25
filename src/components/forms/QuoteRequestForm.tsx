"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { useQuoteService } from "@/context/QuoteServiceContext";
import { SERVICE_FORM_VALUES } from "@/lib/constants/services";
import {
  quoteFormSchema,
  type QuoteFormInput,
  validateQuoteAttachment,
} from "@/lib/validations/quote";
import { cn } from "@/lib/utils/cn";

type SubmitState = "idle" | "loading" | "success" | "error";

export function QuoteRequestForm() {
  const { presetService, setPresetService } = useQuoteService();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  /** File chosen for upload — state (not a ref) so submit handler is safe for react-hooks/refs. */
  const [attachment, setAttachment] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const form = useForm<QuoteFormInput>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      serviceNeeded: "Gardening",
      description: "",
      preferredContactTime: "",
      howDidYouHear: "",
    },
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (presetService) {
      setValue("serviceNeeded", presetService);
      setPresetService(null);
    }
  }, [presetService, setValue, setPresetService]);

  async function onSubmit(data: QuoteFormInput) {
    setSubmitState("loading");
    setServerMessage(null);
    const file = attachment;
    const ferr = validateQuoteAttachment(file);
    if (ferr) {
      setFileError(ferr);
      setSubmitState("idle");
      return;
    }
    setFileError(null);

    const fd = new FormData();
    fd.set("fullName", data.fullName);
    fd.set("phone", data.phone);
    fd.set("email", data.email);
    fd.set("serviceNeeded", data.serviceNeeded);
    fd.set("description", data.description);
    fd.set("preferredContactTime", data.preferredContactTime ?? "");
    fd.set("howDidYouHear", data.howDidYouHear ?? "");
    if (file && file.size > 0) fd.set("attachment", file);

    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;
      if (!res.ok || !json?.ok) {
        setSubmitState("error");
        setServerMessage(
          json?.message ?? "Something went wrong. Please try again.",
        );
        return;
      }
      setSubmitState("success");
      reset();
      setAttachment(null);
      setFileInputKey((k) => k + 1);
    } catch {
      setSubmitState("error");
      setServerMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5"
      noValidate
    >
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          autoComplete="name"
          aria-invalid={!!errors.fullName}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-sm text-red-300" role="alert">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone number</Label>
        <Input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          {...register("phone", {
            onBlur: () => {
              void trigger("phone");
            },
          })}
        />
        {errors.phone && (
          <p className="text-sm text-red-300" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-300" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="serviceNeeded">Service needed</Label>
        <Controller
          name="serviceNeeded"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="serviceNeeded"
                aria-invalid={!!errors.serviceNeeded}
              >
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_FORM_VALUES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.serviceNeeded && (
          <p className="text-sm text-red-300" role="alert">
            {errors.serviceNeeded.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description of work</Label>
        <Textarea
          id="description"
          placeholder="Please describe what needs doing..."
          aria-invalid={!!errors.description}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-300" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="attachment">Upload photo of work (optional)</Label>
        <Input
          key={fileInputKey}
          id="attachment"
          type="file"
          accept="image/jpeg,image/png,image/heic,image/heif,application/pdf,.heic"
          className="cursor-pointer border-dashed border-white/25 bg-white/3 py-2 file:mr-3 file:rounded-lg file:border-0 file:bg-[#1D6A47] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[#FAFAF8]"
          onChange={(e) => {
            setAttachment(e.target.files?.[0] ?? null);
            setFileError(null);
          }}
        />
        <p className="text-xs text-white/50">
          JPG, PNG, PDF, or HEIC — max 10MB
        </p>
        {fileError && (
          <p className="text-sm text-red-300" role="alert">
            {fileError}
          </p>
        )}
      </div>

      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <div className="grid gap-2">
          <Label htmlFor="preferredContactTime">
            Preferred contact time (optional)
          </Label>
          <NativeSelect
            id="preferredContactTime"
            {...register("preferredContactTime")}
          >
            <option value="">No preference</option>
            <option value="morning">Morning (8am–12pm)</option>
            <option value="afternoon">Afternoon (12pm–5pm)</option>
            <option value="evening">Evening (5pm–8pm)</option>
          </NativeSelect>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="howDidYouHear">
            How did you hear about us? (optional)
          </Label>
          <NativeSelect id="howDidYouHear" {...register("howDidYouHear")}>
            <option value="">Prefer not to say</option>
            <option value="google">Google</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="word_of_mouth">Word of mouth</option>
            <option value="leaflet">Leaflet</option>
            <option value="other">Other</option>
          </NativeSelect>
        </div>
      </div>

      {submitState === "success" && (
        <p
          className="rounded-xl border border-[#2D8A5F]/50 bg-[#1D6A47]/30 px-4 py-3 text-sm text-[#E8F5EE]"
          role="status"
        >
          Thank you — we&apos;ve received your quote request. We&apos;ll be in
          touch within 24 hours.
        </p>
      )}
      {submitState === "error" && serverMessage && (
        <p
          className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-100"
          role="alert"
        >
          {serverMessage}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className={cn("h-12 w-full text-base font-bold shadow-lg")}
        disabled={submitState === "loading"}
      >
        {submitState === "loading" ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Request My Free Quote"
        )}
      </Button>
    </form>
  );
}
