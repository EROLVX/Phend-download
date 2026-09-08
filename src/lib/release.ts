const REPO = "EROLVX/Phend-download";
const RELEASES_PAGE = `https://github.com/${REPO}/releases`;

export type ReleaseInfo = {
  version: string;
  assetName: string;
  assetUrl: string;
  sizeLabel: string;
  updatedLabel: string;
  /** Summed across every release, so it never resets on a new version. */
  downloads: number;
};

type GhAsset = {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
};
type GhRelease = {
  tag_name: string;
  published_at: string;
  draft: boolean;
  assets: GhAsset[];
};

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

function formatDate(iso: string) {
  // Fixed locale and UTC so the server-rendered string is deterministic.
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/**
 * Reads the latest release straight from GitHub. GitHub already counts asset
 * downloads, so this replaces a database, an API route, and the rate limiting
 * that would come with them.
 *
 * Unauthenticated API calls are capped at 60/hour, so this is cached for five
 * minutes rather than fetched per visitor (at most 12 calls/hour) — that also means there is no
 * per-request work for anyone to flood.
 */
export async function getRelease(): Promise<ReleaseInfo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;

    const releases: GhRelease[] = await res.json();
    if (!Array.isArray(releases)) return null;

    const published = releases.filter((r) => !r.draft);
    const isZip = (a: GhAsset) => a.name.toLowerCase().endsWith(".zip");

    // Newest release that actually has a build attached. Pre-releases count:
    // the beta is flagged as one, and /releases/latest would skip it.
    const current = published.find((r) => r.assets.some(isZip));
    const asset = current?.assets.find(isZip);
    if (!current || !asset) return null;

    const downloads = published.reduce(
      (sum, r) => sum + r.assets.filter(isZip).reduce((s, a) => s + a.download_count, 0),
      0
    );

    return {
      version: current.tag_name.replace(/^v/i, ""),
      assetName: asset.name,
      assetUrl: asset.browser_download_url,
      sizeLabel: formatSize(asset.size),
      updatedLabel: formatDate(current.published_at),
      downloads,
    };
  } catch {
    // Never let a GitHub outage break the page; the caller falls back.
    return null;
  }
}

export const RELEASES_URL = RELEASES_PAGE;
