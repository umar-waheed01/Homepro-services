"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type GsapRevealProps = {
  children: ReactNode;
  className?: string;
};

/** Staggered card reveal driven by ScrollTrigger */
export function GsapReveal({ children, className }: GsapRevealProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      const cards = root.current?.querySelectorAll("[data-reveal-card]");
      if (!cards?.length) return;
      gsap.from(cards, {
        y: 36,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: "top 82%",
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={root} className={cn(className)}>
      {children}
    </div>
  );
}
