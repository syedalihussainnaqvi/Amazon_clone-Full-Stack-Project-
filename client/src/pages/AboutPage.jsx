import StaticPageLayout from '../components/StaticPageLayout';

const AboutPage = () => (
  <StaticPageLayout title="About SYED">

    {/* Stats row */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginBottom: 24 }}>
      {[
        { n: '2,000+', l: 'Products' },
        { n: '15,000+', l: 'Happy Customers' },
        { n: '4.8 / 5', l: 'Average Rating' },
        { n: '30 Days', l: 'Free Returns' },
      ].map(({ n, l }) => (
        <div key={l} style={{ border: '1px solid #DDD', borderRadius: 4, padding: '16px 12px', textAlign: 'center', background: '#fff' }}>
          <p style={{ fontSize: 22, fontWeight: 700, color: '#e77600', marginBottom: 2 }}>{n}</p>
          <p style={{ fontSize: 12, color: '#565959' }}>{l}</p>
        </div>
      ))}
    </div>

    {/* Mission */}
    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0F1111', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid #DDD' }}>
      Our Mission
    </h2>
    <p style={{ fontSize: 14, color: '#0F1111', lineHeight: 1.8, marginBottom: 12 }}>
      At SYED, we believe every man deserves to look and feel his best — without compromise.
      Our mission is to make premium men's fashion accessible to everyone by offering exceptional quality,
      thoughtful design, and an unparalleled shopping experience.
    </p>
    <p style={{ fontSize: 14, color: '#0F1111', lineHeight: 1.8, marginBottom: 28 }}>
      From dress shirts to weekend casuals, we curate our collection with one thing in mind: the modern
      gentleman who values both style and substance.
    </p>

    {/* Values */}
    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0F1111', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid #DDD' }}>
      Our Values
    </h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
      {[
        { icon: '🎯', title: 'Quality First', desc: 'Every product is carefully inspected and selected to meet our high standards before it reaches you.' },
        { icon: '🌱', title: 'Sustainability', desc: 'We partner with ethical manufacturers and use eco-friendly packaging wherever possible.' },
        { icon: '🤝', title: 'Customer First', desc: 'Our support team is always here to ensure your experience is seamless from browsing to delivery.' },
      ].map(v => (
        <div key={v.title} style={{ borderLeft: '3px solid #e77600', paddingLeft: 14 }}>
          <div style={{ fontSize: 24, marginBottom: 6 }}>{v.icon}</div>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#0F1111', marginBottom: 4 }}>{v.title}</p>
          <p style={{ fontSize: 13, color: '#565959', lineHeight: 1.6 }}>{v.desc}</p>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div style={{ border: '1px solid #e77600', borderRadius: 4, padding: '18px 20px', background: '#fffbf2', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#0F1111', marginBottom: 3 }}>Ready to upgrade your wardrobe?</p>
        <p style={{ fontSize: 13, color: '#565959' }}>Shop thousands of premium styles — FREE delivery on orders over $100.</p>
      </div>
      <a href="/products" style={{ background: '#FF9900', border: '1px solid #e77600', borderRadius: 3, padding: '9px 20px', fontSize: 14, fontWeight: 700, color: '#111', textDecoration: 'none', whiteSpace: 'nowrap' }}>
        Shop Now
      </a>
    </div>

  </StaticPageLayout>
);

export default AboutPage;
