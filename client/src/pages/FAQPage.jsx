import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: 'Shipping & Delivery',
    items: [
      { q: 'How long does delivery take?', a: 'Standard delivery takes 5–7 business days. Expedited delivery is 2–3 business days. Orders placed before 2pm EST usually ship the same day.' },
      { q: 'Do you offer free shipping?', a: 'Yes! Orders over $100 qualify for FREE standard shipping automatically at checkout.' },
      { q: 'Can I track my order?', a: 'Absolutely. Once your order ships you\'ll receive a tracking number by email. Visit Your Orders in your account to track in real time.' },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached.' },
      { q: 'How do I start a return?', a: 'Log in to your account, go to Your Orders, select the order, and click "Return or Replace Items". Follow the instructions to print a free return label.' },
      { q: 'When will I receive my refund?', a: 'Refunds are processed within 3–5 business days after we receive your return. You\'ll be notified by email when your refund is issued.' },
    ],
  },
  {
    category: 'Account & Orders',
    items: [
      { q: 'How do I create an account?', a: 'Click "Create your SYED account" on the sign-in page. Fill in your name, email, and password to get started instantly.' },
      { q: 'I forgot my password. What do I do?', a: 'On the sign-in page, click "Forgot your password?" and enter your email. We\'ll send a reset link right away.' },
      { q: 'Can I change or cancel my order?', a: 'Orders can be modified within 1 hour of placement. Go to Your Orders and click "Cancel Items". After the window, contact our support team.' },
    ],
  },
  {
    category: 'Payments',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, American Express, Discover, and PayPal. Gift cards are coming soon.' },
      { q: 'Is my payment information secure?', a: 'Yes. All transactions are encrypted with industry-standard SSL. We never store your full card number on our servers.' },
    ],
  },
];

const FAQPage = () => {
  const [open, setOpen] = useState({});
  const [searchQ, setSearchQ] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const toggle = (key) => setOpen(prev => ({ ...prev, [key]: !prev[key] }));

  const filtered = faqs.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.q.toLowerCase().includes(searchQ.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQ.toLowerCase())
    ),
  })).filter(g =>
    (activeCategory === 'All' || g.category === activeCategory) && g.items.length > 0
  );

  return (
    <div style={{ background: '#EAEDED', minHeight: '100vh', padding: '16px 0' }} id="faq-page">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="amz-breadcrumb flex items-center gap-1 mb-4">
          <Link to="/">SYED</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <span style={{ color: '#0F1111', fontWeight: 700 }}>Help</span>
        </div>

        {/* Header + search */}
        <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px', marginBottom: 12 }}>
          <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0F1111', marginBottom: 6 }}>SYED Help</h1>
          <p style={{ fontSize: 14, color: '#565959', marginBottom: 14 }}>Search our help center or browse topics below.</p>
          <form onSubmit={e => e.preventDefault()} className="flex gap-2">
            <input
              type="text"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Search help topics..."
              className="amz-input flex-1"
              id="faq-search"
            />
            <button type="submit" className="amz-btn-orange" style={{ padding: '7px 20px', fontSize: 14, whiteSpace: 'nowrap' }}>Go</button>
          </form>
        </div>

        {/* Category pills */}
        <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '12px 24px', marginBottom: 12 }}>
          <div className="flex flex-wrap gap-2">
            {['All', ...faqs.map(f => f.category)].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  border: `1px solid ${activeCategory === cat ? '#e77600' : '#DDD'}`,
                  borderRadius: 20,
                  padding: '5px 14px',
                  fontSize: 13,
                  cursor: 'pointer',
                  background: activeCategory === cat ? '#fff3e0' : '#fff',
                  color: activeCategory === cat ? '#0F1111' : '#565959',
                  fontWeight: activeCategory === cat ? 700 : 400,
                  boxShadow: activeCategory === cat ? '0 0 0 2px rgba(228,121,17,0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        {filtered.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: 32, textAlign: 'center' }}>
            <p style={{ fontSize: 16, color: '#565959' }}>No results found for "<strong>{searchQ}</strong>"</p>
            <button onClick={() => setSearchQ('')} style={{ color: '#007185', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, marginTop: 8 }}>Clear search</button>
          </div>
        ) : (
          filtered.map(group => (
            <div key={group.category} style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, marginBottom: 12, overflow: 'hidden' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0F1111', padding: '14px 20px', borderBottom: '1px solid #DDD', background: '#f7f8f8' }}>
                {group.category}
              </h2>
              {group.items.map((item, i) => {
                const key = `${group.category}-${i}`;
                return (
                  <div key={key} style={{ borderBottom: i < group.items.length - 1 ? '1px solid #DDD' : 'none' }}>
                    <button
                      onClick={() => toggle(key)}
                      style={{ width: '100%', textAlign: 'left', padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}
                    >
                      <span style={{ fontSize: 14, color: '#007185', fontWeight: 700 }}>{item.q}</span>
                      <svg style={{ width: 16, height: 16, color: '#565959', flexShrink: 0, transform: open[key] ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {open[key] && (
                      <div style={{ padding: '0 20px 16px', fontSize: 14, color: '#0F1111', lineHeight: 1.6, borderTop: '1px solid #f0f0f0', background: '#fdfdfd' }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))
        )}

        {/* Still need help */}
        <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px', textAlign: 'center', marginTop: 4 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#0F1111', marginBottom: 6 }}>Still need help?</p>
          <p style={{ fontSize: 13, color: '#565959', marginBottom: 14 }}>Our customer service team is here for you.</p>
          <Link to="/contact" className="amz-btn-orange" style={{ padding: '9px 28px', fontSize: 14 }}>Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
