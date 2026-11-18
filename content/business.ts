// Soi Sabai's shared business details. Sample data for the Jamstacks gallery: replace every value
// (especially the address, which is a public landmark used as a demo map pin) before publishing.
import type { OpeningHours } from '../lib/hours.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** The name in Thai script, used beside the wordmark and on the soi signs. */
  thaiName: string;
  /** Short line used in metadata and the social image alt text. */
  tagline: string;
  /** Plain-text introduction used for fallback metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public number as written locally; blank hides it. */
  phone: string;
  /** Postal address. `mapQuery` is what the map and directions links search for. */
  address: {
    street: string;
    locality: string;
    region: string;
    postcode: string;
    country: string;
    countryCode: string;
    mapQuery: string;
  };
  /** One line each: how to get here. */
  gettingHere: { tram: string; train: string; bike: string };
  /**
   * Kitchen hours, one entry per weekday, in site.config.json's timeZone.
   * Same-day intervals only: overnight hours fail validation.
   */
  hours: OpeningHours[];
  /** Shown on Menu and in the footer. */
  allergenNote: string;
  /** Shown on Menu. */
  priceNote: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Must say nothing is booked or confirmed until the kitchen replies. */
    introduction: string;
    /** Suggestions for the message text, not additional form inputs. */
    usefulToInclude: string[];
  };
}

export const business: Business = {
  name: 'Soi Sabai',
  thaiName: 'ซอยสบาย',
  tagline: 'Wok-hot Thai street food, as fiery as you like.',
  introduction: 'Soi Sabai cooks wok-fired Thai street food in Melbourne: stir-fries, curries and noodles on a five-step chilli scale, with weekday lunch specials.',
  email: 'hello@example.com',
  phone: '(03) 5550 4127',
  address: {
    street: 'Queen Victoria Market, corner of Queen and Victoria Streets',
    locality: 'Melbourne',
    region: 'VIC',
    postcode: '3000',
    country: 'Australia',
    countryCode: 'AU',
    mapQuery: 'Queen Victoria Market, Queen St, Melbourne VIC 3000, Australia',
  },
  gettingHere: {
    tram: 'Trams along Elizabeth and William Streets stop at the market.',
    train: 'Flagstaff Station is a five-minute walk.',
    bike: 'Bike hoops are on Queen Street.',
  },
  hours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '11:30', closes: '21:30' },
    { day: 'Wednesday', opens: '11:30', closes: '21:30' },
    { day: 'Thursday', opens: '11:30', closes: '21:30' },
    { day: 'Friday', opens: '11:30', closes: '22:30' },
    { day: 'Saturday', opens: '12:00', closes: '22:30' },
    { day: 'Sunday', opens: '12:00', closes: '21:00' },
  ],
  allergenNote: 'Our woks and fryers are shared, and we cook with peanuts, shellfish, fish sauce, gluten and soy every day. We can’t promise any dish is free of an allergen, so tell us about allergies when you order.',
  priceNote: 'Prices in AUD, GST included. Order and pay at the counter. Every dish is cooked to order.',
  enquiries: {
    title: 'Send us an enquiry',
    introduction: 'Planning a group table, an office lunch or an event? Tell us about it and we’ll reply by email. Nothing is booked or confirmed until we do.',
    usefulToInclude: [
      'The type of enquiry: group table, catering or event',
      'The date and time',
      'The number of people',
      'The suburb, for catering and events',
      'Preferred chilli levels',
      'Any allergies or dietary needs',
    ],
  },
};

/** One-line address for display and structured data. */
export function addressLine(a = business.address): string {
  return `${a.street}, ${a.locality} ${a.region} ${a.postcode}`;
}

/** tel: link for the public phone number (Australian local format to +61). */
export function phoneHref(phone = business.phone): string {
  return `tel:+61${phone.replace(/\D/g, '').replace(/^0/, '')}`;
}
