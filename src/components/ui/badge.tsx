import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8882A]/40",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#C8882A]/20 text-[#E8F5EE] backdrop-blur-sm",
        outline: "border-[#C8882A]/50 text-[#C8882A]",
        eco: "border-[#2D8A5F]/60 bg-[#1D6A47]/40 text-[#E8F5EE]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
