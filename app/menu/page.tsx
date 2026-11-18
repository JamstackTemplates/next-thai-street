import type { Metadata } from 'next';
import { business } from '../../content/business';
import { StationMotif } from '../../components/art/station-motif';
import { MenuBar, MenuLunch } from '../../components/menu-bar';
import { AllergenKey, MenuBoards } from '../../components/menu-board';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Soi Sabai’s menu: street snacks, wok dishes, curries, noodles and sweets, each on a five-step chilli scale, plus weekday lunch tickets.',
  alternates: { canonical: absoluteUrl('/menu/') },
};

// Menu page copy. Dishes, prices, chilli levels and sold-out flags live in content/menu.ts;
// lunch tickets in content/lunch.ts.
export default function MenuPage() {
  return (
    <>
      <PageHead title="The menu" thai="เมนู" art={<StationMotif motif="wok" className="ml-auto w-72 rotate-6" />}>
        <p>{business.priceNote}</p>
      </PageHead>

      <MenuBar jumpLabel="Menu sections" />

      <MenuLunch title="Lunch tickets">
        <p>Tuesday to Friday, 11:30–15:00, while the lunch pots last.</p>
        <p>Each ticket is one dish with its sides and a salted lime soda, for one price. Ask for it at the counter.</p>
      </MenuLunch>

      <MenuBoards>
        <AllergenKey note={business.allergenNote} />
      </MenuBoards>
    </>
  );
}
