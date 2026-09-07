"use client";

import { useEffect, useRef, useState } from "react";

// 8x8 Bayer matrix. Ordered dithering (rather than error diffusion) is what
// produces the regular dot lattice the reference image has — Floyd–Steinberg
// would scatter the dots and lose that print-halftone look.
const BAYER8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

export function Halftone({
  src,
  alt,
  cols = 150,
  aspect = 0.8,
  contrast = 1.25,
  brightness = 6,
  focusX = 0.5,
  focusY = 0.5,
  zoom = 1,
  className,
}: {
  src: string;
  alt: string;
  /** Dot columns across. Lower = chunkier dots. */
  cols?: number;
  /** width / height ratio of the frame. */
  aspect?: number;
  contrast?: number;
  brightness?: number;
  /** Crop anchors, 0..1. 0.5 = centred, which is plain cover-fit. */
  focusX?: number;
  focusY?: number;
  /** >1 crops in tighter than cover-fit, so you can frame a face. */
  zoom?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let cancelled = false;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onerror = () => !cancelled && setFailed(true);
    img.onload = () => {
      if (cancelled) return;
      const w = cols;
      const h = Math.round(cols / aspect);
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // cover-fit the source into the low-res buffer
      const r = Math.max(w / img.width, h / img.height) * zoom;
      const dw = img.width * r;
      const dh = img.height * r;
      ctx.drawImage(img, (w - dw) * focusX, (h - dh) * focusY, dw, dh);

      const frame = ctx.getImageData(0, 0, w, h);
      const p = frame.data;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const lum = 0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2];
          const adj = (lum - 128) * contrast + 128 + brightness;
          const threshold = ((BAYER8[y & 7][x & 7] + 0.5) / 64) * 255;
          const v = adj > threshold ? 255 : 0;
          p[i] = p[i + 1] = p[i + 2] = v;
          p[i + 3] = 255;
        }
      }
      ctx.putImageData(frame, 0, 0);
      setFailed(false);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src, cols, aspect, contrast, brightness, focusX, focusY, zoom]);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center border border-white/[0.08] bg-white/[0.02] text-[11px] text-white/30 ${className ?? ""}`}
        style={{ aspectRatio: `${aspect}` }}
      >
        photo
      </div>
    );
  }

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={alt}
      className={`w-full [image-rendering:pixelated] ${className ?? ""}`}
      style={{ aspectRatio: `${aspect}` }}
    />
  );
}
