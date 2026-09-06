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
  sm: "h-14 w-14 sm:h-20 sm:w-20 sm:rounded-2xl lg:h-16 lg:w-16",
  md: "h-14 w-14 sm:h-20 sm:w-20 sm:rounded-2xl lg:h-20 lg:w-20",
  lg: "h-14 w-14 sm:h-20 sm:w-20 sm:rounded-2xl lg:h-24 lg:w-24",
} as const;

const iconSizeClasses = {
  sm: "h-7 w-7 sm:h-10 sm:w-10 lg:h-8 lg:w-8",
  md: "h-7 w-7 sm:h-10 sm:w-10 lg:h-10 lg:w-10",
  lg: "h-7 w-7 sm:h-10 sm:w-10 lg:h-12 lg:w-12",
} as const;

const browsers = [
  {
    name: "Google Chrome",
    logo: "/icons/browsers/chrome.png",
    zoom: 1,
    scatter: { x: -36, y: -46, rotate: -10 },
    desktop: { top: 6, left: 11, size: "lg" as const },
  },
  {
    name: "Microsoft Edge",
    logo: "/icons/browsers/edge.png",
    zoom: 1,
    scatter: { x: 28, y: -54, rotate: 9 },
    desktop: { top: 4, left: 79, size: "md" as const },
  },
  {
    name: "Brave",
    logo: "/icons/browsers/brave.png",
    zoom: 1,
    scatter: { x: -22, y: -32, rotate: 7 },
    desktop: { top: 47, left: 4, size: "sm" as const },
  },
  {
    name: "Opera",
    logo: "/icons/browsers/opera.png",
    zoom: 1,
    scatter: { x: 20, y: -38, rotate: -8 },
    desktop: { top: 51, left: 93, size: "sm" as const },
  },
  {
    name: "Vivaldi",
    logo: "/icons/browsers/vivaldi.png",
    zoom: 1,
    scatter: { x: 38, y: -26, rotate: 11 },
    desktop: { top: 88, left: 19, size: "md" as const },
  },
  {
    name: "Arc",
    logo: "/icons/browsers/arc.png",
    zoom: 1.3,
    scatter: { x: -40, y: -30, rotate: -12 },
    desktop: { top: 90, left: 75, size: "lg" as const },
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

function BrowserTile({
  name,
  logo,
  zoom,
  scatter,
  index,
  size = "md",
  reduceMotion,
}: {
  name: string;
  logo: string;
  zoom: number;
  scatter: { x: number; y: number; rotate: number };
  index: number;
  size?: "sm" | "md" | "lg";
  reduceMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);

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
    <motion.div
      className="group relative flex flex-col items-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className={`relative flex items-center justify-center rounded-xl border border-white/[0.08] bg-card ${sizeClasses[size]}`}
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
          className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/[0.08] bg-card-hover px-3 py-1 text-[11px] font-medium text-white/70"
          initial={{ opacity: 0, y: -4 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
        >
          Manifest V3 Compatible
        </motion.div>
      </motion.div>

      <p className="mt-2 text-[11px] font-medium text-white/45 sm:mt-3 sm:text-xs">{name}</p>
    </motion.div>
  );
}

function ScatteredTile({
  browser,
  index,
  reduceMotion,
  spread,
}: {
  browser: (typeof browsers)[number];
  index: number;
  reduceMotion: boolean;
  spread: MotionValue<number>;
}) {
  const dirX = browser.desktop.left - 50;
  const dirY = browser.desktop.top - 50;
  const driftX = useTransform(spread, (s) => (reduceMotion ? 0 : dirX * 11 * (s - 1)));
  const driftY = useTransform(spread, (s) => (reduceMotion ? 0 : dirY * 4.2 * (s - 1)));

  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top: `${browser.desktop.top}%`, left: `${browser.desktop.left}%` }}
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const spread = useTransform(scrollYProgress, [0, 1], [1, 0.18]);

  return (
    <section id="browsers" className="relative overflow-hidden border-t border-white/[0.06] py-12 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {watermarkIcons.map((icon) => (
          <div
            key={icon.logo + icon.top}
            className="absolute -translate-x-1/2 -translate-y-1/2 opacity-[0.16] grayscale"
            style={{
              top: `${icon.top}%`,
              left: `${icon.left}%`,
              width: icon.size,
              height: icon.size,
            }}
          >
            <Image src={icon.logo} alt="" fill sizes="360px" className="object-contain" />
          </div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.95)_100%)]" />
      </div>

      <div
        ref={sectionRef}
        className="relative z-10 mx-auto max-w-[1280px] px-6 lg:flex lg:min-h-[440px] lg:items-center lg:justify-center"
      >
        <Reveal className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-white/40">Compatibility</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            Runs on every Chromium browser you already use.
          </h2>
          <p className="mt-3 text-[14px] text-white/55 sm:mt-4 sm:text-base">
            Phend ships as a Manifest V3 extension, so it installs the same
            way and behaves identically across every browser built on
            Chromium.
          </p>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 place-items-center gap-y-6 sm:mt-10 sm:gap-y-10 sm:grid-cols-6 sm:gap-x-4 lg:hidden">
          {browsers.map((browser, index) => (
            <BrowserTile
              key={browser.name}
              name={browser.name}
              logo={browser.logo}
              zoom={browser.zoom}
              scatter={browser.scatter}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <div className="absolute inset-0 hidden lg:block">
          {browsers.map((browser, index) => (
            <ScatteredTile
              key={browser.name}
              browser={browser}
              index={index}
              reduceMotion={reduceMotion}
              spread={spread}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
