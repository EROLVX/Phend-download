import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Download } from "lucide-react";

const meta = [
  { label: "Latest version", value: "1.0.0" },
  { label: "Platform", value: "Chrome / Edge" },
  { label: "File size", value: "—" },
  { label: "Last updated", value: "—" },
];

export function DownloadSection() {
  return (
    <section id="download" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-white/40">Get Phend</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Download Phend
          </h2>
          <p className="mt-4 text-white/55">
            Same build works for both browsers. Unzip it, then load it as an
            unpacked extension.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-2xl border border-white/[0.08] bg-card p-8 sm:p-10">
            <div className="flex items-center justify-between">
              <Badge tone="warning">Beta build</Badge>
              <span className="text-xs text-white/35">dist.zip · unpacked extension</span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href="/downloads/phend.zip"
                download
                className="group flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04]"
              >
                <span className="relative h-9 w-9 shrink-0">
                  <Image src="/icons/browsers/chrome.png" alt="" fill sizes="36px" className="object-contain" />
                </span>
                <div className="flex-1 text-left">
                  <p className="text-[15px] font-medium text-white">Google Chrome</p>
                  <p className="text-xs text-white/40">Download ZIP</p>
                </div>
                <Download
                  size={16}
                  className="text-white/30 transition-colors group-hover:text-white"
                />
              </a>

              <a
                href="/downloads/phend.zip"
                download
                className="group flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04]"
              >
                <span className="relative h-9 w-9 shrink-0">
                  <Image src="/icons/browsers/edge.png" alt="" fill sizes="36px" className="object-contain" />
                </span>
                <div className="flex-1 text-left">
                  <p className="text-[15px] font-medium text-white">Microsoft Edge</p>
                  <p className="text-xs text-white/40">Download ZIP</p>
                </div>
                <Download
                  size={16}
                  className="text-white/30 transition-colors group-hover:text-white"
                />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label} className="bg-card px-4 py-4">
                  <p className="text-[11px] uppercase tracking-wide text-white/35">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
