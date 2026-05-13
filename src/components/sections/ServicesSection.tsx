"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuoteService } from "@/context/QuoteServiceContext";
import { services, type ServiceDefinition } from "@/lib/constants/services";
import { MotionSection } from "@/components/animations/MotionSection";
import { GsapReveal } from "@/components/animations/GsapReveal";

function ServiceCard({ service }: { service: ServiceDefinition }) {
  const { setPresetService, scrollToQuote } = useQuoteService();
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 22 });
  const sy = useSpring(my, { stiffness: 260, damping: 22 });
  const rotateX = useTransform(sy, [-40, 40], [6, -6]);
  const rotateY = useTransform(sx, [-40, 40], [-6, 6]);
  const Icon = service.icon;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / 8);
    my.set((e.clientY - r.top - r.height / 2) / 8);
  }
  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      data-reveal-card
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 900,
              transformStyle: "preserve-3d" as const,
            }
      }
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      whileHover={reduce ? {} : { scale: 1.02 }}
      className="h-full"
    >
      <Card
        role="button"
        tabIndex={0}
        onClick={() => {
          setPresetService(service.formValue);
          scrollToQuote();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setPresetService(service.formValue);
            scrollToQuote();
          }
        }}
        className="h-full cursor-pointer border-white/15 bg-white/8 transition-shadow hover:border-[#C8882A]/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
      >
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#1D6A47]/80 text-[#C8882A] ring-1 ring-white/10">
            <Icon className="size-6" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
              {service.ecoBadge && (
                <Badge variant="eco" className="text-[10px] uppercase tracking-wide">
                  Government ECO Scheme Available
                </Badge>
              )}
            </div>
            <CardDescription className="mt-2 text-white/75">
              {service.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 border-t border-white/10 pt-4 text-sm text-[#E8F5EE]">
          <div>
            <span className="text-white/50">Duration: </span>
            <span className="font-medium">{service.duration}</span>
          </div>
          <div>
            <span className="text-white/50">From: </span>
            <span className="font-semibold text-[#C8882A]">{service.price}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <MotionSection
      id="services"
      className="scroll-mt-24 bg-linear-to-b from-[#0D3D24] to-[#1D6A47] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-serif text-3xl font-bold text-[#FAFAF8] sm:text-4xl md:text-center">
          Services built around your home
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/75">
          One trusted team for gardening, electrical, plumbing, EPC surveys and car wash — click a
          card to request your free quote with that service pre-selected.
        </p>
        <GsapReveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </GsapReveal>
      </div>
    </MotionSection>
  );
}
