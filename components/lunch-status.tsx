'use client';
import { useEffect, useState } from 'react';
import { LUNCH_NEUTRAL, lunchStatus } from '../lib/lunch-status';
import { site } from '../lib/site';
import type { Day } from '../lib/hours';

/**
 * Lunch status line. Static and no-JS output is the neutral schedule. In the browser it names the
 * live ticket and marks it with data-today (lifted and punched by CSS), refreshing every minute.
 */
export function LunchStatus({ tickets, window }: {
  tickets: { id: string; day: Day }[];
  window: { opens: string; closes: string };
}) {
  const [label, setLabel] = useState(LUNCH_NEUTRAL);
  const [state, setState] = useState('neutral');
  useEffect(() => {
    const update = () => {
      const status = lunchStatus(tickets, window, site.timeZone);
      setLabel(status.label);
      setState(status.state);
      document.querySelectorAll<HTMLElement>('[data-ticket]').forEach(el => {
        if (el.dataset.ticket === status.ticketId) el.dataset.today = 'true';
        else delete el.dataset.today;
      });
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [tickets, window]);
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-[var(--surface)] px-4 py-1.5 font-bold text-ink shadow-xs" data-state={state}>
      <span aria-hidden="true" className={`inline-block h-3 w-3 rounded-full ${state === 'on' ? 'bg-[var(--ink-green)]' : 'bg-[var(--accent)]'}`} />
      {label}
    </p>
  );
}
