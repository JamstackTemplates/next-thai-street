import type { JSX } from 'react';
import type { Motif } from '../../content/menu';
import { Basil, Chilli, EnamelPlate, FriedEgg, LimeWedge, RoosterBowl, Steam } from './tableware';

/** Satay skewers on a woven bamboo & brass platter with peanut sauce and cucumber relish. */
function Skewers() {
  return (
    <g>
      <g transform="translate(112 150)">
        <ellipse cx="4" cy="12" rx="104" ry="34" className="f-shadow" />
        <ellipse cx="0" cy="0" rx="104" ry="36" fill="url(#ss-brass)" className="s" />
        <ellipse cx="0" cy="2" rx="90" ry="28" fill="url(#ss-bamboo)" className="s2" />
      </g>
      {[0, 1, 2, 3].map(i => (
        <g key={i} transform={`translate(${32 + i * 14} ${166 - i * 14}) rotate(-14)`}>
          <path d="M-8 0H150" className="nf" stroke="#d4aa6a" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M-8 0H150" className="s2 nf" opacity=".4" />
          {[16, 42, 68, 94].map(dx => (
            <g key={dx}>
              <rect x={dx} y="-9" width="24" height="18" rx="7" className="f-satay s2" />
              <path d={`M${dx + 5} -3h12M${dx + 7} 3h10`} className="nf" stroke="#451c06" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          ))}
        </g>
      ))}
      <g transform="translate(184 92)">
        <ellipse cx="0" cy="16" rx="30" ry="9" className="f-shadow" />
        <path d="M-28 0q2 18 28 18t28-18z" className="f-white s2" />
        <ellipse cx="0" cy="0" rx="28" ry="8" className="f-white s2" />
        <ellipse cx="0" cy="1" rx="24" ry="6" fill="#c97a2c" />
        <circle cx="-6" cy="0" r="2" fill="#f5d59c" />
        <circle cx="5" cy="1" r="2" fill="#f5d59c" />
      </g>
      <g transform="translate(40 92)">
        <path d="M-24 0q2 16 24 16t24-16z" className="f-white s2" />
        <ellipse cx="0" cy="0" rx="24" ry="7" className="f-white s2" />
        <ellipse cx="0" cy="1" rx="20" ry="5" fill="#f3e9c9" />
        <circle cx="-7" cy="0" r="4" fill="#a8c95a" className="s2" />
        <circle cx="4" cy="1" r="4" fill="#a8c95a" className="s2" />
        <circle cx="-1" cy="-2" r="2" className="f-red" />
      </g>
      <Steam x={74} y={118} gap={34} n={2} />
    </g>
  );
}

/** Krapow: jasmine rice, holy-basil chicken and a crisp fried egg on a blue-rim enamel plate. */
function Wok() {
  return (
    <g>
      <g transform="translate(112 140)">
        <EnamelPlate rx={104} ry={40} />
        <path d="M-70 4c0-32 40-46 70-40s56 16 52 40c-34 14-86 14-122 0z" className="f-rice s2" />
        <path d="M-6 -2c-6-22 22-32 48-24s32 22 24 30c-24 8-52 6-72-6z" fill="#7a4524" className="s2" />
        <path d="M6 -10c6-2 10 2 16 0M24 -16c4-2 8 1 12-1" className="nf" stroke="#b06d3a" strokeWidth="2.5" strokeLinecap="round" />
        <Basil x={24} y={-28} r={-15} />
        <Basil x={46} y={-18} r={30} />
        <Basil x={8} y={-12} r={60} s={.8} />
        <g transform="translate(58 -30) rotate(20) scale(.65)"><Chilli /></g>
        <FriedEgg x={-30} y={-24} s={1.05} />
        <LimeWedge x={-64} y={8} r={18} s={.75} />
      </g>
      <path d="M200 70l14 110M212 68l10 112" className="s nf" stroke="#c99c45" strokeWidth="4" />
      <ellipse cx="200" cy="66" rx="8" ry="12" fill="url(#ss-brass)" className="s2" />
      <Steam x={84} y={84} gap={26} n={2} />
    </g>
  );
}

/** Green curry in a rooster bowl, with a brass ladle and steam. */
function Pot() {
  return (
    <g>
      <g transform="translate(115 98)">
        <RoosterBowl r={84} fill="f-curry-green">
          <path d="M-40 0c6-4 12 2 18-2M8 2c6-4 12 2 18-2M-12 6c4-2 8 1 12-1" className="nf" stroke="#d8e6a8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-22" cy="-4" r="5" fill="#f2efe2" className="s2" />
          <circle cx="16" cy="-6" r="5" fill="#f2efe2" className="s2" />
          <Basil x={34} y={-6} r={-10} s={.9} />
          <g transform="translate(-48 -2) scale(.6)"><Chilli /></g>
        </RoosterBowl>
      </g>
      <path d="M150 96L196 16" className="s4 nf" stroke="#c99c45" strokeWidth="6" />
      <path d="M150 96L196 16" className="s2 nf" />
      <Steam x={88} y={78} gap={24} />
    </g>
  );
}

/** Noodle soup in a melamine bowl, noodles lifted on chopsticks, ceramic spoon resting. */
function Bowl() {
  return (
    <g>
      <g transform="translate(112 118)">
        <ellipse cx="4" cy="76" rx="86" ry="10" className="f-shadow" />
        <path d="M-92 0Q-86 74 0 74Q86 74 92 0Z" fill="#e9f2ea" className="s" />
        <path d="M-88 14Q0 32 88 14" className="nf st-green" strokeWidth="7" />
        {[-60, -30, 0, 30, 60].map(x => <circle key={x} cx={x} cy={22 + Math.abs(x) * -0.08} r="4" className="f-white" />)}
        <ellipse cx="0" cy="0" rx="92" ry="18" fill="#e9f2ea" className="s" />
        <ellipse cx="0" cy="1" rx="82" ry="13" className="f-broth" />
        <path d="M-50 -2c10-6 18 4 28-2M10 2c10-6 18 4 28-2" className="nf" stroke="#f2d79a" strokeWidth="4" strokeLinecap="round" />
        <Basil x={30} y={-4} r={10} s={.8} />
        <LimeWedge x={-48} y={2} r={-12} s={.6} />
      </g>
      <path d="M78 116c-8-30 10-50 6-80M92 116c-4-30 14-46 12-78M104 116c2-28 18-40 18-70" className="nf st-noodle" strokeWidth="5" strokeLinecap="round" />
      <path d="M78 116c-8-30 10-50 6-80" className="s2 nf" opacity=".35" />
      <path d="M160 6L72 44M168 16L80 50" className="s nf" stroke="#b5783a" strokeWidth="4.5" />
      <g transform="translate(176 118) rotate(-30)">
        <path d="M0 0c-2-14 4-22 12-22s14 8 12 22c-4 6-20 6-24 0z" className="f-white s2" />
        <path d="M12 -22l4-30" className="s2 nf" strokeWidth="9" stroke="#241712" />
        <path d="M12 -22l4-30" className="nf" strokeWidth="6" stroke="#fff" />
      </g>
      <Steam x={66} y={76} gap={22} n={2} />
    </g>
  );
}

/** A bag of cha yen with a straw beside mango sticky rice on a small plate. */
function Glass() {
  return (
    <g>
      <g transform="translate(150 160)">
        <EnamelPlate rx={66} ry={22} />
        <path d="M-46 0c0-18 22-26 40-22 8 2 12 10 10 22-18 6-34 6-50 0z" className="f-rice s2" />
        <path d="M-40 -8c6-2 14 0 20-4" className="nf" stroke="#fff8e8" strokeWidth="3" opacity=".7" />
        <path d="M6 -6c6-20 34-26 48-12 6 8 2 18-10 20-14 2-30 0-38-8z" className="f-mango s2" />
        <path d="M14 -10l6-4M24 -12l6-4M34 -12l6-3" className="nf" stroke="#e8961a" strokeWidth="2" />
        <path d="M-40 -2c10 4 26 4 38 0" className="nf" stroke="#f7f0dc" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g transform="translate(64 40)">
        <path d="M-6 26c-10-8-6-22 6-20M54 26c10-8 6-22-6-20" className="s2 nf" stroke="#b81818" strokeWidth="2" />
        <path d="M0 24Q-8 120 10 134H40Q58 120 50 24Z" className="f-tea s" opacity=".95" />
        <path d="M0 24Q-2 52 2 60H48Q52 52 50 24Z" fill="#fff4e3" className="s2" />
        <path d="M8 70v50" className="nf" stroke="#fff" strokeWidth="3" opacity=".5" strokeLinecap="round" />
        <path d="M2 24h48" className="s2 nf" />
        <path d="M30 22L46 -22" className="nf" stroke="#b81818" strokeWidth="6" strokeLinecap="round" />
        <path d="M6 34l8 4M24 40l8 3M14 48l8-2" className="s2 nf" opacity=".4" />
      </g>
    </g>
  );
}

const MOTIFS: Record<Motif, () => JSX.Element> = { skewers: Skewers, wok: Wok, pot: Pot, bowl: Bowl, glass: Glass };

/** Food on everyday tableware for a menu section. Decorative. */
export function StationMotif({ motif, className = '' }: { motif: Motif; className?: string }) {
  const Art = MOTIFS[motif];
  return (
    <svg viewBox="0 0 230 210" className={`art ${className}`} aria-hidden="true" focusable="false">
      <Art />
    </svg>
  );
}
