import * as React from "react";
import { cn } from "@/lib/utils/cn";

export type NativeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-11 w-full appearance-none rounded-xl border border-white/15 bg-white/5 bg-size-[1rem_1rem] bg-position-[right_0.75rem_center] bg-no-repeat px-4 py-2 pr-10 text-sm text-[#FAFAF8] shadow-inner backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8882A]/40 disabled:opacity-50",
        className,
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23E8F5EE' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
      }}
      {...props}
    >
      {children}
    </select>
  ),
);
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
