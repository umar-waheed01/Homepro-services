"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, Clock, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

/**
 * Simulated “live” trust metrics — replace with Supabase realtime / polling later.
 * Architecture: single component owns ephemeral stats; swap data source in one place.
 */
export function LiveTrustActivity({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [quotesToday, setQuotesToday] = useState(3);

  const lines = useMemo(
    () => [
      {
        icon: Users,
        text: `${quotesToday} homeowners requested quotes today`,
      },
      {
        icon: Clock,
        text: "Average response time: under 24 hours",
      },
    ],
    [quotesToday],
  );

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setQuotesToday((n) => {
        const delta = Math.random() > 0.65 ? 1 : 0;
        return Math.min(12, Math.max(2, n + delta));
      });
    }, 9000);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/6 p-4 shadow-lg backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-[#E8F5EE]">
        <Activity className="size-4 text-[#C8882A]" aria-hidden />
        <span>Live activity</span>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
        {lines.map((line, i) => (
          <motion.div
            key={line.text}
            className="flex items-center gap-2 text-sm text-white/80"
            initial={false}
            animate={reduce ? {} : { opacity: [0.85, 1], y: [2, 0] }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <line.icon className="size-4 shrink-0 text-[#2D8A5F]" aria-hidden />
            <span>{line.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
