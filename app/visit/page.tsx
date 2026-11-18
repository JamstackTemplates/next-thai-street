import type { Metadata } from 'next';
import { addressLine, business } from '../../content/business';
import { BikeIcon, PinIcon, TrainIcon, TramIcon } from '../../components/art/icons';
import { GoogleMap } from '../../components/google-map';
import { HoursBoard } from '../../components/hours-board';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { Steps, VisitStrip } from '../../components/visit';
import { mapDirectionsUrl } from '../../lib/maps';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Visit',
  description: 'Find Soi Sabai at Queen Victoria Market, Melbourne: kitchen hours, map, trams and how ordering works.',
  alternates: { canonical: absoluteUrl('/visit/') },
};

// Visit page copy. Address, hours and getting-here lines come from content/business.ts.
export default function VisitPage() {
  return (
    <>
      <PageHead title="Find the soi" thai="หาซอยเจอ" art={
        <div className="soi-sign ml-auto w-fit rotate-3 px-8 py-5 text-center">
          <p lang="th" className="text-[1.6rem] font-bold leading-none">{business.thaiName}</p>
          <p className="font-display mt-1 text-[1.8rem] leading-none">{business.name}</p>
        </div>
      }>
        <p>Walk-in only, 28 counter stools, and everything packed to take away.</p>
      </PageHead>

      <section aria-labelledby="where-title" className="wrap grid gap-12 py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:py-20">
        <div className="grid content-start gap-6">
          <h2 id="where-title" className="font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-none">Where we are</h2>
          <p className="flex items-start gap-2 text-[1.2rem] font-semibold"><PinIcon className="mt-1" />{addressLine()}</p>
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-[var(--surface)] px-3.5 py-1 font-semibold text-ink shadow-xs">
            <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
            <OpenBadge hours={business.hours} />
          </p>
          <a className="button w-fit" href={mapDirectionsUrl(business.address.mapQuery)}>Get directions</a>
          <HoursBoard className="mt-4 max-w-sm" />
        </div>
        <div className="relative">
          <div className="steel-panel brushed overflow-hidden p-2.5">
            <GoogleMap address={business.address.mapQuery} title="Map showing Soi Sabai at Queen Victoria Market, Melbourne" className="overflow-hidden rounded-[.35rem] bg-[var(--raised)] [&_iframe]:min-h-[28rem]" />
          </div>
          <span aria-hidden="true" className="absolute -right-2 -top-3 rotate-6 rounded-md bg-[var(--accent)] px-3 py-1 font-display text-white shadow-md">Here!</span>
        </div>
      </section>

      <VisitStrip title="Getting here">
        <li><TramIcon className="h-7 w-7" />{business.gettingHere.tram}</li>
        <li><TrainIcon className="h-7 w-7" />{business.gettingHere.train}</li>
        <li><BikeIcon className="h-7 w-7" />{business.gettingHere.bike}</li>
      </VisitStrip>

      <Steps title="How it works" note="For 8 or more, send an enquiry first so we can keep a run of stools free.">
        <Steps.Step title="Order">Order and pay at the counter. Tell us your chilli level and any allergies.</Steps.Step>
        <Steps.Step title="Take a number">Grab a number and a stool. There are 28 at the counter.</Steps.Step>
        <Steps.Step title="Tuck in">We bring it out hot from the wok. Everything can be packed to take away.</Steps.Step>
      </Steps>
    </>
  );
}
