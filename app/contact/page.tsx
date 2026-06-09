'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FD = 'var(--font-bebas-var), Impact, sans-serif';
const FB = 'var(--font-inter-var), -apple-system, sans-serif';
const BG = '#07070f';

const TOPICS = [
  'General Enquiry',
  'Partnership',
  'Press & Media',
  'Run Club',
  'Support',
  'Other',
];

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
        <a href="/join" className="mobile-hide" style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.55)', textDecoration: 'none', letterSpacing: .2, transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}>
          Join Us
        </a>
        <a href="/contact" className="mobile-hide" style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: '#fff', textDecoration: 'none', letterSpacing: .2 }}>
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

function ContactForm() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [topic, setTopic]     = useState('');
  const [message, setMessage] = useState('');

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
    const body = `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`;
    window.location.href = `mailto:info@outrun.com?subject=${encodeURIComponent(`[${topic}] Message from ${name}`)}&body=${encodeURIComponent(body)}`;
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
          <label style={labelStyle}>Email</label>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
            style={inputStyle}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)')}
            onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)')} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Topic</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {TOPICS.map(t => (
            <button key={t} type="button" onClick={() => setTopic(t)}
              style={{
                fontFamily: FB, fontSize: 13, fontWeight: 600,
                padding: '8px 18px', borderRadius: 100,
                border: `1px solid ${topic === t ? 'rgba(255,255,255,.6)' : 'rgba(255,255,255,.12)'}`,
                background: topic === t ? 'rgba(255,255,255,.1)' : 'transparent',
                color: topic === t ? '#fff' : 'rgba(255,255,255,.45)',
                cursor: 'pointer', transition: 'all .2s',
              }}>
              {t}
            </button>
          ))}
        </div>
        <input type="hidden" required value={topic} />
      </div>

      <div>
        <label style={labelStyle}>Message</label>
        <textarea required value={message} onChange={e => setMessage(e.target.value)}
          placeholder="Tell us what's on your mind..."
          rows={5}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)')}
          onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)')} />
      </div>

      <button type="submit" disabled={!topic}
        style={{
          marginTop: 8,
          background: topic ? '#fff' : 'rgba(255,255,255,.15)',
          color: topic ? BG : 'rgba(255,255,255,.3)',
          borderRadius: 100, padding: '16px 40px',
          fontSize: 14, fontFamily: FB, fontWeight: 800, letterSpacing: .2,
          border: 'none', cursor: topic ? 'pointer' : 'default',
          transition: 'all .2s', alignSelf: 'center',
        }}
        onMouseEnter={e => { if (topic) { e.currentTarget.style.opacity = '.86'; e.currentTarget.style.transform = 'scale(1.03)'; }}}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}>
        Send Message →
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <Nav />

      <section style={{ background: BG, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px,12vw,140px) clamp(24px,5vw,72px) clamp(80px,10vw,120px)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [.16,1,.3,1] }}>

            <div style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 22, marginBottom: 36 }}>
              <span style={{ fontFamily: FD, fontSize: 'clamp(14px,1.6vw,20px)', letterSpacing: 4, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase' }}>Get in touch</span>
            </div>

            <h1 style={{ fontFamily: FD, fontSize: 'clamp(52px,7vw,88px)', lineHeight: .88, letterSpacing: 1, marginBottom: 24 }}>
              CONTACT US.
            </h1>
            <p style={{ fontFamily: FB, fontSize: 'clamp(15px,1.4vw,17px)', color: 'rgba(255,255,255,.45)', lineHeight: 1.75, marginBottom: 52 }}>
              Whether it's a partnership, a question, or just a hello — we'd love to hear from you.
            </p>

            <div style={{
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 24,
              padding: 'clamp(28px,4vw,48px)',
            }}>
              <ContactForm />
            </div>

          </motion.div>
        </div>
      </section>

      <footer style={{ background: BG, borderTop: '1px solid rgba(255,255,255,.05)', padding: '24px clamp(20px,4vw,56px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: FD, fontSize: 14, letterSpacing: 5, color: 'rgba(255,255,255,.14)' }}>OUTRUN</span>
          <span style={{ fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,.14)' }}>© {new Date().getFullYear()} Outrun. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
