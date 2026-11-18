/** A three-tier enamel & brass tiffin carrier (ปิ่นโต), for takeaway and catering. Decorative. */
export function Tiffin({ className = '' }: { className?: string }) {
  const tiers = [
    { body: '#1f7a4d', lid: '#2f9662' },
    { body: '#b81818', lid: '#cf2a2a' },
    { body: '#d99516', lid: '#f2b129' },
  ];
  return (
    <svg viewBox="0 0 220 280" className={`art ${className}`} aria-hidden="true" focusable="false">
      <ellipse cx="114" cy="268" rx="84" ry="10" className="f-shadow" />
      {/* brass carrying frame */}
      <path d="M38 252V70M182 252V70" className="s4 nf" stroke="#c99c45" strokeWidth="7" />
      <path d="M38 252V70M182 252V70" className="s2 nf" />
      <path d="M38 70C38 8 182 8 182 70" className="nf" stroke="#c99c45" strokeWidth="9" strokeLinecap="round" />
      <path d="M38 70C38 8 182 8 182 70" className="s2 nf" />
      <rect x="92" y="14" width="36" height="14" rx="6" fill="#b81818" className="s2" />
      {tiers.map((tier, i) => {
        const y = 92 + i * 56;
        return (
          <g key={i}>
            <path d={`M46 ${y}V${y + 50}Q110 ${y + 62} 174 ${y + 50}V${y}`} fill={tier.body} className="s" />
            <ellipse cx="110" cy={y} rx="64" ry="11" fill={tier.lid} className="s" />
            <path d={`M46 ${y + 8}Q110 ${y + 20} 174 ${y + 8}`} className="nf" stroke="#fff6dc" strokeWidth="2.5" opacity=".55" />
            <g transform={`translate(${86 + (i % 2) * 22} ${y + 32})`}>
              <circle r="9" fill="#f7b2c4" className="s2" />
              <circle r="3.5" fill="#ffd23f" />
              <path d="M10 2c8-6 16-4 20 2-8 4-16 4-20-2z" className="f-leaf s2" />
              <path d="M-10 4c-8-4-14 0-16 6 8 2 14 0 16-6z" className="f-leaf s2" />
            </g>
          </g>
        );
      })}
      <ellipse cx="110" cy="92" rx="64" ry="11" fill="url(#ss-brass)" className="s" />
      <rect x="100" y="80" width="20" height="10" rx="3" fill="url(#ss-brass)" className="s2" />
      <path d="M38 120h12M170 120h12M38 176h12M170 176h12" className="s4 nf" stroke="#c99c45" />
    </svg>
  );
}
