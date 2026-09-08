import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRelease, RELEASES_URL } from "@/lib/release";
import { LiveDownloads } from "@/components/ui/LiveDownloads";

export async function DownloadSection() {
  // Version, size, date and the download count all come from the GitHub
  // release. If GitHub is unreachable the page still renders and the buttons
  // fall back to the releases listing.
  const release = await getRelease();
  const href = release?.assetUrl ?? RELEASES_URL;

  // `pixel` renders the value in the Silkscreen display face; `node` lets a
  // cell render a component instead of static text.
  const meta: {
    label: string;
    value?: string;
    pixel?: boolean;
    node?: React.ReactNode;
  }[] = [
    { label: "Latest version", value: release?.version ?? "1.0.0" },
    { label: "Platform", value: "Chrome / Edge" },
    { label: "File size", value: release?.sizeLabel ?? "—" },
    { label: "Last updated", value: release?.updatedLabel ?? "—" },
    {
      label: "Downloads",
      node: <LiveDownloads initial={release?.downloads ?? null} />,
    },
  ];

  return (
    <section
      id="download"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-28 lg:py-32"
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
          <p className="font-display text-[10px] tracking-wide text-white/40 sm:text-[11px]">Get Phend</p>
          <h2 className="mt-3 text-[22px] font-semibold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
            Download Phend
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-white/55 sm:mt-4 sm:text-base">
            Same build works for both browsers. Unzip it, then load it as an
            unpacked extension.
          </p>
          <p className="mt-4 text-[12px] text-white/35 sm:mt-5 sm:text-sm">
            That&rsquo;s everything. Two minutes to install. No account, no
            sign-up, no tracking.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto mt-10 max-w-3xl sm:mt-12">
          <div
            className="absolute -inset-8 -z-10 rounded-[40px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)] blur-2xl"
            aria-hidden
          />
          <div
            className="relative overflow-hidden rounded-2xl p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] backdrop-blur-2xl backdrop-saturate-150 sm:p-8 lg:p-10"
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

            <div className="relative flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <Badge tone="warning">Beta build</Badge>
              <span className="break-all text-[10.5px] text-white/35 sm:break-normal sm:text-xs">
                {release?.assetName ?? "dist.zip"} · unpacked extension
              </span>
            </div>

            <div className="relative mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
              <a
                href={href}
                // No target="_blank": GitHub serves the asset with
                // Content-Disposition: attachment, so a plain click downloads
                // it in place. A new tab would flash open and shut, which
                // reads as "nothing happened".
                rel="noreferrer"
                className="group relative flex items-center gap-3 sm:gap-4 overflow-hidden rounded-xl border border-white/[0.1] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] sm:p-5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_10px_30px_-12px_rgba(0,0,0,0.9)]"
              >
                <span className="relative h-7 w-7 shrink-0 sm:h-9 sm:w-9">
                  <Image src="/icons/browsers/chrome.png" alt="" fill sizes="36px" className="object-contain" />
                </span>
                <div className="flex-1 text-left">
                  <p className="text-[13.5px] font-medium text-white sm:text-[15px]">Google Chrome</p>
                  <p className="text-[11px] text-white/40 sm:text-xs">Download ZIP</p>
                </div>
                <Download
                  size={16}
                  className="text-white/30 transition-colors group-hover:text-white"
                />
              </a>

              <a
                href={href}
                // No target="_blank": GitHub serves the asset with
                // Content-Disposition: attachment, so a plain click downloads
                // it in place. A new tab would flash open and shut, which
                // reads as "nothing happened".
                rel="noreferrer"
                className="group relative flex items-center gap-3 sm:gap-4 overflow-hidden rounded-xl border border-white/[0.1] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] p-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] sm:p-5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_10px_30px_-12px_rgba(0,0,0,0.9)]"
              >
                <span className="relative h-7 w-7 shrink-0 sm:h-9 sm:w-9">
                  <Image src="/icons/browsers/edge.png" alt="" fill sizes="36px" className="object-contain" />
                </span>
                <div className="flex-1 text-left">
                  <p className="text-[13.5px] font-medium text-white sm:text-[15px]">Microsoft Edge</p>
                  <p className="text-[11px] text-white/40 sm:text-xs">Download ZIP</p>
                </div>
                <Download
                  size={16}
                  className="text-white/30 transition-colors group-hover:text-white"
                />
              </a>
            </div>

            <div className="relative mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.05] sm:mt-8 lg:grid-cols-5">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(255,255,255,0.012))] px-3 py-3 backdrop-blur-md last:col-span-2 sm:px-4 sm:py-4 lg:last:col-span-1"
                >
                  <p className="text-[9.5px] uppercase tracking-wide text-white/35 sm:text-[11px]">
                    {item.label}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-[12.5px] font-medium text-white sm:text-sm",
                      item.pixel && "font-display text-[15px] tracking-wide"
                    )}
                  >
                    {item.node ?? item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
