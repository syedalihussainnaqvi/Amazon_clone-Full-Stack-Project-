import StaticPageLayout from '../components/StaticPageLayout';
import { Link } from 'react-router-dom';

const adTypes = [
  { icon: '🔍', title: 'Sponsored Search', desc: 'Place your products at the top of search results when shoppers look for what you sell.' },
  { icon: '🖼️', title: 'Display Banners', desc: 'Eye-catching banner ads shown throughout the SYED site to build brand awareness.' },
  { icon: '📧', title: 'Email Marketing', desc: 'Reach our subscriber base of 50,000+ opted-in shoppers with curated product features.' },
  { icon: '🏠', title: 'Homepage Spotlight', desc: 'Secure premium placement on the SYED homepage — our highest-traffic real estate.' },
  { icon: '📱', title: 'Push Notifications', desc: 'Send targeted promotions directly to customers who have opted into mobile alerts.' },
  { icon: '🎯', title: 'Retargeting', desc: 'Re-engage shoppers who viewed your products but haven\'t purchased yet.' },
];

const AdvertisePage = () => (
  <StaticPageLayout title="Advertise Your Products">
    <p style={{ fontSize: 15, marginBottom: 8 }}>
      Put your brand in front of the right audience. SYED's advertising platform gives sellers and brands
      powerful tools to drive traffic, increase sales, and grow brand recognition.
    </p>
    <p style={{ fontSize: 14, color: '#565959', marginBottom: 28 }}>
      Our shoppers spend an average of <strong>12 minutes</strong> per session — giving your ads meaningful exposure.
    </p>

    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Advertising Solutions</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
      {adTypes.map(a => (
        <div key={a.title} style={{ border: '1px solid #DDD', borderRadius: 4, padding: 20 }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>{a.icon}</div>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{a.title}</h3>
          <p style={{ fontSize: 13, color: '#565959', lineHeight: 1.6 }}>{a.desc}</p>
        </div>
      ))}
    </div>

    <div style={{ background: '#F0F2F2', borderRadius: 4, padding: 24, marginBottom: 24 }}>
      <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>How It Works</h2>
      <ol style={{ paddingLeft: 20, lineHeight: 2.2, fontSize: 13 }}>
        <li>Submit your advertising request through our contact form.</li>
        <li>Our ad team will review your brand and products within 48 hours.</li>
        <li>Choose your budget, format, and targeting options.</li>
        <li>Go live and track performance through your seller dashboard.</li>
      </ol>
    </div>

    <div style={{ textAlign: 'center' }}>
      <Link
        to="/contact"
        style={{ display: 'inline-block', background: '#FF9900', color: '#111', fontWeight: 700, fontSize: 14, padding: '10px 32px', borderRadius: 20, textDecoration: 'none' }}
      >
        Get Started with Advertising
      </Link>
    </div>
  </StaticPageLayout>
);

export default AdvertisePage;
