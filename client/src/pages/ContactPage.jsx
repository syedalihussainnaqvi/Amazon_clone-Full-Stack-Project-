import { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    e.target.reset();
    setTimeout(() => setSuccess(false), 6000);
  };

  const topics = [
    { icon: '📦', label: 'An order I placed', desc: 'Track, return, or get refund' },
    { icon: '↩️', label: 'Returns & Refunds',  desc: 'Start a return or check status' },
    { icon: '👤', label: 'Account issues',     desc: 'Login, password, or settings' },
    { icon: '💳', label: 'Payment & billing',  desc: 'Cards, charges, or invoices' },
    { icon: '🚚', label: 'Shipping',           desc: 'Delivery speed and tracking' },
    { icon: '❓', label: 'Something else',     desc: 'General questions or feedback' },
  ];

  return (
    <div style={{ background: '#EAEDED', minHeight: '100vh', padding: '16px 0' }} id="contact-page">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="amz-breadcrumb flex items-center gap-1 mb-4">
          <Link to="/">SYED</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <Link to="/help">Help</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <span style={{ color: '#0F1111', fontWeight: 700 }}>Contact Us</span>
        </div>

        {/* Header */}
        <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px', marginBottom: 12 }}>
          <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0F1111', marginBottom: 6 }}>Contact Us</h1>
          <p style={{ fontSize: 14, color: '#565959' }}>What can we help you with?</p>
        </div>

        {/* Topic cards */}
        <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px', marginBottom: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0F1111', marginBottom: 14 }}>Browse help topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {topics.map(t => (
              <div
                key={t.label}
                style={{ border: '1px solid #DDD', borderRadius: 4, padding: '14px 16px', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                className="hover:shadow-md"
              >
                <div style={{ fontSize: 22, marginBottom: 6 }}>{t.icon}</div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0F1111', marginBottom: 2 }}>{t.label}</p>
                <p style={{ fontSize: 12, color: '#565959' }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0F1111', marginBottom: 14 }}>Send us a message</h2>

          {success && (
            <div style={{ background: '#f0fff4', border: '1px solid #007600', borderRadius: 3, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#007600' }}>
              ✓ Message sent! We'll respond within 1–2 business days.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Your name</label>
                <input required type="text" className="amz-input" placeholder="Full name" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Email address</label>
                <input required type="email" className="amz-input" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Order number (optional)</label>
              <input type="text" className="amz-input" placeholder="e.g. 123-4567890-1234567" style={{ maxWidth: 300 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>How can we help?</label>
              <textarea required rows={5} className="amz-input" placeholder="Describe your issue in detail..." style={{ resize: 'vertical' }} />
            </div>
            <div>
              <button type="submit" className="amz-btn-orange" style={{ padding: '10px 28px', fontSize: 14 }}>
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Contact details */}
        <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px', marginTop: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Other ways to contact us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '📞', label: 'Phone', value: '+1 (800) 123-4567', sub: 'Mon–Fri, 9am–6pm EST' },
              { icon: '✉️', label: 'Email', value: 'support@syed.com', sub: 'Response within 24 hours' },
              { icon: '💬', label: 'Live Chat', value: 'Available now', sub: 'Average wait: 2 minutes' },
            ].map(c => (
              <div key={c.label} style={{ borderLeft: '3px solid #FF9900', paddingLeft: 14 }}>
                <p style={{ fontSize: 22, marginBottom: 4 }}>{c.icon}</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#0F1111', marginBottom: 2 }}>{c.label}</p>
                <p style={{ fontSize: 14, color: '#007185' }}>{c.value}</p>
                <p style={{ fontSize: 12, color: '#565959' }}>{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
