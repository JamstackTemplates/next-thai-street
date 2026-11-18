import { lunchWindow, orderedTickets, ticketDish } from '../content/lunch';
import { formatPrice } from '../content/menu';
import type { CSSProperties } from 'react';
import { TicketRail } from './art/dividers';
import { LunchStatus } from './lunch-status';

const DROPS = ['0px', '8px', '2px', '10px'];

/** The weekday lunch dockets clipped to the kitchen ticket rail. Data from content/lunch.ts. */
export function LunchTickets({ className = '' }: { className?: string }) {
  const list = orderedTickets();
  return (
    <div className={className}>
      <LunchStatus tickets={list.map(t => ({ id: t.id, day: t.day }))} window={lunchWindow} />
      <div className="relative mt-4">
        <TicketRail />
        <ul className="scroller scroller-grid -mt-1.5" aria-label="Lunch tickets, Tuesday to Friday">
          {list.map((ticket, i) => {
            const dish = ticketDish(ticket);
            return (
              <li key={ticket.id} data-ticket={ticket.id} className="docket w-[16.5rem]" style={{ '--drop': DROPS[i % DROPS.length] } as CSSProperties}>
                <div className="docket__head">
                  <span className="font-sign text-[1.35rem] leading-none">{ticket.day.slice(0, 3)}</span>
                  <span className="text-[.75rem] font-bold tabular-nums opacity-75">#{String(412 + i * 7).padStart(4, '0')}</span>
                </div>
                <div className="docket__body">
                  <span className="docket__on w-fit items-center gap-1.5 rounded-full bg-[var(--ink-green)] px-2.5 py-0.5 text-[.8rem] font-bold text-white">On now</span>
                  <h3 className="font-display text-[1.2rem] leading-tight">{ticket.title}</h3>
                  <p className="text-[.95rem]"><span lang="th" className="font-semibold">{dish.thaiName}</span> · {dish.name}</p>
                  <p className="text-[.9rem] text-[#5d4332]">With {ticket.includes.join(', ')}.</p>
                  <div className="mt-2 flex items-baseline justify-between border-t border-dotted border-[var(--ink-ink)]/30 pt-2">
                    <span className="text-[.82rem] font-semibold text-[#5d4332]">{ticket.day}, {lunchWindow.opens}–{lunchWindow.closes}</span>
                    <span className="price text-[1.45rem]" style={{ '--price': 'var(--ink-red)' } as CSSProperties}>{formatPrice(ticket.priceCents)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
