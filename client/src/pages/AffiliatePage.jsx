import StaticPageLayout from '../components/StaticPageLayout';
import { Link } from 'react-router-dom';

const tiers = [
  { name: 'Starter', commission: '8%', cookie: '24 hours', desc: 'Perfect for bloggers and content creators just getting started.', perks: ['Custom affiliate link', 'Monthly payouts', 'Basic reporting dashboard'] },
  { name: 'Partner', commission: '10%', cookie: '7 days', desc: 'For established influencers with an engaged audience.', perks: ['Everything in Starter', 'Weekly payouts', 'Advanced analytics', 'Exclusive coupon codes'] },
  { name: 'Elite', commission: '12%', cookie: '30 days', desc: 'Our top-tier program for high-volume traffic partners.', perks: ['Everything in Partner', 'Daily payouts', 'Dedicated account manager', 'Early access to new products', 'Co-marketing opportunities'] },
];

const AffiliatePage = () => (
  <StaticPageLayout title="Become an Affiliate">
    <p style={{ fontSize: 15, marginBottom: 8 }}>
      Love SYED? Share it with your audience and earn commission on every sale you refer.
      Our affiliate program is free to join and pays some of the highest commissions in men's fashion.
    </p>
    <p style={{ fontSize: 14, color: '#565959', marginBottom: 28 }}>
      Join 2,000+ affiliates already earning with SYED.
    </p>

    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Choose Your Tier</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
      {tiers.map((t, i) => (
        <div
          key={t.name}
          style={{
            border: i === 1 ? '2px solid #FF9900' : '1px solid #DDD',
            borderRadius: 8,
            padding: 20,
            position: 'relative',
            background: i === 1 ? '#FFFBF0' : '#fff',
          }}
        >
          {i === 1 && (
            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#FF9900', color: '#111', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>
              MOST POPULAR
            </div>
          )}
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{t.name}</h3>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#FF9900', marginBottom: 4 }}>{t.commission}</div>
          <div style={{ fontSize: 12, color: '#565959', marginBottom: 12 }}>commission · {t.cookie} cookie</div>
          <p style={{ fontSize: 13, color: '#565959', marginBottom: 16, lineHeight: 1.5 }}>{t.desc}</p>
          <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 2 }}>
            {t.perks.map(p => <li key={p}>{p}</li>)}
          </ul>
        </div>
      ))}
    </div>

    <div style={{ textAlign: 'center' }}>
      <Link
        to="/contact"
        style={{ display: 'inline-block', background: '#FF9900', color: '#111', fontWeight: 700, fontSize: 14, padding: '10px 32px', borderRadius: 20, textDecoration: 'none' }}
      >
        Apply to Become an Affiliate
      </Link>
    </div>
  </StaticPageLayout>
);

export default AffiliatePage;
