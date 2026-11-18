import { business } from '../content/business';
import { DAYS } from '../lib/hours';
import { TimeZoneNote } from './time-zone-note';

/** Hours as a stainless panel; today's row is highlighted in the browser only (data-day). */
export function HoursBoard({ className = '', title = 'Kitchen hours' }: { className?: string; title?: string }) {
  return (
    <div className={`steel-panel brushed p-5 pt-6 sm:p-6 ${className}`}>
      <h3 className="font-display text-center text-[1.4rem]">{title}</h3>
      <div className="mt-4 rounded-md bg-[var(--surface)]/95 p-3 text-ink shadow-inner">
        <ul className="text-[1.02rem]">
          {DAYS.map(day => {
            const entry = business.hours.find(h => h.day === day)!;
            return (
              <li key={day} data-day={day} className="hours-row">
                <span className="font-semibold">{day}</span>
                <span className="tabular-nums">{entry.opens ? `${entry.opens}–${entry.closes}` : 'Closed'}</span>
              </li>
            );
          })}
        </ul>
        <TimeZoneNote className="mt-2 text-center text-muted" />
      </div>
    </div>
  );
}
