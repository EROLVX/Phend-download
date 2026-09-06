"use client";

import type { CSSProperties, PointerEvent } from "react";

const BOTTOM_FADE =
  "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.55) 55%, transparent 92%)";

// The ignite layer holds full strength further down, otherwise the fade eats
// the highlight exactly where the cursor tends to sit.
const IGNITE_FADE =
  "linear-gradient(to bottom, black 0%, black 62%, transparent 100%)";

// Only the stroke within this radius of the cursor lights up.
const IGNITE_MASK =
  "radial-gradient(200px circle at var(--mx) var(--my), black 0%, rgba(0,0,0,0.5) 45%, transparent 72%)";

const LETTERS =
  "font-display absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[22vw] leading-none sm:-top-4 sm:text-[16vw] md:-top-6";

export function PhendWatermark() {
  // Write the pointer position straight to CSS custom properties so moving the
  // cursor never triggers a React re-render.
  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      onPointerMove={handleMove}
      className="group relative h-20 select-none overflow-hidden sm:h-28 md:h-36"
      style={{ "--mx": "50%", "--my": "50%" } as CSSProperties}
      aria-hidden
    >
      {/* Background letters: soft filled ghost with a faint stroke */}
      <p
        className={`${LETTERS} text-white/[0.035] blur-[3px] [-webkit-text-stroke:2px_rgba(255,255,255,0.06)]`}
      >
        PHEND
      </p>

      {/* Main letters: dim outline, fading out toward the bottom */}
      <p
        className={`${LETTERS} text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.26)] md:[-webkit-text-stroke:2.5px_rgba(255,255,255,0.26)]`}
        style={{ maskImage: BOTTOM_FADE, WebkitMaskImage: BOTTOM_FADE }}
      >
        PHEND
      </p>

      {/* Ignite layer: bright stroke revealed only around the cursor.
          The bottom fade lives on the wrapper so the two masks nest instead of
          needing mask-composite. */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        style={{ maskImage: IGNITE_FADE, WebkitMaskImage: IGNITE_FADE }}
      >
        <p
          className={`${LETTERS} text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.95)] drop-shadow-[0_0_14px_rgba(255,255,255,0.45)] md:[-webkit-text-stroke:2.5px_rgba(255,255,255,0.95)]`}
          style={{ maskImage: IGNITE_MASK, WebkitMaskImage: IGNITE_MASK }}
        >
          PHEND
        </p>
      </div>
    </div>
  );
}
