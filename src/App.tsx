import { useState, useEffect, useRef } from 'react';
import { Star, ChevronDown, Users, TrendingUp, Award, ArrowRight, Menu, X, MapPin, Calendar, Clock, Mail, Phone, Globe, FileText } from 'lucide-react';
import ApplicationModal from './components/ApplicationModal';
import ReportsModal from './components/ReportsModal';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const judges = [
  {
    name: 'Senthil Kumar ',
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
    img: '/dummy1.png',
  },
  {
    // name: 'John Doe',
    // title: 'Founder',
    // bio: 'Priya built the region\'s top startup accelerator, having mentored over 200 founders. She brings a global network and deep operational expertise to every pitch.',
    img: '/dummy1.png',
  },];

const features = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Pitch Live in Houston',
    desc: 'Finalists will present their ventures on October 17th to investors, business leaders, and a live audience — your chance to showcase your vision, gain feedback, and shine in Texas\'s business scene.',
    img: 'https://images.pexels.com/photos/7654586/pexels-photo-7654586.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Connect with Top Investors',
    desc: 'Our investment panel features key figures from Texas\'s investor and entrepreneurial community, offering a unique opportunity to forge connections with the region\'s most influential capital allocators.',
    img: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Compete for Funding',
    desc: 'Top finalists compete for significant investment capital and industry recognition. Walk away with funding, mentorship, and a network that will fuel your startup\'s next chapter.',
    img: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const mediaLogos = [
  { name: 'Texas Tribune', width: 160 },
  { name: 'Dallas Morning News', width: 200 },
  { name: 'Austin American-Statesman', width: 220 },
  { name: 'Houston Chronicle', width: 180 },
];

const corporatePartners = ['Four Oaks Insurance', 'Investigo Online'];
const corporateSponsors = ['Celersoft LLC'];

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeBio, setActiveBio] = useState<number | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroSection = useInView();
  const mediaSection = useInView();
  const expectSection = useInView();
  const panelSection = useInView();
  const sponsorSection = useInView();

  const navLinks = ['About', 'What to Expect', 'Judges', 'Sponsors', 'Apply'];

  return (
    <div className="font-sans text-gray-900 bg-white overflow-x-hidden">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&display=swap"
        rel="stylesheet"
      />

      {/* ── NAV ── */}
    <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navScrolled
            ? "bg-navy-950 shadow-2xl"
            : "bg-navy-950/90 backdrop-blur-md"
          }`}
      >

        {/* ---------------- First Row ---------------- */}

        <div className="max-w-7xl mx-auto px-8 h-24 grid grid-cols-[320px_1fr_220px] items-center">

          {/* Logo */}

          <a href="/" className="flex items-center gap-3 shrink-0">

            <img
              src="/Lonestar_logo.png"
              alt="Lone Star Investor Forum"
              style={{ height: "80px", width: "auto" }}
              className="rounded-lg flex-shrink-0"
            />

            <div
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="leading-tight"
            >
              <h2 className="text-white text-xl font-bold">
                Lone Star
              </h2>

              <p className="text-amber-400 text-sm font-semibold tracking-wide">
                Investor Forum
              </p>

            </div>

          </a>

          {/* Desktop Menu */}

          <nav className="hidden lg:flex justify-center items-center gap-9">

            {navLinks.slice(0, -1).map((link) => (

              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-white/80 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                {link}
              </a>

            ))}

          </nav>

          {/* Right */}

          <div className="flex justify-end items-center gap-4">

            <button
              onClick={() => setApplyOpen(true)}
              className="hidden lg:inline-flex px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-navy-950 rounded-full font-semibold text-sm transition-all"
            >
              Apply Now
            </button>

            <button
              className="lg:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen
                ? <X className="w-6 h-6" />
                : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-white/10 mt-1"></div>

        {/* ---------------- Second Row ---------------- */}

        <div
          className={`hidden lg:block overflow-hidden transition-all duration-300 ${navScrolled ? "max-h-0 opacity-0 py-0" : "max-h-40 opacity-100"
            }`}
        >

          <div className="max-w-[1500px] mx-auto px-10 py-4">

            <div className="grid grid-cols-2 items-center w-full">

              {/* LEFT SIDE */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center w-full">
                  <span className="text-[12px] uppercase tracking-[0.35em] text-amber-400 mb-4">
                    ECOSYSTEM PARTNERS
                  </span>

                  <div className="flex items-center justify-center gap-10 pr-10">
                    <a
                      href="https://tie.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/tie_logo.png"
                        alt="TiE"
                        className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-200 cursor-pointer"
                      />
                    </a>

                    <a
                      href="https://www.score.org//"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/score_logo.png"
                        alt="Score"
                        className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-200 cursor-pointer"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex justify-center">

                <div className="flex flex-col items-center w-full">

                  <span className="text-[12px] uppercase tracking-[0.35em] text-amber-400 mb-4">
                    TECHNOLOGY PARTNER
                  </span>

                  <div className="flex justify-center pl-10">

                    <a
                      href="https://www.celersoft.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/logo_celersoft.png"
                        alt="Celersoft"
                        className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-200 cursor-pointer"
                      />
                    </a>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>



        {/* <div className="lg:hidden border-t border-white/10 py-4 px-4"> */}
        <div
  className={`lg:hidden border-t px-4 overflow-hidden transition-all duration-300 ${
    navScrolled
      ? "max-h-0 opacity-0 py-0 border-transparent"
      : "max-h-72 opacity-100 py-4 border-white/10"
  }`}
>

          <div className="text-center mb-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400 mb-3">
              Ecosystem Partners
            </p>

            <div className="flex justify-center items-center gap-4">
              <img
                src="/tie_logo.png"
                alt="TiE"
                className="h-12 w-28 object-contain"
              />

              <img
                src="/score_logo.png"
                alt="SCORE"
                className="h-10 w-24 object-contain"
              />
            </div>
          </div>

          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400 mb-3">
              Technology Partner
            </p>

            <img
              src="/logo_celersoft.png"
              alt="Celersoft"
              className="h-12 w-28 object-contain mx-auto"
            />
          </div>

        </div>

        {/* Mobile Drawer */}

        {mobileOpen && (

          <div className="lg:hidden bg-navy-950 border-t border-white/10 px-6 py-5 space-y-4">

            {navLinks.slice(0, -1).map(link => (

              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="block text-white/80 hover:text-amber-400"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>

            ))}

            <button
              className="text-amber-400 font-semibold"
              onClick={() => {
                setApplyOpen(true);
                setMobileOpen(false);
              }}
            >
              Apply Now
            </button>

          </div>

        )}

      </header>

      {/* ── HERO ── */}
      <section
        id="about"
        className="relative min-h-screen pt-[170px] flex flex-col items-center justify-center text-center overflow-hidden"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=1600)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/75 to-navy-950/95" />
        {/* Texas star watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <Star className="w-[600px] h-[600px] text-amber-400" />
        </div>

        <div
          ref={heroSection.ref}
          className={`relative z-10 max-w-4xl mx-auto px-6 pt-8 space-y-6 transition-all duration-700 ${heroSection.inView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
            }`}
        >
          <div className=" mt-16 inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-sm font-medium mb-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            Applications Now Open — 2026
          </div>



          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight">
            Lone Star<br />
            <span className="text-amber-400">Investor Forum</span>
          </h1>

          <p className="text-2xl md:text-3xl text-white/70 font-light">
            Texas's Premier Entrepreneur Pitch Competition
          </p>

          {/* Event details */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-white/80 text-sm font-medium">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              October 17, 2026
            </span>
            <span className="h-4 w-px bg-white/30 hidden sm:block" />
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              India House Houston
              8888 West Bellfort
              Houston, TX 77031
            </span>
            <span className="h-4 w-px bg-white/30 hidden sm:block" />
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              6:00 PM – 9:00 PM
            </span>
          </div>

          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mt-2">
            Ready to elevate your business? Pitch innovative ideas to top Texas investors and compete
            for significant funding. Applications are open for all entrepreneurs — from early-stage
            startups to high-growth ventures. Don't miss your moment to shine under the Lone Star.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4 -translate-y-6">
            <button
              onClick={() => setApplyOpen(true)}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-sm rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Apply to Pitch <ArrowRight className="w-4 h-4" />
            </button>
            {/* <a
              href="https://www.zeffy.com/en-US/ticketing/loons-lair-2026-audience-tickets"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              Buy Tickets
            </a> */}
            {/*<a
              href="/tickets"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              Buy Tickets
            </a>*/}
            <a
              href="#sponsor"
              className="px-8 py-3.5 bg-transparent hover:bg-white/10 border border-amber-500/50 text-amber-400 font-semibold text-sm rounded-full transition-all duration-200"
            >
              Become a Sponsor
            </a>

            {/* <button
              onClick={() => setReportsOpen(true)}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm rounded-full transition-all duration-200 backdrop-blur-sm inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> Reports
            </button> */}
          </div>
        </div>

        {/* Scroll cue */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div> */}
      </section>

      {/* ── AS SEEN ON ── */}
      {/* <section className="bg-gray-50 border-y border-gray-200 py-12">
        <div
          ref={mediaSection.ref}
          className={`max-w-5xl mx-auto px-6 transition-all duration-700 ${
            mediaSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-gray-400 mb-8">
            As Seen On
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {mediaLogos.map(logo => (
              <div
                key={logo.name}
                className="flex items-center justify-center"
                style={{ minWidth: logo.width }}
              >
                <span className="font-display font-bold text-gray-300 text-xl md:text-2xl tracking-tight hover:text-gray-400 transition-colors cursor-default select-none">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── WHAT TO EXPECT ── */}
     <section id="what-to-expect" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={expectSection.ref}
            className={`transition-all duration-700 ${expectSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
                What to Expect
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-950 mb-4 leading-tight">
                A Springboard for Bold Ideas
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                The Lone Star Investor Forum isn't just a stage — it's a launchpad. From live pitches
                to strategic exposure, this competition connects bold business ideas with the capital,
                visibility, and networks needed to grow.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feat, i) => (
                <div
                  key={feat.title}
                  className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-amber-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={feat.img}
                      alt={feat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 p-2.5 bg-amber-500 rounded-xl text-navy-950">
                      {feat.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-navy-900 mb-3">{feat.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INVESTMENT PANEL ── */}
      <section id="judges" className="py-24 bg-navy-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div
            ref={panelSection.ref}
            className={`transition-all duration-700 ${
              panelSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
                Investment Panel
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Meet the Investors
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                The Lone Star Investor Forum brings top-tier investors to the table. Our panel features
                influential angel investors, venture capitalists, and business leaders who have backed
                some of Texas's most exciting ventures. These are the visionaries shaping the Lone Star
                investor ecosystem — and they're ready to hear your pitch.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {judges.map((judge, i) => (
                <div
                  key={judge.name}
                  className="group relative bg-white/5 border border-white/10 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={judge.img}
                      alt={judge.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-white">{judge.name}</h3>
                    <p className="text-amber-400 text-xs font-medium mt-1">{judge.title}</p>
                    <button
                      onClick={() => setActiveBio(activeBio === i ? null : i)}
                      className="mt-3 text-xs font-semibold text-white/50 hover:text-amber-400 transition-colors flex items-center gap-1"
                    >
                      {activeBio === i ? 'Hide Bio' : 'Read Bio'}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${activeBio === i ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {activeBio === i && (
                      <p className="mt-3 text-white/60 text-xs leading-relaxed border-t border-white/10 pt-3">
                        {judge.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
        <section className="bg-amber-500 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-950 mb-4">
            Ready to Pitch Your Vision to Texas?
          </h2>
          <p className="text-navy-900/70 text-lg mb-8 max-w-xl mx-auto">
            Applications are open for all entrepreneurs — from early-stage startups to established
            ventures seeking their next growth catalyst.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              id="apply"
              onClick={() => setApplyOpen(true)}
              className="px-8 py-3.5 bg-navy-950 hover:bg-navy-900 text-white font-bold text-sm rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-navy-950/30 hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </button>
            {/* <a
              id="tickets"
              href="https://www.zeffy.com/en-US/ticketing/loons-lair-2026-audience-tickets"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-white/20 hover:bg-white/30 border border-navy-950/20 text-navy-950 font-semibold text-sm rounded-full transition-all duration-200"
            >
              Purchase Audience Tickets
            </a> */}

            {/*} <a
              href="/tickets"
              className="px-8 py-3.5 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold text-sm rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              Purchase Audience Tickets
            </a> */}
          </div>
        </div>
      </section>

      {/* ── SPONSORS ── */}
      <section id="sponsors" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={sponsorSection.ref}
            className={`transition-all duration-700 ${sponsorSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
                Our Supporters
              </span>
              <h2 className="font-display text-4xl font-bold text-navy-950 mb-3">Sponsors</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                The Lone Star Investor Forum is made possible by the generous support of Texas's
                leading businesses and investment community.
              </p>
            </div>

            {/* Corporate Partners */}
            <div className="mb-14">
              <p className="text-center text-xs font-semibold tracking-widest uppercase text-gray-400 mb-8">
                Corporate Partners
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {corporatePartners.map(name => (
                  <div
                    key={name}
                    className="flex items-center justify-center px-10 py-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-200 min-w-[200px]"
                  >
                    <span className="font-display font-bold text-navy-800 text-lg">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate Sponsors */}
            <div>
              <p className="text-center text-xs font-semibold tracking-widest uppercase text-gray-400 mb-8">
                Corporate Sponsors
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {corporateSponsors.map(name => (
                  <div
                    key={name}
                    className="flex items-center justify-center px-10 py-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-200"
                  >
                    <span className="font-semibold text-gray-600 text-sm">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Become a sponsor */}
            <div className="mt-14 text-center">
              {/* <p className="text-gray-500 text-sm mb-4">
               For Sponsorship opportunities please contact +1(512) 923 6479
              </p> */}
              <a
                id="sponsor"
                href="#sponsor"
                className="inline-flex items-center gap-2 px-7 py-3 bg-navy-950 hover:bg-navy-900 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                For Sponsorship opportunities please contact +1 (512) 923 6479
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-navy-950 text-white/60 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Brand */}
            <div className="space-y-4">
              {/* <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <span className="text-white font-display font-bold text-base ml-1">
                  Lone Star <span className="text-amber-400">Innovation Forum</span>
                </span>
              </div> */}
              <div className="flex items-center gap-3">
                <img
                  src="/Lonestar_logo.png"
                  alt="Lone Star Investor Forum"
                  className="h-12 w-auto"
                />

                <div className="leading-tight">
                  <h3 className="text-white font-bold text-lg">
                    Lone Star
                  </h3>
                  <p className="text-amber-400 text-sm font-medium">
                    Investor Forum
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Fueling the next generation of Texas entrepreneurs through access to capital,
                mentorship, and community.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                {['About', 'What to Expect', 'Judges', 'Sponsors'].map(link => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Event details */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
                Event Details
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  October 17, 2026
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  6:00 PM – 9:00 PM CST
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  India House Houston<br />
                  8888 West Bellfort<br />
                  Houston, TX 77031
                </li>
              </ul>
            </div>
            {/* Contact Us */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
                Contact Us
              </h4>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <a
                    href="mailto:info@lonestar.investigoonline.com"
                    className="hover:text-amber-400 transition-colors"
                  >
                    info@.investigoonline.com
                  </a>
                </li>

                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <a
                    href="tel:+15129236479"
                    className="hover:text-amber-400 transition-colors"
                  >
                    +1 (512) 923-6479
                  </a>
                </li>

                <li className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <a
                    href="https://lonestar.investigoonline.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors"
                  >
                    lonestar.investigoonline.com
                  </a>
                </li>
              </ul>
            </div>

          </div>



          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2026 Lone Star Investor Forum. All rights reserved.</p>
            <p>Empowering Texas Entrepreneurs</p>
          </div>
        </div>
      </footer>

      {applyOpen && <ApplicationModal onClose={() => setApplyOpen(false)} />}
      {reportsOpen && <ReportsModal onClose={() => setReportsOpen(false)} />}
    </div>
  );
}
