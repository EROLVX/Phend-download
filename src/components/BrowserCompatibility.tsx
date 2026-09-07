"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const sizeClasses = {
  sm: "h-11 w-11 rounded-lg sm:h-14 sm:w-14 sm:rounded-xl lg:h-16 lg:w-16 lg:rounded-2xl",
  md: "h-12 w-12 rounded-lg sm:h-16 sm:w-16 sm:rounded-xl lg:h-20 lg:w-20 lg:rounded-2xl",
  lg: "h-[52px] w-[52px] rounded-lg sm:h-[72px] sm:w-[72px] sm:rounded-xl lg:h-24 lg:w-24 lg:rounded-2xl",
} as const;

const iconSizeClasses = {
  sm: "h-6 w-6 sm:h-8 sm:w-8 lg:h-8 lg:w-8",
  md: "h-6 w-6 sm:h-9 sm:w-9 lg:h-10 lg:w-10",
  lg: "h-7 w-7 sm:h-10 sm:w-10 lg:h-12 lg:w-12",
} as const;

// Two position sets. On phones the copy fills the full width, so the tiles
// cluster above and below it instead of sitting in the side margins.
const browsers = [
  {
    name: "Google Chrome",
    logo: "/icons/browsers/chrome.png",
    zoom: 1,
    scatter: { x: -36, y: -46, rotate: -10 },
    desktop: { top: 6, left: 11, size: "lg" as const },
    mobile: { top: 19, left: 20 },
  },
  {
    name: "Microsoft Edge",
    logo: "/icons/browsers/edge.png",
    zoom: 1,
    scatter: { x: 28, y: -54, rotate: 9 },
    desktop: { top: 4, left: 79, size: "md" as const },
    mobile: { top: 19, left: 80 },
  },
  {
    name: "Brave",
    logo: "/icons/browsers/brave.png",
    zoom: 1,
    scatter: { x: -22, y: -32, rotate: 7 },
    desktop: { top: 47, left: 4, size: "sm" as const },
    mobile: { top: 7, left: 50 },
  },
  {
    name: "Opera",
    logo: "/icons/browsers/opera.png",
    zoom: 1,
    scatter: { x: 20, y: -38, rotate: -8 },
    desktop: { top: 51, left: 93, size: "sm" as const },
    mobile: { top: 91, left: 50 },
  },
  {
    name: "Vivaldi",
    logo: "/icons/browsers/vivaldi.png",
    zoom: 1,
    scatter: { x: 38, y: -26, rotate: 11 },
    desktop: { top: 88, left: 19, size: "md" as const },
    mobile: { top: 80, left: 22 },
  },
  {
    name: "Arc",
    logo: "/icons/browsers/arc.png",
    zoom: 1.3,
    scatter: { x: -40, y: -30, rotate: -12 },
    desktop: { top: 90, left: 75, size: "lg" as const },
    mobile: { top: 80, left: 78 },
  },
];

const watermarkIcons = [
  { logo: "/icons/browsers/chrome.png", top: 6, left: 16, size: 300 },
  { logo: "/icons/browsers/edge.png", top: 12, left: 86, size: 360 },
  { logo: "/icons/browsers/brave.png", top: 62, left: 2, size: 280 },
  { logo: "/icons/browsers/opera.png", top: 80, left: 94, size: 320 },
  { logo: "/icons/browsers/vivaldi.png", top: 98, left: 30, size: 260 },
  { logo: "/icons/browsers/arc.png", top: 92, left: 64, size: 340 },
];

const MOBILE_QUERY = "(max-width: 1023px)";

function useIsMobile() {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(MOBILE_QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  );
}

function BrowserTile({
  name,
  logo,
  zoom,
  scatter,
  index,
  size = "md",
  reduceMotion,
  isOpen,
  onToggle,
}: {
  name: string;
  logo: string;
  zoom: number;
  scatter: { x: number; y: number; rotate: number };
  index: number;
  size?: "sm" | "md" | "lg";
  reduceMotion: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  // Touch devices never fire hover, so a tap opens the same tooltip.
  const showTip = hovered || isOpen;

  const variants: Variants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: {
          opacity: 0,
          scale: 0.86,
          x: scatter.x,
          y: scatter.y,
          rotate: scatter.rotate,
        },
        show: {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotate: 0,
          transition: {
            type: "spring",
            stiffness: 170,
            damping: 22,
            mass: 0.7,
            delay: index * 0.06,
          },
        },
      };

  const idleAnimate = reduceMotion ? undefined : { scale: 1, y: [0, -4, 0], rotate: 0 };
  const idleTransition = reduceMotion
    ? undefined
    : {
        duration: 3.6 + index * 0.4,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: index * 0.25,
      };
  const hoverAnimate = { scale: 1.07, y: -5, rotate: index % 2 === 0 ? -2.5 : 2.5 };
  const hoverTransition = { type: "spring" as const, stiffness: 300, damping: 20 };

  return (
    <motion.button
      type="button"
      aria-expanded={showTip}
      aria-label={`${name} — Manifest V3 compatible`}
      onClick={onToggle}
      className="group relative flex flex-col items-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className={`relative flex items-center justify-center border border-white/[0.08] bg-card ${sizeClasses[size]}`}
        animate={reduceMotion ? undefined : hovered ? hoverAnimate : idleAnimate}
        transition={reduceMotion ? undefined : hovered ? hoverTransition : idleTransition}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-40"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)" }}
          aria-hidden
        />
        <span className={`relative overflow-hidden ${iconSizeClasses[size]}`}>
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            sizes="48px"
            className="object-contain"
            style={zoom !== 1 ? { transform: `scale(${zoom})` } : undefined}
          />
        </span>

        <motion.div
          className="pointer-events-none absolute -top-7 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/[0.08] bg-card-hover px-2 py-0.5 text-[9px] font-medium text-white/70 sm:-top-9 sm:px-3 sm:py-1 sm:text-[11px]"
          initial={{ opacity: 0, y: 4 }}
          animate={showTip ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
        >
          Manifest V3 Compatible
        </motion.div>
      </motion.div>

      <span className="mt-1.5 block whitespace-nowrap text-[9.5px] font-medium text-white/45 sm:mt-2.5 sm:text-[11px] lg:mt-3 lg:text-xs">
        {name}
      </span>
    </motion.button>
  );
}

function ScatteredTile({
  browser,
  index,
  reduceMotion,
  spread,
  isMobile,
  isOpen,
  onToggle,
}: {
  browser: (typeof browsers)[number];
  index: number;
  reduceMotion: boolean;
  spread: MotionValue<number>;
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const pos = isMobile ? browser.mobile : browser.desktop;
  const dirX = pos.left - 50;
  const dirY = pos.top - 50;
  // Phones have far less room, so the desktop drift would fling tiles offscreen.
  const fx = isMobile ? 4.2 : 11;
  const fy = isMobile ? 2.4 : 4.2;
  const driftX = useTransform(spread, (s) => (reduceMotion ? 0 : dirX * fx * (s - 1)));
  const driftY = useTransform(spread, (s) => (reduceMotion ? 0 : dirY * fy * (s - 1)));

  return (
    <div
      // Tiles are sibling layers, so a neighbour would paint over this one's
      // tooltip. Raise whichever tile is open (tap) or hovered (mouse).
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 [&:has(:hover)]:z-30"
      style={{
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        zIndex: isOpen ? 30 : undefined,
      }}
    >
      <motion.div className="pointer-events-auto" style={{ x: driftX, y: driftY }}>
        <BrowserTile
          name={browser.name}
          logo={browser.logo}
          zoom={browser.zoom}
          scatter={browser.scatter}
          index={index}
          size={browser.desktop.size}
          reduceMotion={reduceMotion}
          isOpen={isOpen}
          onToggle={onToggle}
        />
      </motion.div>
    </div>
  );
}

export function BrowserCompatibility() {
  const prefersReduced = useReducedMotion();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const reduceMotion = isClient && !!prefersReduced;
  const isMobile = useIsMobile();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const spread = useTransform(scrollYProgress, [0, 1], [1, 0.18]);

  return (
    <section
      id="browsers"
      className="relative overflow-hidden border-t border-white/[0.06] py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {watermarkIcons.map((icon) => (
          <div
            key={icon.logo + icon.top}
            className="absolute -translate-x-1/2 -translate-y-1/2 opacity-[0.16] grayscale"
            style={{
              top: `${icon.top}%`,
              left: `${icon.left}%`,
              // Scales with the viewport so the watermark never swamps a phone.
              width: `clamp(${Math.round(icon.size * 0.34)}px, ${(
                (icon.size / 1440) *
                100
              ).toFixed(1)}vw, ${icon.size}px)`,
              aspectRatio: "1 / 1",
            }}
          >
            <Image src={icon.logo} alt="" fill sizes="360px" className="object-contain" />
          </div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.95)_100%)]" />
      </div>

      <div
        ref={sectionRef}
        className="relative z-10 mx-auto flex min-h-[540px] max-w-[1280px] items-center justify-center px-6 sm:min-h-[600px] lg:min-h-[440px]"
      >
        <Reveal className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="font-display text-[10px] tracking-wide text-white/40 sm:text-[11px]">
            Compatibility
          </p>
          <h2 className="mt-3 text-[21px] font-semibold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
            Runs on every Chromium browser you already use.
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-white/55 sm:mt-4 sm:text-base">
            Phend ships as a Manifest V3 extension, so it installs the same
            way and behaves identically across every browser built on
            Chromium.
          </p>
        </Reveal>

        <div className="absolute inset-0">
          {browsers.map((browser, index) => (
            <ScatteredTile
              key={browser.name}
              browser={browser}
              index={index}
              reduceMotion={reduceMotion}
              spread={spread}
              isMobile={isMobile}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((cur) => (cur === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
