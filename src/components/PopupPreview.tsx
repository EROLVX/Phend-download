"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Settings, Lock, MousePointer2, TriangleAlert } from "lucide-react";

const URL_TEXT = "phishing.site";
const LOGO = "/icons/pshld-logo.png";

const PHASES = [
  { key: "typing", duration: 2400 },
  { key: "warning", duration: 2100 },
  { key: "toIcon", duration: 800 },
  { key: "popup", duration: 1800 },
  { key: "toAnalysis", duration: 650 },
  { key: "panel", duration: 1900 },
  { key: "zoomIn", duration: 1000 },
  { key: "toUnblock", duration: 650 },
  { key: "zoomOut", duration: 1100 },
] as const;

type PhaseKey = (typeof PHASES)[number]["key"];

const CURSOR_TARGETS: Record<PhaseKey, { left: string; top: string }> = {
  typing: { left: "88%", top: "90%" },
  warning: { left: "88%", top: "90%" },
  toIcon: { left: "51%", top: "38%" },
  popup: { left: "51%", top: "38%" },
  toAnalysis: { left: "50%", top: "65%" },
  panel: { left: "50%", top: "65%" },
  zoomIn: { left: "50%", top: "92%" },
  toUnblock: { left: "50%", top: "92%" },
  zoomOut: { left: "50%", top: "92%" },
};

const CLICK_PULSE_PHASES: PhaseKey[] = ["popup", "panel", "zoomOut"];

const timeline = [
  { label: "Rule Engine", detail: "No registry match", dot: "bg-white/25" },
  { label: "ML Engine", detail: "High-risk (244ms)", dot: "bg-danger" },
  { label: "DOM Engine", detail: "1 supporting signal", dot: "bg-warning" },
  { label: "Decision Engine", detail: "Final verdict: PHISHING", dot: "bg-danger" },
];

function TypingUrl({ active }: { active: boolean }) {
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setChars((c) => Math.min(c + 1, URL_TEXT.length));
    }, 115);
    return () => clearInterval(id);
  }, [active]);

  return (
    <span className="truncate font-mono text-[12.5px] text-white/70">
      {chars > 0 ? `https://${URL_TEXT.slice(0, chars)}` : ""}
      <span className="animate-pulse text-white/40">|</span>
    </span>
  );
}

export function PopupPreview() {
  const prefersReduced = useReducedMotion();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const reduceMotion = isClient && !!prefersReduced;

  const [phaseIndex, setPhaseIndex] = useState(0);

  const phase: PhaseKey = reduceMotion ? "panel" : PHASES[phaseIndex].key;

  useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
    }, PHASES[phaseIndex].duration);
    return () => clearTimeout(t);
  }, [phaseIndex, reduceMotion]);

  const showToolbar = phase === "typing" || phase === "toIcon";
  const showWarning = phase === "warning";
  const showPopup = phase === "popup" || phase === "toAnalysis";
  const showPanel =
    phase === "panel" || phase === "zoomIn" || phase === "toUnblock" || phase === "zoomOut";
  const flagged = phase !== "typing";
  const panelZoomed = phase === "zoomIn" || phase === "toUnblock";
  const pulse = CLICK_PULSE_PHASES.includes(phase);

  return (
    // The card is designed at 360x440. Shrinking the box reflowed its
    // contents and clipped the warning screen, so scale the whole thing
    // instead and let the outer box reserve the scaled footprint.
    <div className="relative h-[352px] w-[288px] sm:h-[396px] sm:w-[324px] lg:h-[440px] lg:w-[360px]">
      <div className="absolute left-0 top-0 h-[440px] w-[360px] origin-top-left scale-[0.8] sm:scale-90 lg:scale-100">
      <div className="animate-float-slow relative h-[440px] overflow-hidden rounded-2xl bg-[#0a0a0a]/95 shadow-[0_40px_90px_-24px_rgba(0,0,0,0.95),0_16px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur">
        <AnimatePresence>
          {showToolbar && (
            <motion.div
              key="toolbar"
              initial={
                phase === "toIcon"
                  ? { opacity: 0, scale: 1.45, x: 0 }
                  : { opacity: 0, scale: 0.96, x: 44 }
              }
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1, x: -44 }}
              transition={{ duration: phase === "toIcon" ? 0.7 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "51% 38%" }}
              className="absolute inset-0 p-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                New tab
              </p>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
                <Lock size={12} className="shrink-0 text-white/35" />
                <TypingUrl active={phase === "typing"} />
              </div>

              <p className="mt-8 text-[10px] font-semibold uppercase tracking-wider text-white/30">
                Pinned extensions
              </p>
              <div className="mt-3 flex items-center gap-3">
                {["A", "B", "C"].map((k) => (
                  <div
                    key={k}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-[11px] text-white/25"
                  >
                    {k}
                  </div>
                ))}
                <motion.div
                  data-target="icon"
                  animate={
                    flagged
                      ? { borderColor: "rgba(239,68,68,0.6)", backgroundColor: "rgba(239,68,68,0.1)" }
                      : { borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)" }
                  }
                  className="relative flex h-9 w-9 items-center justify-center rounded-lg border"
                >
                  <span
                    className={`relative h-5 w-5 shrink-0 ${flagged ? "" : "grayscale brightness-[1.8] contrast-75"}`}
                  >
                    <Image src={LOGO} alt="Phend" fill sizes="20px" className="object-contain" />
                  </span>
                  {flagged && (
                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-danger" />
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}

          {showWarning && (
            <motion.div
              key="warning"
              initial={{ opacity: 0, x: 44, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 1.45, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
              style={{ transformOrigin: "51% 38%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center bg-gradient-to-b from-danger/[0.08] to-transparent px-6 pb-5 pt-6 text-center"
            >
              <span className="relative h-6 w-6 self-start opacity-80">
                <Image src={LOGO} alt="Phend" fill sizes="24px" className="object-contain" />
              </span>

              <div className="mt-2 flex h-11 w-11 items-center justify-center rounded-full border border-danger/40 bg-danger/15">
                <TriangleAlert size={20} className="text-danger" />
              </div>
              <p className="mt-3 text-[15px] font-semibold text-white">
                Phishing Site Detected
              </p>
              <p className="mt-1 font-mono text-[12px] text-white/70">{URL_TEXT}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-white/45">
                Phend detected patterns commonly seen in credential-theft
                attacks on this page.
              </p>

              <div className="mt-4 w-full">
                <div className="flex items-center justify-between text-[10.5px] text-white/40">
                  <span>Confidence</span>
                  <span className="text-white/70">Medium</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full w-[55%] rounded-full bg-danger" />
                </div>
              </div>

              <div className="mt-4 w-full text-left">
                <p className="text-[9.5px] font-semibold uppercase tracking-wide text-white/30">
                  Why flagged
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/50">
                  Unusually long page path and query string; mostly external
                  links on the page.
                </p>
              </div>

              <div className="mt-auto w-full pt-4">
                <button className="w-full rounded-lg bg-danger py-2.5 text-[12.5px] font-medium text-white">
                  Block This Site
                </button>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button className="rounded-lg border border-white/[0.1] bg-white/[0.03] py-2.5 text-[11.5px] font-medium text-white/75">
                    Back to Safety
                  </button>
                  <button className="rounded-lg border border-white/[0.06] bg-white/[0.02] py-2.5 text-[11.5px] font-medium text-white/30">
                    Continue anyway
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {showPopup && (
            <motion.div
              key="popup"
              initial={{ opacity: 0, x: 44, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -44, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative h-6 w-6 shrink-0">
                    <Image src={LOGO} alt="Phend" fill sizes="24px" className="object-contain" />
                  </span>
                  <span className="text-sm font-semibold">Phend</span>
                </div>
                <Settings size={15} className="text-white/40" />
              </div>

              <div className="mt-4 flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2.5">
                <span className="text-[13px] text-white/70">Protection</span>
                <span className="inline-flex h-5 w-9 items-center rounded-full bg-success px-0.5">
                  <span className="h-3.5 w-3.5 translate-x-4 rounded-full bg-white shadow" />
                </span>
              </div>

              <div className="mt-4 rounded-xl border border-danger/40 bg-danger/[0.06] p-4">
                <Badge tone="danger" size="fixed">Phishing</Badge>
                <p className="mt-3 truncate text-[15px] font-semibold text-white">
                  {URL_TEXT}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-white/50">
                  <span>Confidence</span>
                  <span className="text-white/80">Medium</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full w-[55%] rounded-full bg-danger" />
                </div>
              </div>

              <div
                data-target="analysis"
                className="mt-3 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2.5 text-center text-[13px] font-medium text-white/80"
              >
                View analysis
              </div>

              <p className="mt-5 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                Session statistics
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  { value: "4", label: "Scans today" },
                  { value: "29", label: "Threats blocked" },
                  { value: "11", label: "Sites trusted" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-2.5 text-center"
                  >
                    <p className="text-lg font-semibold text-white">{stat.value}</p>
                    <p className="mt-0.5 text-[9.5px] leading-tight text-white/45">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {showPanel && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, x: 44, scale: 0.96 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: panelZoomed ? 1.14 : 1,
              }}
              exit={{ opacity: 0, x: -44, scale: 0.96 }}
              transition={{ duration: panelZoomed ? 0.6 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "50% 92%" }}
              className="absolute inset-0 p-5"
            >
              <div className="flex items-center justify-between">
                <Badge tone="danger" size="fixed">Phishing</Badge>
                <span className="text-[11px] text-white/50">High</span>
              </div>
              <p className="mt-2 truncate text-[14.5px] font-semibold text-white">
                {URL_TEXT}
              </p>
              <p className="mt-0.5 text-[10.5px] text-white/30">
                Last sync 22 hours ago &middot; Rule v36
              </p>

              <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5">
                <p className="text-[10.5px] font-semibold uppercase tracking-wide text-white/40">
                  Scan timeline
                </p>
                <div className="mt-2.5 space-y-2.5">
                  {timeline.map((row) => (
                    <div key={row.label} className="flex items-start gap-2">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${row.dot}`} />
                      <div className="min-w-0">
                        <p className="text-[10.5px] uppercase tracking-wide text-white/35">
                          {row.label}
                        </p>
                        <p className="truncate text-[12px] text-white/75">{row.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-3 w-full rounded-lg bg-danger py-2.5 text-[12.5px] font-medium text-white">
                Leave this site
              </button>
              <div
                data-target="unblock"
                className="mt-2 w-full rounded-lg border border-white/[0.1] bg-white/[0.03] py-2.5 text-center text-[12.5px] font-medium text-white/85"
              >
                Unblock domain
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!reduceMotion && !showWarning && (
          <motion.div
            className="pointer-events-none absolute z-20 -translate-x-1 -translate-y-1"
            animate={{
              left: CURSOR_TARGETS[phase].left,
              top: CURSOR_TARGETS[phase].top,
              scale: pulse ? [1, 0.72, 1.06, 1] : 1,
            }}
            transition={{
              left: { type: "spring", stiffness: 170, damping: 26, mass: 0.7 },
              top: { type: "spring", stiffness: 170, damping: 26, mass: 0.7 },
              scale: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <MousePointer2
              size={18}
              className="fill-white text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
        )}

        {/* Liquid glass, top only. Both layers breathe on the same 6s cadence
            as the ambient glow, so the sheen brightens and dims with it. */}
        <div
          className="animate-glass-breathe pointer-events-none absolute inset-x-0 top-0 z-30 h-28 rounded-t-2xl bg-[linear-gradient(to_bottom,rgba(255,255,255,0.09),rgba(255,255,255,0.025)_45%,transparent)]"
          aria-hidden
        />
        <div
          className="animate-glass-breathe pointer-events-none absolute inset-x-0 top-0 z-30 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.55)_50%,transparent)]"
          aria-hidden
        />
      </div>
      </div>
    </div>
  );
}
