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
    detail: "Read-only — managed centrally from the admin dashboard.",
    value: "Vexa-1 Beta · v1.0",
  },
];

export function AutoUpdates() {
  return (
    <section id="guide" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-medium text-white/40">Staying up to date</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Detection updates itself.
              <br />
              The extension doesn&apos;t have to.
            </h2>
            <p className="mt-5 max-w-md text-white/55">
              Trusted domains, the blocklist, detection rules, and the ML
              model all sync from the cloud automatically. Hit{" "}
              <span className="text-white/80">Sync now</span> in Settings any
              time, or let it happen on its own.
            </p>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-info/20 bg-info/[0.06] p-4">
              <Info size={16} className="mt-0.5 shrink-0 text-info" />
              <p className="text-[13.5px] leading-relaxed text-white/60">
                Only the extension code itself requires downloading a newer
                ZIP and reloading it. Everything else updates in place.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-2xl p-6 sm:p-8">
              <div
                className="absolute inset-0 rounded-2xl border border-white/[0.08] bg-card [-webkit-mask-image:linear-gradient(to_left,transparent,black_18%)] [mask-image:linear-gradient(to_left,transparent,black_18%)]"
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
                  <div key={row.label} className="flex items-center justify-between py-4">
                    <div className="flex items-start gap-3">
                      <row.icon size={16} className="mt-0.5 shrink-0 text-white/45" />
                      <div>
                        <p className="text-[14px] font-medium text-white">{row.label}</p>
                        <p className="mt-0.5 text-[12.5px] text-white/40">{row.detail}</p>
                      </div>
                    </div>
                    <span className="shrink-0 pl-4 text-[13px] font-medium text-white/70">
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
