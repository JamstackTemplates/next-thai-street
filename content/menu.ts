// Soi Sabai's menu. The owner edits this file most often:
// - sold out today:   set `availability: 'sold-out'` (back on: 'available')
// - new price:        change `priceCents` (AUD cents, a multiple of 50, e.g. 1950 = $19.50)
// - hotter or milder: change `chilli` (0–4, see chilliLevels) or `adjustable`
// - new dish:         copy an item, give it a new unique `id`, and set `isNew: true`
// `npm test` checks every rule below and names the item to fix.

/** Five-step chilli scale used by the chilli-o-meter, the filter and every dish row. */
export const chilliLevels = [
  { level: 0, thai: 'ไม่เผ็ด', label: 'Mai phet', meaning: 'Not spicy' },
  { level: 1, thai: 'นิดหน่อย', label: 'Nit noi', meaning: 'A little' },
  { level: 2, thai: 'เผ็ด', label: 'Phet', meaning: 'Spicy' },
  { level: 3, thai: 'เผ็ดมาก', label: 'Phet mak', meaning: 'Very spicy' },
  { level: 4, thai: 'เผ็ดมากๆ', label: 'Phet mak mak', meaning: 'Thai hot' },
] as const;

export type ChilliLevel = 0 | 1 | 2 | 3 | 4;
export const MAX_CHILLI = 4;

/** Fixed allergen set. `code` is the short stamp printed on dish rows. */
export const allergens = {
  peanut: { code: 'P', label: 'Peanut' },
  'tree-nut': { code: 'TN', label: 'Tree nuts' },
  shellfish: { code: 'SF', label: 'Shellfish' },
  fish: { code: 'F', label: 'Fish (incl. fish sauce)' },
  egg: { code: 'E', label: 'Egg' },
  soy: { code: 'S', label: 'Soy' },
  gluten: { code: 'G', label: 'Gluten' },
  sesame: { code: 'SE', label: 'Sesame' },
  dairy: { code: 'D', label: 'Dairy' },
} as const;
export type Allergen = keyof typeof allergens;

export const diets = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  'vegan-on-request': 'Vegan on request',
} as const;
export type Diet = keyof typeof diets;

/** Art key for each section's station motif (components/art/station-motif.tsx). */
export type Motif = 'skewers' | 'wok' | 'pot' | 'bowl' | 'glass';

export interface MenuSection {
  /** Stable URL-safe ID, also the page anchor (/menu/#wok). */
  id: string;
  title: string;
  thaiTitle: string;
  /** One line under the section title. */
  intro: string;
  motif: Motif;
}

export interface MenuItem {
  /** Stable, unique, URL-safe slug. Lunch tickets refer to dishes by this ID. */
  id: string;
  /** Must match a section ID. Items show in file order within their section. */
  sectionId: string;
  name: string;
  /** Thai script name. */
  thaiName: string;
  /** One sentence. */
  description: string;
  /** AUD cents including GST: positive, a multiple of 50 and below 5000. */
  priceCents: number;
  /** 0 (mai phet) to 4 (Thai hot). */
  chilli: ChilliLevel;
  /** True when the kitchen can make it one level milder or hotter. */
  adjustable: boolean;
  diet?: Diet;
  allergens: Allergen[];
  availability: 'available' | 'sold-out';
  /** Shows a "New" starburst. */
  isNew?: boolean;
}

export const sections: MenuSection[] = [
  { id: 'snacks', title: 'Street snacks', thaiTitle: 'ของทานเล่น', motif: 'skewers',
    intro: 'Off the charcoal and out of the fryer: things to eat while the wok heats up.' },
  { id: 'wok', title: 'From the wok', thaiTitle: 'จานผัด', motif: 'wok',
    intro: 'Seared hard and fast over a roaring burner, served with jasmine rice.' },
  { id: 'curry', title: 'Curry pots', thaiTitle: 'แกง', motif: 'pot',
    intro: 'Pastes pounded in the morning, simmered all day. Curries come with jasmine rice.' },
  { id: 'noodles', title: 'Noodle bar', thaiTitle: 'ก๋วยเตี๋ยว', motif: 'bowl',
    intro: 'Wok-tossed and soup noodles, with the condiment caddy on the counter.' },
  { id: 'sweets-drinks', title: 'Sweets & drinks', thaiTitle: 'ของหวานและเครื่องดื่ม', motif: 'glass',
    intro: 'Something cold and sweet to put the fire out.' },
];

export const items: MenuItem[] = [
  // Street snacks
  { id: 'chicken-satay', sectionId: 'snacks', name: 'Chicken satay', thaiName: 'สะเต๊ะไก่', priceCents: 1400, chilli: 0, adjustable: false,
    allergens: ['peanut', 'soy'], availability: 'available',
    description: 'Turmeric-marinated thigh skewers grilled over charcoal, with peanut sauce and cucumber relish.' },
  { id: 'curry-puffs', sectionId: 'snacks', name: 'Curry puffs', thaiName: 'กะหรี่ปั๊บ', priceCents: 1100, chilli: 1, adjustable: false,
    diet: 'vegetarian', allergens: ['gluten', 'egg'], availability: 'available',
    description: 'Flaky spiral pastry crimped around potato, onion and mild yellow curry, fried to order.' },
  { id: 'moo-ping', sectionId: 'snacks', name: 'Grilled pork skewers', thaiName: 'หมูปิ้ง', priceCents: 1300, chilli: 0, adjustable: false,
    allergens: ['soy', 'fish'], availability: 'available',
    description: 'Coconut-milk and palm-sugar pork, charred at the edges, with a bag of sticky rice.' },
  { id: 'som-tam', sectionId: 'snacks', name: 'Green papaya salad', thaiName: 'ส้มตำ', priceCents: 1600, chilli: 3, adjustable: true,
    allergens: ['peanut', 'fish', 'shellfish'], availability: 'available',
    description: 'Shredded green papaya pounded in the mortar with lime, chilli, dried shrimp and roasted peanuts.' },
  // From the wok
  { id: 'pad-krapow', sectionId: 'wok', name: 'Holy basil stir-fry with fried egg', thaiName: 'ผัดกะเพรา', priceCents: 1950, chilli: 3, adjustable: true,
    allergens: ['fish', 'soy', 'egg', 'gluten'], availability: 'available',
    description: 'Minced chicken slammed through a smoking wok with holy basil, bird’s-eye chilli and garlic, over rice with a crisp-edged fried egg.' },
  { id: 'pad-prik-king', sectionId: 'wok', name: 'Red curry paste green beans with pork', thaiName: 'ผัดพริกขิง', priceCents: 1950, chilli: 2, adjustable: true,
    allergens: ['fish', 'shellfish'], availability: 'available',
    description: 'Crunchy snake beans and sliced pork dry-fried in red curry paste with kaffir lime leaf.' },
  { id: 'pad-pak-boong', sectionId: 'wok', name: 'Fire-flash morning glory', thaiName: 'ผัดผักบุ้งไฟแดง', priceCents: 1600, chilli: 2, adjustable: true,
    diet: 'vegan-on-request', allergens: ['soy', 'fish'], availability: 'available',
    description: 'Water spinach thrown into a flaming wok with garlic, chilli and yellow bean sauce: ninety seconds, done.' },
  { id: 'cashew-chicken', sectionId: 'wok', name: 'Cashew chicken', thaiName: 'ไก่ผัดเม็ดมะม่วงหิมพานต์', priceCents: 2100, chilli: 1, adjustable: true,
    allergens: ['tree-nut', 'soy', 'gluten'], availability: 'available',
    description: 'Crisp chicken, toasted cashews, onion and dried chilli in a glossy, sweet-salty sauce.' },
  { id: 'khao-pad', sectionId: 'wok', name: 'Thai fried rice', thaiName: 'ข้าวผัด', priceCents: 1800, chilli: 0, adjustable: false,
    allergens: ['egg', 'soy', 'fish'], availability: 'available',
    description: 'Day-old jasmine rice, egg, Chinese broccoli and chicken, with lime and prik nam pla on the side.' },
  // Curry pots
  { id: 'green-curry', sectionId: 'curry', name: 'Green curry chicken', thaiName: 'แกงเขียวหวานไก่', priceCents: 2200, chilli: 3, adjustable: true,
    allergens: ['fish', 'shellfish'], availability: 'available',
    description: 'Fresh green chilli paste, coconut cream, pea eggplant and Thai basil around tender chicken thigh.' },
  { id: 'panang-beef', sectionId: 'curry', name: 'Panang beef', thaiName: 'พะแนงเนื้อ', priceCents: 2300, chilli: 2, adjustable: true,
    allergens: ['peanut', 'fish', 'shellfish'], availability: 'available',
    description: 'A thick, nutty red curry clinging to slow-cooked beef, finished with shredded kaffir lime leaf.' },
  { id: 'massaman-beef', sectionId: 'curry', name: 'Massaman beef', thaiName: 'แกงมัสมั่นเนื้อ', priceCents: 2500, chilli: 1, adjustable: false,
    allergens: ['peanut', 'fish'], availability: 'available',
    description: 'Beef cheek braised with potato, cardamom, cinnamon and tamarind until it falls apart.' },
  { id: 'jungle-curry', sectionId: 'curry', name: 'Jungle curry with vegetables', thaiName: 'แกงป่า', priceCents: 2100, chilli: 4, adjustable: false,
    diet: 'vegan-on-request', allergens: ['fish', 'shellfish'], availability: 'sold-out',
    description: 'No coconut, no mercy: a clear, fierce broth of wild ginger, green peppercorn and garden vegetables.' },
  // Noodle bar
  { id: 'pad-thai', sectionId: 'noodles', name: 'Pad Thai with prawns', thaiName: 'ผัดไทยกุ้ง', priceCents: 2100, chilli: 1, adjustable: true,
    allergens: ['peanut', 'egg', 'fish', 'shellfish'], availability: 'available',
    description: 'Rice noodles, tamarind, egg, tofu and king prawns, with bean sprouts, lime and crushed peanuts.' },
  { id: 'pad-see-ew', sectionId: 'noodles', name: 'Pad see ew', thaiName: 'ผัดซีอิ๊ว', priceCents: 2000, chilli: 0, adjustable: false,
    allergens: ['gluten', 'soy', 'egg'], availability: 'available',
    description: 'Wide rice noodles charred in sweet soy with Chinese broccoli, egg and your choice of chicken or tofu.' },
  { id: 'pad-kee-mao', sectionId: 'noodles', name: 'Drunken noodles', thaiName: 'ผัดขี้เมา', priceCents: 2100, chilli: 4, adjustable: true,
    allergens: ['gluten', 'soy', 'fish'], availability: 'available',
    description: 'Wide noodles with holy basil, fresh peppercorns and a fistful of chilli. Named for what it cures.' },
  { id: 'khao-soi', sectionId: 'noodles', name: 'Khao soi chicken', thaiName: 'ข้าวซอยไก่', priceCents: 2300, chilli: 2, adjustable: true,
    allergens: ['gluten', 'egg', 'fish', 'shellfish'], availability: 'available', isNew: true,
    description: 'Chiang Mai curry noodle soup with a drumstick, soft egg noodles and a crown of crispy ones.' },
  { id: 'boat-noodles', sectionId: 'noodles', name: 'Boat noodles', thaiName: 'ก๋วยเตี๋ยวเรือ', priceCents: 1900, chilli: 3, adjustable: true,
    allergens: ['gluten', 'soy', 'fish'], availability: 'available',
    description: 'A small, dark, spiced beef broth with thin rice noodles and morning glory, the way the canal boats served it.' },
  // Sweets & drinks
  { id: 'mango-sticky-rice', sectionId: 'sweets-drinks', name: 'Mango sticky rice', thaiName: 'ข้าวเหนียวมะม่วง', priceCents: 1300, chilli: 0, adjustable: false,
    diet: 'vegan', allergens: [], availability: 'available',
    description: 'Ripe mango cheeks, warm coconut sticky rice and salted coconut cream.' },
  { id: 'coconut-ice-cream', sectionId: 'sweets-drinks', name: 'Coconut ice cream with peanuts', thaiName: 'ไอติมกะทิ', priceCents: 900, chilli: 0, adjustable: false,
    diet: 'vegan', allergens: ['peanut'], availability: 'available',
    description: 'Dairy-free coconut ice cream in a bun-shaped scoop, with roasted peanuts and palm sugar syrup.' },
  { id: 'cha-yen', sectionId: 'sweets-drinks', name: 'Thai iced tea', thaiName: 'ชาเย็น', priceCents: 700, chilli: 0, adjustable: false,
    diet: 'vegetarian', allergens: ['dairy'], availability: 'available',
    description: 'Strong orange tea poured over ice and condensed milk, served in a bag with a straw.' },
  { id: 'lime-soda', sectionId: 'sweets-drinks', name: 'Salted lime soda', thaiName: 'น้ำมะนาวโซดา', priceCents: 650, chilli: 0, adjustable: false,
    diet: 'vegan', allergens: [], availability: 'available',
    description: 'Fresh lime, a pinch of salt and syrup, topped up with soda.' },
];

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const NOT_VEGAN: Allergen[] = ['dairy', 'egg', 'fish', 'shellfish'];

/** Throws an error naming the section or item to fix. Run by the tests and at build time. */
export function validateMenu(menuSections: readonly MenuSection[] = sections, menuItems: readonly MenuItem[] = items): void {
  const sectionIds = new Set<string>();
  for (const section of menuSections) {
    if (!SLUG.test(section.id)) throw new Error(`menu section "${section.id}": id must be a lowercase URL-safe slug`);
    if (sectionIds.has(section.id)) throw new Error(`menu section "${section.id}": duplicate id`);
    sectionIds.add(section.id);
    for (const key of ['title', 'thaiTitle', 'intro'] as const) {
      if (!section[key]?.trim()) throw new Error(`menu section "${section.id}": ${key} is required`);
    }
    if (!['skewers', 'wok', 'pot', 'bowl', 'glass'].includes(section.motif)) throw new Error(`menu section "${section.id}": unknown motif "${section.motif}"`);
  }
  const itemIds = new Set<string>();
  for (const item of menuItems) {
    const where = `menu item "${item.id}"`;
    if (!SLUG.test(item.id)) throw new Error(`${where}: id must be a lowercase URL-safe slug`);
    if (itemIds.has(item.id)) throw new Error(`${where}: duplicate id`);
    itemIds.add(item.id);
    if (!sectionIds.has(item.sectionId)) throw new Error(`${where}: unknown sectionId "${item.sectionId}"`);
    for (const key of ['name', 'thaiName', 'description'] as const) {
      if (!item[key]?.trim()) throw new Error(`${where}: ${key} is required`);
    }
    if (!Number.isInteger(item.priceCents) || item.priceCents <= 0 || item.priceCents % 50 !== 0 || item.priceCents >= 5000) {
      throw new Error(`${where}: priceCents must be a positive whole number of cents, a multiple of 50 and below 5000 (got ${item.priceCents})`);
    }
    if (!Number.isInteger(item.chilli) || item.chilli < 0 || item.chilli > MAX_CHILLI) throw new Error(`${where}: chilli must be a whole number from 0 to 4 (got ${item.chilli})`);
    if (typeof item.adjustable !== 'boolean') throw new Error(`${where}: adjustable must be true or false`);
    if (item.diet !== undefined && !(item.diet in diets)) throw new Error(`${where}: unknown diet "${item.diet}"`);
    for (const allergen of item.allergens) {
      if (!(allergen in allergens)) throw new Error(`${where}: unknown allergen "${allergen}"`);
    }
    if (new Set(item.allergens).size !== item.allergens.length) throw new Error(`${where}: allergens are listed twice`);
    if (item.diet === 'vegan') {
      const conflict = item.allergens.find(a => NOT_VEGAN.includes(a));
      if (conflict) throw new Error(`${where}: marked vegan but contains ${conflict}`);
    }
    if (item.availability !== 'available' && item.availability !== 'sold-out') throw new Error(`${where}: availability must be "available" or "sold-out"`);
  }
  for (const section of menuSections) {
    if (!menuItems.some(item => item.sectionId === section.id)) throw new Error(`menu section "${section.id}": has no items`);
  }
}

validateMenu();

export function findItem(id: string): MenuItem {
  const item = items.find(entry => entry.id === id);
  if (!item) throw new Error(`menu: no item with id "${id}"`);
  return item;
}

export function itemsIn(sectionId: string): MenuItem[] {
  return items.filter(item => item.sectionId === sectionId);
}

/** "$19.50", "$14" for whole dollars. */
export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`;
}
