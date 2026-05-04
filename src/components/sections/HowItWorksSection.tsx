"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Camera, Headphones, PhoneCall } from "lucide-react";
import { howItWorksSteps } from "@/lib/constants/site";
import { MotionSection } from "@/components/animations/MotionSection";

const icons = [Camera, Headphones, PhoneCall] as const;

export function HowItWorksSection() {
  const reduce = useReducedMotion();

  return (
    <MotionSection
      id="how-it-works"
      className="scroll-mt-24 bg-linear-to-b from-[#1D6A47] to-[#E8F5EE] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-serif text-3xl font-bold text-[#0D3D24] sm:text-4xl md:text-center">
          How it works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[#1A1A1A]/75">
          Three simple steps from your first message to your free quote.
        </p>
        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {howItWorksSteps.map((step, i) => {
            const Icon = icons[i] ?? Camera;
            return (
              <motion.li
                key={step.title}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative rounded-3xl border border-[#1D6A47]/15 bg-white/70 p-8 shadow-xl shadow-[#0D3D24]/10 backdrop-blur-md"
              >
                <span className="absolute -left-2 -top-2 flex size-10 items-center justify-center rounded-full bg-[#C8882A] font-serif text-lg font-bold text-[#1A1A1A] shadow-lg">
                  {i + 1}
                </span>
                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#1D6A47]/10 text-[#1D6A47]">
                  <Icon className="size-7" aria-hidden />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#0D3D24]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#666666]">{step.description}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </MotionSection>
  );
}
