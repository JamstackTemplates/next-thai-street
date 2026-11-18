import type { ReactNode } from 'react';

/** The kinds of enquiry, as a stack of fare-stub tickets. */
export function EnquiryTypes({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-labelledby="types-title">
      <h2 id="types-title" className="font-display text-[1.6rem] leading-none">{title}</h2>
      <ul className="mt-5 grid gap-4">{children}</ul>
    </section>
  );
}

export function EnquiryType({ title, stub, children }: { title: string; stub: string; children: ReactNode }) {
  return (
    <li className="menu-card flex overflow-hidden">
      <span className="font-sign grid w-20 flex-none place-items-center border-r border-dashed border-line bg-[var(--sign-yellow)] text-[1.15rem] text-[var(--ink-ink)]">{stub}</span>
      <span className="p-4">
        <span className="block font-display text-[1.15rem]">{title}</span>
        <span className="mt-1 block text-muted">{children}</span>
      </span>
    </li>
  );
}
