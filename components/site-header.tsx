import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { AwningScallop } from './art/dividers';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

const NAV = [
  { href: '/menu/', label: 'Menu' },
  { href: '/menu/#lunch', label: 'Lunch' },
  { href: '/visit/', label: 'Visit' },
  { href: '/contact/', label: 'Contact' },
];

/** Lacquer & teak shopfront header with glowing Thai lettering and a scalloped market awning edge. */
export function SiteHeader() {
  return (
    <header className="relative z-30 text-[var(--header-fg)]">
      <div className="h-1.5 bg-gradient-to-r from-[#b81818] via-[#ffd23f] to-[#b81818]" aria-hidden="true" />
      <div className="bg-[var(--header-bg)] shadow-[inset_0_-1px_0_rgba(255,210,63,.25)]">
        <div className="wrap flex flex-wrap items-center gap-x-6 gap-y-1 py-2.5 md:min-h-[4.85rem] md:flex-nowrap">
          <SiteLink href="/" className="mr-auto flex items-baseline gap-3 no-underline" aria-label={`${business.name} home`}>
            <span lang="th" className="font-sign text-[2rem] leading-none text-[var(--sign-yellow)] drop-shadow-[0_2px_6px_rgba(255,180,40,.35)] sm:text-[2.4rem]">{business.thaiName}</span>
            <span className="font-display text-[1.15rem] font-semibold tracking-[.08em] uppercase">{business.name}</span>
          </SiteLink>
          <span className="hidden rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[.88rem] font-semibold lg:inline-flex lg:items-center lg:gap-2">
            <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--sign-yellow)] shadow-[0_0_8px_var(--sign-yellow)]" />
            <OpenBadge hours={business.hours} />
          </span>
          <div className="order-2 md:order-3"><DarkModeToggle /></div>
          <nav aria-label="Main" className="order-3 -mx-2 flex w-full gap-1 overflow-x-auto md:order-2 md:mx-0 md:w-auto">
            {NAV.map(item => (
              <SiteLink key={item.href} href={item.href} markCurrent={item.href.includes('#') ? undefined : 'page'}
                className="font-display min-h-[2.75rem] border-b-4 border-transparent px-3 pb-1.5 pt-2 text-[1.05rem] font-medium no-underline transition-colors hover:border-white/45 aria-[current=page]:border-[var(--sign-yellow)] aria-[current=page]:text-[var(--sign-yellow)]">
                {item.label}
              </SiteLink>
            ))}
          </nav>
        </div>
      </div>
      <AwningScallop />
    </header>
  );
}
