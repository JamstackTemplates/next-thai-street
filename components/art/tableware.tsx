import type { ReactNode } from 'react';
// Everyday Thai tableware & garnishes, drawn in a rich layered street-stall style.

/** The classic rooster motif from a melamine/porcelain rooster bowl (ชามตราไก่). */
export function Rooster() {
  return (
    <g>
      <path d="M-14 4c-4-10-2-20 4-24-1 6 1 10 4 12M-12 2c-8-6-10-14-6-20 1 6 4 9 8 10" className="s2 nf" strokeWidth="2.4" />
      <ellipse cx="0" cy="4" rx="12" ry="8" className="f-ink" />
      <circle cx="10" cy="-6" r="4.5" className="f-ink" />
      <path d="M7 -10l1.5-3 1.5 2 1.5-3 1.5 2.5 1.5-1.5-.5 3.5z" className="f-red" />
      <path d="M14 -6l4 1-4 1.5z" className="f-yellow" />
      <path d="M12 -2c1 2 1 4-1 4" className="f-red" />
      <path d="M-2 11l-1 7M3 11l1 7" className="nf" stroke="#e58a2e" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  );
}

/** Banana leaves and a pink peony, the other half of the rooster-bowl decoration. */
function BowlFlora() {
  return (
    <g>
      <path d="M0 10c-2-14 4-24 14-28-2 10-6 20-14 28z" className="f-leaf" />
      <path d="M0 10c6-10 16-14 26-12-6 8-16 12-26 12z" className="f-green" />
      <circle cx="-8" cy="4" r="5.5" fill="#e8669a" />
      <circle cx="-8" cy="4" r="2.2" fill="#ffd1e2" />
    </g>
  );
}

/**
 * A rooster bowl seen from the side, with `fill` showing at the rim (curry, broth...).
 * Origin is the centre of the rim; width ≈ 2 × r.
 */
export function RoosterBowl({ r = 60, fill = 'f-curry-green', children }: { r?: number; fill?: string; children?: ReactNode }) {
  const h = r * 0.85;
  return (
    <g>
      <ellipse cx="0" cy={h + 6} rx={r * 0.92} ry={r * 0.13} className="f-shadow" />
      <path d={`M${-r} 0Q${-r * 0.92} ${h} 0 ${h}Q${r * 0.92} ${h} ${r} 0Z`} className="f-white s" />
      <path d={`M${-r * 0.36} ${h - 1}h${r * 0.72}l${-r * 0.06} ${r * 0.12}h${-r * 0.6}z`} className="f-white s2" />
      <g transform={`translate(${-r * 0.35} ${h * 0.5}) scale(${r / 70})`}><Rooster /></g>
      <g transform={`translate(${r * 0.42} ${h * 0.45}) scale(${r / 80})`}><BowlFlora /></g>
      <path d={`M${-r * 0.96} ${h * 0.12}Q0 ${h * 0.3} ${r * 0.96} ${h * 0.12}`} className="st-red nf" strokeWidth={r / 22} />
      <ellipse cx="0" cy="0" rx={r} ry={r * 0.22} className="f-white s" />
      <ellipse cx="0" cy="1" rx={r * 0.9} ry={r * 0.17} className={fill} />
      {children}
    </g>
  );
}

/** A white enamel plate with a blue rim, in three-quarter view. Origin at the plate centre. */
export function EnamelPlate({ rx = 90, ry = 30 }: { rx?: number; ry?: number }) {
  return (
    <g>
      <ellipse cx="4" cy={ry * 0.35 + 4} rx={rx} ry={ry} className="f-shadow" />
      <ellipse cx="0" cy="0" rx={rx} ry={ry} className="f-white s" />
      <ellipse cx="0" cy="0" rx={rx - 4} ry={ry - 2} className="nf st-blue" strokeWidth="5" />
      <ellipse cx="0" cy="1" rx={rx * 0.74} ry={ry * 0.68} fill="#f4efe2" />
    </g>
  );
}

/** A small chilli pod, pointing down-left, centred on 0,0. */
export function Chilli({ className = 'f-red' }: { className?: string }) {
  return (
    <g>
      <path d="M-9 -2c5-7 14-8 19-3-4 0-6 4-9 8-4 5-10 4-10-5z" className={`${className} s2`} />
      <path d="M8 -6c2-3 4-4 6-3" className="s2 nf" stroke="#3d8a1f" />
    </g>
  );
}

/** Holy basil leaf. */
export function Basil({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return <path d="M0 0c4-6 12-6 16 0-4 4-12 6-16 0z" className="f-leaf s2" transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />;
}

/** Fresh lime wedge. */
export function LimeWedge({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M-12 0A12 12 0 0 0 12 0Z" fill="#5da62a" className="s2" />
      <path d="M-9 0A9 9 0 0 0 9 0Z" fill="#dff099" />
      <path d="M0 0v8M-4 1l4 6M4 1l-4 6" stroke="#b6d96a" strokeWidth="1.2" />
    </g>
  );
}

/** Fried egg (khai dao), crisp golden-frilly edge and runny yellow yolk. */
export function FriedEgg({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 2c-4-10 8-16 14-14 4-8 18-8 22-2 10-4 22 2 20 10 6 4 2 14-8 14-6 6-22 6-28 0-10 2-22-2-20-8z" fill="#c98a3a" className="s2" />
      <path d="M-26 2c-2-8 8-12 13-10 4-6 15-6 19-1 8-3 18 2 16 8 4 3 1 10-7 10-5 5-18 5-23 0-8 1-18-2-18-7z" className="f-white" />
      <ellipse cx="2" cy="1" rx="10" ry="7" className="f-egg s2" />
      <ellipse cx="-1" cy="-1.5" rx="3" ry="1.8" className="f-white" opacity=".85" />
    </g>
  );
}

/** Steam curls; animated by the .steam class. */
export function Steam({ x, y, gap = 20, n = 3 }: { x: number; y: number; gap?: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M${x + i * gap} ${y}c-10-12 10-18 0-30s8-18 2-26`} className="nf steam" stroke="#f4e6c8" strokeWidth="3.5" strokeLinecap="round" opacity=".75" />
      ))}
    </g>
  );
}
