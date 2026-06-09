'use client';

import SiteFooter from '../SiteFooter';
import SiteNav from '../SiteNav';

const FD = 'var(--font-bebas-var), Impact, sans-serif';
const FB = 'var(--font-inter-var), -apple-system, sans-serif';
const BG = '#07070f';

const SECTIONS = [
  {
    title: '1. Who We Are',
    body: `Outrun is operated by Outrun London Limited, a company registered in England and Wales. We are the data controller for personal information collected through the Outrun app and website (outrunldn.com).\n\nIf you have any questions about this policy, contact us at info@outrunldn.com.`,
  },
  {
    title: '2. What Data We Collect',
    body: `We collect the following categories of personal data:\n\n• Account information: name, email address, and profile photo when you register.\n• Activity data: GPS routes, distance, pace, duration, and timestamps of runs you record.\n• Device information: device type, operating system, and app version.\n• Usage data: features you interact with, pages visited, and time spent in the app.\n• Communications: messages you send us via email or contact forms.`,
  },
  {
    title: '3. How We Use Your Data',
    body: `We use your personal data to:\n\n• Provide and improve the Outrun app and its features.\n• Display your runs in your friends' feed (only to users you follow or who follow you).\n• Send you service-related communications (e.g. account verification, updates).\n• Analyse usage patterns to improve performance and user experience.\n• Comply with legal obligations.`,
  },
  {
    title: '4. Legal Basis for Processing',
    body: `We process your personal data on the following legal bases under UK GDPR:\n\n• Contract: to provide you with the Outrun service.\n• Legitimate interests: to improve the app, prevent fraud, and ensure security.\n• Consent: where you have opted in to marketing communications.\n• Legal obligation: where required by law.`,
  },
  {
    title: '5. Data Sharing',
    body: `We do not sell your personal data. We may share it with:\n\n• Service providers who assist us in operating the app (e.g. cloud hosting, analytics), under strict confidentiality obligations.\n• Law enforcement or regulatory authorities where required by law.\n• A successor entity in the event of a merger or acquisition, subject to the same privacy protections.`,
  },
  {
    title: '6. Data Retention',
    body: `We retain your personal data for as long as your account is active, or as long as necessary to provide our services. If you delete your account, we will delete or anonymise your personal data within 30 days, except where we are required by law to retain it longer.`,
  },
  {
    title: '7. Your Rights',
    body: `Under UK GDPR, you have the right to:\n\n• Access the personal data we hold about you.\n• Correct inaccurate data.\n• Request deletion of your data ("right to be forgotten").\n• Object to or restrict certain processing.\n• Data portability: receive your data in a machine-readable format.\n• Withdraw consent at any time where processing is based on consent.\n\nTo exercise any of these rights, contact us at info@outrunldn.com. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.`,
  },
  {
    title: '8. Cookies',
    body: `Our website uses essential cookies to ensure it functions correctly. We do not use tracking or advertising cookies. You can disable cookies in your browser settings, though this may affect some functionality.`,
  },
  {
    title: '9. Security',
    body: `We take reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '10. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. We will notify you of significant changes via the app or by email. The date of the most recent revision appears at the top of this page.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <section style={{ background: BG, minHeight: '100vh', padding: 'clamp(100px,12vw,140px) clamp(24px,5vw,72px) clamp(80px,10vw,120px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          <p style={{ fontFamily: FB, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 16 }}>
            Last updated: June 2026
          </p>
          <h1 style={{ fontFamily: FD, fontSize: 'clamp(48px,6vw,80px)', lineHeight: .9, letterSpacing: .5, marginBottom: 48 }}>
            PRIVACY POLICY.
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
