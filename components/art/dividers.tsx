/** Warm brass & teak counter trim used as a clean section boundary. */
export function CounterEdge({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`brushed h-3 border-y-2 border-[var(--steel-3)] shadow-[inset_0_1px_0_rgba(255,248,210,.55),0_6px_12px_-6px_rgba(0,0,0,.45)] ${className}`} />
  );
}

/** Scalloped Thai market awning fringe in crimson and marigold gold. */
export function AwningScallop({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`h-4 w-full overflow-hidden ${className}`}>
      <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 18">
        <defs>
          <pattern id="ss-scallop-hdr" width="48" height="18" patternUnits="userSpaceOnUse">
            <path d="M0 0H24V8A12 10 0 0 1 0 8Z" fill="#b81818" stroke="#241712" strokeWidth="1.5" />
            <path d="M24 0H48V8A12 10 0 0 1 24 8Z" fill="#ffd23f" stroke="#241712" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="1200" height="18" fill="url(#ss-scallop-hdr)" />
      </svg>
    </div>
  );
}

/** Double Thai shop-sign rule with a central diamond ornament. */
export function SignRule({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-center gap-2 ${className}`}>
      <span className="block h-[4px] w-14 rounded-full bg-current" />
      <span className="block h-2.5 w-2.5 rotate-45 bg-current" />
      <span className="block h-[2px] w-10 rounded-full bg-current opacity-85" />
    </span>
  );
}

/** The kitchen's brushed-brass ticket rail: the order dockets hang from here. */
export function TicketRail({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative h-5 ${className}`}>
      <div className="brushed absolute inset-x-0 top-1 h-3.5 rounded-full border-2 border-[var(--steel-3)] shadow-[inset_0_1px_0_rgba(255,248,210,.7),0_5px_10px_-4px_rgba(0,0,0,.5)]" />
    </div>
  );
}

/** Traditional Thai diamond-lattice border frieze in warm gold & lacquer red. */
export function ThaiLatticeBorder({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`h-5 w-full overflow-hidden border-y-2 border-[#c99c45] bg-[#7a1212] ${className}`}>
      <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 20">
        <defs>
          <pattern id="ss-thai-frieze" width="28" height="20" patternUnits="userSpaceOnUse">
            <path d="M14 2L24 10L14 18L4 10Z" fill="#ffd23f" stroke="#241712" strokeWidth="1.2" />
            <circle cx="14" cy="10" r="2.6" fill="#9c1816" />
            <circle cx="0" cy="10" r="2" fill="#c99c45" />
            <circle cx="28" cy="10" r="2" fill="#c99c45" />
          </pattern>
        </defs>
        <rect width="1200" height="20" fill="url(#ss-thai-frieze)" />
      </svg>
    </div>
  );
}
