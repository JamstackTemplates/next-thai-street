// The chilli-o-meter filter. Pure functions shared by the Menu page's client controls and the tests.
import type { MenuItem } from '../content/menu.ts';

export interface MenuFilter {
  /** Highest chilli level to show, or null for any heat. */
  heat: number | null;
  /** Only dishes with a diet value (vegetarian, vegan or vegan on request). */
  veg: boolean;
}

export const NO_FILTER: MenuFilter = { heat: null, veg: false };

/**
 * - show:   within the chosen heat
 * - milder: one level too hot, but the kitchen can make it a level milder
 * - hide:   too hot, or not vegetarian/vegan when that toggle is on
 */
export type Visibility = 'show' | 'milder' | 'hide';

export function dishVisibility(item: Pick<MenuItem, 'chilli' | 'adjustable' | 'diet'>, filter: MenuFilter): Visibility {
  if (filter.veg && !item.diet) return 'hide';
  if (filter.heat === null || item.chilli <= filter.heat) return 'show';
  if (item.adjustable && item.chilli === filter.heat + 1) return 'milder';
  return 'hide';
}

/** Reads ?heat=0..4 and ?veg=1. Anything else means no filter. */
export function parseFilter(search: string): MenuFilter {
  const params = new URLSearchParams(search);
  const raw = params.get('heat');
  const heat = raw !== null && /^[0-4]$/.test(raw) ? Number(raw) : null;
  return { heat, veg: params.get('veg') === '1' };
}

/** Query string for the filter ('' when unfiltered), keeping any unrelated parameters. */
export function filterSearch(filter: MenuFilter, current = ''): string {
  const params = new URLSearchParams(current);
  params.delete('heat');
  params.delete('veg');
  if (filter.heat !== null) params.set('heat', String(filter.heat));
  if (filter.veg) params.set('veg', '1');
  const text = params.toString();
  return text ? `?${text}` : '';
}
