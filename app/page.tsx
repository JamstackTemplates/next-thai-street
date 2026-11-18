import type { Metadata } from 'next';
import { CrowdBand, FindTheSoi, HeatBand, Hero, LunchBand, Stations } from '../components/home';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

// Home page copy, in the order visitors see it. Dish names and prices come from content/menu.ts,
// lunch tickets from content/lunch.ts, and address and hours from content/business.ts.
export default function HomePage() {
  return (
    <>
      <Hero>
        <Hero.Heading>Wok-hot Thai street food, as fiery as you like.</Hero.Heading>
        <Hero.Introduction>
          Stir-fries, curries and noodles cooked to order on Melbourne’s friendliest soi. Pick your heat
          from <i>mai phet</i> to <i>phet mak mak</i>.
        </Hero.Introduction>
        <Hero.Actions>
          <Hero.Primary href="/menu/">See the menu</Hero.Primary>
          <Hero.Secondary href="/menu/#lunch">Today’s lunch special</Hero.Secondary>
        </Hero.Actions>
        <Hero.Details />
      </Hero>

      <Stations>
        <Stations.Heading>Three stations, one kitchen</Stations.Heading>
        <Stations.Intro>Every order goes to one of three cooks. Here’s what each of them is best at.</Stations.Intro>
        <Stations.Collage>
          <Stations.Poster station="wok" motif="wok" title="The wok" thai="กระทะ" dishes={['pad-krapow', 'cashew-chicken']}
            href="/menu/#wok" linkLabel="All the wok dishes">
            A burner that roars like a tuk-tuk. Holy basil, garlic and chilli seared in seconds.
          </Stations.Poster>
          <Stations.Poster station="curry" motif="pot" title="The curry pots" thai="หม้อแกง" dishes={['green-curry', 'massaman-beef']}
            href="/menu/#curry" linkLabel="All the curries">
            Pastes pounded every morning, then left to simmer until lunch.
          </Stations.Poster>
          <Stations.Poster station="noodles" motif="bowl" title="The noodle bar" thai="ก๋วยเตี๋ยว" dishes={['pad-thai', 'khao-soi']}
            href="/menu/#noodles" linkLabel="All the noodles">
            Wok-tossed or in broth, with the condiment caddy right there on the counter.
          </Stations.Poster>
        </Stations.Collage>
      </Stations>

      <HeatBand>
        <HeatBand.Heading>Pick your heat</HeatBand.Heading>
        <HeatBand.Ladder />
        <HeatBand.Note>Most dishes can go up or down a level, so just ask at the counter.</HeatBand.Note>
        <HeatBand.Link href="/menu/?heat=2">Find dishes at your level</HeatBand.Link>
      </HeatBand>

      <LunchBand>
        <LunchBand.Text title="Lunch tickets" href="/menu/#lunch" linkLabel="Lunch on the menu page">
          Tuesday to Friday, one dish, one drink, one price. Grab today’s ticket between 11:30 and 15:00,
          while the lunch pots last.
        </LunchBand.Text>
        <LunchBand.Tickets />
      </LunchBand>

      <FindTheSoi>
        <FindTheSoi.Sign title="Find the soi" href="/visit/" linkLabel="Plan your visit">
          Look for the red shop sign over the stainless counter. Grab a stool, order at the counter and we’ll bring
          it out.
        </FindTheSoi.Sign>
        <FindTheSoi.Hours />
      </FindTheSoi>

      <CrowdBand>
        <CrowdBand.Heading>Feeding a crowd?</CrowdBand.Heading>
        <CrowdBand.List>
          <li>Group tables for 8 or more</li>
          <li>Office lunch catering, weekdays, 10 people or more</li>
          <li>Market stalls and events, cooked to order</li>
        </CrowdBand.List>
        <CrowdBand.Action note="Tell us what you’re planning. Nothing is booked until we reply.">Send an enquiry</CrowdBand.Action>
      </CrowdBand>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
    </>
  );
}
