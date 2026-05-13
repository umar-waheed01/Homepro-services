"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroTrustStats } from "@/lib/constants/site";
import { HeroVisual3D } from "@/components/three/HeroVisual3D";
import { LiveTrustActivity } from "@/components/live/LiveTrustActivity";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-[#0D3D24] via-[#1D6A47] to-[#0D3D24] pb-16 pt-28 md:pb-24 md:pt-32"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(232,245,238,0.12),transparent_55%)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-12 sm:px-6">
        <div className="relative z-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E8F5EE] backdrop-blur-md"
          >
            <ShieldCheck className="size-3.5 text-[#C8882A]" aria-hidden />
            East London&apos;s Trusted Home Services
          </motion.div>
          <motion.h1
            id="hero-heading"
            className="font-serif text-4xl font-bold leading-tight tracking-tight text-[#FAFAF8] sm:text-5xl lg:text-[3.25rem]"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            Your Home, Transformed.{" "}
            <span className="text-[#C8882A]">One Call Away.</span>
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Expert Gardening, Electrical, Plumbing, EPC Surveys & At-Home Car Wash — Free
            Quotes, Government ECO Scheme Available.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Button asChild size="lg" className="font-bold">
              <a href="#quote">Get Your Free Quote</a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#services">See Our Services</a>
            </Button>
          </motion.div>
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {heroTrustStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/6 p-3 text-center backdrop-blur-md"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-white/55 sm:text-xs">
                  {s.label}
                </dt>
                <dd className="mt-1 font-serif text-lg font-bold text-[#C8882A] sm:text-xl">
                  {s.value}
                </dd>
              </motion.div>
            ))}
          </dl>
          <div className="mt-8">
            <LiveTrustActivity />
          </div>
        </div>
        <motion.div
          className="relative z-10"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <HeroVisual3D />
        </motion.div>
      </div>
    </section>
  );
}
