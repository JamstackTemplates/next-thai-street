import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { items, sections, validateMenu, type MenuItem } from '../content/menu.ts';
import { tickets, validateLunch, type LunchTicket } from '../content/lunch.ts';
import { validateHours } from '../lib/hours.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const withItem = (id: string, change: Partial<MenuItem>) => items.map(item => item.id === id ? { ...item, ...change } : item);
const withTicket = (id: string, change: Partial<LunchTicket>) => tickets.map(t => t.id === id ? { ...t, ...change } : t);

test('business content has actionable required fields', () => {
  for (const key of ['name', 'thaiName', 'tagline', 'introduction', 'email', 'allergenNote', 'priceNote'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.usefulToInclude.length >= 4, 'business.enquiries.usefulToInclude: include message guidance');
  assert.doesNotThrow(() => validateHours(business.hours));
});

test('the sample menu and lunch tickets are valid', () => {
  assert.doesNotThrow(() => validateMenu());
  assert.doesNotThrow(() => validateLunch());
  assert.equal(items.length, 22);
  assert.deepEqual(sections.map(s => s.id), ['snacks', 'wok', 'curry', 'noodles', 'sweets-drinks']);
});

test('menu validation names the item to fix', () => {
  const fails = (list: MenuItem[], pattern: RegExp) => assert.throws(() => validateMenu(sections, list), pattern);
  fails([...items, { ...items[0] }], /"chicken-satay": duplicate id/);
  fails(withItem('pad-thai', { id: 'Pad Thai' }), /"Pad Thai": id must be/);
  fails(withItem('pad-thai', { sectionId: 'dessert' }), /"pad-thai": unknown sectionId/);
  fails(withItem('pad-thai', { priceCents: 2125 }), /"pad-thai": priceCents/);
  fails(withItem('pad-thai', { priceCents: 0 }), /"pad-thai": priceCents/);
  fails(withItem('pad-thai', { priceCents: 5000 }), /"pad-thai": priceCents/);
  fails(withItem('pad-thai', { chilli: 5 as never }), /"pad-thai": chilli/);
  fails(withItem('pad-thai', { chilli: 1.5 as never }), /"pad-thai": chilli/);
  fails(withItem('pad-thai', { diet: 'pescatarian' as never }), /"pad-thai": unknown diet/);
  fails(withItem('pad-thai', { allergens: ['celery' as never] }), /"pad-thai": unknown allergen/);
  fails(withItem('lime-soda', { allergens: ['dairy'] }), /"lime-soda": marked vegan but contains dairy/);
  fails(withItem('pad-thai', { availability: 'gone' as never }), /"pad-thai": availability/);
  fails(withItem('pad-thai', { thaiName: ' ' }), /"pad-thai": thaiName is required/);
  fails(items.filter(item => item.sectionId !== 'curry'), /"curry": has no items/);
});

test('lunch validation names the ticket and the dish', () => {
  const fails = (list: LunchTicket[], menu: MenuItem[], pattern: RegExp) => assert.throws(() => validateLunch(list, menu), pattern);
  fails([...tickets, { ...tickets[0] }], items, /"tue-krapow": duplicate id/);
  fails(withTicket('wed-green-curry', { day: 'Tuesday' }), items, /"wed-green-curry": a ticket for Tuesday already exists/);
  fails(withTicket('wed-green-curry', { day: 'Monday' }), items, /"wed-green-curry": day must be Tuesday to Friday/);
  fails(tickets.filter(t => t.day !== 'Friday'), items, /no ticket for Friday/);
  fails(withTicket('thu-khao-soi', { dishId: 'khao-man-gai' }), items, /"thu-khao-soi": dishId "khao-man-gai" is not on the menu/);
  fails(withTicket('thu-khao-soi', { dishId: 'jungle-curry' }), items, /"thu-khao-soi": dish "jungle-curry" is sold out/);
  fails(withTicket('fri-pad-thai', { priceCents: 2750 }), items, /"fri-pad-thai": price must be below "pad-thai" plus "lime-soda"/);
  assert.throws(() => validateLunch(tickets, items, business.hours.map(h => h.day === 'Wednesday' ? { ...h, opens: '12:00' } : h)),
    /"wed-green-curry": the lunch window 11:30–15:00 must fall within Wednesday's kitchen hours/);
});

test('owner edit: putting the jungle curry back on keeps everything valid and lets a ticket use it', () => {
  const menu = withItem('jungle-curry', { availability: 'available' });
  assert.doesNotThrow(() => validateMenu(sections, menu));
  assert.doesNotThrow(() => validateLunch(withTicket('thu-khao-soi', { dishId: 'jungle-curry' }), menu));
});

test('structured data is a Restaurant derived from content, and JSON-LD escapes script content', () => {
  const data = businessStructuredData();
  assert.equal(data['@type'], 'Restaurant');
  assert.equal(data.servesCuisine, 'Thai');
  assert.equal(data.name, business.name);
  assert.equal(data.openingHoursSpecification.length, 6, 'Monday is closed');
  assert.ok(!JSON.stringify(data.openingHoursSpecification).includes('Monday'));
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('copy rules: allergen and price notes are shown; nothing implies bookings, online orders or payment', () => {
  const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  const menuPage = read('app/menu/page.tsx');
  assert.match(menuPage, /business\.priceNote/);
  assert.match(menuPage, /business\.allergenNote/);
  assert.match(business.priceNote, /Prices in AUD, GST included/);
  assert.match(read('components/site-footer.tsx'), /business\.allergenNote/);
  assert.match(business.enquiries.introduction, /Nothing is booked or confirmed until we do/);
  const pages = ['app/page.tsx', 'app/menu/page.tsx', 'app/visit/page.tsx', 'app/contact/page.tsx', 'content/business.ts', 'content/lunch.ts'].map(read).join('\n');
  for (const banned of [/order online/i, /online order/i, /\bdeliver(y|ed)\b/i, /\breserv(e|ation)/i, /\bconfirmed booking/i, /\bpay online/i]) {
    assert.doesNotMatch(pages, banned, `copy must not say ${banned}`);
  }
});
