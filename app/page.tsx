'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';

const MapClient = dynamic(() => import('./MapClient'), { ssr: false });

const FD   = 'var(--font-bebas-var), Impact, sans-serif';
const FB   = 'var(--font-inter-var), -apple-system, sans-serif';
const BG   = '#07070f';
const R    = 22;
const AG   = '#84E291'; // app green — matches the live app exactly

/* ─── feed data (mirrors real app FeedCard fields) ──────────── */
const FEED = [
  { user: 'marco_r', init: 'M', ac: '#7A4FD4', lv: 12, ago: '2m ago',  km: '8.4',  pace: "5'12\"", dur: '43:42', likes: 24, cmts: 3, photo: '/feed1.jpg', rxns: ['/feed3.jpg', '/feed5.jpg', '/feed7.jpg'] },
  { user: 'sofia_v', init: 'S', ac: '#C14028', lv: 7,  ago: '8m ago',  km: '5.1',  pace: "6'02\"", dur: '30:44', likes: 18, cmts: 1, photo: '/feed2.jpg', rxns: ['/feed4.jpg', '/feed6.jpg'] },
  { user: 'jakub_m', init: 'J', ac: '#4B5FB6', lv: 19, ago: '15m ago', km: '12.0', pace: "4'55\"", dur: '59:04', likes: 41, cmts: 6, photo: '/feed3.jpg', rxns: ['/feed1.jpg', '/feed5.jpg', '/feed7.jpg'] },
  { user: 'anna_k',  init: 'A', ac: '#4D7A52', lv: 5,  ago: '31m ago', km: '6.8',  pace: "5'40\"", dur: '38:33', likes: 9,  cmts: 0, photo: '/feed4.jpg', rxns: ['/feed2.jpg'] },
  { user: 'pedro_l', init: 'P', ac: '#D67834', lv: 3,  ago: '1h ago',  km: '4.2',  pace: "6'15\"", dur: '26:15', likes: 15, cmts: 2, photo: '/feed5.jpg', rxns: ['/feed3.jpg', '/feed6.jpg'] },
  { user: 'yuki_t',  init: 'Y', ac: '#7A4FD4', lv: 22, ago: '2h ago',  km: '7.5',  pace: "5'28\"", dur: '41:04', likes: 33, cmts: 4, photo: '/feed6.jpg', rxns: ['/feed2.jpg', '/feed4.jpg', '/feed7.jpg'] },
  { user: 'alex_b',  init: 'A', ac: '#C14028', lv: 9,  ago: '3h ago',  km: '10.0', pace: "5'08\"", dur: '51:22', likes: 28, cmts: 5, photo: '/feed7.jpg', rxns: ['/feed1.jpg', '/feed3.jpg'] },
];

/* ─── community photo deck ──────────────────────────────────── */
const DECK = [
  { src: '/community1.jpg',      label: 'Race day energy' },
  { src: '/community2.jpg',      label: 'Golden hour run' },
  { src: '/community4.jpg',      label: 'Post-run smiles' },
  { src: '/community3.jpg',      label: 'The crew' },
  { src: '/photo-pizza.jpeg',    label: 'After the run' },
  { src: '/photo-postrun.jpeg',  label: 'Together' },
  { src: '/photo-jump.jpeg',     label: 'Pure joy' },
];

/* ─── event posters ─────────────────────────────────────────── */
const POSTERS = [
  { name: 'RunUnity × Cafe Nini',   city: 'Vienna',     date: 'SAT 6 Jun',   going: 38,  poster: '/events/event1.jpeg' },
  { name: 'Gypsy Rabbit Social Run', city: 'Canterbury', date: 'THU 12 Jun',  going: 31,  poster: '/events/event2.jpeg' },
  { name: 'REM: Run the Extra Mile', city: 'Milan',       date: 'SUN 14 Jun',  going: 26,  poster: '/events/event3.jpeg' },
  { name: 'B3TTER Run Club × Nike',  city: 'Madrid',      date: 'SAT 28 Nov',  going: 64,  poster: '/events/event4.jpeg' },
  { name: 'Rookie Wednesday Run',    city: 'Lisbon',      date: 'WED 17 Jun',  going: 34,  poster: '/events/event5.jpeg' },
  { name: 'Onemind Sunday Run',      city: 'Paris',       date: 'SUN 6 Jul',   going: 31,  poster: '/events/poster_onemind.jpeg' },
  { name: 'Coffee Party Run & Rave', city: 'Shanghai',    date: 'FRI 20 Jun',  going: 58,  poster: '/events/poster_raveam.jpeg' },
  { name: 'HOKA Coffee Fest Run',    city: 'Rotterdam',   date: 'SAT 11 Oct',  going: 85,  poster: '/events/poster_rc010.jpeg' },
  { name: 'Dreamers Morning Run',    city: 'San Antonio', date: 'FRI 19 Jun',  going: 22,  poster: '/events/poster_dreamers.jpeg' },
  { name: 'BOMJA Saturday Run',      city: 'Minneapolis', date: 'SAT 23 May',  going: 47,  poster: '/events/poster_bomja.jpeg' },
  { name: 'Night Run',               city: 'Kathmandu',   date: 'FRI 11 Jul',  going: 19,  poster: '/events/poster_nightrunners.jpeg' },
];

/* ─── Nav ───────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      height: 64, padding: '0 clamp(20px,4vw,48px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'background .5s, backdrop-filter .5s',
      background: scrolled ? 'rgba(7,7,15,.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="/" style={{ fontFamily: FD, fontSize: 20, letterSpacing: 6, color: '#fff', textDecoration: 'none' }}>OUTRUN</a>
        <a href="/join" className="mobile-hide" style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.55)', textDecoration: 'none', letterSpacing: .2, transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}>
          Join Us
        </a>
        <a href="/contact" className="mobile-hide" style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.55)', textDecoration: 'none', letterSpacing: .2, transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}>
          Contact
        </a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <a href="https://apps.apple.com" style={{
        background: '#fff', color: BG, borderRadius: 100, padding: '9px 24px',
        fontSize: 13, fontFamily: FB, fontWeight: 700, letterSpacing: .3,
        textDecoration: 'none', transition: 'opacity .2s',
      }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '.8')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
        Download
      </a>
      </div>
    </nav>
  );
}

/* ─── Phone mockup with live feed ───────────────────────────── */
function PhoneFeed() {
  const cards = [...FEED, ...FEED];

  // SVG icons — matches Ionicons style used in the real app
  const IcoHeart = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
  const IcoComment = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
  const IcoSmile = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5"/>
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5"/>
    </svg>
  );
  const IcoPlay = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  );

  return (
    <div style={{
      width: 'clamp(220px,28vw,300px)',
      borderRadius: 44,
      background: '#0a0a14',
      border: '1.5px solid rgba(255,255,255,.12)',
      boxShadow: '0 48px 96px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.08)',
      overflow: 'hidden',
      position: 'relative',
      aspectRatio: '9/19.5',
      flexShrink: 0,
    }}>
      {/* Dynamic island */}
      <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 88, height: 28, background: '#000', borderRadius: 20, zIndex: 20 }} />

      {/* Screen */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 52 }}>
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 18px 6px', fontFamily: FB, fontSize: 10, fontWeight: 600, color: '#fff', flexShrink: 0 }}>
          <span>9:41</span>
          <span style={{ letterSpacing: 1, fontFamily: FD, fontSize: 13 }}>OUTRUN</span>
          <span style={{ opacity: .6, fontSize: 8 }}>●●●</span>
        </div>

        {/* Feed — auto-scrolling */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div className="feed-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '4px 10px 0' }}>
            {cards.map((f, i) => (
              <div key={i} style={{
                borderRadius: 14,
                overflow: 'hidden',
                flexShrink: 0,
                border: '0.5px solid rgba(255,255,255,.08)',
                boxShadow: '0 4px 16px rgba(0,0,0,.4)',
              }}>
                {/* Photo + floating user row */}
                <div style={{ position: 'relative', height: 110 }}>
                  <img src={f.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {/* Top gradient for avatar readability */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.08) 45%, transparent 100%)' }} />
                  {/* Avatar + username + level + time */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', gap: 6, padding: '9px 10px 0' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: f.ac, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,.25)' }}>
                      <span style={{ fontFamily: FB, fontSize: 8, fontWeight: 800, color: '#fff' }}>{f.init}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: FB, fontSize: 10, fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{f.user}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 1 }}>
                        <span style={{ fontFamily: FB, fontSize: 7, fontWeight: 700, color: AG, letterSpacing: .4 }}>LV.{f.lv}</span>
                        <span style={{ fontFamily: FB, fontSize: 7, color: 'rgba(255,255,255,.5)' }}>· {f.ago}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats bar — KM | PACE /KM | TIME + play */}
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,.08)' }}>
                  <div style={{ flex: 1, display: 'flex', padding: '8px 0 8px 12px', gap: 0 }}>
                    {[
                      { val: f.km,   label: 'KM' },
                      { val: f.pace, label: 'PACE /KM' },
                      { val: f.dur,  label: 'TIME' },
                    ].map(({ val, label }, j) => (
                      <div key={j} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: j === 0 ? 'flex-start' : j === 1 ? 'center' : 'flex-end', paddingRight: j === 2 ? 8 : 0 }}>
                        <span style={{ fontFamily: FB, fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: -.3, lineHeight: 1 }}>{val}</span>
                        <span style={{ fontFamily: FB, fontSize: 6, fontWeight: 600, color: 'rgba(255,255,255,.3)', letterSpacing: .9, marginTop: 2, textTransform: 'uppercase' }}>{label}</span>
                      </div>
                    ))}
                  </div>
                  {/* Play button */}
                  <div style={{ width: 28, height: 28, borderRadius: '50%', border: '0.5px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10, flexShrink: 0 }}>
                    <IcoPlay />
                  </div>
                </div>

                {/* Action bar — heart | comment | reaction + stacked faces */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,.08)', padding: '7px 12px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <IcoHeart />
                    {f.likes > 0 && <span style={{ fontFamily: FB, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,.6)' }}>{f.likes}</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <IcoComment />
                    {f.cmts > 0 && <span style={{ fontFamily: FB, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,.6)' }}>{f.cmts}</span>}
                  </div>
                  <IcoSmile />
                  <div style={{ flex: 1 }} />
                  {/* Stacked reaction faces — real photos */}
                  {f.rxns.map((src, k) => (
                    <div key={k} style={{ width: 20, height: 20, borderRadius: '50%', overflow: 'hidden', border: '1.5px solid rgba(255,255,255,.22)', marginLeft: k > 0 ? -8 : 0, flexShrink: 0 }}>
                      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ borderTop: '0.5px solid rgba(255,255,255,.08)', padding: '10px 0 20px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: '#0a0a14', flexShrink: 0 }}>
          {/* House — active */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          {/* Star — inactive */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {/* Runner — inactive */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
            <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Auto-scroll poster strip ───────────────────────────────── */
function PosterStrip({ dir }: { dir: 'left' | 'right' }) {
  const items = [...POSTERS, ...POSTERS];
  return (
    <div style={{ overflow: 'hidden' }}>
      <div className={dir === 'left' ? 'scroll-left' : 'scroll-right'} style={{ gap: 12 }}>
        {items.map((p, i) => (
          <div key={i} style={{
            flexShrink: 0, width: 'clamp(160px,18vw,210px)', borderRadius: R, overflow: 'hidden',
            aspectRatio: '3/4', position: 'relative',
          }}>
            <img src={p.poster} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,15,.85) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 12px' }}>
              <div style={{ fontFamily: FB, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', marginBottom: 4 }}>{p.city} · {p.date}</div>
              <div style={{ fontFamily: FD, fontSize: 16, letterSpacing: .5, color: '#fff', lineHeight: 1.1 }}>{p.name}</div>
              <div style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 6 }}>{p.going} going</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CountUp ───────────────────────────────────────────────── */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, to, { duration: 2.2, ease: [.16, 1, .3, 1], onUpdate: v => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix; } });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Reveal ────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 28 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: .85, delay, ease: [.16, 1, .3, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── PhotoDeck ─────────────────────────────────────────────── */
function PhotoDeck() {
  const [front, setFront] = useState(0);
  const n = DECK.length;
  const ROTS   = [0, -9, 8, -15, 13, -20, 17];
  const SCALES = [1, .95, .91, .87, .83, .79, .75];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        onClick={() => setFront(p => (p + 1) % n)}
        style={{ position: 'relative', width: 'clamp(260px,30vw,340px)', cursor: 'pointer', flexShrink: 0 }}
      >
        {/* aspect-ratio box (4:5) */}
        <div style={{ paddingBottom: '125%', position: 'relative' }}>
          {DECK.map((p, i) => {
            const offset = (i - front + n) % n;
            return (
              <motion.div
                key={p.src}
                animate={{
                  rotate: ROTS[offset] ?? 0,
                  scale:  SCALES[offset] ?? .75,
                  opacity: offset < 5 ? 1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                  position: 'absolute', inset: 0,
                  zIndex: n - offset,
                  borderRadius: 22,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,.1)',
                  boxShadow: offset === 0
                    ? '0 32px 80px rgba(0,0,0,.85)'
                    : '0 8px 28px rgba(0,0,0,.5)',
                }}
              >
                <img src={p.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                {offset === 0 && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(7,7,15,.88) 0%, transparent 100%)',
                    padding: '36px 18px 18px',
                  }}>
                    <div style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.6)', letterSpacing: .3 }}>
                      {p.label}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 22 }}>
        {DECK.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setFront(i); }}
            style={{
              width: i === front ? 20 : 6, height: 6, borderRadius: 3,
              background: i === front ? 'rgba(255,255,255,.75)' : 'rgba(255,255,255,.2)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width .25s ease, background .25s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY  = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOp    = useTransform(scrollYProgress, [0, .6], [1, 0]);

  return (
    <>
      <Nav />

      {/* ══════════════════════════════════════════════
          1. HERO — brand statement
      ══════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ position: 'relative', height: '100vh', minHeight: 680, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Photo — parallax, nearly unobstructed */}
        <motion.div style={{ position: 'absolute', inset: '-6%', y: heroImgY }}>
          <img src="/photo-hero.jpeg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%' }} />
        </motion.div>

        {/* Thin top vignette for nav */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,7,15,.55) 0%, transparent 20%)' }} />

        {/* Centre vignette — just enough to read text, keeps the photo alive */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(7,7,15,.22) 0%, rgba(7,7,15,.52) 100%)' }} />

        {/* Hero text — centered, OUTRUN big, tagline one clean line */}
        <motion.div style={{ y: heroTextY, opacity: heroOp, position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 clamp(20px,4vw,48px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .9, delay: .2, ease: [.16, 1, .3, 1] }}
            style={{ fontFamily: FD, fontSize: 'clamp(96px,16vw,220px)', lineHeight: .84, letterSpacing: 2, marginBottom: 28 }}>
            OUTRUN
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .46 }}
            style={{ fontFamily: FB, fontSize: 'clamp(16px,1.8vw,24px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,.72)', letterSpacing: .6, whiteSpace: 'nowrap' }}>
            The streets hit different together.
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          2. SOCIAL FEED — show the product
      ══════════════════════════════════════════════ */}
      <section style={{ background: BG, padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,72px)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Section label */}
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'clamp(48px,7vw,72px)', borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 22 }}>
              <span style={{ fontFamily: FD, fontSize: 'clamp(18px,2vw,24px)', letterSpacing: 3, color: 'rgba(255,255,255,.5)' }}>01</span>
              <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.2)', flexShrink: 0 }} />
              <span style={{ fontFamily: FD, fontSize: 'clamp(16px,1.8vw,22px)', letterSpacing: 4, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase' }}>Social Running</span>
            </div>
          </Reveal>

          {/* Two columns — phone left-aligned so it lines up with sections below */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>

            {/* Left — phone flush left */}
            <Reveal y={40}>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <PhoneFeed />
              </div>
            </Reveal>

            {/* Right — headline + text + stats */}
            <Reveal delay={.1} y={24}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px,2.5vw,28px)' }}>
                <h2 style={{ fontFamily: FD, fontSize: 'clamp(48px,6.5vw,88px)', lineHeight: .88, letterSpacing: .5 }}>
                  YOUR<br />FRIENDS<br />ARE ALREADY<br />OUT THERE.
                </h2>
                <p style={{ fontFamily: FB, fontSize: 'clamp(16px,1.6vw,19px)', color: 'rgba(255,255,255,.82)', lineHeight: 1.75 }}>
                  A live feed of every run from the people you follow. See their route, pace, and time — and react with a selfie.
                </p>
                <p style={{ fontFamily: FB, fontSize: 'clamp(16px,1.6vw,19px)', color: 'rgba(255,255,255,.48)', lineHeight: 1.75 }}>
                  Running hits different when people are watching. Every km you post shows up in your crew's feed. Their runs show up in yours. The app that makes you lace up tomorrow.
                </p>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, paddingTop: 4 }}>
                  {[['1,400+', 'Runners'], ['120+', 'Clubs'], ['11', 'Cities']].map(([n, l]) => (
                    <div key={l} style={{
                      background: 'rgba(255,255,255,.05)',
                      border: '1px solid rgba(255,255,255,.09)',
                      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                      borderRadius: 16, padding: '16px 14px',
                      display: 'flex', flexDirection: 'column', gap: 5,
                    }}>
                      <div style={{ fontFamily: FD, fontSize: 'clamp(28px,3.5vw,44px)', letterSpacing: .5, color: '#fff', lineHeight: 1 }}>{n}</div>
                      <div style={{ fontFamily: FB, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.3)', letterSpacing: .4 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. EVENTS — auto-scrolling posters
      ══════════════════════════════════════════════ */}
      <section style={{ background: BG, paddingBottom: 'clamp(56px,7vw,88px)', overflow: 'hidden' }}>
        <Reveal>
          <div style={{ padding: '0 clamp(24px,5vw,72px) clamp(36px,5vw,52px)' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              {/* Section label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36, borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 22 }}>
                <span style={{ fontFamily: FD, fontSize: 'clamp(18px,2vw,24px)', letterSpacing: 3, color: 'rgba(255,255,255,.5)' }}>02</span>
                <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.2)', flexShrink: 0 }} />
                <span style={{ fontFamily: FD, fontSize: 'clamp(16px,1.8vw,22px)', letterSpacing: 4, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase' }}>Run Tickets</span>
              </div>
              <h2 style={{ fontFamily: FD, fontSize: 'clamp(40px,5.5vw,68px)', lineHeight: .9, letterSpacing: .5, marginBottom: 20 }}>
                FIND YOUR NEXT RUN TODAY.
              </h2>
              <p style={{ fontFamily: FB, fontSize: 'clamp(16px,1.6vw,19px)', color: 'rgba(255,255,255,.82)', maxWidth: 600, lineHeight: 1.75 }}>
                Run clubs worldwide post their events on Outrun. Browse what's on, tap to join, and your ticket is in the app — ready to scan at the door.
              </p>
            </div>
          </div>
        </Reveal>

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <PosterStrip dir="left" />
            <PosterStrip dir="right" />
          </div>
          {/* Edge fades — wide and soft, cards dissolve well before the edge */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 'clamp(80px,18vw,260px)', background: `linear-gradient(to right, ${BG} 0%, ${BG} 20%, transparent 100%)`, pointerEvents: 'none', zIndex: 2 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 'clamp(80px,18vw,260px)', background: `linear-gradient(to left, ${BG} 0%, ${BG} 20%, transparent 100%)`, pointerEvents: 'none', zIndex: 2 }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. COMMUNITY — more than a sport
      ══════════════════════════════════════════════ */}
      <section style={{ background: BG, padding: 'clamp(40px,5vw,64px) clamp(24px,5vw,72px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(40px,6vw,72px)', alignItems: 'center' }}>

          {/* Text */}
          <Reveal y={24}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 22, marginBottom: 8 }}>
                <span style={{ fontFamily: FD, fontSize: 'clamp(18px,2vw,24px)', letterSpacing: 3, color: 'rgba(255,255,255,.5)' }}>03</span>
                <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.2)', flexShrink: 0 }} />
                <span style={{ fontFamily: FD, fontSize: 'clamp(16px,1.8vw,22px)', letterSpacing: 4, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase' }}>Community</span>
              </div>
              <h2 style={{ fontFamily: FD, fontSize: 'clamp(52px,7.5vw,96px)', lineHeight: .88, letterSpacing: .5 }}>
                MORE THAN<br />A SPORT.
              </h2>
              <p style={{ fontFamily: FB, fontSize: 'clamp(16px,1.6vw,19px)', color: 'rgba(255,255,255,.82)', lineHeight: 1.75, maxWidth: 420 }}>
                Running is where friendships start. It's the stranger who becomes your training partner, the post-run coffee that turns into a ritual, the group chat that never goes quiet.
              </p>
              <p style={{ fontFamily: FB, fontSize: 'clamp(16px,1.6vw,19px)', color: 'rgba(255,255,255,.65)', lineHeight: 1.75, maxWidth: 420 }}>
                Outrun is built for the moments that happen after the finish line.
              </p>
            </div>
          </Reveal>

          {/* Interactive photo deck */}
          <Reveal delay={.12} y={32}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PhotoDeck />
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. MAP
      ══════════════════════════════════════════════ */}
      <section style={{ background: BG, padding: 'clamp(72px,10vw,120px) clamp(24px,5vw,72px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 22, marginBottom: 24 }}>
              <span style={{ fontFamily: FD, fontSize: 'clamp(18px,2vw,24px)', letterSpacing: 3, color: 'rgba(255,255,255,.5)' }}>04</span>
              <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.2)', flexShrink: 0 }} />
              <span style={{ fontFamily: FD, fontSize: 'clamp(16px,1.8vw,22px)', letterSpacing: 4, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase' }}>Live Worldwide</span>
            </div>
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: FD, fontSize: 'clamp(40px,5.5vw,72px)', lineHeight: .9, whiteSpace: 'nowrap', marginBottom: 16 }}>
                YOUR CITY IS NEXT.
              </h2>
              <p style={{ fontFamily: FB, fontSize: 'clamp(15px,1.4vw,17px)', color: 'rgba(255,255,255,.82)', lineHeight: 1.75, maxWidth: 520 }}>
                Already live in 11 cities across Europe, South America, and Asia — with new run clubs joining every week.
              </p>
            </div>
          </Reveal>

          <Reveal delay={.1} y={32}>
            <div style={{ borderRadius: R, overflow: 'hidden', height: 'min(50vh, 460px)', position: 'relative' }}>
              <MapClient />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 48, background: `linear-gradient(to bottom,${BG},transparent)`, pointerEvents: 'none', zIndex: 10 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 56, background: `linear-gradient(to top,${BG},transparent)`, pointerEvents: 'none', zIndex: 10 }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. CTA — Primrose Hill
      ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/photo-primrose.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,7,15,.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(7,7,15,.7) 100%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .9, ease: [.16, 1, .3, 1] }}
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 clamp(20px,4vw,48px)' }}>
          <div style={{ fontFamily: FD, fontSize: 'clamp(64px,10vw,132px)', lineHeight: .84, letterSpacing: 2, marginBottom: 48, color: '#fff' }}>
            BECOME AN<br />OUTRUNNER.
          </div>
          <a href="https://apps.apple.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#fff', color: BG, borderRadius: 100, padding: '16px 40px',
            fontSize: 14, fontFamily: FB, fontWeight: 800, letterSpacing: .2,
            textDecoration: 'none', transition: 'opacity .2s, transform .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '.86'; e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
            Download on App Store
          </a>
        </motion.div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: BG, borderTop: '1px solid rgba(255,255,255,.05)', padding: '24px clamp(20px,4vw,56px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: FD, fontSize: 14, letterSpacing: 5, color: 'rgba(255,255,255,.14)' }}>OUTRUN</span>
          <span style={{ fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,.14)' }}>© {new Date().getFullYear()} Outrun. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
