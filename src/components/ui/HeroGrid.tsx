const COLS = 6;
const ROWS = 9;
const CELL = 92;
const D = 20; // tab/socket depth
const A = 32; // bump span start
const B = 60; // bump span end
const MID = (A + B) / 2;

// Deterministic scattered mask: keep ~60% of cells so the sheet reads as
// an accent, not a solid block.
function visible(r: number, c: number) {
  return (r * 7 + c * 13) % 5 < 3;
}

function piecePath(r: number, c: number) {
  const flatTop = r === 0 || !visible(r - 1, c);
  const flatRight = c === COLS - 1 || !visible(r, c + 1);
  const flatBottom = r === ROWS - 1 || !visible(r + 1, c);
  const flatLeft = c === 0 || !visible(r, c - 1);

  return `M0,0 ${flatTop ? `L${CELL},0` : `L${A},0 C${A},${D} ${(A + MID) / 2},${D} ${MID},${D} C${(MID + B) / 2},${D} ${B},${D} ${B},0 L${CELL},0`}
    ${flatRight ? `L${CELL},${CELL}` : `L${CELL},${A} C${CELL + D},${A} ${CELL + D},${(A + MID) / 2} ${CELL + D},${MID} C${CELL + D},${(MID + B) / 2} ${CELL + D},${B} ${CELL},${B} L${CELL},${CELL}`}
    ${flatBottom ? `L0,${CELL}` : `L${B},${CELL} C${B},${CELL + D} ${(MID + B) / 2},${CELL + D} ${MID},${CELL + D} C${(A + MID) / 2},${CELL + D} ${A},${CELL + D} ${A},${CELL} L0,${CELL}`}
    ${flatLeft ? `L0,0` : `L0,${B} C${-D},${B} ${-D},${(MID + B) / 2} ${-D},${MID} C${-D},${(A + MID) / 2} ${-D},${A} 0,${A} L0,0`}
    Z`;
}

export function HeroGrid() {
  const width = COLS * CELL;
  const height = ROWS * CELL;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-start justify-end overflow-hidden">
      <div className="relative mt-16 mr-[-24px]">
        <div
          className="animate-glow-breathe absolute -left-40 -top-40 h-[460px] w-[620px] blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.16), rgba(255,255,255,0.05) 45%, transparent 72%)",
          }}
        />
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ perspective: 800 }}
          aria-hidden
        >
          {Array.from({ length: ROWS }).map((_, r) =>
            Array.from({ length: COLS }).map((_, c) => {
              if (!visible(r, c)) return null;
              return (
                <g key={`${r}-${c}`} transform={`translate(${c * CELL} ${r * CELL})`}>
                  <path
                    d={piecePath(r, c)}
                    className="pointer-events-auto cursor-pointer fill-white/[0.02] stroke-white/[0.14] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-box:fill-box] [transform-origin:center] hover:-translate-y-3 hover:scale-[1.1] hover:[rotate:1_0_0_-12deg] hover:fill-white/[0.14] hover:stroke-white/80 hover:drop-shadow-[0_20px_26px_rgba(255,255,255,0.3)]"
                    strokeWidth="1.4"
                  />
                </g>
              );
            })
          )}
        </svg>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_82%_35%,transparent_35%,rgba(0,0,0,0.92)_100%)]" />
    </div>
  );
}
