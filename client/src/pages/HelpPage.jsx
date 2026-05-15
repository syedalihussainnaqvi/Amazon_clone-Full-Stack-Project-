import StaticPageLayout from '../components/StaticPageLayout';
import { Link } from 'react-router-dom';

const HelpPage = () => (
  <StaticPageLayout title="Help & Customer Service">
    <p style={{ fontSize: 15, marginBottom: 24 }}>
      Welcome to SYED Help. Browse the topics below to find answers to your questions.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
      {[
        { icon: '📦', title: 'Track Your Order', desc: 'Find out where your package is.', to: '/orders' },
        { icon: '↩️', title: 'Returns & Replacements', desc: 'Return or exchange an item.', to: '/returns' },
        { icon: '🚚', title: 'Shipping Rates & Policies', desc: 'Learn about delivery options.', to: '/shipping' },
        { icon: '💳', title: 'Payment Methods', desc: 'Manage cards and payment options.', to: '/payment-methods' },
        { icon: '🎁', title: 'Gift Cards', desc: 'Buy and redeem gift cards.', to: '/gift-cards' },
        { icon: '📞', title: 'Contact Us', desc: 'Speak with our support team.', to: '/contact' },
      ].map(card => (
        <Link
          key={card.title}
          to={card.to}
          style={{
            display: 'block',
            border: '1px solid #DDD',
            borderRadius: 4,
            padding: 16,
            textDecoration: 'none',
            color: '#0F1111',
            background: '#fff',
            transition: 'box-shadow 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
        >
          <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#007185', marginBottom: 4 }}>{card.title}</div>
          <div style={{ fontSize: 13, color: '#565959' }}>{card.desc}</div>
        </Link>
      ))}
    </div>

    <div style={{ background: '#F0F2F2', borderRadius: 4, padding: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Still need help?</h2>
      <p style={{ fontSize: 13, marginBottom: 12 }}>Our customer service team is available 24/7.</p>
      <Link
        to="/contact"
        style={{
          display: 'inline-block',
          background: '#FF9900',
          color: '#111',
          fontWeight: 700,
          fontSize: 13,
          padding: '8px 20px',
          borderRadius: 20,
          textDecoration: 'none',
        }}
      >
        Contact Us
      </Link>
    </div>
  </StaticPageLayout>
);

export default HelpPage;
