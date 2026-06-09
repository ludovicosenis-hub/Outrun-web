'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import WaitlistModal from '../WaitlistModal';
import SiteFooter from '../SiteFooter';

const FD = 'var(--font-bebas-var), Impact, sans-serif';
const FB = 'var(--font-inter-var), -apple-system, sans-serif';
const BG = '#07070f';

const AREAS = [
  {
    title: 'Software & Engineering',
    desc: 'Backend, mobile (iOS & Android), frontend, and infrastructure. We move fast and build things that matter — from the social feed to GPS tracking to real-time notifications.',
  },
  {
    title: 'Growth & Marketing',
    desc: 'User acquisition, social media, partnerships, and performance analytics. Help us grow the Outrun community across Europe and beyond.',
  },
  {
    title: 'Community & Operations',
    desc: "Run club relations, event coordination, city expansion, and day-to-day community management. You'll be the heartbeat of every city we launch in.",
  },
  {
    title: 'Brand & Design',
    desc: 'UI/UX, visual identity, content creation, and photography. We want Outrun to feel as good as it looks — from the app to the streets.',
  },
];

function Nav({ onDownload }: { onDownload: () => void }) {
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
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
      background: scrolled ? 'rgba(7,7,15,.92)' : 'rgba(7,7,15,.6)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      transition: 'background .4s',
    }}>
      <div className="mobile-hide" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {[['Join Us', '/join'], ['Privacy', '/privacy'], ['Terms', '/terms']].map(([l, href]) => (
          <a key={l} href={href} style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.55)', textDecoration: 'none', letterSpacing: .2, transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}>{l}</a>
        ))}
      </div>
      <a href="/" style={{ fontFamily: FD, fontSize: 22, letterSpacing: 7, color: '#fff', textDecoration: 'none', justifySelf: 'center' }}>OUTRUN</a>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onDownload} style={{
          background: '#fff', color: BG, borderRadius: 100, padding: '9px 24px',
          fontSize: 13, fontFamily: FB, fontWeight: 700, letterSpacing: .3,
          border: 'none', cursor: 'pointer', transition: 'opacity .2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          Download
        </button>
      </div>
    </nav>
  );
}

function ApplicationForm() {
  const [name, setName]       = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [cvName, setCvName]   = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,.06)',
    border: '1px solid rgba(255,255,255,.1)', borderRadius: 12,
    padding: '14px 16px', fontFamily: FB, fontSize: 15,
    color: '#fff', outline: 'none', transition: 'border-color .2s',
  } as React.CSSProperties;

  const labelStyle = {
    fontFamily: FB, fontSize: 11, fontWeight: 700,
    letterSpacing: 1.5, color: 'rgba(255,255,255,.35)',
    textTransform: 'uppercase' as const, marginBottom: 8, display: 'block',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${name} ${surname}\nEmail: ${email}\n\n${message ? `Message:\n${message}\n\n` : ''}CV: ${cvName || 'See attached'}`;
    window.location.href = `mailto:info@outrunldn.com?subject=Outrun Application — ${name} ${surname}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input required value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
            style={inputStyle}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)')}
            onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)')} />
        </div>
        <div>
          <label style={labelStyle}>Surname</label>
          <input required value={surname} onChange={e => setSurname(e.target.value)} placeholder="Your surname"
            style={inputStyle}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)')}
            onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)')} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Email</label>
        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)')}
          onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)')} />
      </div>

      <div>
        <label style={labelStyle}>Message to recruiter <span style={{ color: 'rgba(255,255,255,.2)', fontWeight: 400 }}>(optional)</span></label>
        <textarea value={message} onChange={e => setMessage(e.target.value)}
          placeholder="Tell us who you are and why you want to be an Outrunner..."
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)')}
          onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)')} />
      </div>

      <div>
        <label style={labelStyle}>CV / Resume</label>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
          onChange={e => setCvName(e.target.files?.[0]?.name || '')} />
        <button type="button" onClick={() => fileRef.current?.click()}
          style={{
            width: '100%', background: 'rgba(255,255,255,.06)',
            border: `1px ${cvName ? 'solid rgba(255,255,255,.35)' : 'dashed rgba(255,255,255,.2)'}`,
            borderRadius: 12, padding: '14px 16px',
            fontFamily: FB, fontSize: 14, color: cvName ? '#fff' : 'rgba(255,255,255,.35)',
            cursor: 'pointer', textAlign: 'left', transition: 'all .2s',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          {cvName || 'Upload your CV (PDF, DOC)'}
        </button>
      </div>

      <button type="submit" style={{
        marginTop: 8,
        background: '#fff', color: BG, borderRadius: 100, padding: '16px 40px',
        fontSize: 14, fontFamily: FB, fontWeight: 800, letterSpacing: .2,
        border: 'none', cursor: 'pointer', transition: 'opacity .2s, transform .2s',
        alignSelf: 'center',
      }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '.86'; e.currentTarget.style.transform = 'scale(1.03)'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1';   e.currentTarget.style.transform = 'scale(1)'; }}>
        Send Application →
      </button>
    </form>
  );
}

function AreaBoxes() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {AREAS.map(({ title, desc }, i) => (
        <motion.div key={title}
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .6, delay: i * .07 }}
          onClick={() => setOpen(open === i ? null : i)}
          style={{
            borderRadius: 16,
            border: `1px solid ${open === i ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.08)'}`,
            background: open === i ? 'rgba(255,255,255,.07)' : 'rgba(255,255,255,.03)',
            padding: 'clamp(20px,3vw,32px)',
            cursor: 'pointer',
            transition: 'background .3s, border-color .3s',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: FD, fontSize: 13, letterSpacing: 2, color: 'rgba(255,255,255,.2)', flexShrink: 0 }}>0{i + 1}</span>
            <span style={{ fontFamily: FD, fontSize: 'clamp(20px,2.4vw,32px)', letterSpacing: .5 }}>{title}</span>
          </div>
          <div style={{
            maxHeight: open === i ? 200 : 0,
            overflow: 'hidden',
            transition: 'max-height .45s ease',
          }}>
            <p style={{
              fontFamily: FB, fontSize: 'clamp(13px,1.1vw,15px)',
              color: 'rgba(255,255,255,.5)', lineHeight: 1.7,
              marginTop: 16,
            }}>{desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function JoinPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  return (
    <>
      <Nav onDownload={() => setWaitlistOpen(true)} />
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />


      {/* ── Areas ── */}
      <section style={{ background: BG, padding: 'clamp(100px,12vw,140px) clamp(24px,5vw,72px) clamp(80px,10vw,112px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
            <h2 style={{ fontFamily: FD, fontSize: 'clamp(36px,4.5vw,60px)', lineHeight: .9, letterSpacing: .5, marginBottom: 12 }}>
              AREAS WE'RE HIRING IN.
            </h2>
            <p style={{ fontFamily: FB, fontSize: 'clamp(14px,1.3vw,16px)', color: 'rgba(255,255,255,.38)', marginBottom: 6 }}>
              Don't fit neatly into one? Apply anyway.
            </p>
            <p style={{ fontFamily: FB, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,.25)', marginBottom: 40 }}>
              For anything else, reach us at{' '}
              <a href="mailto:info@outrunldn.com" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,.2)' }}>info@outrunldn.com</a>
            </p>
          </motion.div>

          <AreaBoxes />
        </div>
      </section>

      {/* ── Application form ── */}
      <section style={{ background: BG, padding: '0 clamp(24px,5vw,72px) clamp(96px,12vw,140px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}
            style={{
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,.08)',
              background: 'rgba(255,255,255,.03)',
              padding: 'clamp(32px,4vw,56px)',
            }}>
            <h2 style={{ fontFamily: FD, fontSize: 'clamp(36px,4.5vw,60px)', lineHeight: .9, letterSpacing: .5, marginBottom: 10 }}>
              APPLY NOW.
            </h2>
            <p style={{ fontFamily: FB, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,.38)', marginBottom: 40 }}>
              Tell us who you are. We read every single application.
            </p>
            <ApplicationForm />
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
