'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FD = 'var(--font-bebas-var), Impact, sans-serif';
const FB = 'var(--font-inter-var), -apple-system, sans-serif';
const BG = '#07070f';

const AREAS = ['Software & Engineering', 'Growth & Marketing', 'Community & Operations', 'Brand & Design'];

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
      background: scrolled ? 'rgba(7,7,15,.92)' : 'rgba(7,7,15,.6)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      transition: 'background .4s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <a href="/" style={{ fontFamily: FD, fontSize: 20, letterSpacing: 6, color: '#fff', textDecoration: 'none' }}>OUTRUN</a>
        <a href="/join" className="mobile-hide" style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: '#fff', textDecoration: 'none', letterSpacing: .2 }}>Join Us</a>
        <a href="/contact" className="mobile-hide" style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.55)', textDecoration: 'none', letterSpacing: .2, transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}>
          Contact
        </a>
      </div>
      <a href="https://apps.apple.com" style={{
        background: '#fff', color: BG, borderRadius: 100, padding: '9px 24px',
        fontSize: 13, fontFamily: FB, fontWeight: 700, letterSpacing: .3,
        textDecoration: 'none', transition: 'opacity .2s',
      }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '.8')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
        Download
      </a>
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
    window.location.href = `mailto:info@outrun.com?subject=Outrun Application — ${name} ${surname}&body=${encodeURIComponent(body)}`;
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

export default function JoinPage() {
  return (
    <>
      <Nav />

      {/* ── Hero ── */}
      <section style={{ background: BG, padding: 'clamp(120px,14vw,160px) clamp(24px,5vw,72px) clamp(48px,6vw,72px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,80px)', alignItems: 'start' }}>

            {/* Left: text */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [.16,1,.3,1] }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 22, marginBottom: 36 }}>
                <span style={{ fontFamily: FD, fontSize: 'clamp(14px,1.6vw,20px)', letterSpacing: 4, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase' }}>Careers</span>
              </div>
              <h1 style={{ fontFamily: FD, fontSize: 'clamp(64px,9vw,118px)', lineHeight: .86, letterSpacing: 1, marginBottom: 36 }}>
                WE'RE<br />GROWING.<br />JOIN US.
              </h1>
              <p style={{ fontFamily: FB, fontSize: 'clamp(16px,1.5vw,18px)', color: 'rgba(255,255,255,.8)', lineHeight: 1.75, maxWidth: 460, marginBottom: 12 }}>
                We're not looking for a specific skillset. We're looking for people who are genuinely committed, motivated, and believe in what we're building.
              </p>
              <p style={{ fontFamily: FB, fontSize: 'clamp(14px,1.2vw,15px)', color: 'rgba(255,255,255,.35)', lineHeight: 1.75, maxWidth: 420 }}>
                If running, community, and building products people love gets you out of bed — we want to meet you.
              </p>
            </motion.div>

            {/* Right: office photo */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, delay: .15, ease: [.16,1,.3,1] }}
              style={{
                borderRadius: 20, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,.08)',
                boxShadow: '0 24px 64px rgba(0,0,0,.6)',
                aspectRatio: '4/3',
              }}>
              <img src="/office.png" alt="Outrun HQ" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Areas ── */}
      <section style={{ background: BG, padding: '0 clamp(24px,5vw,72px) clamp(80px,10vw,112px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
            <h2 style={{ fontFamily: FB, fontSize: 'clamp(20px,2.2vw,26px)', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
              Areas we're hiring in
            </h2>
            <p style={{ fontFamily: FB, fontSize: 'clamp(14px,1.3vw,16px)', color: 'rgba(255,255,255,.38)', marginBottom: 40 }}>
              Don't fit neatly into one? Apply anyway.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {AREAS.map((area, i) => (
              <motion.div key={area}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: .6, delay: i * .07 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 'clamp(18px,2.5vw,26px) 0',
                  borderBottom: '1px solid rgba(255,255,255,.08)',
                  borderTop: i === 0 ? '1px solid rgba(255,255,255,.08)' : 'none',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <span style={{ fontFamily: FD, fontSize: 14, letterSpacing: 2, color: 'rgba(255,255,255,.2)', width: 28 }}>
                    0{i + 1}
                  </span>
                  <span style={{ fontFamily: FD, fontSize: 'clamp(24px,3vw,40px)', letterSpacing: .5, color: '#fff' }}>
                    {area}
                  </span>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application form ── */}
      <section style={{ background: BG, padding: '0 clamp(24px,5vw,72px) clamp(96px,12vw,140px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}
            style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: FD, fontSize: 'clamp(40px,5vw,64px)', lineHeight: .9, letterSpacing: .5, marginBottom: 16 }}>
              APPLY NOW.
            </h2>
            <p style={{ fontFamily: FB, fontSize: 'clamp(15px,1.4vw,17px)', color: 'rgba(255,255,255,.45)', lineHeight: 1.75, marginBottom: 48, maxWidth: 520, margin: '0 auto 48px' }}>
              Tell us who you are. We read every single application.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .85, delay: .1 }}
            style={{ maxWidth: 640, margin: '0 auto' }}>
            <ApplicationForm />
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: BG, borderTop: '1px solid rgba(255,255,255,.05)', padding: '24px clamp(20px,4vw,56px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: FD, fontSize: 14, letterSpacing: 5, color: 'rgba(255,255,255,.14)' }}>OUTRUN</span>
          <span style={{ fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,.14)' }}>© {new Date().getFullYear()} Outrun. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
