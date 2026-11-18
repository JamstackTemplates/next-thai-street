import { Basil, Chilli, EnamelPlate, FriedEgg, LimeWedge, RoosterBowl, Steam } from './tableware';

/** Glowing Thai paper lantern hanging from a cord. */
function PaperLantern({ x, y, color, stripe, scale = 1 }: { x: number; y: number; color: string; stripe: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="lantern">
      <circle cx="0" cy="26" r="46" fill="url(#ss-lantern-glow)" />
      <path d="M0 -18V4" stroke="#241712" strokeWidth="2" />
      <rect x="-10" y="2" width="20" height="6" rx="2" fill="url(#ss-brass)" className="s2" />
      <ellipse cx="0" cy="26" rx="22" ry="20" fill={color} className="s" />
      <ellipse cx="0" cy="26" rx="13" ry="20" fill="none" stroke={stripe} strokeWidth="1.8" opacity=".65" />
      <path d="M-20 20h40M-21 26h42M-20 32h40" stroke={stripe} strokeWidth="1.2" opacity=".5" />
      <rect x="-9" y="44" width="18" height="5" rx="2" fill="url(#ss-brass)" className="s2" />
      <path d="M-4 49v12M0 49v15M4 49v12" stroke="#d92818" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/** A condiment caddy (เครื่องปรุง): chilli flakes, sugar, fish sauce with chilli, vinegar with chilli. */
function Caddy({ x, y }: { x: number; y: number }) {
  const jars = [
    { fill: '#b81818', top: '#8f1111' },
    { fill: '#fffaf0', top: '#e6dec8' },
    { fill: '#c97a26', top: '#9c5b16', bits: true },
    { fill: '#eef2e2', top: '#d6dec2', bits: true },
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="52" cy="64" rx="58" ry="7" className="f-shadow" />
      <path d="M48 -20V8" className="s4 nf" stroke="#c99c45" />
      <circle cx="48" cy="-22" r="6" fill="url(#ss-brass)" className="s2" />
      {jars.map((jar, i) => (
        <g key={i} transform={`translate(${i * 25} 6)`}>
          <path d="M2 4Q0 30 3 52H22Q25 30 23 4Z" fill={jar.fill} className="s2" opacity=".95" />
          <rect x="2" y="0" width="21" height="7" rx="2" fill={jar.top} className="s2" />
          {jar.bits ? <><circle cx="9" cy="30" r="2.2" className="f-red" /><circle cx="15" cy="38" r="2" className="f-leaf" /><circle cx="11" cy="44" r="2" className="f-red" /></> : null}
          <path d="M17 2l7-15" className="s2 nf" stroke="#c99c45" strokeWidth="2.5" />
          <path d="M6 12v28" className="nf" stroke="#fff" strokeWidth="2" opacity=".5" strokeLinecap="round" />
        </g>
      ))}
      <path d="M-6 40H106V60H-6Z" fill="url(#ss-brass)" className="s2" />
      <path d="M-4 44H104" className="nf" stroke="#fff9d6" strokeWidth="1.5" opacity=".75" />
    </g>
  );
}

/** Iconic red plastic street stool (เก้าอี้พลาสติกแดง). */
function StreetStool({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="34" cy="4" rx="40" ry="7" className="f-shadow" />
      <path d="M2 0L10 -62H58L66 0H54L48 -42H20L14 0Z" fill="#c41818" className="s" />
      <path d="M20 -42H48L46 -28H22Z" fill="#8c1111" />
      <ellipse cx="34" cy="-64" rx="28" ry="8" fill="#d92424" className="s" />
      <ellipse cx="34" cy="-64" rx="8" ry="2.5" fill="#8c1111" />
    </g>
  );
}

/**
 * "Soi Sabai after dusk": an atmospheric Bangkok street-food stall.
 * Glowing lanterns, striped market awning, illuminated Thai lightbox sign, glass-front ingredient
 * vitrine, roaring wok with flying holy basil & chillies, simmering clay curry pot, teakwood counter
 * with Krapow, Rooster Bowl Khao Soi, Thai iced tea and red plastic stools.
 */
export function HeroScene({ crop = 'full', className = '' }: { crop?: 'full' | 'front'; className?: string }) {
  const viewBox = crop === 'front' ? '95 20 650 350' : '0 0 820 600';
  return (
    <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" className={`art ${className}`} aria-hidden="true" focusable="false">
      {/* Warm radial market-stall aura */}
      <ellipse cx="450" cy="270" rx="390" ry="255" fill="url(#ss-stall-halo)" />

      {/* Distant Bangkok shophouse & market eaves silhouette */}
      <g opacity=".22">
        <path d="M30 220V92l65-34 65 34v128z" fill="#3a2018" />
        <path d="M640 220V78l72-36 78 36v142z" fill="#3a2018" />
        <rect x="64" y="114" width="22" height="30" rx="2" fill="#ffd23f" />
        <rect x="104" y="114" width="22" height="30" rx="2" fill="#ffd23f" />
        <rect x="676" y="102" width="24" height="32" rx="2" fill="#ffd23f" />
        <rect x="718" y="102" width="24" height="32" rx="2" fill="#ffd23f" />
      </g>

      {/* String lights & glowing paper lanterns */}
      <path d="M24 38Q230 92 430 42T800 54" className="nf s2" stroke="#241712" />
      {[86, 152, 224, 304, 536, 616, 694, 762].map((bx, i) => {
        const by = 42 + Math.sin(i * 1.1) * 14 + (i < 4 ? 12 : 4);
        const fill = ['#ffd23f', '#ff9436', '#fff2a6', '#ffd23f'][i % 4];
        return (
          <g key={bx} className="bulb-twinkle">
            <circle cx={bx} cy={by + 8} r="18" fill="url(#ss-lantern-glow)" opacity=".55" />
            <rect x={bx - 3} y={by - 2} width="6" height="5" rx="1" fill="#241712" />
            <circle cx={bx} cy={by + 8} r="6.5" fill={fill} className="s2" />
          </g>
        );
      })}
      <PaperLantern x={48} y={62} color="#c41818" stripe="#ffd23f" scale={.92} />
      <PaperLantern x={752} y={76} color="#f5a614" stripe="#fff3d6" scale={.98} />
      <PaperLantern x={346} y={48} color="#0d5e3a" stripe="#ffd23f" scale={.78} />

      {/* Stall upright poles & back wall */}
      <rect x="112" y="150" width="12" height="220" fill="#5c3315" className="s2" />
      <rect x="708" y="150" width="12" height="220" fill="#5c3315" className="s2" />
      <rect x="124" y="176" width="584" height="178" fill="#3a231b" className="s" />
      <rect x="124" y="176" width="584" height="178" fill="url(#ss-bamboo)" opacity=".18" />

      {/* Striped crimson & cream market awning */}
      <path d="M84 142L134 94H698L748 142Z" fill="url(#ss-awning)" className="s" />
      <path d="M84 142H748v16H84Z" fill="#9c1414" className="s" />
      {Array.from({ length: 16 }, (_, i) => (
        <path key={i} d={`M${84 + i * 41.5} 158a20.75 13 0 0 0 41.5 0Z`} fill={i % 2 === 0 ? '#c41818' : '#ffd23f'} className="s2" />
      ))}

      {/* Hanging illuminated shopfront sign */}
      <path d="M446 66v28M674 66v28" stroke="#c99c45" strokeWidth="3.5" />
      <rect x="412" y="88" width="296" height="106" rx="10" fill="#241712" className="s" />
      <rect x="420" y="96" width="280" height="90" rx="6" fill="#a81515" stroke="#ffd23f" strokeWidth="3" />
      <text x="560" y="151" textAnchor="middle" className="art-sign" fontSize="54" fill="#ffd23f">ซอยสบาย</text>
      <text x="560" y="176" textAnchor="middle" className="art-text" fontSize="15" fill="#fffaf0" letterSpacing="3.5">SOI SABAI · MELBOURNE</text>
      <path d="M438 164h38M644 164h38" stroke="#ffd23f" strokeWidth="2.2" />

      {/* Glass-front Thai street-cart ingredient vitrine (left) */}
      <g transform="translate(138 188)">
        <rect x="0" y="0" width="236" height="156" rx="4" fill="#2a1914" className="s" />
        <rect x="8" y="8" width="220" height="140" rx="2" fill="#f7e7c4" opacity=".14" />
        {/* Warm interior cabinet glow */}
        <ellipse cx="118" cy="70" rx="102" ry="62" fill="#ffd269" opacity=".18" />
        {/* Hanging bunches of chillies & garlic */}
        <path d="M22 22h192" stroke="#c99c45" strokeWidth="2.5" />
        {[46, 86].map((cx, i) => (
          <g key={cx} transform={`translate(${cx} 22)`}>
            <path d="M0 0v18" stroke="#e6d2a2" strokeWidth="2" />
            <g transform="translate(-5 24) rotate(-68)"><Chilli className={i ? 'f-leaf' : 'f-red'} /></g>
            <g transform="translate(5 28) rotate(-110)"><Chilli /></g>
            <g transform="translate(0 36) rotate(-85)"><Chilli className={i ? 'f-red' : 'f-yellow'} /></g>
          </g>
        ))}
        {/* Stacked bowls & jars on middle glass shelf */}
        <rect x="8" y="84" width="220" height="6" fill="#c99c45" className="s2" />
        <g transform="translate(56 76)">
          {[0, 1, 2].map(i => (
            <g key={i} transform={`translate(0 ${-i * 9})`}>
              <path d="M-28 0q2 12 28 12t28-12z" className="f-white s2" />
              <path d="M-24 3q24 8 48 0" className="st-red nf" strokeWidth="1.5" />
            </g>
          ))}
        </g>
        {/* Fresh limes & shallots */}
        <circle cx="132" cy="75" r="9" fill="#63a82c" className="s2" />
        <circle cx="147" cy="77" r="8" fill="#80c238" className="s2" />
        <circle cx="140" cy="65" r="8" fill="#70b332" className="s2" />
        {/* Sauce bottles */}
        {[178, 198].map((bx, i) => (
          <g key={bx} transform={`translate(${bx} 40)`}>
            <rect x="0" y="10" width="16" height="34" rx="3" fill={i ? '#9c3a14' : '#5e2c14'} className="s2" />
            <rect x="4" y="2" width="8" height="8" rx="1" fill="#c41818" className="s2" />
            <rect x="2" y="20" width="12" height="14" fill="#fffaf0" />
          </g>
        ))}
        {/* Lower vitrine curry & herb bowls */}
        <rect x="18" y="116" width="58" height="28" rx="4" fill="#dfc284" className="s2" />
        <ellipse cx="47" cy="116" rx="28" ry="6" fill="#8aa83a" className="s2" />
        <rect x="88" y="116" width="58" height="28" rx="4" fill="#dfc284" className="s2" />
        <ellipse cx="117" cy="116" rx="28" ry="6" fill="#c8552a" className="s2" />
        <rect x="158" y="116" width="58" height="28" rx="4" fill="#dfc284" className="s2" />
        <ellipse cx="187" cy="116" rx="28" ry="6" fill="#a8692c" className="s2" />
        {/* Glass reflection streaks */}
        <path d="M24 140L72 18M52 140L100 18M160 140L208 18" stroke="#fffaf0" strokeWidth="3" opacity=".16" strokeLinecap="round" />
      </g>

      {/* Simmering clay curry pot (หม้อดิน) */}
      <g transform="translate(428 288)">
        <path d="M-38 0Q-44 48 0 54Q44 48 38 0Z" fill="#b4532a" className="s" />
        <ellipse cx="0" cy="0" rx="38" ry="10" fill="#8a3918" className="s" />
        <ellipse cx="0" cy="1" rx="32" ry="7" className="f-curry-green" />
        <path d="M12 0L34 -42" stroke="#c99c45" strokeWidth="5" strokeLinecap="round" />
        <Steam x={-16} y={-12} gap={18} n={2} />
      </g>

      {/* Roaring wok station */}
      <g transform="translate(596 286)">
        <rect x="-82" y="16" width="164" height="54" rx="4" fill="#1e1410" className="s" />
        {/* Multi-layered roaring flame */}
        <g className="flame">
          <path d="M-54 16c-8-32 18-40 12-66 20 18 26 42 18 66zM-6 16c-12-40 18-52 10-80 28 22 34 54 24 80zM42 16c-8-28 14-36 10-58 18 16 24 38 16 58z" fill="url(#ss-flame)" className="s2" />
        </g>
        {/* Cast-iron wok */}
        <path d="M-92 -28Q0 42 92 -28Z" fill="#241712" className="s" />
        <path d="M-88 -28H88" stroke="#8d6522" strokeWidth="3" />
        <path d="M90 -30L134 -56" className="s4 nf" strokeWidth="6" />
        <rect x="114" y="-64" width="32" height="14" rx="6" fill="#6b3d1f" className="s2" transform="rotate(-28 130 -57)" />
        {/* Tossed jasmine rice, basil and chillies */}
        <path d="M-46 -28c6-32 34-50 64-42" className="nf" stroke="#f8f3e3" strokeWidth="9" strokeLinecap="round" strokeDasharray="1 8" />
        <path d="M-24 -32c8-26 30-34 50-26" className="nf" stroke="#914920" strokeWidth="7" strokeLinecap="round" strokeDasharray="1 10" />
        <Basil x={2} y={-78} r={-18} s={1.1} />
        <Basil x={30} y={-62} r={28} s={.9} />
        <g transform="translate(46 -88) rotate(24) scale(.8)"><Chilli /></g>
        {/* Wok spatula (ตะหลิว) */}
        <path d="M44 -82L14 -36" stroke="#c99c45" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="14" cy="-34" rx="13" ry="7" fill="url(#ss-brass)" className="s2" transform="rotate(-30 14 -34)" />
        <Steam x={-64} y={-44} gap={26} />
      </g>

      {/* Rich teakwood stall counter & front apron */}
      <rect x="54" y="348" width="712" height="214" rx="6" fill="url(#ss-teak)" className="s" />
      {/* Countertop surface + rolled brass trim */}
      <rect x="44" y="342" width="732" height="22" rx="4" fill="url(#ss-brass)" className="s" />
      <path d="M48 346H772" stroke="#fff6d1" strokeWidth="2" opacity=".75" />
      {/* Vertical teak slats */}
      {[180, 310, 490, 620].map(x => <path key={x} d={`M${x} 365V562`} stroke="#45230e" strokeWidth="2.5" opacity=".7" />)}

      {/* Condiment caddy on counter */}
      <Caddy x={156} y={280} />

      {/* Tall glass of Thai Iced Tea (ชาเย็น) with ice & striped straw */}
      <g transform="translate(320 278)">
        <path d="M-16 0L-12 64H16L20 0Z" fill="#e67e22" className="s2" />
        <path d="M-15 6L-14 24H18L19 6Z" fill="#fff3dc" opacity=".9" />
        <rect x="-10" y="10" width="9" height="9" rx="2" fill="#fffaf0" opacity=".75" transform="rotate(-12 -6 14)" />
        <rect x="2" y="12" width="8" height="8" rx="2" fill="#fffaf0" opacity=".75" transform="rotate(15 6 16)" />
        <path d="M6 16L18 -26" stroke="#c41818" strokeWidth="5" strokeLinecap="round" />
        <path d="M6 16L18 -26" stroke="#fffaf0" strokeWidth="5" strokeDasharray="5 5" strokeLinecap="round" />
        <ellipse cx="2" cy="0" rx="18" ry="4" fill="#fff3dc" className="s2" />
      </g>

      {/* Plate of Pad Krapow with crispy fried egg */}
      <g transform="translate(466 336)">
        <EnamelPlate rx={88} ry={27} />
        <path d="M-56 0c0-22 30-34 56-30s46 12 42 30c-30 10-70 10-98 0z" className="f-rice s2" />
        <path d="M-10 -4c-4-16 18-24 40-18s26 16 20 22c-20 6-44 6-60-4z" fill="#7a4524" className="s2" />
        <Basil x={20} y={-22} r={-15} />
        <Basil x={36} y={-14} r={25} s={.85} />
        <FriedEgg x={-24} y={-20} s={.86} />
        <path d="M78 6l26-34M90 10l20-36" className="s4 nf" stroke="#c99c45" />
      </g>

      {/* Rooster bowl of Khao Soi with lime wedge */}
      <g transform="translate(628 296)">
        <RoosterBowl r={48} fill="f-tea">
          <path d="M-26 -2c8-8 18-8 26-4M4 -6c10-4 18-2 24 4" className="nf" stroke="#f2d79a" strokeWidth="5" strokeLinecap="round" />
          <LimeWedge x={20} y={-2} r={-15} s={.65} />
        </RoosterBowl>
      </g>
      <Steam x={614} y={282} gap={18} n={2} />

      {/* Framed street-stall menu board hung on the teak counter front */}
      <g transform="translate(390 452) rotate(-1.5)">
        <rect x="-136" y="-66" width="272" height="132" rx="6" fill="#241712" className="s" />
        <rect x="-128" y="-58" width="256" height="116" rx="4" fill="#fffaf0" stroke="#ffd23f" strokeWidth="2" />
        <rect x="-128" y="-58" width="256" height="36" rx="3" fill="#b81818" />
        <text x="0" y="-33" textAnchor="middle" className="art-sign" fontSize="21" fill="#ffd23f">ผัด · แกง · ก๋วยเตี๋ยว</text>
        <text x="-112" y="-4" className="art-text" fontSize="13" fill="#241712">ผัดกะเพรา · Pad Krapow</text>
        <text x="112" y="-4" textAnchor="end" className="art-sign" fontSize="14" fill="#b81818">$19.50</text>
        <path d="M-112 2H112" stroke="#d6bd96" strokeDasharray="3 4" />
        <text x="-112" y="20" className="art-text" fontSize="13" fill="#241712">แกงเขียวหวาน · Green Curry</text>
        <text x="112" y="20" textAnchor="end" className="art-sign" fontSize="14" fill="#b81818">$22.00</text>
        <path d="M-112 26H112" stroke="#d6bd96" strokeDasharray="3 4" />
        <text x="-112" y="44" className="art-text" fontSize="13" fill="#241712">ข้าวซอยไก่ · Khao Soi</text>
        <text x="112" y="44" textAnchor="end" className="art-sign" fontSize="14" fill="#b81818">$23.00</text>
      </g>

      {/* Two iconic red plastic street stools in front of the stall */}
      <StreetStool x={128} y={584} s={1.05} />
      <StreetStool x={604} y={582} s={.96} />
    </svg>
  );
}
