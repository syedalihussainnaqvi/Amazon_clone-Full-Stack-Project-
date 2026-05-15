import StaticPageLayout from '../components/StaticPageLayout';

const initiatives = [
  { icon: '🌿', title: 'Sustainable Sourcing', desc: 'We partner exclusively with suppliers who meet our strict environmental and ethical standards — from fiber to finished product.' },
  { icon: '♻️', title: 'Circular Fashion Program', desc: 'Return your worn SYED items for recycling and earn store credit. Keeping fashion out of landfills, one shirt at a time.' },
  { icon: '🤝', title: 'Community Partnerships', desc: 'We donate 1% of every sale to local workforce development programs that help underserved communities access skilled trade jobs.' },
  { icon: '📦', title: 'Eco Packaging', desc: 'All orders are shipped in 100% recycled or recyclable packaging. We eliminated single-use plastic from our supply chain in 2025.' },
  { icon: '🧵', title: 'Fair Wage Manufacturing', desc: 'Every garment is made in facilities audited for fair wages, safe conditions, and worker dignity. We publish our factory list annually.' },
  { icon: '🌍', title: 'Carbon Offset Shipping', desc: 'We automatically offset the carbon emissions of every shipment through certified reforestation and clean energy projects.' },
];

const OdionCaresPage = () => (
  <StaticPageLayout title="SYED Cares">
    <p style={{ fontSize: 15, marginBottom: 8 }}>
      <strong>SYED Cares</strong> is our commitment to people and the planet. We believe great style should never come at the expense of the world we live in.
    </p>
    <p style={{ fontSize: 14, color: '#565959', marginBottom: 28 }}>
      From sustainable materials to community investment, every decision we make is guided by our core values of responsibility, transparency, and impact.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
      {initiatives.map(i => (
        <div key={i.title} style={{ border: '1px solid #DDD', borderRadius: 4, padding: 20 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>{i.icon}</div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#0F1111' }}>{i.title}</h3>
          <p style={{ fontSize: 13, color: '#565959', lineHeight: 1.6 }}>{i.desc}</p>
        </div>
      ))}
    </div>

    <div style={{ background: 'linear-gradient(135deg, #131921, #232F3E)', borderRadius: 8, padding: '24px 28px', color: '#fff', textAlign: 'center' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Our 2027 Goals</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', marginTop: 16 }}>
        {[['50%', 'Sustainable materials'], ['Zero', 'Single-use plastic'], ['1M+', 'Trees planted'], ['100%', 'Carbon neutral shipping']].map(([val, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#FF9900' }}>{val}</div>
            <div style={{ fontSize: 12, color: '#DDD', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  </StaticPageLayout>
);

export default OdionCaresPage;
