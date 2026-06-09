'use client';

import SiteFooter from '../SiteFooter';
import SiteNav from '../SiteNav';

const FD = 'var(--font-bebas-var), Impact, sans-serif';
const FB = 'var(--font-inter-var), -apple-system, sans-serif';
const BG = '#07070f';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: `By downloading, installing, or using the Outrun app or website (outrunldn.com), you agree to be bound by these Terms & Conditions. If you do not agree, do not use our services.\n\nThese terms are governed by the laws of England and Wales.`,
  },
  {
    title: '2. About Outrun',
    body: `Outrun is a social running application operated by Outrun London Limited, registered in England and Wales. The app allows users to record runs, share activity with friends, discover run clubs, and attend running events.`,
  },
  {
    title: '3. Eligibility',
    body: `You must be at least 16 years old to use Outrun. By creating an account, you confirm that you meet this requirement. If you are under 18, you should review these terms with a parent or guardian.`,
  },
  {
    title: '4. Your Account',
    body: `You are responsible for maintaining the confidentiality of your account credentials. You agree to:\n\n• Provide accurate and up-to-date information during registration.\n• Not share your account with others.\n• Notify us immediately at info@outrunldn.com if you suspect unauthorised access.\n\nWe reserve the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    title: '5. User Content',
    body: `By posting content on Outrun (including run data, photos, and comments), you grant Outrun London Limited a non-exclusive, royalty-free, worldwide licence to use, display, and distribute that content within the app and for promotional purposes.\n\nYou retain ownership of your content. You are solely responsible for ensuring your content does not infringe third-party rights or violate applicable laws.`,
  },
  {
    title: '6. Prohibited Conduct',
    body: `You agree not to:\n\n• Use the app for any unlawful purpose.\n• Harass, abuse, or harm other users.\n• Post false, misleading, or offensive content.\n• Attempt to reverse-engineer, hack, or disrupt the app or its infrastructure.\n• Use automated tools to scrape or extract data from the platform.\n\nViolation of these rules may result in immediate account termination.`,
  },
  {
    title: '7. Health & Safety Disclaimer',
    body: `Running involves physical activity and inherent risks. Outrun does not provide medical advice. You should consult a qualified healthcare professional before starting any exercise programme. By using the app, you acknowledge that you participate in any physical activity at your own risk.\n\nOutrun London Limited is not liable for any injury, illness, or loss arising from your use of the app or participation in events.`,
  },
  {
    title: '8. Events & Tickets',
    body: `Outrun may facilitate the purchase of tickets for running events through the app. Ticket purchases are subject to the terms of the individual event organiser. Outrun London Limited acts as a platform only and is not responsible for event cancellations, changes, or refunds unless stated otherwise.`,
  },
  {
    title: '9. Intellectual Property',
    body: `All intellectual property in the Outrun app, website, and brand (including logos, design, code, and content) belongs to Outrun London Limited. You may not reproduce, distribute, or create derivative works without our prior written consent.`,
  },
  {
    title: '10. Limitation of Liability',
    body: `To the maximum extent permitted by law, Outrun London Limited shall not be liable for any indirect, incidental, or consequential damages arising from your use of the app or services.\n\nOur total liability to you for any claim shall not exceed the amount you paid us in the 12 months preceding the claim, or £100, whichever is greater.`,
  },
  {
    title: '11. Changes to These Terms',
    body: `We may update these Terms & Conditions at any time. We will notify you of material changes via the app or email. Continued use of Outrun after changes take effect constitutes acceptance of the revised terms.`,
  },
  {
    title: '12. Contact',
    body: `For questions about these terms, contact us at info@outrunldn.com.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <SiteNav />
      <section style={{ background: BG, minHeight: '100vh', padding: 'clamp(100px,12vw,140px) clamp(24px,5vw,72px) clamp(80px,10vw,120px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          <p style={{ fontFamily: FB, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>
            Last updated: June 2026
          </p>
          <h1 style={{ fontFamily: FD, fontSize: 'clamp(48px,6vw,80px)', lineHeight: .9, letterSpacing: .5, marginBottom: 48 }}>
            TERMS & CONDITIONS.
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {SECTIONS.map(({ title, body }) => (
              <div key={title}>
                <h2 style={{ fontFamily: FD, fontSize: 'clamp(18px,2vw,24px)', letterSpacing: .3, marginBottom: 14, color: '#fff' }}>{title}</h2>
                {body.split('\n').map((line, i) => (
                  <p key={i} style={{
                    fontFamily: FB, fontSize: 'clamp(14px,1.2vw,16px)',
                    color: line.startsWith('•') ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.45)',
                    lineHeight: 1.8,
                    marginBottom: line === '' ? 8 : 4,
                    paddingLeft: line.startsWith('•') ? 12 : 0,
                  }}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 32 }}>
            <p style={{ fontFamily: FB, fontSize: 14, color: 'rgba(255,255,255,.3)', lineHeight: 1.7 }}>
              Outrun London Limited · Registered in England and Wales<br />
              Questions? <a href="mailto:info@outrunldn.com" style={{ color: 'rgba(255,255,255,.55)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,.2)' }}>info@outrunldn.com</a>
            </p>
          </div>

        </div>
      </section>

      <SiteFooter />
    </>
  );
}
