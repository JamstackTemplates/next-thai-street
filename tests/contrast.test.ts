import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// Reads the colour tokens straight from app/tailwind.input.css so palette edits are checked.
const css = readFileSync(new URL('../app/tailwind.input.css', import.meta.url), 'utf8');

function block(selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  assert.ok(start >= 0, `missing ${selector} block`);
  const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('\n}', start));
  const tokens: Record<string, string> = {};
  for (const [, name, value] of body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)) tokens[name] = value.toLowerCase();
  return tokens;
}

const light = block(':root {');
const dark = block(':root.dark {');
const auto = block(':root:not(.light) {');

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}
const AA = 4.5;

test('automatic dark mode matches explicit dark mode', () => {
  for (const [name, value] of Object.entries(dark)) assert.equal(auto[name], value, `--${name} differs between dark blocks`);
});

test('text, links and the primary button meet WCAG AA in both themes', () => {
  for (const [mode, t] of [['light', light], ['dark', dark]] as const) {
    const pairs: [string, string, string][] = [
      ['text on bg', t.text, t.bg], ['text on surface', t.text, t.surface], ['text on raised', t.text, t.raised],
      ['muted on bg', t.muted, t.bg], ['muted on surface', t.muted, t.surface],
      ['links on bg', t['accent-ink'], t.bg], ['links on surface', t['accent-ink'], t.surface],
      ['white button text on primary', t['on-accent'], t.accent], ['white on primary hover', t['on-accent'], t['accent-hover']],
      ['header text', t['header-fg'], t['header-bg']],
    ];
    for (const band of ['sign', 'green', 'steel', 'ink', 'yellow']) {
      pairs.push([`${band} band text`, t[`band-${band}-fg`], t[`band-${band}-bg`]]);
      pairs.push([`${band} band muted`, t[`band-${band}-muted`], t[`band-${band}-bg`]]);
    }
    for (const [label, fg, bg] of pairs) {
      assert.ok(fg && bg, `${mode}: ${label} tokens missing`);
      assert.ok(contrast(fg, bg) >= AA, `${mode}: ${label} ${fg} on ${bg} is ${contrast(fg, bg).toFixed(2)}:1`);
    }
  }
});

test('every station board pairing meets WCAG AA', () => {
  for (const station of ['snacks', 'wok', 'curry', 'noodles', 'sweets-drinks']) {
    const rule = css.match(new RegExp(`\\.station-${station} \\{([^}]*)\\}`));
    assert.ok(rule, `missing .station-${station}`);
    const value = (name: string) => rule[1].match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))![1];
    const bg = value('station-bg');
    for (const fg of ['station-fg', 'station-muted']) {
      assert.ok(contrast(value(fg), bg) >= AA, `${station}: ${fg} ${value(fg)} on ${bg} is ${contrast(value(fg), bg).toFixed(2)}:1`);
    }
  }
});
