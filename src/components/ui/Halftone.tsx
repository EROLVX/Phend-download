"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A true halftone screen: a grid of dots whose *radius* tracks local
 * brightness, the way printed halftones work.
 *
 * The earlier version used 1-bit Bayer dithering, where every dot is the same
 * size and tone is faked by scattering them. That reads as speckle on a face.
 * Varying the dot size instead renders smooth tone and stays legible.
 */
// Cheap deterministic value noise, so the grain is stable across renders
// instead of reshuffling every time the component re-runs.
function hashNoise(x: number, y: number) {
  const v = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return v - Math.floor(v);
}

export function Halftone({
  src,
  alt,
  /** Dot spacing in canvas pixels. Larger = chunkier screen. */
  cell = 5,
  /** width / height of the frame. */
  aspect = 0.8,
  contrast = 1.15,
  brightness = 0,
  focusX = 0.5,
  focusY = 0.5,
  zoom = 1,
  /** Unsharp-mask strength applied before the screen. */
  sharpen = 0.7,
  /** Dot radius multiplier. Above ~0.71 the darkest dots start to touch. */
  dotScale = 0.78,
  /** Grain strength, in luminance units, ramped from 0 at the top of the
   *  frame to full at the bottom so the figure dissolves downward. */
  noise = 0,
  className,
}: {
  src: string;
  alt: string;
  cell?: number;
  aspect?: number;
  contrast?: number;
  brightness?: number;
  focusX?: number;
  focusY?: number;
  zoom?: number;
  sharpen?: number;
  dotScale?: number;
  noise?: number;
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

      const W = 720;
      const H = Math.round(W / aspect);
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // One source pixel per dot. Letting drawImage do the downscale gives a
      // box average per cell for free.
      const gw = Math.ceil(W / cell);
      const gh = Math.ceil(H / cell);

      const tmp = document.createElement("canvas");
      tmp.width = gw;
      tmp.height = gh;
      const tctx = tmp.getContext("2d", { willReadFrequently: true });
      if (!tctx) return;

      const r = Math.max(gw / img.width, gh / img.height) * zoom;
      const dw = img.width * r;
      const dh = img.height * r;
      tctx.drawImage(img, (gw - dw) * focusX, (gh - dh) * focusY, dw, dh);

      const px = tctx.getImageData(0, 0, gw, gh).data;

      const lum = new Float32Array(gw * gh);
      for (let i = 0, j = 0; j < lum.length; i += 4, j++) {
        lum[j] = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
      }

      // unsharp mask against a 3x3 box blur, so edges survive the screen
      const blur = new Float32Array(gw * gh);
      for (let y = 0; y < gh; y++) {
        for (let x = 0; x < gw; x++) {
          let sum = 0;
          let n = 0;
          for (let dy = -1; dy <= 1; dy++) {
            const yy = y + dy;
            if (yy < 0 || yy >= gh) continue;
            for (let dx = -1; dx <= 1; dx++) {
              const xx = x + dx;
              if (xx < 0 || xx >= gw) continue;
              sum += lum[yy * gw + xx];
              n++;
            }
          }
          blur[y * gw + x] = sum / n;
        }
      }

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";

      const rMax = cell * dotScale;
      for (let y = 0; y < gh; y++) {
        for (let x = 0; x < gw; x++) {
          const j = y * gw + x;
          const sharp = lum[j] + sharpen * (lum[j] - blur[j]);
          // ramp^1.8 keeps the top clean and concentrates grain low down
          const ramp = gh > 1 ? Math.pow(y / (gh - 1), 1.8) : 0;
          const grain = noise * ramp * hashNoise(x, y);
          const adj = (sharp - 128) * contrast + 128 + brightness + grain;
          const t = Math.min(1, Math.max(0, adj / 255));
          if (t <= 0.012) continue;
          // sqrt so dot *area* tracks brightness, which is what the eye reads
          const radius = Math.sqrt(t) * rMax;
          ctx.beginPath();
          ctx.arc(x * cell + cell / 2, y * cell + cell / 2, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      setFailed(false);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [
    src,
    cell,
    aspect,
    contrast,
    brightness,
    focusX,
    focusY,
    zoom,
    sharpen,
    dotScale,
    noise,
  ]);

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
      className={`w-full ${className ?? ""}`}
      style={{ aspectRatio: `${aspect}` }}
    />
  );
}
