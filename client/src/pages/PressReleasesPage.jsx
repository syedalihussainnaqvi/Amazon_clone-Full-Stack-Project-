import StaticPageLayout from '../components/StaticPageLayout';

const releases = [
  {
    date: 'April 30, 2026',
    title: 'SYED Launches Premium Leather Accessories Line',
    summary:
      'SYED today announced the launch of its new Premium Leather Accessories collection, featuring handcrafted belts, wallets, and watch straps made from full-grain leather sourced from sustainable tanneries.',
  },
  {
    date: 'March 15, 2026',
    title: 'SYED Surpasses 100,000 Active Customers Milestone',
    summary:
      'The fast-growing online menswear retailer celebrated a major milestone this quarter, crossing 100,000 active customers across the United States. CEO statement and full growth metrics included.',
  },
  {
    date: 'February 2, 2026',
    title: 'SYED Partners with Sustainable Fabric Initiative',
    summary:
      'In a commitment to responsible fashion, SYED has joined the Global Sustainable Fabric Initiative, pledging to source 50% of all materials from certified sustainable suppliers by 2027.',
  },
  {
    date: 'January 10, 2026',
    title: 'SYED Announces Free Same-Week Delivery in 12 Cities',
    summary:
      'Starting January 2026, customers in New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, and Jacksonville will enjoy free same-week delivery.',
  },
];

const PressReleasesPage = () => (
  <StaticPageLayout title="Press Releases">
    <p style={{ fontSize: 15, marginBottom: 24 }}>
      Stay up to date with the latest news and announcements from SYED. For media inquiries, please contact our PR team at <strong>press@syed.com</strong>.
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {releases.map(r => (
        <div key={r.title} style={{ borderBottom: '1px solid #DDD', paddingBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#565959', marginBottom: 6 }}>{r.date}</div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0F1111', marginBottom: 8 }}>{r.title}</h2>
          <p style={{ fontSize: 13, color: '#0F1111', lineHeight: 1.7 }}>{r.summary}</p>
          <button
            style={{ marginTop: 10, background: 'none', border: 'none', color: '#007185', fontSize: 13, cursor: 'pointer', padding: 0 }}
          >
            Read full release →
          </button>
        </div>
      ))}
    </div>
  </StaticPageLayout>
);

export default PressReleasesPage;
