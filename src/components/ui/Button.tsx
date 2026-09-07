import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-white/90 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_24px_-8px_rgba(255,255,255,0.35)] active:scale-[0.98]",
  secondary:
    "bg-card border border-white/[0.08] text-white hover:border-white/20 hover:bg-card-hover active:scale-[0.98]",
  ghost:
    "bg-transparent text-white/70 hover:text-white hover:bg-white/[0.06] active:scale-[0.98]",
  danger:
    "bg-danger/90 text-white hover:bg-danger hover:shadow-[0_8px_24px_-8px_rgba(239,68,68,0.5)] active:scale-[0.98]",
};

const sizes = {
  sm: "h-9 px-3.5",
  md: "h-11 px-5",
  lg: "h-9 px-3.5 text-[12px] sm:h-11 sm:px-5 sm:text-sm lg:h-12 lg:px-6 lg:text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  href?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
