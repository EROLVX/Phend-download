"use client";

import { useRef } from "react";
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
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const hi = Math.max(index / (total - 1), 0.05);
  const lo = Math.max(hi - 0.15, 0);
  const active = useTransform(progress, [lo, hi], [0, 1]);
  const borderColor = useTransform(
    active,
    [0, 1],
    ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.9)"]
  );

  // Each rail segment fills as the scroll moves from this step to the next,
  // which keeps the vertical line exact without measuring the DOM.
  const nextHi = Math.min((index + 1) / (total - 1), 1);
  const segFill = useTransform(progress, [hi, nextHi], [0, 1]);
  const isLast = index === total - 1;

  return (
    <Reveal delay={index * 0.06} className="relative">
      <div className="flex gap-3.5 lg:flex-col lg:items-center lg:gap-3 lg:text-center">
        {/* Rail column: holds the marker, and on phones the connecting line.
            lg:contents dissolves this wrapper so the desktop column stacks. */}
        <div className="flex flex-col items-center lg:contents">
          <motion.div
            className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white/[0.05] backdrop-blur-xl sm:h-10 sm:w-10 lg:h-12 lg:w-12"
            style={{ borderColor }}
          >
            <Icon size={15} className="text-white/80 lg:hidden" />
            <Icon size={19} className="hidden text-white/80 lg:block" />
          </motion.div>

          {!isLast && (
            <div className="relative w-px flex-1 bg-white/[0.08] lg:hidden">
              <motion.div
                className="absolute inset-0 origin-top bg-white/90"
                style={{ scaleY: segFill }}
              />
            </div>
          )}
        </div>

        <div className="pb-7 lg:pb-0">
          <p className="font-display text-[9px] tracking-wide text-white/30 sm:text-[10px] lg:text-[10.5px]">
            STEP {index + 1}
          </p>
          <p className="mt-1 text-[13px] font-medium leading-snug text-white sm:text-[14px] lg:mt-1.5 lg:text-[14.5px]">
            {title}
          </p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-white/45 sm:text-[12.5px] lg:mt-1.5 lg:text-[13px]">
            {description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function InstallGuide() {
  const rowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const doneOpacity = useTransform(scrollYProgress, [0.92, 1], [0, 1]);
  const doneY = useTransform(scrollYProgress, [0.92, 1], [10, 0]);

  return (
    <section
      id="installation"
      className="relative border-t border-white/[0.06] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal className="max-w-xl">
          <p className="font-display text-[10px] tracking-wide text-white/40 sm:text-[11px]">
            Installation
          </p>
          <h2 className="mt-3 text-[22px] font-semibold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
            Six steps to protected.
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-white/55 sm:mt-4 sm:text-base">
            No developer account, no store review. Load it locally like any
            unpacked extension.
          </p>
        </Reveal>

        <div
          ref={rowRef}
          className="relative mt-10 flex flex-col sm:mt-12 lg:mt-16 lg:grid lg:grid-cols-6 lg:gap-4"
        >
          {/* Desktop only: the horizontal rail behind the markers */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-white/[0.08] lg:block" />
          <motion.div
            className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-white/90 lg:block"
            style={{ scaleX: lineScale }}
          />

          {steps.map((step, i) => (
            <StepItem
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={i}
              total={steps.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: doneOpacity, y: doneY }}
          className="mt-6 flex items-center gap-2 text-success sm:mt-10 lg:mt-14 lg:justify-center"
        >
          <ShieldCheck size={15} />
          <span className="font-display text-[11px] tracking-wide sm:text-[12px]">
            Done. Protected.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
