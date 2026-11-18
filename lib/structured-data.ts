import { business } from '../content/business.ts';
import { absoluteUrl } from './paths.ts';

const DAY_URL: Record<string, string> = {
  Monday: 'https://schema.org/Monday', Tuesday: 'https://schema.org/Tuesday', Wednesday: 'https://schema.org/Wednesday',
  Thursday: 'https://schema.org/Thursday', Friday: 'https://schema.org/Friday', Saturday: 'https://schema.org/Saturday',
  Sunday: 'https://schema.org/Sunday',
};

/** schema.org Restaurant, derived entirely from content/business.ts. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const menu = absoluteUrl('/menu/');
  const { address } = business;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: business.name,
    alternateName: business.thaiName,
    description: business.introduction,
    servesCuisine: 'Thai',
    priceRange: '$$',
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    ...(menu ? { hasMenu: menu } : {}),
    ...(url ? { image: `${url}og.png` } : {}),
    acceptsReservations: false,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postcode,
      addressCountry: address.countryCode,
    },
    openingHoursSpecification: business.hours.filter(day => day.opens && day.closes).map(day => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_URL[day.day],
      opens: day.opens,
      closes: day.closes,
    })),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
