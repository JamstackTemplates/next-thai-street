import type { ReactNode } from 'react';
import { allergens, chilliLevels, diets, formatPrice, itemsIn, sections, type MenuItem, type MenuSection } from '../content/menu';
import { ChilliPods } from './art/chilli-o-meter';
import { SignRule } from './art/dividers';
import { LeafIcon } from './art/icons';
import { StationMotif } from './art/station-motif';

function DishRow({ item }: { item: MenuItem }) {
  const level = chilliLevels[item.chilli];
  const soldOut = item.availability === 'sold-out';
  return (
    <li id={`dish-${item.id}`} data-dish={item.id} data-soldout={soldOut ? 'true' : undefined}
      className="dish relative grid gap-1.5 py-4 [&+&]:border-t [&+&]:border-dashed [&+&]:border-line">
      <div className="dish__text flex items-baseline gap-3">
        <h3 className="text-[1.2rem] font-bold leading-snug">
          {item.name}
          {soldOut ? <span className="sr-only"> (sold out today)</span> : null}
        </h3>
        {item.isNew ? <span className="new-tag" aria-label="New dish">New</span> : null}
        <span className="leader" aria-hidden="true" />
        <span className="price text-[1.35rem]"><span className="sr-only">Price </span>{formatPrice(item.priceCents)}</span>
      </div>
      <p className="dish__text text-[1rem]"><span lang="th" className="font-bold">{item.thaiName}</span> <span className="text-muted">{item.description}</span></p>
      <div className="dish__text flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[.85rem]">
        <ChilliPods level={item.chilli} label={`${level.label}, ${level.meaning.toLowerCase()}`} adjustable={item.adjustable} />
        <span className="font-semibold">{level.label}</span>
        {item.diet ? <span className="inline-flex items-center gap-1 font-bold text-green"><LeafIcon />{diets[item.diet]}</span> : null}
        {item.allergens.length ? (
          <span className="inline-flex flex-wrap gap-1" aria-label={`Contains: ${item.allergens.map(a => allergens[a].label).join(', ')}`}>
            {item.allergens.map(a => <abbr key={a} title={allergens[a].label} className="stamp" aria-hidden="true">{allergens[a].code}</abbr>)}
          </span>
        ) : null}
        <span data-milder-note className="items-center gap-1 rounded-full bg-[var(--ink-yellow)] px-2.5 py-0.5 font-bold text-[var(--ink-ink)]">Ask for it a level milder</span>
      </div>
      {soldOut ? <span className="sold-stamp" aria-hidden="true"><span lang="th">หมด</span> · SOLD OUT</span> : null}
    </li>
  );
}

/** One laminated menu card per section: colour-coded station header, motif breaking out, items below. */
function Board({ section, index }: { section: MenuSection; index: number }) {
  const list = itemsIn(section.id);
  const flip = index % 2 === 1;
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} data-menu-section={section.id}
      className={`station station-${section.id} menu-card relative scroll-mt-40 p-5 sm:p-7 md:p-9`}>
      <div className={`grid items-start gap-6 ${flip ? 'md:grid-cols-[minmax(0,1fr)_15.5rem]' : 'md:grid-cols-[15.5rem_minmax(0,1fr)]'}`}>
        <div className={`flex items-center gap-4 rounded-lg border-2 border-[var(--steel-3)] bg-[var(--station-bg)] p-5 text-[var(--station-fg)] shadow-sm md:block ${flip ? 'md:order-2' : ''}`}>
          <StationMotif motif={section.motif} className={`w-28 flex-none sm:w-36 md:-mt-16 md:w-[15rem] ${flip ? 'md:ml-auto' : 'md:-ml-8'}`} />
          <div className="md:mt-3">
            <p lang="th" className="font-sign text-[1.45rem] leading-none text-[var(--station-muted)]">{section.thaiTitle}</p>
            <h2 id={`${section.id}-title`} className="font-display mt-1 text-[clamp(1.75rem,3.6vw,2.35rem)] leading-[1.02]">{section.title}</h2>
            <SignRule className="mt-2.5 text-[var(--station-muted)]" />
            <p className="mt-2.5 max-w-xs font-medium text-[var(--station-muted)]">{section.intro}</p>
          </div>
        </div>
        <div className={`px-1 sm:px-3 ${flip ? 'md:order-1' : ''}`}>
          <ul className="print-columns">{list.map(item => <DishRow key={item.id} item={item} />)}</ul>
          <p data-empty-note hidden className="py-5 font-bold">Nothing at this heat yet. Try one level up.</p>
        </div>
      </div>
    </section>
  );
}

export function MenuBoards({ children }: { children?: ReactNode }) {
  return (
    <div className="wrap grid gap-14 py-12 md:gap-16 md:py-16">
      {sections.map((section, i) => <Board key={section.id} section={section} index={i} />)}
      {children}
    </div>
  );
}

/** Allergen key as a printed menu card. */
export function AllergenKey({ note }: { note: string }) {
  return (
    <section aria-labelledby="allergens-title" className="menu-card border border-line p-6 sm:p-8">
      <h2 id="allergens-title" className="font-display text-[1.5rem]">Allergen key</h2>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {Object.values(allergens).map(a => (
          <li key={a.code} className="inline-flex items-center gap-2 font-semibold"><span className="stamp" aria-hidden="true">{a.code}</span>{a.label}</li>
        ))}
      </ul>
      <p className="mt-5 max-w-3xl border-t border-dashed border-line pt-4 text-muted">{note}</p>
    </section>
  );
}
