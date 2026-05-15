import StaticPageLayout from '../components/StaticPageLayout';
import { Link } from 'react-router-dom';

const benefits = [
  { icon: '🏪', title: 'Massive Audience', desc: 'Reach over 100,000 active shoppers who are already looking for menswear.' },
  { icon: '📈', title: 'Powerful Analytics', desc: 'Track your listings, views, conversions, and revenue from a single dashboard.' },
  { icon: '🚚', title: 'Fulfilled by SYED', desc: 'Let us handle storage, packing, and shipping — you focus on your products.' },
  { icon: '💳', title: 'Fast Payouts', desc: 'Receive bi-weekly direct deposit payments with transparent fee reporting.' },
  { icon: '🛡️', title: 'Seller Protection', desc: 'Our A-to-Z Seller Guarantee protects you from fraudulent claims.' },
  { icon: '📣', title: 'Sponsored Listings', desc: 'Boost your visibility with targeted ad placements inside search results.' },
];

const SellPage = () => (
  <StaticPageLayout title="Sell on SYED">
    <p style={{ fontSize: 15, marginBottom: 8 }}>
      Join thousands of brands and independent sellers who grow their business on SYED — the premier destination for men's fashion online.
    </p>
    <p style={{ fontSize: 14, color: '#565959', marginBottom: 28 }}>
      Whether you're a boutique label or an established brand, our seller platform gives you the tools to succeed.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
      {benefits.map(b => (
        <div key={b.title} style={{ border: '1px solid #DDD', borderRadius: 4, padding: 20 }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>{b.icon}</div>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{b.title}</h3>
          <p style={{ fontSize: 13, color: '#565959', lineHeight: 1.6 }}>{b.desc}</p>
        </div>
      ))}
    </div>

    <div style={{ background: '#F0F2F2', borderRadius: 4, padding: 24, textAlign: 'center', marginBottom: 24 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Seller Fees</h2>
      <p style={{ fontSize: 13, color: '#565959', marginBottom: 16 }}>
        We charge a flat <strong>8% referral fee</strong> on each sale — no monthly subscription required to get started.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
        {[['8%', 'Referral fee'], ['0%', 'Listing fee'], ['$0', 'Monthly plan to start']].map(([val, label]) => (
          <div key={label}>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#FF9900' }}>{val}</div>
            <div style={{ fontSize: 12, color: '#565959' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ textAlign: 'center' }}>
      <Link
        to="/contact"
        style={{ display: 'inline-block', background: '#FF9900', color: '#111', fontWeight: 700, fontSize: 14, padding: '10px 32px', borderRadius: 20, textDecoration: 'none' }}
      >
        Start Selling Today
      </Link>
    </div>
  </StaticPageLayout>
);

export default SellPage;
