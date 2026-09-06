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
    <section
      id="download"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32"
    >
      {/* Flashlight: a soft white beam falling from the top edge of the section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px]" aria-hidden>
        {/* the light source itself — a bright hairline across the top edge */}
        <div className="absolute left-1/2 top-0 h-px w-[760px] max-w-[90%] -translate-x-1/2 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.75),transparent)]" />
        {/* wide ambient wash */}
        <div
          className="absolute left-1/2 top-0 h-[460px] w-[1100px] -translate-x-1/2 blur-[70px]"
          style={{
            background:
              "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(255,255,255,0.18), rgba(255,255,255,0.05) 45%, transparent 72%)",
          }}
        />
        {/* tighter core beam */}
        <div
          className="absolute left-1/2 top-0 h-[300px] w-[560px] -translate-x-1/2 blur-[50px]"
          style={{
            background:
              "radial-gradient(ellipse 45% 100% at 50% 0%, rgba(255,255,255,0.22), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-white/40">Get Phend</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Download Phend
          </h2>
          <p className="mt-4 text-white/55">
            Same build works for both browsers. Unzip it, then load it as an
            unpacked extension.
          </p>
          <p className="mt-5 text-sm text-white/35">
            That&rsquo;s everything. Two minutes to install &mdash; no account, no
            sign-up, no tracking.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto mt-12 max-w-3xl">
          <div
            className="absolute -inset-8 -z-10 rounded-[40px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)] blur-2xl"
            aria-hidden
          />
          <div
            className="relative overflow-hidden rounded-2xl p-8 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] backdrop-blur-2xl backdrop-saturate-150 sm:p-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.035) 38%, rgba(255,255,255,0.012) 100%)",
            }}
          >
            {/* Crystal edge: bright at the top, dissolving toward the bottom */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl border border-white/25"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
              }}
              aria-hidden
            />
            {/* Glossy sheen across the upper half */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 40%, transparent 100%)",
              }}
              aria-hidden
            />
            {/* Specular highlight along the top edge */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.7) 50%, transparent)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.4]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
                maskImage:
                  "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 75%)",
              }}
              aria-hidden
            />

            <div className="relative flex items-center justify-between">
              <Badge tone="warning">Beta build</Badge>
              <span className="text-xs text-white/35">dist.zip · unpacked extension</span>
            </div>

            <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href="/downloads/phend.zip"
                download
                className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/[0.1] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_10px_30px_-12px_rgba(0,0,0,0.9)]"
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
                className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/[0.1] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_10px_30px_-12px_rgba(0,0,0,0.9)]"
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

            <div className="relative mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label} className="bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(255,255,255,0.012))] px-4 py-4 backdrop-blur-md">
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
