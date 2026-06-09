'use client';

import { useState, useEffect } from 'react';

const FD = 'var(--font-bebas-var), Impact, sans-serif';
const FB = 'var(--font-inter-var), -apple-system, sans-serif';
const BG = '#07070f';

interface SiteNavProps {
  onDownload?: () => void;
  logoFadesIn?: boolean; // home page: logo hidden until scroll
}

export default function SiteNav({ onDownload, logoFadesIn = false }: SiteNavProps) {
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

  const logoVisible = logoFadesIn ? scrolled : true;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        height: 64, padding: '0 clamp(20px,4vw,48px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background .5s, backdrop-filter .5s',
        background: scrolled || menuOpen ? 'rgba(7,7,15,.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
      }}>

        {/* Desktop: left links | Mobile: OUTRUN logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {/* Mobile logo */}
          <a href="/" className="mobile-show" style={{ fontFamily: FD, fontSize: 20, letterSpacing: 6, color: '#fff', textDecoration: 'none', display: 'none' }}>OUTRUN</a>
          {/* Desktop links */}
          <div className="mobile-hide" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {[['Join Us', '/join'], ['Privacy', '/privacy'], ['Terms', '/terms']].map(([l, href]) => (
              <a key={l} href={href} style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.55)', textDecoration: 'none', letterSpacing: .2, transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}>{l}</a>
            ))}
          </div>
        </div>

        {/* Desktop center logo */}
        <a href="/" className="mobile-hide" style={{ fontFamily: FD, fontSize: 22, letterSpacing: 7, color: '#fff', textDecoration: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)', opacity: logoVisible ? 1 : 0, transition: 'opacity .4s' }}>OUTRUN</a>

        {/* Desktop: Download | Mobile: Download + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {onDownload && (
            <>
              {/* Desktop Download */}
              <button onClick={onDownload} className="mobile-hide" style={{
                background: '#fff', color: BG, borderRadius: 100, padding: '9px 24px',
                fontSize: 13, fontFamily: FB, fontWeight: 700, letterSpacing: .3,
                border: 'none', cursor: 'pointer', transition: 'opacity .2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '.8')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Download
              </button>
              {/* Mobile Download — always visible in nav */}
              <button onClick={onDownload} className="mobile-show" style={{
                display: 'none', background: '#fff', color: BG, borderRadius: 100,
                padding: '8px 18px', fontSize: 12, fontFamily: FB, fontWeight: 700,
                letterSpacing: .3, border: 'none', cursor: 'pointer',
              }}>
                Download
              </button>
            </>
          )}
          {/* Hamburger */}
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
          { href: '/join', label: 'Join Us' },
          { href: '/privacy', label: 'Privacy' },
          { href: '/terms', label: 'Terms' },
        ].map(({ href, label }) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}
            style={{ fontFamily: FD, fontSize: 48, letterSpacing: 2, color: '#fff', textDecoration: 'none', padding: '14px 0', transition: 'opacity .2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '.5')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            {label}
          </a>
        ))}
        {onDownload && (
          <button onClick={() => { setMenuOpen(false); onDownload(); }} style={{
            marginTop: 36,
            background: '#fff', color: BG, borderRadius: 100, padding: '16px 48px',
            fontSize: 15, fontFamily: FB, fontWeight: 800, letterSpacing: .2,
            border: 'none', cursor: 'pointer',
          }}>
            Download
          </button>
        )}
      </div>
    </>
  );
}
