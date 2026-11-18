import type { CSSProperties, ReactNode } from 'react';
import { addressLine, business } from '../content/business';
import { chilliLevels, findItem, formatPrice, type Motif } from '../content/menu';
import { mapDirectionsUrl } from '../lib/maps';
import { ChilliOMeter, ChilliPods } from './art/chilli-o-meter';
import { CounterEdge, SignRule, ThaiLatticeBorder } from './art/dividers';
import { HeroScene } from './art/hero-scene';
import { BikeIcon, PinIcon, TrainIcon, TramIcon } from './art/icons';
import { StationMotif } from './art/station-motif';
import { Tiffin } from './art/tiffin';
import { HoursBoard } from './hours-board';
import { LunchTickets } from './lunch-tickets';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

type Children = { children: ReactNode };
type LinkProps = Children & { href: string };

/* ------------------------------------------------------------------ Hero */

function HeroSection({ children }: Children) {
  return (
    <section aria-labelledby="hero-title" className="hero-sky relative z-10 overflow-x-clip">
      <HeroScene crop="front" className="art-clip relative block h-[240px] w-full md:hidden" />
      <div className="wrap relative grid gap-8 pb-10 pt-5 md:min-h-[40rem] md:grid-cols-[minmax(0,.95fr)_minmax(0,1.3fr)] md:items-center md:pb-0 md:pt-8">
        <div className="relative z-10 md:pb-24">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--steel-3)] bg-[var(--raised)] px-3.5 py-1 text-[.85rem] font-bold tracking-[.04em] text-ink shadow-xs">
            <span lang="th" className="text-accent-ink">ซอยสบาย</span>
            <span aria-hidden="true">·</span>
            <span>WALK-IN THAI STREET STALL</span>
          </p>
          {children}
        </div>
        <div className="relative hidden self-end md:block">
          <HeroScene className="relative -mb-20 w-[116%] max-w-none -translate-x-[4%] lg:-mb-24" />
          <div data-reveal className="menu-card absolute -left-6 top-28 w-36 -rotate-4 border-2 border-[var(--steel-3)] p-2 pb-1.5 shadow-lg lg:w-44">
            <ChilliOMeter level={2} sweep compact />
            <p className="pb-0.5 text-center text-[.78rem] font-bold text-ink">Pick your heat, 0–4</p>
          </div>
        </div>
      </div>
      <CounterEdge />
    </section>
  );
}

function HeroHeading({ children }: Children) {
  return <h1 id="hero-title" className="font-sign text-[clamp(2.4rem,5.2vw,4.15rem)] leading-[1.02] tracking-tight">{children}</h1>;
}

function HeroIntroduction({ children }: Children) {
  return <p className="mt-5 max-w-[34rem] text-[1.18rem] font-medium leading-snug text-muted">{children}</p>;
}

function HeroActions({ children }: Children) {
  return <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">{children}</div>;
}

function HeroPrimary({ href, children }: LinkProps) {
  return <SiteLink href={href} className="button text-[1.1rem]">{children}</SiteLink>;
}

function HeroSecondary({ href, children }: LinkProps) {
  return <SiteLink href={href} className="text-link font-bold">{children}</SiteLink>;
}

/** Open-now badge and address under the actions. No copy: both come from content. */
function HeroDetails() {
  return (
    <div className="mt-7 grid gap-2.5 text-[1rem] font-semibold">
      <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-[var(--surface)] px-4 py-1.5 text-ink shadow-xs">
        <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        <OpenBadge hours={business.hours} />
      </p>
      <p className="flex items-start gap-2"><PinIcon className="mt-0.5 text-accent-ink" /><a href={mapDirectionsUrl(business.address.mapQuery)} className="underline-offset-4 hover:underline">{addressLine()}</a></p>
    </div>
  );
}

export const Hero = Object.assign(HeroSection, {
  Heading: HeroHeading, Introduction: HeroIntroduction, Actions: HeroActions,
  Primary: HeroPrimary, Secondary: HeroSecondary, Details: HeroDetails,
});

/* ------------------------------------------------------------------ Three stations */

function StationsSection({ children }: Children) {
  return (
    <section aria-labelledby="stations-title" className="band-ink relative overflow-hidden pt-16 md:pt-28">
      <div className="wrap relative z-10 pb-20 md:pb-24">{children}</div>
      <ThaiLatticeBorder />
    </section>
  );
}

function StationsHeading({ children }: Children) {
  return (
    <div>
      <h2 id="stations-title" className="font-sign text-[clamp(2rem,5vw,3.3rem)] leading-none text-[var(--sign-yellow)]">{children}</h2>
      <SignRule className="mt-3 text-[var(--sign-yellow)]" />
    </div>
  );
}

function StationsIntro({ children }: Children) {
  return <p className="mt-4 max-w-xl text-[1.1rem] text-band-muted">{children}</p>;
}

function StationsCollage({ children }: Children) {
  return <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-3 lg:gap-7">{children}</div>;
}

const STATION_NUM: Record<'wok' | 'curry' | 'noodles', string> = {
  wok: '01',
  curry: '02',
  noodles: '03',
};

function StationPoster({ station, motif, title, thai, dishes, href, linkLabel, children }: Children & {
  /** Menu section ID: sets the colour and the anchor. */
  station: 'wok' | 'curry' | 'noodles';
  motif: Motif;
  title: string;
  thai: string;
  /** Two dish IDs from content/menu.ts; names, descriptions, heat and prices come from there. */
  dishes: string[];
  href: string;
  linkLabel: string;
}) {
  const stagger = station === 'curry' ? 'lg:translate-y-4' : '';
  return (
    <article className={`station station-${station} menu-card relative flex flex-col overflow-hidden border-2 border-[var(--steel-3)] shadow-[0_0_0_1px_rgba(255,210,63,.16),0_22px_40px_-14px_rgba(0,0,0,.78)] transition-transform duration-300 hover:-translate-y-1 ${stagger}`}>
      {/* Station signboard header with medallion dish illustration */}
      <div className="relative flex flex-col justify-between border-b-4 border-[var(--steel-3)] bg-[var(--station-bg)] px-6 pb-5 pt-5 text-[var(--station-fg)] lg:min-h-[12.75rem]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 text-[.8rem] font-bold tracking-[.12em] uppercase text-[var(--station-muted)]">
              <span>Station {STATION_NUM[station]}</span>
              <span aria-hidden="true">·</span>
              <span lang="th" className="text-[.98rem] tracking-normal">{thai}</span>
            </p>
            <h3 className="font-sign mt-1 text-[clamp(1.6rem,2.2vw,2rem)] leading-[1.04]">{title}</h3>
            <SignRule className="mt-2.5 text-[var(--sign-yellow)]" />
          </div>
          <div className="-mt-1 flex h-24 w-24 flex-none items-center justify-center rounded-full border-2 border-[var(--steel-3)] bg-[var(--ink-paper)] p-1.5 shadow-md">
            <StationMotif motif={motif} className="w-20" />
          </div>
        </div>
        <p className="mt-4 text-[.97rem] font-medium leading-snug text-[var(--station-muted)]">{children}</p>
      </div>

      {/* Menu rows */}
      <div className="flex flex-1 flex-col p-6">
        <ul className="grid gap-4">
          {dishes.map(id => {
            const dish = findItem(id);
            const lvl = chilliLevels[dish.chilli];
            return (
              <li key={id} className="grid gap-1.5 border-b border-dashed border-line pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-display text-[1.08rem] leading-snug text-ink">{dish.name}</span>
                  <span className="price flex-none rounded-md bg-[var(--raised)] px-2 py-0.5 text-[1.12rem]">{formatPrice(dish.priceCents)}</span>
                </div>
                <p className="text-[.92rem] leading-snug text-muted">
                  <span lang="th" className="mr-1.5 font-bold text-ink">{dish.thaiName}</span>
                  {dish.description}
                </p>
                <div className="mt-0.5 flex items-center gap-2 text-[.8rem] font-semibold text-muted">
                  <ChilliPods level={dish.chilli} label={`${lvl.label}, ${lvl.meaning.toLowerCase()}`} adjustable={dish.adjustable} />
                  <span>{lvl.label}</span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto border-t-2 border-dotted border-line pt-4">
          <SiteLink href={href} className="group inline-flex w-full items-center justify-between rounded-md bg-[var(--raised)] px-4 py-2.5 font-display text-[1rem] text-accent-ink no-underline transition-colors hover:bg-[var(--station-bg)] hover:text-[var(--station-fg)]">
            <span>{linkLabel}</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </SiteLink>
        </div>
      </div>
    </article>
  );
}

export const Stations = Object.assign(StationsSection, {
  Heading: StationsHeading, Intro: StationsIntro, Collage: StationsCollage, Poster: StationPoster,
});

/* ------------------------------------------------------------------ Pick your heat */

function HeatSection({ children }: Children) {
  return (
    <section aria-labelledby="heat-title" className="band-green relative overflow-hidden py-16 md:py-20">
      <div className="wrap grid items-center gap-10 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
        <div data-reveal className="mx-auto w-full max-w-[27rem]">
          <ChilliOMeter level={2} sweep className="w-full" />
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function HeatHeading({ children }: Children) {
  return (
    <div>
      <h2 id="heat-title" className="font-sign text-[clamp(2rem,5vw,3.3rem)] leading-none">{children}</h2>
      <SignRule className="mt-3 text-[var(--sign-yellow)]" />
    </div>
  );
}

/** The five levels as a stepped ladder; data from content/menu.ts. */
function HeatLadder() {
  return (
    <ol className="mt-6 grid gap-2.5" aria-label="Chilli levels">
      {chilliLevels.map(l => (
        <li key={l.level} style={{ marginInlineStart: `${l.level * 1.1}rem` }}
          className="flex items-center gap-3 rounded-md border border-[var(--ink-ink)]/20 bg-[var(--ink-paper)] px-3.5 py-2 text-[var(--ink-ink)] shadow-sm">
          <span className={`font-display grid h-8 w-8 flex-none place-items-center rounded-full text-[1.05rem] ${l.level >= 3 || l.level === 0 ? 'text-white' : 'text-[var(--ink-ink)]'}`} style={{ background: `var(--heat-${l.level})` }}>{l.level}</span>
          <span lang="th" className="font-bold">{l.thai}</span>
          <span className="font-semibold">{l.label}</span>
          <span className="ml-auto text-[.92rem] text-[#5d4332]">{l.meaning}</span>
        </li>
      ))}
    </ol>
  );
}

function HeatNote({ children }: Children) {
  return <p className="mt-6 max-w-lg text-[1.08rem] font-medium text-band-muted">{children}</p>;
}

function HeatLink({ href, children }: LinkProps) {
  return <SiteLink href={href} className="button button-yellow mt-6">{children}</SiteLink>;
}

export const HeatBand = Object.assign(HeatSection, { Heading: HeatHeading, Ladder: HeatLadder, Note: HeatNote, Link: HeatLink });

/* ------------------------------------------------------------------ Lunch tickets */

function LunchSection({ children }: Children) {
  return (
    <section aria-labelledby="lunch-title" className="band-steel relative overflow-hidden pb-16 pt-0">
      <CounterEdge />
      <div className="wrap relative grid gap-6 pt-14">{children}</div>
    </section>
  );
}

function LunchText({ title, children, href, linkLabel }: Children & { title: string; href: string; linkLabel: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-[auto_minmax(0,32rem)] md:items-end md:gap-12">
      <div>
        <h2 id="lunch-title" className="font-sign text-[clamp(2rem,5vw,3.4rem)] leading-none">{title}</h2>
        <SignRule className="mt-3 text-accent-ink" />
      </div>
      <div>
        <p className="text-[1.08rem] font-medium text-band-muted">{children}</p>
        <SiteLink href={href} className="text-link mt-3 inline-block font-bold">{linkLabel}</SiteLink>
      </div>
    </div>
  );
}

export const LunchBand = Object.assign(LunchSection, { Text: LunchText, Tickets: () => <LunchTickets className="min-w-0" /> });

/* ------------------------------------------------------------------ Find the soi */

function FindSection({ children }: Children) {
  return (
    <section aria-labelledby="find-title" className="relative py-16 md:py-24">
      <div className="wrap grid items-start gap-12 md:grid-cols-12">{children}</div>
    </section>
  );
}

function FindSign({ title, children, href, linkLabel }: Children & { title: string; href: string; linkLabel: string }) {
  return (
    <div className="md:col-span-7">
      <div className="soi-sign p-7 sm:p-9">
        <p lang="th" className="font-sign text-[1.7rem] leading-none text-[#ffd23f]">{business.thaiName}</p>
        <h2 id="find-title" className="font-display mt-2 text-[clamp(2rem,5vw,3.1rem)] leading-none">{title}</h2>
        <p className="mt-5 flex items-start gap-2 text-[1.15rem] font-semibold"><PinIcon className="mt-1" />{addressLine()}</p>
        <div className="mt-4 max-w-md text-[1.02rem] text-[#e4ecff]">{children}</div>
        <ul className="mt-5 grid gap-1.5 text-[.98rem]">
          <li className="flex gap-2"><TramIcon className="mt-0.5" />{business.gettingHere.tram}</li>
          <li className="flex gap-2"><TrainIcon className="mt-0.5" />{business.gettingHere.train}</li>
          <li className="flex gap-2"><BikeIcon className="mt-0.5" />{business.gettingHere.bike}</li>
        </ul>
      </div>
      <SiteLink href={href} className="button mt-8">{linkLabel}</SiteLink>
    </div>
  );
}

function FindHours() {
  return <div className="md:col-span-5 md:mt-6"><HoursBoard /></div>;
}

export const FindTheSoi = Object.assign(FindSection, { Sign: FindSign, Hours: FindHours });

/* ------------------------------------------------------------------ Feeding a crowd */

function CrowdSection({ children }: Children) {
  return (
    <section aria-labelledby="crowd-title" className="band-sign relative">
      <CounterEdge />
      <div className="wrap relative grid gap-8 py-14 md:grid-cols-[1.1fr_1fr_auto] md:items-center md:py-16">
        {children}
        <Tiffin className="hidden w-40 md:block" />
      </div>
    </section>
  );
}

function CrowdHeading({ children }: Children) {
  return (
    <div>
      <p lang="th" className="font-sign text-[1.45rem] leading-none text-[var(--sign-yellow)]">จัดเลี้ยง · ปิ่นโต</p>
      <h2 id="crowd-title" className="font-sign mt-1 text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[.98]">{children}</h2>
      <SignRule className="mt-3 text-[var(--sign-yellow)]" />
    </div>
  );
}

function CrowdList({ children }: Children) {
  return <ul className="grid gap-0 text-[1.1rem] font-semibold [&>li]:flex [&>li]:items-center [&>li]:gap-3 [&>li]:border-b [&>li]:border-dashed [&>li]:border-white/35 [&>li]:py-3">{children}</ul>;
}

function CrowdAction({ children, note }: Children & { note: string }) {
  return (
    <div className="md:col-span-3">
      <SiteLink href="/contact/" className="button button-yellow">{children}</SiteLink>
      <p className="mt-3 text-[.98rem] text-band-muted">{note}</p>
    </div>
  );
}

export const CrowdBand = Object.assign(CrowdSection, { Heading: CrowdHeading, List: CrowdList, Action: CrowdAction });
