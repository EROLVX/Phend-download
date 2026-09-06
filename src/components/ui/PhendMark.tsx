import { cn } from "@/lib/utils";

export function PhendMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-6 w-6", className)}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2 L28 7 V15.5 C28 22.8 22.9 27.6 16 30 C9.1 27.6 4 22.8 4 15.5 V7 L16 2Z
           M12.8 10.5 H19.2 V14.4 L14.8 17.2 V21.7 H12.8 Z"
        fill="currentColor"
      />
      <circle cx="28" cy="14.5" r="2.4" fill="currentColor" />
    </svg>
  );
}
