'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import WaitlistModal from '../WaitlistModal';
import SiteFooter from '../SiteFooter';
import SiteNav from '../SiteNav';

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
    window.location.href = `mailto:info@outrunldn.com?subject=${encodeURIComponent(`[${topic}] Message from ${name}`)}&body=${encodeURIComponent(body)}`;
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
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  return (
    <>
      <SiteNav onDownload={() => setWaitlistOpen(true)} />
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

      <section style={{ background: BG, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px,12vw,140px) clamp(24px,5vw,72px) clamp(80px,10vw,120px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [.16,1,.3,1] }}
            style={{
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,.08)',
              background: 'rgba(255,255,255,.03)',
              padding: 'clamp(32px,4vw,56px)',
            }}>
            <h1 style={{ fontFamily: FD, fontSize: 'clamp(36px,4.5vw,60px)', lineHeight: .9, letterSpacing: .5, marginBottom: 10 }}>
              CONTACT US.
            </h1>
            <p style={{ fontFamily: FB, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,.38)', marginBottom: 40 }}>
              Whether it's a partnership, a question, or just a hello, we'd love to hear from you.
            </p>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
