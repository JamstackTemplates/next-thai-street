// Weekday lunch tickets. To change this week's special, edit the ticket for that day:
// point `dishId` at a dish in content/menu.ts, then update `title`, `includes` and `priceCents`.
// `npm test` fails and names the ticket if the dish is missing or sold out, or the price is too high.
import { business } from './business.ts';
import { findItem, items, type MenuItem } from './menu.ts';
import { DAYS, toMinutes, type Day, type OpeningHours } from '../lib/hours.ts';

export interface LunchTicket {
  /** Stable, unique, URL-safe ID. */
  id: string;
  /** Tuesday to Friday, one ticket each. */
  day: Day;
  /** ID of an `available` item in content/menu.ts. */
  dishId: string;
  title: string;
  /** What comes with the dish. */
  includes: string[];
  /** AUD cents; must be below the dish's menu price plus a salted lime soda. */
  priceCents: number;
}

/** The lunch-ticket window, local time in site.config.json's timeZone. Must sit inside each ticket day's hours. */
export const lunchWindow = { opens: '11:30', closes: '15:00' } as const;

/** The drink every ticket includes; used for the price check. */
export const LUNCH_DRINK_ID = 'lime-soda';

export const LUNCH_DAYS: readonly Day[] = ['Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const tickets: LunchTicket[] = [
  { id: 'tue-krapow', day: 'Tuesday', dishId: 'pad-krapow', title: 'Krapow Tuesday',
    includes: ['jasmine rice', 'fried egg', 'salted lime soda'], priceCents: 1750 },
  { id: 'wed-green-curry', day: 'Wednesday', dishId: 'green-curry', title: 'Green curry Wednesday',
    includes: ['jasmine rice', 'cucumber relish', 'salted lime soda'], priceCents: 1850 },
  { id: 'thu-khao-soi', day: 'Thursday', dishId: 'khao-soi', title: 'Khao soi Thursday',
    includes: ['pickled mustard greens', 'lime', 'salted lime soda'], priceCents: 1900 },
  { id: 'fri-pad-thai', day: 'Friday', dishId: 'pad-thai', title: 'Pad Thai Friday',
    includes: ['lime and crushed peanuts', 'salted lime soda'], priceCents: 1800 },
];

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Throws an error naming the ticket (and dish) to fix. */
export function validateLunch(
  lunchTickets: readonly LunchTicket[] = tickets,
  menuItems: readonly MenuItem[] = items,
  hours: readonly OpeningHours[] = business.hours,
  window: { opens: string; closes: string } = lunchWindow,
): void {
  const drink = menuItems.find(item => item.id === LUNCH_DRINK_ID);
  if (!drink) throw new Error(`lunch: the included drink "${LUNCH_DRINK_ID}" is missing from the menu`);
  if (toMinutes(window.opens) >= toMinutes(window.closes)) throw new Error('lunch: lunchWindow must open before it closes');
  const ids = new Set<string>();
  const days = new Set<Day>();
  for (const ticket of lunchTickets) {
    const where = `lunch ticket "${ticket.id}"`;
    if (!SLUG.test(ticket.id)) throw new Error(`${where}: id must be a lowercase URL-safe slug`);
    if (ids.has(ticket.id)) throw new Error(`${where}: duplicate id`);
    ids.add(ticket.id);
    if (!LUNCH_DAYS.includes(ticket.day)) throw new Error(`${where}: day must be Tuesday to Friday (got ${ticket.day})`);
    if (days.has(ticket.day)) throw new Error(`${where}: a ticket for ${ticket.day} already exists`);
    days.add(ticket.day);
    if (!ticket.title.trim()) throw new Error(`${where}: title is required`);
    if (!ticket.includes.length || ticket.includes.some(entry => !entry.trim())) throw new Error(`${where}: includes needs at least one item`);
    const dish = menuItems.find(item => item.id === ticket.dishId);
    if (!dish) throw new Error(`${where}: dishId "${ticket.dishId}" is not on the menu`);
    if (dish.availability !== 'available') throw new Error(`${where}: dish "${dish.id}" is sold out; choose another dish`);
    if (!Number.isInteger(ticket.priceCents) || ticket.priceCents <= 0 || ticket.priceCents % 50 !== 0) {
      throw new Error(`${where}: priceCents must be a positive multiple of 50 cents`);
    }
    if (ticket.priceCents >= dish.priceCents + drink.priceCents) {
      throw new Error(`${where}: price must be below "${dish.id}" plus "${LUNCH_DRINK_ID}" (${dish.priceCents + drink.priceCents} cents)`);
    }
    const day = hours.find(entry => entry.day === ticket.day);
    if (!day?.opens || !day.closes || toMinutes(window.opens) < toMinutes(day.opens) || toMinutes(window.closes) > toMinutes(day.closes)) {
      throw new Error(`${where}: the lunch window ${window.opens}–${window.closes} must fall within ${ticket.day}'s kitchen hours`);
    }
  }
  for (const day of LUNCH_DAYS) if (!days.has(day)) throw new Error(`lunch: no ticket for ${day}`);
}

validateLunch();

export function ticketDish(ticket: LunchTicket): MenuItem {
  return findItem(ticket.dishId);
}

/** Tickets in weekday order. */
export function orderedTickets(): LunchTicket[] {
  return [...tickets].sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day));
}
