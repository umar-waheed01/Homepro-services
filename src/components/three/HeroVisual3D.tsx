"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MobileHouseIllustration } from "@/components/three/MobileHouseIllustration";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HouseScene = dynamic(
  () =>
    import("@/components/three/HouseScene").then((m) => ({
      default: m.HouseScene,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(420px,55vh)] min-h-[280px] w-full items-center justify-center rounded-3xl border border-white/10 bg-[#0D3D24]/80">
        <div className="h-10 w-10 animate-pulse rounded-full border-2 border-[#C8882A]/40 border-t-[#C8882A]" />
      </div>
    ),
  },
);

export function HeroVisual3D() {
  const reduced = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduced || isMobile) {
    return <MobileHouseIllustration />;
  }

  return <HouseScene />;
}
