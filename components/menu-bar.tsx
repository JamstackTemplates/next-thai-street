import type { ReactNode } from 'react';
import { sections } from '../content/menu';
import { CounterEdge } from './art/dividers';
import { LunchTickets } from './lunch-tickets';
import { MenuHeatFilter } from './menu-filter';

/** Sticky control bar: the chilli-o-meter filter and jump links to each section. */
export function MenuBar({ jumpLabel }: { jumpLabel: string }) {
  return (
    <div className="no-print sticky top-0 z-20 border-b border-line bg-[var(--surface)]/95 backdrop-blur-sm">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-2 py-2.5 lg:gap-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
        <MenuHeatFilter />
        <nav aria-label={jumpLabel} className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:pb-0">
          <a href="#lunch" className="chip">Lunch</a>
          {sections.map(s => <a key={s.id} href={`#${s.id}`} className="chip">{s.title}</a>)}
        </nav>
      </div>
    </div>
  );
}

/** Lunch specials band on Menu. */
export function MenuLunch({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section id="lunch" aria-labelledby="menu-lunch-title" className="band-steel relative scroll-mt-40 overflow-hidden py-12">
      <div className="wrap relative grid gap-6">
        <div className="grid gap-4 md:grid-cols-[auto_minmax(0,34rem)] md:items-end md:gap-12">
          <h2 id="menu-lunch-title" className="font-sign text-[clamp(2rem,5vw,3rem)] leading-none">{title}</h2>
          <div className="grid gap-2 text-[1.05rem] font-medium text-band-muted">{children}</div>
        </div>
        <LunchTickets className="min-w-0" />
      </div>
      <CounterEdge className="mt-8" />
    </section>
  );
}
