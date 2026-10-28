import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Images,
  Users,
  Video,
  MessageSquareQuote,
  PlayCircle,
  CalendarDays,
  MapPin,
  Building2,
} from 'lucide-react';

const photos = [
  '6W1A7871.jpg',
  '6W1A7835.jpg',
  '6W1A8063.jpg',
  '6W1A7842.jpg',
  '6W1A7853.jpg',
  '6W1A7865.jpg',
  '6W1A8056.jpg',
  '6W1A7882.jpg',
  '6W1A7885.jpg',
  '6W1A7887.jpg',
  '6W1A7892.jpg',
  '6W1A7900.jpg',
  '6W1A7910.jpg',
  '6W1A7926.jpg',
  '6W1A7939.jpg',
  '6W1A7943.jpg',
  '6W1A7953.jpg',
  '6W1A7964.jpg',
  '6W1A7969.jpg',
  '6W1A7982.jpg',
  '6W1A7838.jpg',
  '6W1A8060.jpg',
];

// These profiles are moved from the homepage into the Season 1 archive.
const investors = [
  {
    name: 'Senthil Kumar',
    title: 'Chairman and CEO, Sierra Digital',
    bio: 'Senthil Kumar has more than 20 years of experience building enterprise technology businesses across SAP, cloud, data, and industry transformation. His approach is grounded in efficiency before hype. He focuses on technology that reduces manual work, shortens cycle times, improves control, and makes business processes easier to run. Under his leadership, Sierra Digital has developed 43+ AI agents and established the Sierra Digital AppHaus in Houston.',
    img: '/RSK - CEO.jpg',
  },
  {
    name: 'Pratyush Kumar',
    title: 'Founder, FusionStak',
    bio: 'Two-time founder with a successful exit, now General Manager of CloudGavel at Tyler Technologies. Built FusionStak into a 100-person company and created the largest electronic warrant system in the U.S., serving 250+ law enforcement agencies and 100+ courts. Active investor in founders building mission-critical software for regulated industries.',
    img: '/Pratush_FusionStak.jpg',
  },
  {
    name: 'Anuj Shah',
    title: 'Business Leader',
    bio: 'Anuj Shah, a successful entrepreneur and business leader with extensive experience building and scaling businesses. Having successfully managed large logistics and distribution network operations, Anuj brings valuable insights into leadership, growth strategy, and operational excellence. We are honored to have him share his perspective with our community of investors, founders, and business leaders.',
    img: '/anuj1.jpeg',
  },
  {
    name: 'Suresh Katamreddy',
    title: 'Co-Founder & CEO, Kastech Software Solutions Group',
    bio: 'Suresh Katamreddy is the Co-Founder & CEO of Kastech Software Solutions Group, a global technology services organization specializing in ERP, cloud, AI, cybersecurity, and digital transformation. With over 20 years of industry leadership, he has built and scaled technology businesses serving clients worldwide. As an active investor and mentor, Suresh supports innovative startups and growth-stage companies, particularly in enterprise software, AI, cloud technologies, and digital transformation initiatives.',
    img: '/suresh_kastech.png',
  },
];

type Section = 'Gallery' | 'Investors' | 'Videos' | 'Testimonials' | 'Sponsors';

const sections: { name: Section; description: string; Icon: typeof Images }[] = [
  { name: 'Gallery', description: 'Event photographs', Icon: Images },
  { name: 'Investors', description: 'Meet the investor panel', Icon: Users },
  { name: 'Videos', description: 'Event videos and interviews', Icon: Video },
  { name: 'Testimonials', description: 'Community feedback', Icon: MessageSquareQuote },
  { name: 'Sponsors', description: 'Our event sponsors', Icon: Building2 },
];

const sponsors = [
  { name: 'MNS Consulting Group', logo: '/matt_logo.png' },
  { name: 'Four Oaks Insurance Group', logo: '/Four-oaks-logo.png' },
  { name: 'IFS Wealth Management', logo: '/investigo_logo.png' },
  { name: 'Super Align', logo: '/superalign_logo.jpg' },
];

export default function Highlights() {
  const [activeSection, setActiveSection] = useState<Section>('Gallery');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);

  const previous = () => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + photos.length) % photos.length,
    );
  };

  const next = () => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % photos.length,
    );
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIndex]);

  return (
    <main className="min-h-screen bg-navy-950 text-white">
      <header className="border-b border-white/10 bg-navy-950">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:gap-6 lg:px-8 lg:py-3">
          <div className="flex items-center justify-between gap-3 lg:shrink-0">
            <a
              href="/"
              className="flex min-w-0 items-center gap-3"
              aria-label="Back to Lone Star Investor Forum home"
            >
              <img
                src="/Lonestar_logo.png"
                alt="Lone Star Investor Forum"
                className="h-12 w-auto rounded-lg object-contain sm:h-14"
              />
              <div className="leading-tight">
                <p className="font-display text-lg font-bold text-white sm:text-xl">Lone Star</p>
                <p className="mt-0.5 text-sm font-semibold text-amber-400">Investor Forum</p>
              </div>
            </a>
            <a
              href="/"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-xs font-medium transition hover:border-amber-400 hover:text-amber-400 sm:px-4 sm:text-sm lg:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </a>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 border-t border-white/10 pt-4 sm:grid-cols-[1.35fr_1fr] sm:items-center sm:gap-4 sm:pt-4 lg:max-w-[790px] lg:grid-cols-[1.35fr_1fr] lg:gap-5 lg:border-t-0 lg:pt-0">
            <section className="flex min-w-0 flex-col items-center justify-center">
              <h2 className="mb-2 text-center text-[9px] font-medium uppercase tracking-[0.2em] text-amber-400 sm:text-[10px] sm:tracking-[0.24em]">
                Ecosystem Partners
              </h2>
              <div className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4 lg:gap-x-4">
                <a href="https://tie.org/" target="_blank" rel="noopener noreferrer" aria-label="TiE website">
                  <img src="/tie_logo.png" alt="TiE" className="h-8 w-auto max-w-[100px] object-contain sm:h-9 sm:max-w-[115px] lg:h-9 lg:max-w-[120px]" />
                </a>
                <a href="/" aria-label="Chamber partner">
                  <img src="/chamber_logo.png" alt="Chamber" className="h-9 w-auto max-w-[42px] object-contain sm:h-9 sm:max-w-[48px] lg:h-9 lg:max-w-[48px]" />
                </a>
                <a href="https://www.score.org/" target="_blank" rel="noopener noreferrer" aria-label="SCORE website">
                  <img src="/score_logo.png" alt="SCORE" className="h-8 w-auto max-w-[95px] object-contain sm:h-9 sm:max-w-[110px] lg:h-9 lg:max-w-[115px]" />
                </a>
              </div>
            </section>

            <section className="flex min-w-0 flex-col items-center justify-center border-t border-white/10 pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0 lg:pl-5">
              <h2 className="mb-2 text-center text-[9px] font-medium uppercase tracking-[0.2em] text-amber-400 sm:text-[10px] sm:tracking-[0.24em]">
                Technology Partner
              </h2>
              <a href="https://www.celersoft.com/" target="_blank" rel="noopener noreferrer" aria-label="Celersoft website">
                <img src="/logo_celersoft.png" alt="Celersoft" className="h-9 w-auto max-w-[145px] object-contain sm:h-10 sm:max-w-[165px] lg:h-9 lg:max-w-[165px]" />
              </a>
            </section>
          </div>

          <a
            href="/"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition hover:border-amber-400 hover:text-amber-400 lg:inline-flex"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-8 sm:py-10">
        <div className="mb-7 max-w-none sm:mb-9">
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            Lone Star Investor Forum
          </h2>
          <h2 className="mt-1 font-display text-3xl font-bold leading-tight text-amber-400 sm:text-5xl">
            Season 1
          </h2>

          <div className="mt-5 flex flex-col gap-3 text-sm text-white/75 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:text-base">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 shrink-0 text-amber-400" />
              <span>October 17, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 shrink-0 text-amber-400" />
              <span>India House Houston, Texas</span>
            </div>
          </div>

          <p className="mt-5 max-w-none text-base leading-7 text-white/65 sm:text-lg lg:whitespace-nowrap">
            Revisit the memorable moments, powerful conversations, and valuable connections that sparked new opportunities and lasting relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8">
          {/* Sidebar becomes a horizontal, scrollable section menu on mobile. */}
          <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-3 lg:sticky lg:top-6 lg:p-4">
            <p className="hidden px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/40 lg:block">
              Explore Season 1
            </p>
            <nav aria-label="Season 1 highlights sections" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {sections.map(({ name, description, Icon }) => {
                const selected = activeSection === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setActiveSection(name)}
                    aria-current={selected ? 'page' : undefined}
                    className={`flex min-w-fit flex-1 items-center gap-3 rounded-xl px-3 py-3 text-left transition lg:w-full lg:flex-none ${selected
                        ? 'bg-amber-400 text-navy-950 shadow-lg shadow-amber-950/20'
                        : 'text-white/75 hover:bg-white/5 hover:text-amber-300'
                      }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{name}</span>
                      <span className={`hidden text-xs lg:block ${selected ? 'text-navy-950/70' : 'text-white/40'}`}>
                        {description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <section className="min-h-[300px] min-w-0 rounded-2xl bg-navy-950 text-white" aria-live="polite">
            {activeSection === 'Gallery' && (
              <div>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-bold sm:text-3xl">Event Gallery</h2>
                    <p className="mt-2 text-sm text-white/55">Browse the moments from Season 1.</p>
                  </div>
                  <span className="text-sm text-white/45">{photos.length} photographs</span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                  {photos.map((photo, index) => (
                    <button
                      key={photo}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left focus:outline-none focus:ring-2 focus:ring-amber-400"
                      aria-label={`Open event photograph ${index + 1}`}
                    >
                      <img
                        src={`/images/${photo}`}
                        alt={`Lone Star Investor Forum Season 1 event photograph ${index + 1}`}
                        loading={index < 4 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />
                      <div className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                        View photo
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'Investors' && (
              <div>
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold sm:text-3xl">Meet the Investors</h2>
                  {/* <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
                    Meet the experienced entrepreneurs, technology leaders, and investors who shared their perspectives with the Season 1 community.
                  </p> */}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2">
                  {investors.map((investor) => (
                    <article
                      key={investor.name}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-amber-400/40"
                    >
                      <div className="grid grid-cols-[112px_minmax(0,1fr)] gap-4 p-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:p-5">
                        <div className="aspect-[3/4] overflow-hidden rounded-xl bg-white/10">
                          <img
                            src={investor.img}
                            alt={investor.name}
                            loading="lazy"
                            className="h-full w-full object-cover object-top"
                          />
                        </div>
                        <div className="min-w-0 py-1">
                          <h3 className="font-display text-lg font-bold leading-snug sm:text-xl">{investor.name}</h3>
                          <p className="mt-2 text-xs font-semibold leading-5 text-amber-300 sm:text-sm">{investor.title}</p>
                          <p className="mt-3 text-sm leading-6 text-white/60">{investor.bio}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'Videos' && (
              <div>
                <h2 className="font-display text-2xl font-bold sm:text-3xl">Season 1 Videos</h2>
                <p className="mt-2 text-sm text-white/55 sm:text-base">Event highlights, pitch moments, and interviews will be collected here.</p>
                <div className="mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
                    <PlayCircle className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">Videos coming soon</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/50">Season 1 event videos and interviews will appear here once the video files or links are added.</p>
                </div>
              </div>
            )}

            {activeSection === 'Sponsors' && (
              <div>
                <div className="mb-6">
                  <h2 className="font-display text-2xl font-bold sm:text-3xl">Our Sponsors</h2>
                  {/* <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
                    We thank the organizations whose support helps make the Lone Star Investor Forum possible.
                  </p> */}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
                  {sponsors.map((sponsor) => (
                    <article
                      key={sponsor.name}
                      className="flex min-h-32 items-center justify-center rounded-2xl border border-white/10 bg-white p-4 transition hover:border-amber-400/50"
                    >
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        loading="lazy"
                        className="max-h-14 w-full max-w-[140px] object-contain"
                      />
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'Testimonials' && (
              <div>
                <h2 className="font-display text-2xl font-bold sm:text-3xl">Testimonials</h2>
                <p className="mt-2 text-sm text-white/55 sm:text-base">Hear from the founders, investors, and attendees who took part in Season 1.</p>
                <div className="mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
                    <MessageSquareQuote className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">Testimonials coming soon</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/65">Attendee and founder feedback will be featured here when the testimonials are ready.</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs text-white/45">
                    <span aria-hidden="true">◷</span>
                    Content will be added later
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <footer className="border-t border-white/10 px-5 py-7 text-center text-sm text-white/45">
        © 2026 Lone Star Investor Forum. All rights reserved.
      </footer>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Event photo viewer"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              previous();
            }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:left-5"
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <div
            className="flex max-h-full max-w-6xl flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={`/images/${photos[activeIndex]}`}
              alt={`Lone Star Investor Forum photograph ${activeIndex + 1}`}
              className="max-h-[78vh] max-w-full rounded-lg object-contain"
            />
            <p className="text-sm text-white/70">
              {activeIndex + 1} of {photos.length}
            </p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:right-5"
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
        </div>
      )}
    </main>
  );
}
