import { Link } from 'react-router-dom';

const sections = [
  { id: 'collection', title: 'Information We Collect', content: 'We collect information you provide directly — such as your name, email address, password, and payment information when you create an account or make a purchase. We also automatically collect information like IP addresses, browser type, pages visited, and purchase history to improve our services.' },
  { id: 'use', title: 'How We Use Your Information', content: 'We use your information to process transactions, send order confirmations and shipping updates, respond to your questions, personalize your experience, and improve our products and services. We may also send you promotional emails if you have opted in.' },
  { id: 'sharing', title: 'Sharing of Information', content: 'We do not sell, trade, or rent your personal information to third parties. We share information only with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.' },
  { id: 'cookies', title: 'Cookies & Tracking', content: 'We use cookies and similar tracking technologies to enhance your experience, remember your preferences, and understand how you use our site. You can control cookies through your browser settings, though some features may not function properly without them.' },
  { id: 'security', title: 'Data Security', content: 'We implement industry-standard security measures including SSL encryption to protect your personal information. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.' },
  { id: 'rights', title: 'Your Privacy Rights', content: 'You have the right to access, update, or delete your personal data at any time. You may also opt out of marketing communications. To exercise these rights, contact us at privacy@syed.com.' },
  { id: 'contact', title: 'Contact Us', content: 'If you have questions about this Privacy Notice, please contact our Privacy Team at privacy@syed.com or write to us at SYED, 123 Fashion Avenue, New York, NY 10001.' },
];

const PrivacyPolicyPage = () => (
  <div style={{ background: '#EAEDED', minHeight: '100vh', padding: '16px 0' }} id="privacy-page">
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="amz-breadcrumb flex items-center gap-1 mb-4">
        <Link to="/">SYED</Link>
        <span style={{ color: '#aaa' }}>›</span>
        <span style={{ color: '#0F1111', fontWeight: 700 }}>Privacy Notice</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar nav */}
        <nav style={{ width: '100%', maxWidth: 220 }} className="hidden lg:block">
          <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '14px 0', position: 'sticky', top: 80 }}>
            <p style={{ fontSize: 13, fontWeight: 700, padding: '0 16px 10px', borderBottom: '1px solid #DDD', marginBottom: 8 }}>On this page</p>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} style={{ display: 'block', padding: '6px 16px', fontSize: 13, color: '#007185' }} className="hover:underline hover:bg-gray-50">
                {s.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '24px 28px' }}>
            <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0F1111', marginBottom: 4 }}>SYED Privacy Notice</h1>
            <p style={{ fontSize: 13, color: '#565959', marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #DDD' }}>
              Last updated: January 1, {new Date().getFullYear()}
            </p>
            {sections.map(s => (
              <div key={s.id} id={s.id} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #f0f0f0' }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#007185', marginBottom: 10 }}>{s.title}</h2>
                <p style={{ fontSize: 14, color: '#0F1111', lineHeight: 1.7 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PrivacyPolicyPage;
