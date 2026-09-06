"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import {
  FolderDown,
  FolderOpen,
  Globe,
  ToggleRight,
  FolderInput,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const steps = [
  {
    icon: FolderDown,
    title: "Download the ZIP",
    description: "Grab the latest build from the download section above.",
  },
  {
    icon: FolderOpen,
    title: "Extract the ZIP",
    description: "Unzip it anywhere on your computer.",
  },
  {
    icon: Globe,
    title: "Open extensions page",
    description: "Go to chrome://extensions or edge://extensions.",
  },
  {
    icon: ToggleRight,
    title: "Enable Developer Mode",
    description: "Flip the toggle in the top-right corner.",
  },
  {
    icon: FolderInput,
    title: "Load unpacked",
    description: 'Click "Load unpacked" and select the folder.',
  },
  {
    icon: ShieldCheck,
    title: "Select the dist folder",
    description: "Choose the extracted dist folder to finish.",
  },
];

function StepItem({
  icon: Icon,
  title,
  description,
  index,
  total,
  progress,
  circleRef,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  circleRef: (el: HTMLDivElement | null) => void;
}) {
  const hi = Math.max(index / (total - 1), 0.05);
  const lo = Math.max(hi - 0.15, 0);
  const active = useTransform(progress, [lo, hi], [0, 1]);
  const borderColor = useTransform(
    active,
    [0, 1],
    ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.9)"]
  );

  return (
    <Reveal delay={index * 0.06} className="relative">
      <div className="relative flex flex-col items-start gap-3 lg:items-center lg:text-center">
        <motion.div
          ref={circleRef}
          className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white/[0.05] backdrop-blur-xl sm:h-12 sm:w-12"
          style={{ borderColor }}
        >
          <Icon size={14} className="text-white/80 sm:hidden" />
          <Icon size={19} className="hidden text-white/80 sm:block" />
        </motion.div>
        <div>
          <p className="text-[9.5px] font-semibold uppercase tracking-wide text-white/30 sm:text-[11px]">
            Step {index + 1}
          </p>
          <p className="mt-0.5 text-[12.5px] font-medium text-white sm:mt-1 sm:text-[14.5px]">
            {title}
          </p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-white/45 sm:mt-1 sm:text-[13px] sm:leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function InstallGuide() {
  const rowRef = useRef<HTMLDivElement>(null);
  const circleEls = useRef<(HTMLDivElement | null)[]>([]);
  const [snakePath, setSnakePath] = useState("");
  const [viewBox, setViewBox] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const doneOpacity = useTransform(scrollYProgress, [0.92, 1], [0, 1]);
  const doneY = useTransform(scrollYProgress, [0.92, 1], [10, 0]);

  const measure = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const rowRect = row.getBoundingClientRect();
    const points = circleEls.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left - rowRect.left + r.width / 2,
        y: r.top - rowRect.top + r.height / 2,
      };
    });
    if (points.some((p) => p === null)) return;
    const d = (points as { x: number; y: number }[])
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    setSnakePath(d);
    setViewBox({ width: rowRect.width, height: rowRect.height });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (rowRef.current) ro.observe(rowRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <section id="installation" className="relative border-t border-white/[0.06] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal className="max-w-xl">
          <p className="text-sm font-medium text-white/40">Installation</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            Six steps to protected.
          </h2>
          <p className="mt-3 text-[14px] text-white/55 sm:mt-4 sm:text-base">
            No developer account, no store review. Load it locally like any
            unpacked extension.
          </p>
        </Reveal>

        <div
          ref={rowRef}
          className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:mt-16 sm:gap-6 lg:grid-cols-6 lg:gap-4"
        >
          <div className="absolute top-6 left-0 right-0 hidden h-px bg-white/[0.08] lg:block" />
          <motion.div
            className="absolute top-6 left-0 right-0 hidden h-px origin-left bg-white/90 lg:block"
            style={{ scaleX: lineScale }}
          />

          {viewBox.width > 0 && (
            <svg
              className="pointer-events-none absolute inset-0 lg:hidden"
              width={viewBox.width}
              height={viewBox.height}
              viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
              fill="none"
            >
              <path d={snakePath} stroke="rgba(255,255,255,0.08)" strokeWidth={1.5} />
              <motion.path
                d={snakePath}
                stroke="rgba(255,255,255,0.9)"
                strokeWidth={1.5}
                style={{ pathLength: lineScale }}
              />
            </svg>
          )}

          {steps.map((step, i) => (
            <StepItem
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={i}
              total={steps.length}
              progress={scrollYProgress}
              circleRef={(el) => {
                circleEls.current[i] = el;
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: doneOpacity, y: doneY }}
          className="mt-10 flex items-center justify-center gap-2 text-success sm:mt-14"
        >
          <ShieldCheck size={16} />
          <span className="text-sm font-medium">Done. Protected.</span>
        </motion.div>
      </div>
    </section>
  );
}
