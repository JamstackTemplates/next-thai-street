"use client";
import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/** Neutral static output; the browser computes open/closed in the business zone and refreshes every minute. */
export function OpenBadge({ hours, fallback = 'Kitchen hours' }: { hours: readonly OpeningHours[]; fallback?: string }) {
  const [label, setLabel] = useState(fallback);
  useEffect(() => {
    const update = () => {
      const next = openingLabel(hours, site.timeZone);
      setLabel(next === 'See opening hours' ? fallback : next);
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours, fallback]);
  return <span>{label}</span>;
}
