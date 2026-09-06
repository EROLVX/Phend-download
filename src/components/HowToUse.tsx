"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import {
  ScanLine,
  ShieldAlert,
  MonitorSmartphone,
  PanelRight,
  AlertTriangle,
  Settings,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    icon: ScanLine,
    title: "Automatic scanning",
    description:
      "Every site you visit is scanned in the background and blocked before it fully loads if it looks like phishing.",
    ghostSize: 300,
  },
  {
    icon: ShieldAlert,
    title: "Safe, Phishing & Suspicious verdicts",
    description:
      "Each result comes with a confidence score and the plain-language reasons behind it — domain length, URL length, path length, and more.",
    ghostSize: 330,
  },
  {
    icon: MonitorSmartphone,
    title: "Toolbar popup",
    description:
      "A one-click view of the current site's verdict, a protection toggle, and your session stats — scans, threats blocked, sites trusted.",
    ghostSize: 315,
  },
  {
    icon: PanelRight,
    title: "Side panel analysis",
    description:
      "Go deeper with the full scan timeline across the Rule, ML, DOM, and Decision engines, plus a breakdown of threat details.",
    ghostSize: 322,
  },
  {
    icon: AlertTriangle,
    title: "Full-page warning",
    description:
      "Confirmed phishing pages are covered by a warning screen with Block, Back to Safety, or Continue at your own risk.",
    ghostSize: 308,
  },
  {
    icon: Settings,
    title: "Settings",
    description:
      "Toggle protection and notifications, trigger a manual sync, and check your rule, config, and model versions.",
    ghostSize: 330,
  },
  {
    icon: ShieldCheck,
    title: "Trusted domains & blocklist",
    description:
      "Manage your own Allowlist and Blocklist, search saved domains, and review scan history — all in one place.",
    ghostSize: 315,
  },
  {
    icon: MessageCircle,
    title: "Feedback & local data",
    description:
      "Send a bug report or suggestion straight from settings, or clear locally cached scan history at any time.",
    ghostSize: 300,
  },
];

const watermarkIcons = [
  { icon: ShieldAlert, top: 8, left: 15, size: 260 },
  { icon: MonitorSmartphone, top: 14, left: 87, size: 300 },
  { icon: Settings, top: 62, left: 4, size: 240 },
  { icon: MessageCircle, top: 82, left: 93, size: 280 },
  { icon: ShieldCheck, top: 96, left: 32, size: 220 },
  { icon: PanelRight, top: 92, left: 65, size: 260 },
];

function JigsawCorner({ id }: { id: string }) {
  return (
    <svg
      className="pointer-events-none absolute right-0 top-0 h-16 w-20"
      aria-hidden
    >
      <defs>
        <pattern
          id={`${id}-tile`}
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M16,0 L16,6 C12.8,6 12.8,10 16,10 L16,16 L10,16 C10,12.8 6,12.8 6,16 L0,16"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id={`${id}-fade`} cx="100%" cy="0%" r="100%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="55%" stopColor="white" stopOpacity="0.7" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${id}-tile)`}
        opacity="0.4"
        mask={`url(#${id}-mask)`}
      />
    </svg>
  );
}

export function HowToUse() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {watermarkIcons.map((w, i) => {
          const Icon = w.icon;
          return (
            <Icon
              key={i}
              strokeWidth={1}
              style={{
                position: "absolute",
                top: `${w.top}%`,
                left: `${w.left}%`,
                width: w.size,
                height: w.size,
                transform: "translate(-50%, -50%)",
              }}
              className="text-white/[0.05]"
            />
          );
        })}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.95)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6">
        <Reveal className="max-w-xl">
          <p className="text-sm font-medium text-white/40">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            What Phend actually does.
          </h2>
          <p className="mt-4 text-white/55">
            A short tour of the real extension surface — nothing here is a
            planned feature, it&apos;s what ships in the beta today.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col gap-2 lg:h-[400px] lg:flex-row lg:gap-3">
            {features.map((feature, i) => {
              const isActive = i === active;
              return (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={isActive}
                  className={cn(
                    "group relative flex flex-col overflow-hidden border p-5 text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-w-0",
                    isActive
                      ? "border-info/45 bg-info/[0.07] shadow-[inset_0_1px_0_0_rgba(59,130,246,0.28)] lg:flex-[6] lg:justify-end lg:p-9"
                      : "border-white/[0.07] bg-card hover:border-white/[0.18] hover:bg-card-hover lg:flex-[0.35] lg:px-4"
                  )}
                >
                  {isActive && <JigsawCorner id={`how-jigsaw-${i}`} />}

                  {isActive && (
                    <feature.icon
                      strokeWidth={1}
                      style={{
                        width: feature.ghostSize,
                        height: feature.ghostSize,
                      }}
                      className="pointer-events-none absolute -bottom-[18%] -right-[14%] hidden text-info/[0.16] lg:block"
                      aria-hidden
                    />
                  )}

                  <div
                    className={cn(
                      "relative flex items-center gap-3 lg:flex-col lg:gap-5",
                      isActive
                        ? "animate-panel-in lg:items-start"
                        : "lg:items-center"
                    )}
                  >
                    <feature.icon
                      size={isActive ? 26 : 18}
                      strokeWidth={1.6}
                      className={cn(
                        "shrink-0 transition-colors duration-300",
                        isActive
                          ? "text-info"
                          : "text-white/40 group-hover:text-white/70"
                      )}
                    />
                    <p
                      className={cn(
                        "font-medium transition-colors duration-300",
                        isActive
                          ? "text-[17px] text-white lg:text-[27px] lg:leading-tight lg:tracking-tight"
                          : "text-[15px] text-white/70",
                        // Collapsed panels are narrow strips on desktop, so the
                        // label runs bottom-to-top down the strip instead.
                        !isActive &&
                          "lg:rotate-180 lg:whitespace-nowrap lg:[writing-mode:vertical-rl]"
                      )}
                    >
                      {feature.title}
                    </p>
                  </div>

                  {isActive && (
                    <p className="animate-panel-in-late relative mt-3 max-w-xl text-[14px] leading-relaxed text-white/65 lg:mt-5 lg:text-[17px] lg:leading-[1.75]">
                      {feature.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
