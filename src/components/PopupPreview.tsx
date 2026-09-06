import { PhendMark } from "@/components/ui/PhendMark";
import { Settings, ShieldCheck } from "lucide-react";

export function PopupPreview() {
  return (
    <div className="relative w-full max-w-[360px]">
      <div
        className="absolute -inset-6 -z-10 rounded-[32px] bg-success/20 opacity-40 blur-3xl"
        aria-hidden
      />
      <div className="animate-float-slow rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/95 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhendMark className="h-5 w-5 text-white" />
            <span className="text-sm font-semibold">Phend</span>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-md text-white/50">
            <Settings size={15} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2.5">
          <span className="text-[13px] text-white/70">Protection</span>
          <span className="inline-flex h-5 w-9 items-center rounded-full bg-success px-0.5">
            <span className="h-3.5 w-3.5 translate-x-4 rounded-full bg-white shadow" />
          </span>
        </div>

        <div className="mt-4 rounded-xl border border-success/40 bg-success/[0.06] p-4">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-success">
            <ShieldCheck size={11} /> Safe
          </div>
          <p className="truncate text-[15px] font-semibold text-white">vercel.com</p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-white/50">
            <span>Confidence</span>
            <span className="text-white/80">High</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full w-full rounded-full bg-success" />
          </div>
          <div className="mt-3 inline-flex rounded-full bg-info/15 px-2.5 py-1 text-[10.5px] font-medium text-info">
            Trusted domain match
          </div>
        </div>

        <button className="mt-3 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2.5 text-[13px] font-medium text-white/80">
          View analysis
        </button>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-wider text-white/35">
          Session statistics
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            { value: "2", label: "Scans today" },
            { value: "26", label: "Threats blocked" },
            { value: "57", label: "Sites trusted" },
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

        <div className="mt-4 flex items-center justify-between text-[11px]">
          <span className="text-white/40">Last sync: 8 days ago</span>
          <span className="rounded-full bg-warning/15 px-2 py-0.5 font-medium text-warning">
            Stale
          </span>
        </div>
      </div>
    </div>
  );
}
