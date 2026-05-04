import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/constants/site";
import { MotionSection } from "@/components/animations/MotionSection";
import { Card, CardContent } from "@/components/ui/card";

export function ContactSection() {
  return (
    <MotionSection
      id="contact"
      className="scroll-mt-24 bg-linear-to-b from-[#0D3D24] to-[#1D6A47] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-serif text-3xl font-bold text-[#FAFAF8] sm:text-4xl">
          Contact us
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-white/70">
          Reach our team for bookings, questions, or ECO scheme advice.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-white/15 bg-white/7">
              <CardContent className="flex flex-col gap-3 pt-6">
                <Phone className="size-5 text-[#C8882A]" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Phone</p>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="font-medium text-[#FAFAF8] hover:text-[#C8882A]"
                >
                  {siteConfig.phone}
                </a>
              </CardContent>
            </Card>
            <Card className="border-white/15 bg-white/7">
              <CardContent className="flex flex-col gap-3 pt-6">
                <Mail className="size-5 text-[#C8882A]" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Email</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all font-medium text-[#FAFAF8] hover:text-[#C8882A]"
                >
                  {siteConfig.email}
                </a>
              </CardContent>
            </Card>
            <Card className="border-white/15 bg-white/7">
              <CardContent className="flex flex-col gap-3 pt-6">
                <MapPin className="size-5 text-[#C8882A]" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Area</p>
                <p className="font-medium text-[#FAFAF8]">{siteConfig.area}</p>
                <p className="text-sm text-white/60">{siteConfig.addressLine}</p>
              </CardContent>
            </Card>
            <Card className="border-white/15 bg-white/7">
              <CardContent className="flex flex-col gap-3 pt-6">
                <Clock className="size-5 text-[#C8882A]" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  Opening hours
                </p>
                <p className="font-medium text-[#FAFAF8]">{siteConfig.openingHours}</p>
              </CardContent>
            </Card>
          </div>
          <Card className="flex min-h-[280px] flex-col items-center justify-center border-dashed border-white/20 bg-white/4 p-8 text-center">
            <MapPin className="mb-4 size-10 text-[#C8882A]/80" aria-hidden />
            <p className="font-serif text-lg font-semibold text-[#FAFAF8]">Map location</p>
            <p className="mt-2 max-w-xs text-sm text-white/60">
              Google Maps embed placeholder — replace with your business Map embed or link.
            </p>
            <a
              href="https://maps.google.com/?q=East+London+UK"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-sm font-semibold text-[#C8882A] underline-offset-4 hover:underline"
            >
              Open East London in Google Maps
            </a>
          </Card>
        </div>
      </div>
    </MotionSection>
  );
}
