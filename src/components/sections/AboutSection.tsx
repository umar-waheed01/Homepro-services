"use client";

import { Award, BadgeCheck, Leaf, MapPin, Sun, Zap } from "lucide-react";
import { aboutTrustBadges } from "@/lib/constants/site";
import { MotionSection } from "@/components/animations/MotionSection";

const badgeIcons = [BadgeCheck, Award, Sun, Zap, Leaf, MapPin] as const;

export function AboutSection() {
  return (
    <MotionSection
      id="about"
      className="scroll-mt-24 bg-linear-to-b from-[#1D6A47] to-[#0D3D24] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#FAFAF8] sm:text-4xl">
              About HomePro Services
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/85">
              HomePro Services was founded with one simple goal: to give London homeowners access to
              reliable, fairly-priced tradespeople they can actually trust. We cover everything
              from garden maintenance to solar panel installation — and we handle every job with
              the same care and professionalism. All our engineers are certified, insured, and
              experienced. We are proud to support homeowners through energy-saving services and ECO
              scheme opportunities.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {aboutTrustBadges.map((label, i) => {
              const Icon = badgeIcons[i % badgeIcons.length];
              return (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-[#E8F5EE] backdrop-blur-md"
                >
                  <Icon className="size-5 shrink-0 text-[#C8882A]" aria-hidden />
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </MotionSection>
  );
}
