import { Reveal } from "@/components/ui/Reveal";
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
    ghostSize: 92,
  },
  {
    icon: ShieldAlert,
    title: "Safe, Phishing & Suspicious verdicts",
    description:
      "Each result comes with a confidence score and the plain-language reasons behind it — domain length, URL length, path length, and more.",
    ghostSize: 124,
  },
  {
    icon: MonitorSmartphone,
    title: "Toolbar popup",
    description:
      "A one-click view of the current site's verdict, a protection toggle, and your session stats — scans, threats blocked, sites trusted.",
    ghostSize: 104,
  },
  {
    icon: PanelRight,
    title: "Side panel analysis",
    description:
      "Go deeper with the full scan timeline across the Rule, ML, DOM, and Decision engines, plus a breakdown of threat details.",
    ghostSize: 116,
  },
  {
    icon: AlertTriangle,
    title: "Full-page warning",
    description:
      "Confirmed phishing pages are covered by a warning screen with Block, Back to Safety, or Continue at your own risk.",
    ghostSize: 100,
  },
  {
    icon: Settings,
    title: "Settings",
    description:
      "Toggle protection and notifications, trigger a manual sync, and check your rule, config, and model versions.",
    ghostSize: 132,
  },
  {
    icon: ShieldCheck,
    title: "Trusted domains & blocklist",
    description:
      "Manage your own Allowlist and Blocklist, search saved domains, and review scan history — all in one place.",
    ghostSize: 108,
  },
  {
    icon: MessageCircle,
    title: "Feedback & local data",
    description:
      "Send a bug report or suggestion straight from settings, or clear locally cached scan history at any time.",
    ghostSize: 96,
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

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 4) * 0.05}>
              <div className="group relative h-full overflow-hidden border border-white/[0.07] bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-card-hover lg:min-h-[192px]">
                <JigsawCorner id={`how-jigsaw-${i}`} />

                <feature.icon
                  strokeWidth={1}
                  style={{ width: feature.ghostSize, height: feature.ghostSize }}
                  className="pointer-events-none absolute -bottom-5 -right-5 text-white/[0.05] transition-colors duration-300 group-hover:text-white/[0.14]"
                  aria-hidden
                />

                <p className="relative text-[15px] font-medium text-white">
                  {feature.title}
                </p>
                <p className="relative mt-2 text-[13.5px] leading-relaxed text-white/45">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
