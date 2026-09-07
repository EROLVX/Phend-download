import { Reveal } from "@/components/ui/Reveal";
import { RefreshCw, GitBranch, Cpu, Info } from "lucide-react";

const rows = [
  {
    icon: GitBranch,
    label: "Rule version",
    detail: "Manually published from the whitelist — bumps when the registry changes.",
    value: "v36",
  },
  {
    icon: RefreshCw,
    label: "Config version",
    detail: "Bumps whenever detection thresholds change.",
    value: "v7",
  },
  {
    icon: Cpu,
    label: "Model version",
    detail: "Read-only — published from the admin dashboard, pulled on Sync now.",
    value: "Vexa-1 Beta · v1.0",
  },
];

export function AutoUpdates() {
  return (
    <section id="guide" className="relative border-t border-white/[0.06] py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="font-display text-[10px] tracking-wide text-white/40 sm:text-[11px]">Staying up to date</p>
            <h2 className="mt-3 text-[22px] font-semibold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
              Detection updates itself.
              <br />
              The extension doesn&apos;t have to.
            </h2>
            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-white/55 sm:mt-5 sm:text-base">
              Trusted domains, the blocklist, and detection rules sync from the
              cloud automatically. The ML model updates when you press{" "}
              <span className="text-white/80">Sync now</span> in Settings.
            </p>

            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-info/20 bg-info/[0.06] p-3.5 sm:mt-8 sm:gap-3 sm:p-4">
              <Info size={16} className="mt-0.5 shrink-0 text-info" />
              <p className="text-[12px] leading-relaxed text-white/60 sm:text-[13.5px]">
                Only the extension code itself requires downloading a newer
                ZIP and reloading it. Everything else updates in place.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-2xl p-4 sm:p-6 lg:p-8">
              <div
                className="absolute inset-0 rounded-2xl border border-white/[0.08] bg-card [-webkit-mask-image:linear-gradient(to_left,transparent,black_52%)] [mask-image:linear-gradient(to_left,transparent,black_52%)] sm:[-webkit-mask-image:linear-gradient(to_left,transparent,black_18%)] sm:[mask-image:linear-gradient(to_left,transparent,black_18%)]"
                aria-hidden
              />
              <div className="relative flex items-center justify-between border-b border-white/[0.06] pb-5">
                <div>
                  <p className="text-[13px] text-white/40">Sync now</p>
                  <p className="mt-1 text-[13px] text-white/30">
                    Last sync · 1:47 AM (8 days ago)
                  </p>
                </div>
                <span className="rounded-full bg-warning/15 px-2.5 py-1 text-[11px] font-medium text-warning">
                  Stale
                </span>
              </div>
              <div className="relative divide-y divide-white/[0.06]">
                {rows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-3 sm:py-4">
                    <div className="flex items-start gap-3">
                      <row.icon size={16} className="mt-0.5 shrink-0 text-white/45" />
                      <div>
                        <p className="text-[12.5px] font-medium text-white sm:text-[14px]">{row.label}</p>
                        <p className="mt-0.5 text-[11px] leading-snug text-white/40 sm:text-[12.5px]">{row.detail}</p>
                      </div>
                    </div>
                    <span className="shrink-0 pl-3 text-[11.5px] font-medium text-white/70 sm:pl-4 sm:text-[13px]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
