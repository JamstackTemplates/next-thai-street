import { addressLine, business, phoneHref } from '../content/business';
import { DAYS } from '../lib/hours';
import { mapDirectionsUrl } from '../lib/maps';
import { CounterEdge, SignRule } from './art/dividers';
import { MailIcon, PhoneIcon, PinIcon } from './art/icons';
import { SiteLink } from './site-link';

/** A Bangkok soi street-sign plate: Thai over English, brass rivets, address, hours and contact. */
export function SiteFooter() {
  return (
    <footer className="mt-20 text-ink">
      <CounterEdge />
      <div className="wrap py-12">
        <div className="soi-sign grid gap-8 p-7 sm:p-10 md:grid-cols-[1.15fr_1fr_1fr]">
          <div>
            <p lang="th" className="font-sign text-[2.3rem] leading-none text-[#ffd23f]">{business.thaiName}</p>
            <p className="font-display mt-1.5 text-[1.4rem] font-semibold tracking-[.08em] uppercase">{business.name}</p>
            <SignRule className="mt-3 text-[#ffd23f]" />
            <p className="mt-4 max-w-xs text-[.96rem] text-[#e4ecff]">Thai street food from the wok, the curry pots and the noodle bar. Walk-in only; order at the counter.</p>
            <nav aria-label="Footer" className="mt-5 flex flex-wrap gap-x-5 gap-y-1 font-semibold text-[#ffd23f]">
              <SiteLink href="/menu/">Menu</SiteLink>
              <SiteLink href="/visit/">Visit</SiteLink>
              <SiteLink href="/contact/">Contact</SiteLink>
            </nav>
          </div>
          <div>
            <h2 className="font-display text-[1.15rem] font-semibold text-[#ffd23f]">Kitchen hours</h2>
            <ul className="mt-3 text-[.95rem]">
              {DAYS.map(day => {
                const entry = business.hours.find(h => h.day === day)!;
                return (
                  <li key={day} data-day={day} className="hours-row px-2 py-1">
                    <span>{day}</span>
                    <span className="tabular-nums">{entry.opens ? `${entry.opens}–${entry.closes}` : 'Closed'}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="grid content-start gap-3 text-[.95rem]">
            <h2 className="font-display text-[1.15rem] font-semibold text-[#ffd23f]">Find us</h2>
            <p className="flex gap-2"><PinIcon className="mt-0.5" /><a href={mapDirectionsUrl(business.address.mapQuery)}>{addressLine()}</a></p>
            {business.phone ? <p className="flex gap-2"><PhoneIcon className="mt-0.5" /><a href={phoneHref()}>{business.phone}</a></p> : null}
            <p className="flex gap-2"><MailIcon className="mt-0.5" /><a className="break-all" href={`mailto:${business.email}`}>{business.email}</a></p>
            <p className="mt-2 border-t-2 border-dotted border-white/35 pt-3 text-[.85rem] text-[#e4ecff]">{business.allergenNote}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-4 text-[.9rem] text-muted">
          <p>© {business.name}. Sample business for the Jamstacks gallery.</p>
          <span title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="hover:text-accent-ink" href="https://jamstacks.net">jamstacks.net</a></span>
        </div>
      </div>
    </footer>
  );
}
