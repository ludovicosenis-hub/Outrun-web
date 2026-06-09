'use client';

import { useState } from 'react';

const FD = 'var(--font-bebas-var), Impact, sans-serif';
const FB = 'var(--font-inter-var), -apple-system, sans-serif';
const BG = '#07070f';

export default function WaitlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:info@outrunldn.com?subject=Waitlist%20Request&body=Please%20add%20me%20to%20the%20waitlist%3A%20${encodeURIComponent(email)}`;
    setDone(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setEmail(''); setDone(false); }, 300);
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 600,
        background: 'rgba(7,7,15,.85)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        transition: 'opacity .3s',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
      }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,.1)',
          background: 'rgba(255,255,255,.04)',
          padding: 'clamp(32px,4vw,52px)',
          maxWidth: 480, width: '100%',
          transition: 'transform .35s, opacity .35s',
          transform: open ? 'translateY(0)' : 'translateY(20px)',
          opacity: open ? 1 : 0,
          position: 'relative',
        }}>

        {/* Close */}
        <button onClick={handleClose} style={{
          position: 'absolute', top: 20, right: 20,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,.35)', padding: 4, lineHeight: 1,
          transition: 'color .2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.35)')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {done ? (
          <>
            <div style={{ fontFamily: FD, fontSize: 'clamp(36px,5vw,52px)', lineHeight: .9, letterSpacing: .5, marginBottom: 14 }}>
              YOU'RE ON THE LIST.
            </div>
            <p style={{ fontFamily: FB, fontSize: 15, color: 'rgba(255,255,255,.45)', lineHeight: 1.7 }}>
              We'll reach out to <span style={{ color: '#fff' }}>{email}</span> as soon as Outrun goes public.
            </p>
          </>
        ) : (
          <>
            <div style={{ fontFamily: FD, fontSize: 'clamp(36px,5vw,52px)', lineHeight: .9, letterSpacing: .5, marginBottom: 14 }}>
              INVITE ONLY FOR NOW.
            </div>
            <p style={{ fontFamily: FB, fontSize: 'clamp(13px,1.2vw,15px)', color: 'rgba(255,255,255,.42)', lineHeight: 1.75, marginBottom: 32 }}>
              We're building something special. Leave your email and we'll contact you the moment we open up.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  width: '100%', background: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(255,255,255,.1)', borderRadius: 12,
                  padding: '14px 16px', fontFamily: FB, fontSize: 15,
                  color: '#fff', outline: 'none', transition: 'border-color .2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)')}
              />
              <button type="submit" style={{
                background: '#fff', color: BG,
                borderRadius: 100, padding: '14px 32px',
                fontSize: 14, fontFamily: FB, fontWeight: 800, letterSpacing: .2,
                border: 'none', cursor: 'pointer', transition: 'opacity .2s, transform .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '.86'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}>
                Notify Me
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
