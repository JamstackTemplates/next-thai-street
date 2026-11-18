import { CounterEdge } from '../components/art/dividers';
import { WrongSoi } from '../components/art/wrong-soi';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="hero-sky relative overflow-hidden pb-16 pt-4">
      <WrongSoi className="relative mx-auto block w-full max-w-5xl" />
      <div className="wrap relative mt-6 text-center">
        <h1 id="nf-title" className="font-sign text-[clamp(2.4rem,7vw,4.4rem)] leading-none">Wrong soi <span lang="th">· ทางตัน</span></h1>
        <p className="mx-auto mt-4 max-w-lg text-[1.15rem] font-medium text-muted">This lane doesn’t go anywhere, but the kitchen’s just around the corner.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <SiteLink href="/" className="button">Back to Soi Sabai</SiteLink>
          <SiteLink href="/menu/" className="button button-yellow">See the menu</SiteLink>
        </div>
      </div>
      <CounterEdge className="mt-14" />
    </section>
  );
}
