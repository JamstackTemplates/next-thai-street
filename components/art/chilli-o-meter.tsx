import type { CSSProperties } from 'react';
import { Chilli } from './tableware';

// Market-scale geometry: the dial centre is the needle pivot (keep in sync with .gauge-needle in CSS).
const CX = 160;
const CY = 148;

function polar(r: number, degrees: number): [number, number] {
  const rad = (degrees * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY - r * Math.sin(rad)];
}

function segment(index: number, outer = 90, inner = 56): string {
  const a0 = 180 - index * 36;
  const a1 = 180 - (index + 1) * 36;
  const [x0, y0] = polar(outer, a0);
  const [x1, y1] = polar(outer, a1);
  const [x2, y2] = polar(inner, a1);
  const [x3, y3] = polar(inner, a0);
  const f = (n: number) => n.toFixed(2);
  return `M${f(x0)} ${f(y0)}A${outer} ${outer} 0 0 1 ${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}A${inner} ${inner} 0 0 0 ${f(x3)} ${f(y3)}Z`;
}

/** Needle angle (clockwise from pointing left) for a level, or for "any heat". */
export function needleAngle(level: number | null): number {
  return level === null ? 174 : (level + 0.5) * 36;
}

/**
 * The heat scale: a vintage red-lacquer & brass market scale (ตาชั่ง) whose dial runs from ไม่เผ็ด (0) to เผ็ดมากๆ (4).
 * Decorative: the levels are always also written out in text beside it.
 */
export function ChilliOMeter({ level, sweep = false, className = '', compact = false }: {
  /** Level the needle points at, or null for "any heat". */
  level: number | null;
  /** Swing in from 0 when scrolled into view (needs a [data-reveal] ancestor). */
  sweep?: boolean;
  className?: string;
  /** Drop the weighing pan and the label plate, for small sizes. */
  compact?: boolean;
}) {
  const style = { '--needle': `${needleAngle(level)}deg` } as CSSProperties;
  return (
    <svg viewBox={compact ? '30 40 260 222' : '0 0 320 268'} className={`art ${className}`} aria-hidden="true" focusable="false">
      {!compact && <>
        {/* brass weighing pan with fresh chillies */}
        <rect x="148" y="22" width="24" height="26" fill="url(#ss-brass)" className="s2" />
        <ellipse cx="160" cy="24" rx="124" ry="15" fill="url(#ss-brass)" className="s" />
        <ellipse cx="160" cy="21" rx="108" ry="9" fill="#a6823e" />
        <g transform="translate(116 17) rotate(-14) scale(.95)"><Chilli className="f-leaf" /></g>
        <g transform="translate(148 14) rotate(12) scale(.95)"><Chilli className="heat-3" /></g>
        <g transform="translate(182 15) rotate(-25) scale(.95)"><Chilli className="f-red" /></g>
        <g transform="translate(212 18) rotate(18) scale(.85)"><Chilli className="f-yellow" /></g>
      </>}
      {/* rubber feet & red-lacquer enamel body */}
      <rect x="42" y="246" width="42" height="12" rx="4" className="f-ink" />
      <rect x="236" y="246" width="42" height="12" rx="4" className="f-ink" />
      <rect x="30" y="44" width="260" height="208" rx="34" fill="#b81818" className="s" />
      <rect x="38" y="52" width="244" height="192" rx="28" className="nf" stroke="#ffd23f" strokeWidth="2" opacity=".6" />
      {/* brass rivets on body corners */}
      {[[50, 64], [270, 64], [50, 232], [270, 232]].map(([rx, ry]) => (
        <circle key={`${rx}-${ry}`} cx={rx} cy={ry} r="4" fill="url(#ss-brass)" className="s2" />
      ))}
      {/* dial */}
      <circle cx={CX} cy={CY} r="105" fill="url(#ss-brass)" className="s" />
      <circle cx={CX} cy={CY} r="96" className="f-paper s2" />
      {[0, 1, 2, 3, 4].map(i => <path key={i} d={segment(i)} className={`heat-${i} s2`} />)}
      {Array.from({ length: 21 }, (_, i) => {
        const a = 180 - i * 9;
        const [x0, y0] = polar(92, a);
        const [x1, y1] = polar(i % 2 ? 86 : 82, a);
        return <path key={i} d={`M${x0} ${y0}L${x1} ${y1}`} className="s2 nf" />;
      })}
      {[0, 1, 2, 3, 4].map(i => {
        const [x, y] = polar(73, 180 - (i + 0.5) * 36);
        return <text key={`n${i}`} x={x} y={y + 6} textAnchor="middle" className="art-sign" fontSize="17" fill={i === 1 || i === 2 ? '#1e1410' : '#fff'}>{i}</text>;
      })}
      <text x={CX} y={CY + 42} textAnchor="middle" className="art-sign" fontSize="15" fill="#9c1616">ระดับความเผ็ด</text>
      <path d={`M${CX - 46} ${CY + 52}H${CX + 46}`} stroke="#c99c45" strokeWidth="2.2" />
      {/* subtle glass reflection arc */}
      <path d={`M${CX - 76} ${CY - 48}A88 88 0 0 1 ${CX + 46} ${CY - 78}`} className="nf" stroke="#fff" strokeWidth="4" opacity=".45" strokeLinecap="round" />
      {/* needle */}
      <g className={`gauge-needle ${sweep ? 'gauge-needle--sweep' : ''}`} style={style}>
        <path d={`M${CX + 14} ${CY - 3}L${CX - 88} ${CY}L${CX + 14} ${CY + 3}Z`} className="f-ink" />
      </g>
      <circle cx={CX} cy={CY} r="10.5" fill="url(#ss-brass)" className="s2" />
      <circle cx={CX} cy={CY} r="3.5" className="f-ink" />
    </svg>
  );
}

/**
 * Five chillies for dish rows: chillies 0..level are filled in their heat colours.
 * Carries the accessible text itself.
 */
export function ChilliPods({ level, label, adjustable }: { level: number; label: string; adjustable: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5" role="img" aria-label={`Chilli level ${level} of 4, ${label}${adjustable ? ', can be made a level milder or hotter' : ''}`}>
      <svg viewBox="0 0 120 26" className="art h-5 w-auto" aria-hidden="true" focusable="false">
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i} transform={`translate(${12 + i * 24} 14) rotate(-20)`}>
            {i <= level ? <Chilli className={`heat-${i}`} /> : <path d="M-9 -2c5-7 14-8 19-3-4 0-6 4-9 8-4 5-10 4-10-5z" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".4" />}
          </g>
        ))}
      </svg>
      {adjustable ? <span aria-hidden="true" className="text-[.8rem] font-bold" title="Adjustable">↕</span> : null}
    </span>
  );
}
