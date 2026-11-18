import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { items } from '../content/menu.ts';
import { lunchWindow, tickets } from '../content/lunch.ts';
import { openingLabel, validateHours } from '../lib/hours.ts';
import { LUNCH_NEUTRAL, lunchStatus } from '../lib/lunch-status.ts';
import { dishVisibility, filterSearch, parseFilter } from '../lib/menu-filter.ts';

const ZONE = 'Australia/Melbourne';
// 17 Nov 2026 is a Tuesday. Melbourne is UTC+11 (AEDT) in November.
const badge = (iso: string) => openingLabel(business.hours, ZONE, new Date(iso));
const lunch = (iso: string) => lunchStatus(tickets, lunchWindow, ZONE, new Date(iso));

test('kitchen hours: opens 11:30 Tuesday, closes 21:30 Tuesday, closed all Monday', () => {
  assert.equal(badge('2026-11-17T00:29:00Z'), 'Closed · opens today at 11:30');
  assert.equal(badge('2026-11-17T00:30:00Z'), 'Open now · until 21:30');
  assert.equal(badge('2026-11-17T10:29:00Z'), 'Open now · until 21:30');
  assert.equal(badge('2026-11-17T10:30:00Z'), 'Closed · opens Wednesday at 11:30');
  for (const iso of ['2026-11-15T13:00:00Z', '2026-11-16T01:00:00Z', '2026-11-16T08:00:00Z', '2026-11-16T12:59:00Z']) {
    assert.match(badge(iso), /^Closed · opens Tuesday at 11:30$/, iso);
  }
});

test('Sunday 12:00 opening holds across both Melbourne DST changes', () => {
  // DST starts Sunday 4 Oct 2026 (02:00 AEST → 03:00 AEDT): noon is 01:00Z.
  assert.equal(badge('2026-10-04T00:59:00Z'), 'Closed · opens today at 12:00');
  assert.equal(badge('2026-10-04T01:00:00Z'), 'Open now · until 21:00');
  // DST ends Sunday 5 Apr 2026 (03:00 AEDT → 02:00 AEST): noon is 02:00Z.
  assert.equal(badge('2026-04-05T01:59:00Z'), 'Closed · opens today at 12:00');
  assert.equal(badge('2026-04-05T02:00:00Z'), 'Open now · until 21:00');
});

test('overnight intervals fail validation', () => {
  assert.throws(() => validateHours(business.hours.map(h => h.day === 'Friday' ? { ...h, closes: '01:00' } : h)), /Friday/);
});

test('lunch status: on at 14:59 Wednesday, done at 15:00, neutral without a zone', () => {
  // Wednesday 18 Nov 2026: 14:59 AEDT = 03:59Z.
  assert.deepEqual(lunch('2026-11-18T03:59:00Z'), { state: 'on', ticketId: 'wed-green-curry', label: 'On now · until 15:00' });
  assert.equal(lunch('2026-11-18T04:00:00Z').state, 'after');
  assert.equal(lunch('2026-11-18T04:00:00Z').ticketId, undefined);
  assert.match(lunch('2026-11-18T04:00:00Z').label, /Lunch is done for today · next ticket Thursday/);
  assert.deepEqual(lunch('2026-11-18T00:29:00Z'), { state: 'before', ticketId: 'wed-green-curry', label: 'Today’s lunch ticket · from 11:30' });
  assert.equal(lunch('2026-11-18T00:30:00Z').state, 'on');
  assert.match(lunch('2026-11-20T05:00:00Z').label, /next ticket Tuesday/, 'Friday afternoon points to Tuesday');
  assert.deepEqual(lunch('2026-11-21T01:00:00Z'), { state: 'off', label: 'Next lunch ticket: Tuesday' }, 'Saturday');
  assert.equal(lunch('2026-11-16T01:00:00Z').label, 'Next lunch ticket: Tuesday', 'Monday');
  assert.deepEqual(lunchStatus(tickets, lunchWindow, '', new Date()), { state: 'neutral', label: LUNCH_NEUTRAL });
  assert.equal(LUNCH_NEUTRAL, `Lunch tickets run Tuesday to Friday, ${lunchWindow.opens}–${lunchWindow.closes}`);
});

const visible = (search: string) => items.filter(item => dishVisibility(item, parseFilter(search)) !== 'hide').map(item => item.id);
const item = (id: string) => items.find(entry => entry.id === id)!;

test('heat filter: ?heat=1 hides very spicy dishes; ?heat=2 keeps adjustable level-3 dishes as "milder"', () => {
  assert.ok(!visible('?heat=1').includes('pad-krapow'));
  assert.ok(!visible('?heat=1').includes('som-tam'));
  assert.equal(dishVisibility(item('pad-krapow'), parseFilter('?heat=2')), 'milder');
  assert.equal(dishVisibility(item('pad-pak-boong'), parseFilter('?heat=2')), 'show');
  assert.equal(dishVisibility(item('jungle-curry'), parseFilter('?heat=3')), 'hide', 'not adjustable');
  assert.equal(dishVisibility(item('jungle-curry'), parseFilter('?heat=4')), 'show');
  assert.ok(visible('?heat=0').every(id => item(id).chilli <= 1));
});

test('heat filter: ?veg=1 shows only dishes with a diet value; no filter shows all 22', () => {
  assert.ok(visible('?veg=1').length > 0);
  assert.ok(visible('?veg=1').every(id => item(id).diet));
  assert.equal(visible('').length, 22);
  assert.equal(visible('?heat=9&veg=yes').length, 22, 'invalid values mean no filter');
});

test('heat filter keeps the URL in step and preserves other parameters', () => {
  assert.equal(filterSearch({ heat: 2, veg: false }), '?heat=2');
  assert.equal(filterSearch({ heat: null, veg: true }, '?heat=3&utm=x'), '?utm=x&veg=1');
  assert.equal(filterSearch({ heat: null, veg: false }, '?heat=3'), '');
  assert.deepEqual(parseFilter('?heat=0&veg=1'), { heat: 0, veg: true });
});
