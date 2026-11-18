// Which lunch ticket is live right now. Pure: browser callers pass the clock; static output never calls this.
import { DAYS, localTime, toMinutes, type Day } from './hours.ts';

export type LunchState = 'on' | 'before' | 'after' | 'off' | 'neutral';

export interface LunchStatus {
  state: LunchState;
  /** The ticket to highlight (today's), if any. */
  ticketId?: string;
  label: string;
}

export const LUNCH_NEUTRAL = 'Lunch tickets run Tuesday to Friday, 11:30–15:00';

export function lunchStatus(
  tickets: readonly { id: string; day: Day }[],
  window: { opens: string; closes: string },
  timeZone: string,
  now = new Date(),
): LunchStatus {
  const local = localTime(timeZone, now);
  if (!local || !tickets.length) return { state: 'neutral', label: LUNCH_NEUTRAL };
  const nextDay = (fromIndex: number): Day => {
    for (let offset = 1; offset <= 7; offset++) {
      const day = DAYS[(fromIndex + offset) % 7];
      if (tickets.some(ticket => ticket.day === day)) return day;
    }
    return tickets[0].day;
  };
  const index = DAYS.indexOf(local.day);
  const today = tickets.find(ticket => ticket.day === local.day);
  if (!today) return { state: 'off', label: `Next lunch ticket: ${nextDay(index)}` };
  if (local.minutes < toMinutes(window.opens)) return { state: 'before', ticketId: today.id, label: `Today’s lunch ticket · from ${window.opens}` };
  if (local.minutes < toMinutes(window.closes)) return { state: 'on', ticketId: today.id, label: `On now · until ${window.closes}` };
  return { state: 'after', label: `Lunch is done for today · next ticket ${nextDay(index)}` };
}
