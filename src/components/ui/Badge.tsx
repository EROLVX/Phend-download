import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const tones = {
  neutral: "bg-white/[0.06] text-white/70 border-white/[0.08]",
  success: "bg-success/10 text-success border-success/20",
  danger: "bg-danger/10 text-danger border-danger/20",
  info: "bg-info/10 text-info border-info/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  accent: "bg-accent/10 text-accent border-accent/20",
};

// The popup mock is scaled by a CSS transform, so its badges must NOT shrink
// again on small screens - the transform already handles that.
const sizes = {
  auto: "px-2 py-0.5 text-[9px] sm:px-2.5 sm:py-1 sm:text-[11px]",
  fixed: "px-2.5 py-1 text-[11px]",
};

export function Badge({
  children,
  tone = "neutral",
  size = "auto",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border font-medium uppercase tracking-wide",
        sizes[size],
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
