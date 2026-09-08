"use client";

import { useEffect, useRef, useState } from "react";
import { REPO } from "@/lib/release";
import { cn } from "@/lib/utils";

// GitHub's unauthenticated API allows 60 requests/hour per IP. Polling every
// two minutes uses 30 of those, leaving the visitor plenty of headroom.
const POLL_MS = 120_000;

type GhAsset = { name: string; download_count: number };
type GhRelease = { draft: boolean; assets: GhAsset[] };

async function fetchTotal(signal: AbortSignal) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/releases`, {
    headers: { Accept: "application/vnd.github+json" },
    cache: "no-store",
    signal,
  });
  if (!res.ok) return null;
  const releases: GhRelease[] = await res.json();
  if (!Array.isArray(releases)) return null;
  return releases
    .filter((r) => !r.draft)
    .reduce(
      (sum, r) =>
        sum +
        r.assets
          .filter((a) => a.name.toLowerCase().endsWith(".zip"))
          .reduce((s, a) => s + a.download_count, 0),
      0
    );
}

/**
 * Shows the download count live. The server passes the cached value so the
 * number is correct on first paint and without JS; this then polls GitHub
 * directly from the browser and updates in place.
 */
export function LiveDownloads({ initial }: { initial: number | null }) {
  const [count, setCount] = useState<number | null>(initial);
  const [bumped, setBumped] = useState(false);
  const latest = useRef(initial);

  useEffect(() => {
    const controller = new AbortController();

    const tick = async () => {
      if (document.hidden) return; // don't burn quota on a background tab
      try {
        const total = await fetchTotal(controller.signal);
        if (total === null || total === latest.current) return;
        latest.current = total;
        setCount(total);
        setBumped(true);
        window.setTimeout(() => setBumped(false), 900);
      } catch {
        // offline or rate-limited: keep showing the last known number
      }
    };

    tick();
    const timer = setInterval(tick, POLL_MS);
    const onVisible = () => {
      if (!document.hidden) tick();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      controller.abort();
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "font-display text-[15px] tracking-wide transition-colors duration-300",
          bumped ? "text-success" : "text-white"
        )}
      >
        {count === null ? "—" : count.toLocaleString("en-US")}
      </span>
      <span
        className="relative flex h-1.5 w-1.5 shrink-0"
        aria-hidden
        title="Updating live"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
      </span>
    </span>
  );
}
