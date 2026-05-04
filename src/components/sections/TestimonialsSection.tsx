"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/constants/site";
import { MotionSection } from "@/components/animations/MotionSection";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, []);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(next, 7000);
    return () => window.clearInterval(id);
  }, [next, reduce]);

  const t = testimonials[index];

  return (
    <MotionSection
      id="testimonials"
      className="scroll-mt-24 bg-[#0D3D24] py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center font-serif text-3xl font-bold text-[#FAFAF8] sm:text-4xl">
          What homeowners say
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-white/70">
          Real feedback from East London customers — swipe or use arrows to explore.
        </p>
        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.article
              key={t.name + index}
              initial={reduce ? false : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -28 }}
              transition={{ duration: 0.4 }}
              className="rounded-[2rem] border border-white/10 bg-white/7 p-8 shadow-2xl backdrop-blur-xl sm:p-10"
              aria-live="polite"
            >
              <div className="flex gap-1 text-[#C8882A]" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-6 font-serif text-xl leading-relaxed text-[#FAFAF8] sm:text-2xl">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <footer className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                <div>
                  <p className="font-semibold text-[#E8F5EE]">{t.name}</p>
                  <p className="text-sm text-white/60">{t.area}, East London</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                    onClick={prev}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="size-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                    onClick={next}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="size-5" />
                  </Button>
                </div>
              </footer>
            </motion.article>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-[#C8882A]" : "w-2.5 bg-white/25"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
