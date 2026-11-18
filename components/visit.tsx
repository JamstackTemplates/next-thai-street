import type { ReactNode } from 'react';
import { SiteLink } from './site-link';

/** A herb-green strip of icon lines. Children are <li> elements. */
export function VisitStrip({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-labelledby="getting-title" className="band-green py-10">
      <div className="wrap grid gap-6 md:grid-cols-[14rem_1fr] md:items-center">
        <h2 id="getting-title" className="font-sign text-[1.9rem] leading-none">{title}</h2>
        <ul className="grid gap-4 text-[1.08rem] font-semibold sm:grid-cols-3 [&>li]:flex [&>li]:items-start [&>li]:gap-3">{children}</ul>
      </div>
    </section>
  );
}

function StepsSection({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <section aria-labelledby="steps-title" className="wrap py-16 md:py-20">
      <h2 id="steps-title" className="font-sign text-[clamp(1.9rem,4vw,2.8rem)] leading-none">{title}</h2>
      <ol className="mt-10 grid gap-10 md:grid-cols-3 [counter-reset:step]">{children}</ol>
      <p className="mt-10 max-w-xl text-[1.05rem]">{note} <SiteLink href="/contact/" className="text-link">Send an enquiry</SiteLink></p>
    </section>
  );
}

function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="relative pl-16 [counter-increment:step] before:absolute before:left-0 before:top-[-.2rem] before:font-sign before:text-[4rem] before:leading-none before:text-[var(--accent-ink)] before:content-[counter(step)]">
      <h3 className="font-display text-[1.45rem]">{title}</h3>
      <p className="mt-2 text-[1.05rem] text-muted">{children}</p>
    </li>
  );
}

export const Steps = Object.assign(StepsSection, { Step });
