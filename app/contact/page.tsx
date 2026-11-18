import type { Metadata } from 'next';
import { business, phoneHref } from '../../content/business';
import { Tiffin } from '../../components/art/tiffin';
import { MailIcon, PhoneIcon } from '../../components/art/icons';
import { CopyEmail } from '../../components/copy-email';
import { EnquiryType, EnquiryTypes } from '../../components/enquiry-types';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = { title: 'Contact', description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') } };

// Contact copy. The email, phone and "what to include" list come from content/business.ts.
// Group tables, catering and events are enquiries: nothing is booked or confirmed until Soi Sabai replies.
export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return (
    <>
      <PageHead title={business.enquiries.title} thai="ติดต่อเรา" art={<Tiffin className="ml-auto w-56" />}>
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="wrap grid gap-12 py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:py-20">
        <div className="grid content-start gap-10">
          <EnquiryTypes title="What we can help with">
            <EnquiryType title="Group tables" stub="8+">For eight or more at the counter. Tell us the day and time and we’ll see what we can keep free.</EnquiryType>
            <EnquiryType title="Office catering" stub="10+">Weekday lunch for ten people or more, packed in trays with the chilli on the side.</EnquiryType>
            <EnquiryType title="Events and stalls" stub="Stall">Markets, festivals and parties. The wok burner comes too.</EnquiryType>
          </EnquiryTypes>

          <section aria-labelledby="include-title">
            <h2 id="include-title" className="font-display text-[1.6rem] leading-none">What to put in your message</h2>
            <ul className="mt-4 grid gap-2.5 text-[1.05rem]">
              {business.enquiries.usefulToInclude.map(tip => (
                <li key={tip} className="flex items-start gap-3"><span aria-hidden="true" className="mt-2.5 h-[3px] w-6 flex-none rounded bg-[var(--accent)]" />{tip}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid content-start gap-10">
          <section aria-label="Enquiry form" className="steel-panel brushed p-4 sm:p-5">
            <div className="rounded-md bg-[var(--surface)]/95 p-5 text-ink shadow-inner sm:p-6">
              {hosted ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} />
                : <div>
                  <h2 className="font-display text-[1.5rem]">Write to us directly</h2>
                  <p className="mt-3 text-[1.05rem] text-muted">The enquiry form isn’t connected on this site yet. Please email us at the address below and we’ll reply from there.</p>
                </div>}
            </div>
          </section>

          <aside aria-label="Contact details" className="soi-sign grid gap-4 p-6 sm:p-8">
            <h2 className="font-display text-[1.3rem]">Email us</h2>
            <p className="flex items-center gap-2 text-[1.2rem] font-bold"><MailIcon /><a className="break-all underline underline-offset-4" href={`mailto:${business.email}`}>{business.email}</a></p>
            <div className="flex flex-wrap items-center gap-3"><CopyEmail email={business.email} /></div>
            {business.phone ? <p className="flex items-center gap-2 text-[1.05rem]"><PhoneIcon /><span>Same-day questions: <a className="font-bold underline underline-offset-4" href={phoneHref()}>{business.phone}</a></span></p> : null}
          </aside>
        </div>
      </div>
    </>
  );
}
