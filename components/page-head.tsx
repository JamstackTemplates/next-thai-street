import type { ReactNode } from 'react';
import { CounterEdge, SignRule } from './art/dividers';

/** Inner-page head: atmospheric dusk paper backdrop, framed lacquer signboard and oversized dish art. */
export function PageHead({ title, thai, children, art, id }: {
  title: ReactNode;
  /** The page title in Thai script. */
  thai: string;
  children?: ReactNode;
  /** Optional illustration on the right. */
  art?: ReactNode;
  id?: string;
}) {
  return (
    <header className="pagehead-bg relative overflow-hidden">
      <div className="wrap grid items-center gap-8 py-[clamp(2.25rem,5vw,4rem)] md:grid-cols-[minmax(0,1.25fr)_minmax(0,.95fr)]">
        <div>
          <div className="signboard inline-block px-6 pb-4 pt-3.5 sm:px-8">
            <p lang="th" className="font-sign text-[clamp(2.6rem,7vw,4.5rem)] leading-[1.05] text-[var(--sign-yellow)] drop-shadow-[0_2px_0_rgba(30,20,16,.45)]">{thai}</p>
            <h1 id={id} className="font-display mt-1 text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-tight text-[#fffaf0]">{title}</h1>
            <SignRule className="mt-2.5 text-[var(--sign-yellow)]" />
          </div>
          {children ? <div className="mt-6 max-w-(--measure) text-[1.15rem] font-medium text-ink">{children}</div> : null}
        </div>
        {art ? <div className="relative flex justify-center md:justify-end">{art}</div> : null}
      </div>
      <CounterEdge />
    </header>
  );
}
