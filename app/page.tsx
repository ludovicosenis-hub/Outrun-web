'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import WaitlistModal from './WaitlistModal';
import SiteFooter from './SiteFooter';

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
  { name: 'RunUnity × Cafe Nini',   city: 'London',     date: 'SAT 14 Jun',  going: 38,  poster: '/events/event1.jpeg' },
  { name: 'Gypsy Rabbit Social Run', city: 'Copenhagen', date: 'THU 12 Jun',  going: 31,  poster: '/events/event2.jpeg' },
  { name: 'REM: Run the Extra Mile', city: 'Milan',       date: 'SUN 14 Jun',  going: 26,  poster: '/events/event3.jpeg' },
  { name: 'B3TTER Run Club × Nike',  city: 'Madrid',      date: 'SAT 28 Nov',  going: 64,  poster: '/events/event4.jpeg' },
  { name: 'Rookie Wednesday Run',    city: 'Lisbon',      date: 'WED 17 Jun',  going: 34,  poster: '/events/event5.jpeg' },
  { name: 'Onemind Sunday Run',      city: 'Paris',       date: 'SUN 6 Jul',   going: 31,  poster: '/events/poster_onemind.jpeg' },
  { name: 'Coffee Party Run & Rave', city: 'Amsterdam',   date: 'FRI 20 Jun',  going: 58,  poster: '/events/poster_raveam.jpeg' },
  { name: 'HOKA Coffee Fest Run',    city: 'Rotterdam',   date: 'SAT 11 Oct',  going: 85,  poster: '/events/poster_rc010.jpeg' },
  { name: 'Dreamers Morning Run',    city: 'Berlin',      date: 'FRI 19 Jun',  going: 22,  poster: '/events/poster_dreamers.jpeg' },
  { name: 'BOMJA Saturday Run',      city: 'Barcelona',   date: 'SAT 14 Jun',  going: 47,  poster: '/events/poster_bomja.jpeg' },
  { name: 'Night Run',               city: 'Rome',        date: 'FRI 11 Jul',  going: 19,  poster: '/events/poster_nightrunners.jpeg' },
];

/* ─── Nav ───────────────────────────────────────────────────── */
function Nav({ onDownload }: { onDownload: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        height: 64, padding: '0 clamp(20px,4vw,48px)',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
        transition: 'background .5s, backdrop-filter .5s',
        background: scrolled || menuOpen ? 'rgba(7,7,15,.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
      }}>
        {/* Left links */}
        <div className="mobile-hide" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {[['Join Us', '/join'], ['Privacy', '/privacy'], ['Terms', '/terms']].map(([l, href]) => (
            <a key={l} href={href} style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.55)', textDecoration: 'none', letterSpacing: .2, transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}>{l}</a>
          ))}
        </div>

        {/* Center logo — hidden until scrolled past hero */}
        <a href="/" style={{ fontFamily: FD, fontSize: 22, letterSpacing: 7, color: '#fff', textDecoration: 'none', justifySelf: 'center', opacity: scrolled ? 1 : 0, transition: 'opacity .4s' }}>OUTRUN</a>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'flex-end' }}>
          <button onClick={onDownload} className="mobile-hide" style={{
            background: '#fff', color: BG, borderRadius: 100, padding: '9px 24px',
            fontSize: 13, fontFamily: FB, fontWeight: 700, letterSpacing: .3,
            border: 'none', cursor: 'pointer', transition: 'opacity .2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Download
          </button>
          {/* Hamburger — mobile only */}
          <button
            className="mobile-show"
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', width: 22, height: 1.5, background: '#fff', transition: 'transform .25s, opacity .25s', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: '#fff', transition: 'opacity .25s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: '#fff', transition: 'transform .25s, opacity .25s', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 490,
        background: 'rgba(7,7,15,.97)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 0,
        transition: 'opacity .3s, transform .3s',
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
        pointerEvents: menuOpen ? 'auto' : 'none',
      }}>
        {[
          { href: '/', label: 'Home' },
          { href: '/join', label: 'Join Us' },
        ].map(({ href, label }) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: FD, fontSize: 48, letterSpacing: 2, color: '#fff',
              textDecoration: 'none', padding: '16px 0',
              transition: 'opacity .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '.5')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            {label}
          </a>
        ))}
        <button onClick={() => { setMenuOpen(false); onDownload(); }} style={{
          marginTop: 32,
          background: '#fff', color: BG, borderRadius: 100, padding: '16px 40px',
          fontSize: 15, fontFamily: FB, fontWeight: 800, letterSpacing: .2,
          border: 'none', cursor: 'pointer',
        }}>
          Download on App Store
        </button>
      </div>
    </>
  );
}

/* ─── Phone mockup with live feed ───────────────────────────── */
function PhoneFeed() {

  return (
    <div style={{
      width: 'clamp(220px,28vw,300px)',
      borderRadius: 44,
      background: '#000',
      border: '1.5px solid rgba(255,255,255,.12)',
      boxShadow: '0 48px 96px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.08)',
      overflow: 'hidden',
      position: 'relative',
      aspectRatio: '9/21',
      flexShrink: 0,
    }}>
      {/* Dynamic island */}
      <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 88, height: 28, background: '#000', borderRadius: 20, zIndex: 20 }} />

      {/* Screen */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 44, background: '#000' }}>
        {/* Feed — real app screen recording */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <video
            src="/feed-demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Cover the screen recording indicator at the top */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 28, background: '#000' }} />
        </div>

      </div>
    </div>
  );
}

/* ─── Full-page scroll ───────────────────────────────────────── */
function FullPageScroller({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);
  const isScrolling = useRef(false);
  const childArray = React.Children.toArray(children);
  const total = childArray.length;

  useEffect(() => {
    const go = (dir: 1 | -1) => {
      if (isScrolling.current) return;
      setCurrent(c => {
        const next = c + dir;
        if (next < 0 || next >= total) return c;
        isScrolling.current = true;
        setTimeout(() => { isScrolling.current = false; }, 950);
        return next;
      });
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 10) return;
      go(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') go(1);
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   go(-1);
    };

    let touchStart = 0;
    const onTouchStart = (e: TouchEvent) => { touchStart = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      const diff = touchStart - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [total]);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <div style={{
        transform: `translateY(-${current * 100}vh)`,
        transition: 'transform .9s cubic-bezier(.77,0,.175,1)',
        willChange: 'transform',
      }}>
        {childArray.map((child, i) => (
          <div key={i} style={{ height: '100vh', overflow: 'hidden' }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── FAQ accordion ─────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is Outrun?',
    a: 'Outrun is the first running app built around your social life. Track your runs with GPS, share them with friends, react to their routes, and discover run clubs and events near you — all in one place.',
  },
  {
    q: 'How does the feed work?',
    a: 'Every run you record appears in your friends\' feed — with your route, pace, distance, and time. Other users can react with a selfie, leave a comment, or give you a like. Their runs show up in your feed too.',
  },
  {
    q: 'How do I find and join a run club?',
    a: 'Open the Clubs tab and browse run clubs in your city. You can see their upcoming events, buy tickets directly in the app, and your ticket is ready to scan at the door.',
  },
  {
    q: 'Where is Outrun available?',
    a: 'At launch, Outrun will be available in the UK, Spain, and Italy. We plan to expand to every country shortly after — if your city isn\'t on the list yet, it will be soon.',
  },
  {
    q: 'Is Outrun free to download?',
    a: 'Yes — Outrun is free to download on the App Store. Some premium features and event tickets are available as in-app purchases.',
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {FAQS.map(({ q, a }, i) => (
        <div
          key={i}
          style={{
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,.08)',
            background: open === i ? 'rgba(255,255,255,.07)' : 'rgba(255,255,255,.03)',
            transition: 'background .25s ease',
            overflow: 'hidden',
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 24, padding: 'clamp(18px,2.5vw,24px) clamp(20px,3vw,32px)',
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <span style={{ fontFamily: FB, fontSize: 'clamp(15px,1.5vw,18px)', fontWeight: 600, color: '#fff' }}>{q}</span>
            <span style={{
              flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform .3s ease',
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          <div style={{
            overflow: 'hidden',
            maxHeight: open === i ? 300 : 0,
            transition: 'max-height .4s cubic-bezier(.4,0,.2,1)',
          }}>
            <p style={{
              fontFamily: FB, fontSize: 'clamp(14px,1.3vw,16px)',
              color: 'rgba(255,255,255,.5)', lineHeight: 1.85,
              padding: '0 clamp(20px,3vw,32px) clamp(18px,2.5vw,24px)',
            }}>{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Flag panels with hover ────────────────────────────────── */
function FlagPanels() {
  const [hovered, setHovered] = useState<number | null>(null);
  const flags = [
    { code: 'gb', label: 'United Kingdom', sub: 'London · Manchester · Edinburgh' },
    { code: 'it', label: 'Italy',          sub: 'Milan · Rome · Florence' },
    { code: 'es', label: 'Spain',          sub: 'Madrid · Barcelona' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, height: 'clamp(260px,28vw,380px)' }}>
      {flags.map(({ code, label, sub }, i) => {
        const isHovered = hovered === i;
        return (
          <div
            key={label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              transform: isHovered ? 'scale(1.03) translateY(-6px)' : 'scale(1) translateY(0)',
              transition: 'transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease',
              boxShadow: isHovered ? '0 24px 48px rgba(0,0,0,.7)' : '0 4px 16px rgba(0,0,0,.3)',
            }}
          >
            <img
              src={`https://flagcdn.com/w1280/${code}.png`}
              alt={label}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transition: 'transform .4s ease', transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: isHovered ? 'rgba(7,7,15,.45)' : 'rgba(7,7,15,.65)', transition: 'background .3s ease' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(20px,3vw,36px)' }}>
              <p style={{ fontFamily: FD, fontSize: 'clamp(20px,2.4vw,32px)', letterSpacing: .5, lineHeight: 1, marginBottom: 10 }}>{label}</p>
              <p style={{ fontFamily: FB, fontSize: 'clamp(12px,1.1vw,14px)', color: 'rgba(255,255,255,.45)', lineHeight: 1.6 }}>{sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Three-phone hover stack ───────────────────────────────── */
function PhoneStack() {
  const [hovered, setHovered] = useState<number | null>(null);
  const screens = ['/app2.jpg', '/app1.jpg', '/app3.jpg'];
  const baseZ = [2, 3, 1];

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height: 'clamp(480px,52vw,660px)' }}>
      {screens.map((src, i) => {
        const isHovered = hovered === i;
        const otherHovered = hovered !== null && hovered !== i;
        return (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              height: i === 1 ? '100%' : '88%',
              flexShrink: 0,
              marginLeft: i > 0 ? -40 : 0,
              zIndex: isHovered ? 10 : baseZ[i],
              borderRadius: 44,
              background: '#000',
              border: '1.5px solid rgba(255,255,255,.15)',
              boxShadow: isHovered
                ? '0 60px 100px rgba(0,0,0,.9), inset 0 1px 0 rgba(255,255,255,.12)'
                : '0 40px 80px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.08)',
              overflow: 'hidden',
              position: 'relative',
              aspectRatio: '9/19.5',
              cursor: 'pointer',
              transform: isHovered
                ? 'scale(1.07) translateY(-16px)'
                : otherHovered
                  ? 'scale(0.94) translateY(8px)'
                  : 'scale(1) translateY(0)',
              filter: otherHovered ? 'brightness(0.55)' : 'brightness(1)',
              transition: 'transform .35s cubic-bezier(.34,1.56,.64,1), filter .3s ease, box-shadow .3s ease',
            }}
          >
            <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 72, height: 22, background: '#000', borderRadius: 20, zIndex: 10 }} />
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        );
      })}
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
            flexShrink: 0, width: 'clamp(180px,20vw,240px)', borderRadius: R,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderTop: '1px solid rgba(255,255,255,0.22)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)',
            padding: '20px 18px 22px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 'clamp(140px,16vw,190px)',
          }}>
            <div>
              <div style={{ fontFamily: FB, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', marginBottom: 10 }}>{p.date}</div>
              <div style={{ fontFamily: FD, fontSize: 'clamp(22px,2.5vw,28px)', letterSpacing: .5, color: '#fff', lineHeight: 1.1 }}>{p.city}</div>
            </div>
            <div style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.28)', marginTop: 16 }}>{p.going} going</div>
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
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <Nav onDownload={() => setWaitlistOpen(true)} />
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

        {/* ══════════════════════════════════════════════
            1. HERO — brand statement
        ══════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          2. MANIFESTO — photo grid + statement
      ══════════════════════════════════════════════ */}
      <section id="who-we-are" style={{ background: BG, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(24px,5vw,72px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>

          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'clamp(24px,3vw,40px)', borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 22 }}>
              <span style={{ fontFamily: FD, fontSize: 'clamp(18px,2vw,24px)', letterSpacing: 3, color: 'rgba(255,255,255,.5)' }}>01</span>
              <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.2)', flexShrink: 0 }} />
              <span style={{ fontFamily: FD, fontSize: 'clamp(16px,1.8vw,22px)', letterSpacing: 4, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase' }}>Who We Are</span>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 'clamp(32px,5vw,64px)', alignItems: 'center' }}>

          {/* Left — photo grid */}
          <Reveal y={32}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
              {[
                '/community1.jpg', '/photo-action.jpeg', '/community2.jpg',
                '/photo-jump.jpeg', '/community3.jpg',  '/community4.jpg',
              ].map((src, i) => (
                <div key={i} style={{ aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden' }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s ease', filter: 'brightness(0.92)' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right — manifesto text */}
          <Reveal delay={.15} y={24}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <h2 style={{ fontFamily: FD, fontSize: 'clamp(44px,5.5vw,72px)', lineHeight: .88, letterSpacing: .5 }}>
                A NEW<br />SOCIAL<br />FOR RUNNERS.
              </h2>
              <p style={{ fontFamily: FB, fontSize: 'clamp(15px,1.4vw,17px)', color: 'rgba(255,255,255,.82)', lineHeight: 1.8 }}>
                Outrun is not a fitness app. It's a social network built around the run — where your miles are content, your crew is your community, and every km matters.
              </p>
              <p style={{ fontFamily: FB, fontSize: 'clamp(14px,1.2vw,15px)', color: 'rgba(255,255,255,.42)', lineHeight: 1.8 }}>
                Built for the generation that runs not just for fitness — but for the feeling, the people, and the city.
              </p>
            </div>
          </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. THREE PHONES — onboarding screens
      ══════════════════════════════════════════════ */}
      <section id="the-app" style={{ background: BG, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(24px,5vw,72px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>

          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'clamp(24px,3vw,40px)', borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 22 }}>
              <span style={{ fontFamily: FD, fontSize: 'clamp(18px,2vw,24px)', letterSpacing: 3, color: 'rgba(255,255,255,.5)' }}>02</span>
              <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.2)', flexShrink: 0 }} />
              <span style={{ fontFamily: FD, fontSize: 'clamp(16px,1.8vw,22px)', letterSpacing: 4, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase' }}>The App</span>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 'clamp(32px,5vw,64px)', alignItems: 'center' }}>

            {/* Left — stacked phones */}
            <Reveal y={32}>
              <PhoneStack />
            </Reveal>

            {/* Right — text */}
            <Reveal delay={.15} y={24}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <h2 style={{ fontFamily: FD, fontSize: 'clamp(36px,4.5vw,60px)', lineHeight: .88, letterSpacing: .5 }}>
                  THE FIRST<br />RUNNING APP<br />THAT'S TRULY<br />SOCIAL.
                </h2>
                <p style={{ fontFamily: FB, fontSize: 'clamp(14px,1.3vw,16px)', color: 'rgba(255,255,255,.82)', lineHeight: 1.8 }}>
                  Interact with friends on the best running feed. Track your runs, dive into detailed stats, and find run clubs around you to join.
                </p>
              </div>
            </Reveal>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. WHERE WE RUN — flag panels
      ══════════════════════════════════════════════ */}
      <section id="where-we-run" style={{ background: BG, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(24px,5vw,72px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>

          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'clamp(24px,3vw,36px)', borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 22 }}>
              <span style={{ fontFamily: FD, fontSize: 'clamp(18px,2vw,24px)', letterSpacing: 3, color: 'rgba(255,255,255,.5)' }}>03</span>
              <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.2)', flexShrink: 0 }} />
              <span style={{ fontFamily: FD, fontSize: 'clamp(16px,1.8vw,22px)', letterSpacing: 4, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase' }}>Where We Run</span>
            </div>
          </Reveal>

          <Reveal y={16}>
            <div style={{ marginBottom: 'clamp(36px,5vw,56px)', textAlign: 'center' }}>
              <p style={{ fontFamily: FD, fontSize: 'clamp(48px,6vw,88px)', lineHeight: 1, letterSpacing: .5 }}>
                10,000+
              </p>
              <p style={{ fontFamily: FB, fontSize: 'clamp(15px,1.5vw,18px)', color: 'rgba(255,255,255,.5)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 12 }}>
                runs recorded
              </p>
            </div>
          </Reveal>

          <FlagPanels />

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. FAQ + FOOTER
      ══════════════════════════════════════════════ */}
      <section id="faq" style={{ background: BG, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(32px,4vw,56px) clamp(24px,5vw,72px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>

          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'clamp(20px,2.5vw,32px)', borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 18 }}>
              <span style={{ fontFamily: FD, fontSize: 'clamp(18px,2vw,24px)', letterSpacing: 3, color: 'rgba(255,255,255,.5)' }}>04</span>
              <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.2)', flexShrink: 0 }} />
              <span style={{ fontFamily: FD, fontSize: 'clamp(16px,1.8vw,22px)', letterSpacing: 4, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase' }}>FAQ</span>
            </div>
          </Reveal>

          <FAQ />

        </div>


      </section>

      <SiteFooter showAppLinks />

    </>
  );
}
