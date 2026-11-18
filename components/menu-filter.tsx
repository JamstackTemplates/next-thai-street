'use client';
import { useEffect, useRef, useState } from 'react';
import { chilliLevels, items, sections } from '../content/menu';
import { dishVisibility, filterSearch, NO_FILTER, parseFilter, type MenuFilter } from '../lib/menu-filter';
import { ChilliOMeter } from './art/chilli-o-meter';
import { LeafIcon } from './art/icons';

/**
 * The chilli-o-meter filter. Without JavaScript (and in static output) it renders a legend only and
 * every dish stays visible. In the browser it shows a radio group and a vegetarian toggle, hides dishes
 * that are too hot, marks adjustable dishes one level too hot as "ask for it milder", and keeps the
 * choice in ?heat= and ?veg=1.
 */
export function MenuHeatFilter() {
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<MenuFilter>(NO_FILTER);
  const [announcement, setAnnouncement] = useState('');
  const first = useRef(true);

  useEffect(() => {
    setFilter(parseFilter(window.location.search));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    let shown = 0;
    for (const item of items) {
      const el = document.getElementById(`dish-${item.id}`);
      if (!el) continue;
      const visibility = dishVisibility(item, filter);
      el.hidden = visibility === 'hide';
      if (visibility === 'milder') el.dataset.milder = 'true';
      else delete el.dataset.milder;
      if (visibility !== 'hide') shown++;
    }
    for (const section of sections) {
      const board = document.querySelector<HTMLElement>(`[data-menu-section="${section.id}"]`);
      const note = board?.querySelector<HTMLElement>('[data-empty-note]');
      if (!board || !note) continue;
      note.hidden = items.some(item => item.sectionId === section.id && dishVisibility(item, filter) !== 'hide');
    }
    const next = `${window.location.pathname}${filterSearch(filter, window.location.search)}${window.location.hash}`;
    window.history.replaceState(window.history.state, '', next);
    if (first.current) { first.current = false; if (filter.heat === null && !filter.veg) return; }
    setAnnouncement(`Showing ${shown} of ${items.length} dishes.`);
  }, [filter, ready]);

  const gauge = <ChilliOMeter level={ready ? filter.heat : 2} compact className="w-16 flex-none sm:w-24 lg:w-28" />;

  if (!ready) {
    return (
      <div className="flex items-center gap-3 lg:gap-4">
        {gauge}
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[.9rem]" aria-label="Chilli levels">
          {chilliLevels.map(l => <li key={l.level}><b className="font-display">{l.level}</b> <span lang="th">{l.thai}</span> {l.label}</li>)}
        </ul>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 lg:gap-5">
      {gauge}
      <div className="min-w-0 flex-1">
        <fieldset className="min-w-0">
          <legend className="mb-1 text-[.85rem] font-bold">Heat: show dishes up to</legend>
          <div className="relative -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible">
            {[null, 0, 1, 2, 3, 4].map(level => {
              const id = `heat-${level ?? 'any'}`;
              const info = level === null ? null : chilliLevels[level];
              return (
                <span key={id} className="relative flex-none">
                  <input type="radio" name="heat" id={id} className="peer sr-only" checked={filter.heat === level}
                    onChange={() => setFilter(f => ({ ...f, heat: level }))} />
                  <label htmlFor={id} className="chip cursor-pointer peer-checked:border-[var(--ink-ink)] peer-checked:bg-[var(--ink-yellow)] peer-checked:text-[var(--ink-ink)] peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--focus)]">
                    {info ? <><b className="font-display">{info.level}</b> {info.label}</> : 'Any heat'}
                  </label>
                </span>
              );
            })}
            <button type="button" aria-pressed={filter.veg} onClick={() => setFilter(f => ({ ...f, veg: !f.veg }))}
              className="chip flex-none aria-pressed:border-[var(--ink-green)] aria-pressed:bg-[var(--ink-green)] aria-pressed:text-white">
              <LeafIcon /> Vegetarian &amp; vegan
            </button>
          </div>
        </fieldset>
        <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
      </div>
    </div>
  );
}
