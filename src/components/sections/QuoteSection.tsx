"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import { MotionSection } from "@/components/animations/MotionSection";

export function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [48, -48]);

  return (
    <MotionSection
      id="quote"
      className="scroll-mt-24 bg-linear-to-b from-[#E8F5EE] via-[#FAFAF8] to-[#1D6A47] py-20 md:py-28"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-[#0D3D24] sm:text-4xl">
            Get your free quote
          </h2>
          <p className="mt-4 text-[#666666]">
            Tell us what you need — we&apos;ll review your details and call you
            within 24 hours with a no-obligation quote.
          </p>
        </div>
        <motion.div
          style={{ y }}
          className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-[#1D6A47]/15 bg-linear-to-br from-[#0D3D24]/95 to-[#1D6A47]/90 p-6 shadow-[0_30px_80px_rgba(13,61,36,0.35)] backdrop-blur-2xl sm:p-10"
        >
          <QuoteRequestForm />
        </motion.div>
      </div>
    </MotionSection>
  );
}
