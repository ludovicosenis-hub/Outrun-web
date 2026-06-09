'use client';

const FD = 'var(--font-bebas-var), Impact, sans-serif';
const FB = 'var(--font-inter-var), -apple-system, sans-serif';
const BG = '#07070f';

export default function SiteFooter({ showAppLinks = false }: { showAppLinks?: boolean }) {
  return (
    <footer style={{ background: BG, borderTop: '1px solid rgba(255,255,255,.08)', padding: 'clamp(36px,5vw,56px) clamp(24px,5vw,72px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'clamp(40px,8vw,120px)', alignItems: 'start', marginBottom: 32 }}>

          {/* Left — brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontFamily: FD, fontSize: 'clamp(24px,2.8vw,36px)', letterSpacing: 5 }}>OUTRUN.</span>
            <p style={{ fontFamily: FB, fontSize: 'clamp(13px,1.2vw,15px)', color: 'rgba(255,255,255,.45)', lineHeight: 1.6 }}>The streets hit different together.</p>
            <p style={{ fontFamily: FB, fontSize: 12, color: 'rgba(255,255,255,.22)', marginTop: 8 }}>© {new Date().getFullYear()} Outrun London Limited. All rights reserved.</p>
          </div>

          {/* Right — columns */}
          <div style={{ display: 'flex', gap: 'clamp(40px,6vw,80px)' }}>
            {showAppLinks && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginBottom: 4 }}>App</p>
                {[['Who We Are', '#who-we-are'], ['The App', '#the-app'], ['Where We Run', '#where-we-run'], ['FAQ', '#faq']].map(([l, href]) => (
                  <a key={l} href={href} style={{ fontFamily: FB, fontSize: 14, color: 'rgba(255,255,255,.55)', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}>{l}</a>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginBottom: 4 }}>Contact</p>
              <a href="mailto:info@outrunldn.com" style={{ fontFamily: FB, fontSize: 14, color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}>info@outrunldn.com</a>
              <p style={{ fontFamily: FB, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', marginBottom: 4, marginTop: 8 }}>Legal</p>
              {[['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms']].map(([l, href]) => (
                <a key={l} href={href} style={{ fontFamily: FB, fontSize: 14, color: 'rgba(255,255,255,.55)', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}>{l}</a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
