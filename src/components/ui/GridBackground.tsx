export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas">
      <div className="absolute inset-0 bg-grid" />
      <div
        className="glow-orb absolute left-1/2 top-[-10%] h-[560px] w-[860px] -translate-x-1/2 bg-white/[0.06]"
        aria-hidden
      />
      <div
        className="glow-orb absolute right-[-10%] top-[30%] h-[420px] w-[420px] bg-success/[0.05]"
        aria-hidden
      />
      <div
        className="glow-orb absolute left-[-8%] bottom-[5%] h-[380px] w-[380px] bg-accent/[0.05]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-noise mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.75)_100%)]" />
    </div>
  );
}
