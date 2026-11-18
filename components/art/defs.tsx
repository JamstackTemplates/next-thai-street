/** Shared SVG gradients and patterns referenced by the illustrations. Rendered once in the layout. */
export function ArtDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        {/* Warm teakwood planks for street-stall counters and trims. */}
        <pattern id="ss-teak" width="80" height="24" patternUnits="userSpaceOnUse">
          <rect width="80" height="24" fill="#8b5229" />
          <path d="M0 12.5H80" stroke="#5b3114" strokeWidth="1.4" opacity=".65" />
          <path d="M0 5q20-2 40 0t40 0M0 19q18 2 38 0t42 0" stroke="#a76938" strokeWidth="1" fill="none" opacity=".5" />
        </pattern>
        {/* Warm woven bamboo mat / lattice texture. */}
        <pattern id="ss-bamboo" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#d9ba7c" />
          <path d="M0 4h16M0 12h16M4 0v16M12 0v16" stroke="#b38c4c" strokeWidth="1.2" opacity=".45" />
        </pattern>
        {/* Brushed warm brass for ticket rails, trims and scale pans. */}
        <linearGradient id="ss-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3d893" />
          <stop offset="50%" stopColor="#c99c45" />
          <stop offset="100%" stopColor="#8d6522" />
        </linearGradient>
        {/* Radial lantern glow for hanging lights and night-market bulbs. */}
        <radialGradient id="ss-lantern-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe580" stopOpacity=".85" />
          <stop offset="45%" stopColor="#ff9b30" stopOpacity=".32" />
          <stop offset="100%" stopColor="#ff6a1a" stopOpacity="0" />
        </radialGradient>
        {/* Warm market-stall aura behind the hero cart. */}
        <radialGradient id="ss-stall-halo" cx="56%" cy="46%" r="52%">
          <stop offset="0%" stopColor="#ffd166" stopOpacity=".48" />
          <stop offset="55%" stopColor="#e85d24" stopOpacity=".18" />
          <stop offset="100%" stopColor="#e85d24" stopOpacity="0" />
        </radialGradient>
        {/* Striped crimson and warm-cream awning fabric. */}
        <pattern id="ss-awning" width="36" height="40" patternUnits="userSpaceOnUse">
          <rect width="18" height="40" fill="#c41818" />
          <rect x="18" width="18" height="40" fill="#fff3d6" />
        </pattern>
        {/* Luminous orange-to-gold wok flame gradient. */}
        <linearGradient id="ss-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#d92818" />
          <stop offset="55%" stopColor="#f5821f" />
          <stop offset="100%" stopColor="#ffe156" />
        </linearGradient>
        {/* Backwards-compatible steel & tile pattern names if referenced directly. */}
        <pattern id="ss-brushed" width="6" height="4" patternUnits="userSpaceOnUse">
          <rect width="6" height="4" fill="#d3b270" />
          <rect width="6" height="1" fill="#ebd29b" />
        </pattern>
        <pattern id="ss-tile" width="34" height="34" patternUnits="userSpaceOnUse">
          <rect width="34" height="34" fill="#fbf0d9" />
          <path d="M0 .5H34M.5 0V34" stroke="#dfcaa0" strokeWidth="1.2" />
        </pattern>
      </defs>
    </svg>
  );
}
