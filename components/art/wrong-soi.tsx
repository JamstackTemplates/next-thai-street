/** A red plastic stool, the seat of every Bangkok food stall. Origin at the front-left foot. */
function Stool({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="34" cy="2" rx="40" ry="6" className="f-shadow" />
      <path d="M0 0L8 -58H60L68 0H56L50 -40H18L12 0Z" className="f-red s" />
      <path d="M18 -40H50L48 -28H20Z" fill="#8c1111" />
      <ellipse cx="34" cy="-60" rx="30" ry="8" className="f-red s" />
      <circle cx="34" cy="-60" r="4" fill="#8c1111" />
    </g>
  );
}

/** A stack of plastic market crates. */
function Crates({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(${i === 2 ? 6 : 0} ${-i * 34})`}>
          <rect x="0" y="-34" width="90" height="34" rx="3" fill={i === 1 ? '#183d7d' : '#0d4d32'} className="s2" />
          {[12, 30, 48, 66].map(dx => <rect key={dx} x={dx} y="-26" width="12" height="18" rx="2" fill="#000" opacity=".28" />)}
        </g>
      ))}
    </g>
  );
}

/** 404 art: a warm dusk Bangkok soi ends at a dead-end wall under festooned lanterns. */
export function WrongSoi({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 760 380" className={`art art-clip ${className}`} aria-hidden="true" focusable="false">
      {/* warm lantern glow in the alley */}
      <ellipse cx="380" cy="140" rx="320" ry="170" fill="url(#ss-stall-halo)" />
      {/* lane floor in perspective */}
      <path d="M0 380L280 170H480L760 380Z" fill="#5e4b40" />
      <path d="M380 184V372" stroke="#ffd23f" strokeWidth="5" strokeDasharray="20 16" />
      {/* shophouses: warm timber & plaster fronts with Thai signs */}
      <path d="M0 0H280V170L0 380Z" fill="#e8d4ad" className="s" />
      <path d="M760 0H480V170L760 380Z" fill="#e8d4ad" className="s" />
      <path d="M20 26H250V70L20 92Z" fill="#b81818" className="s2" />
      <g transform="translate(135 58) skewY(-5)"><text x="0" y="9" textAnchor="middle" className="art-sign" fontSize="30" fill="#ffd23f">แกง</text></g>
      <path d="M740 26H510V70L740 92Z" fill="#0d4d32" className="s2" />
      <g transform="translate(625 58) skewY(5)"><text x="0" y="9" textAnchor="middle" className="art-sign" fontSize="28" fill="#fffaf0">ก๋วยเตี๋ยว</text></g>
      {/* roller shutters */}
      <path d="M30 120L250 104V170L30 300Z" fill="#c9a55c" className="s2" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => <path key={i} d={`M30 ${132 + i * 18}L250 ${110 + i * 7}`} stroke="#8c6928" strokeWidth="2" />)}
      <path d="M730 120L510 104V170L730 300Z" fill="#c9a55c" className="s2" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => <path key={i} d={`M730 ${132 + i * 18}L510 ${110 + i * 7}`} stroke="#8c6928" strokeWidth="2" />)}
      {/* end wall with the dead-end sign */}
      <rect x="280" y="40" width="200" height="130" fill="#f5e6c8" className="s" />
      <g transform="rotate(-2 380 92)">
        <rect x="308" y="58" width="144" height="66" rx="8" fill="#183d7d" className="s" />
        <rect x="314" y="64" width="132" height="54" rx="5" className="nf" stroke="#fffaf0" strokeWidth="3" />
        <text x="380" y="90" textAnchor="middle" className="art-sign" fontSize="22" fill="#fffaf0">ทางตัน</text>
        <text x="380" y="111" textAnchor="middle" className="art-text" fontSize="14" fill="#fffaf0" letterSpacing="2">DEAD END</text>
      </g>
      {/* overhead festoon bulbs */}
      <path d="M220 18Q380 56 540 18" className="nf s2" stroke="#241712" />
      {[260, 320, 380, 440, 500].map((bx, i) => {
        const by = 24 + (i === 2 ? 14 : i === 1 || i === 3 ? 9 : 2);
        return (
          <g key={bx} className="bulb-twinkle">
            <circle cx={bx} cy={by + 6} r="14" fill="url(#ss-lantern-glow)" opacity=".6" />
            <circle cx={bx} cy={by + 6} r="5.5" fill="#ffd23f" className="s2" />
          </g>
        );
      })}
      <Crates x={520} y={346} />
      <Stool x={200} y={336} s={1.1} />
      <Stool x={300} y={300} s={.75} />
    </svg>
  );
}
