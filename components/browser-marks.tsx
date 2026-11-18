'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { localTime } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Browser-only enhancements that static output leaves neutral:
 * - marks every [data-day] row for today (in the business time zone) with data-today, every minute
 * - sets data-inview on [data-reveal] elements when they scroll into view (starts the gauge sweep)
 */
export function BrowserMarks() {
  const pathname = usePathname();
  useEffect(() => {
    const mark = () => {
      const local = localTime(site.timeZone);
      document.querySelectorAll<HTMLElement>('[data-day]').forEach(el => {
        if (local && el.dataset.day === local.day) el.dataset.today = 'true';
        else delete el.dataset.today;
      });
    };
    mark();
    const timer = setInterval(mark, 60_000);

    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    let observer: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.inview = 'true';
            observer?.unobserve(entry.target);
          }
        }
      }, { threshold: 0.35 });
      targets.forEach(el => observer!.observe(el));
    }
    return () => { clearInterval(timer); observer?.disconnect(); };
  }, [pathname]);
  return null;
}
