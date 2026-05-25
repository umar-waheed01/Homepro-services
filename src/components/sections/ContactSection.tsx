import type { ComponentType, ReactNode } from "react";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { siteConfig } from "@/lib/constants/site";
import { MotionSection } from "@/components/animations/MotionSection";
import { cn } from "@/lib/utils/cn";

const phoneHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
const [hoursWeekdays, hoursSunday] = siteConfig.openingHours.split(" · ");

const quickActions = [
  {
    label: "Call us",
    short: "Call",
    href: phoneHref,
    icon: Phone,
    primary: true,
    external: false,
  },
  {
    label: "Email us",
    short: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    primary: false,
    external: false,
  },
  {
    label: "Directions",
    short: "Map",
    href: siteConfig.maps.search,
    icon: Navigation,
    primary: false,
    external: true,
  },
];

type InfoCardProps = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
  className?: string;
};

function InfoCard({ icon: Icon, title, children, className }: InfoCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-white/12 bg-[#FAFAF8]/95 p-5 shadow-lg shadow-black/15",
        "sm:rounded-3xl sm:p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-[#1D6A47]/10 text-[#1D6A47]">
          <Icon className="size-5" aria-hidden />
        </span>
        <h3 className="font-serif text-lg font-semibold text-[#0D3D24]">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-[#444444]">{children}</div>
    </article>
  );
}

export function ContactSection() {
  return (
    <MotionSection
      id="contact"
      className="scroll-mt-24 bg-linear-to-b from-[#0D3D24] via-[#1D6A47] to-[#0D3D24] py-16 sm:py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-[#FAFAF8] sm:text-4xl">
            Contact us
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Tap to call, email, or get directions. Our Romford office is easy to find.
          </p>
        </div>

        {/* Quick actions — thumb-friendly on mobile */}
        <ul className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <li key={action.label}>
                <a
                  href={action.href}
                  {...(action.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cn(
                    "flex min-h-22 flex-col items-center justify-center gap-2 rounded-2xl px-2 py-4 text-center transition",
                    "active:scale-[0.98] sm:min-h-25 sm:rounded-3xl sm:px-4",
                    action.primary
                      ? "bg-[#C8882A] text-[#1A1A1A] shadow-lg shadow-black/25 hover:bg-[#d6983f]"
                      : "border border-white/15 bg-white/10 text-[#FAFAF8] hover:bg-white/15",
                  )}
                >
                  <Icon className="size-6 shrink-0 sm:size-7" aria-hidden />
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wide sm:text-xs">
                    <span className="sm:hidden">{action.short}</span>
                    <span className="hidden sm:inline">{action.label}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 grid gap-5 md:mt-10 md:grid-cols-2 md:gap-6 lg:gap-8">
          {/* Details — first on mobile for readability, left on desktop */}
          <div className="flex flex-col gap-5 md:order-1">
            <InfoCard icon={MapPin} title="Visit our office">
              <address className="not-italic">
                <p className="font-semibold text-[#0D3D24]">{siteConfig.address.line1}</p>
                <p className="mt-2">
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.locality}, {siteConfig.address.region}
                  <br />
                  <span className="font-medium text-[#1D6A47]">{siteConfig.address.postcode}</span>
                </p>
              </address>
            </InfoCard>

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1">
              <InfoCard icon={Clock} title="Opening hours">
                <p>{hoursWeekdays}</p>
                <p className="mt-1">{hoursSunday}</p>
              </InfoCard>

              <InfoCard icon={Phone} title="Phone & email">
                <p>
                  <a
                    href={phoneHref}
                    className="font-semibold text-[#1D6A47] underline-offset-2 hover:underline"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="mt-3 break-all">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold text-[#1D6A47] underline-offset-2 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </InfoCard>
            </div>
          </div>

          {/* Map */}
          <div className="flex flex-col md:order-2">
            <div className="mb-3 flex items-center justify-between gap-2 px-0.5">
              <p className="text-sm font-medium text-white/80">Office location</p>
              <a
                href={siteConfig.maps.search}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#C8882A] underline-offset-2 hover:underline"
              >
                Open in Maps
              </a>
            </div>
            <div
              className={cn(
                "overflow-hidden rounded-2xl border border-white/15 shadow-xl shadow-black/25",
                "h-[220px] min-h-0 sm:h-[280px] md:h-full md:min-h-[420px] md:rounded-3xl",
              )}
            >
              <iframe
                title={`${siteConfig.name} location — ${siteConfig.address.full}`}
                src={siteConfig.maps.embed}
                className="size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
