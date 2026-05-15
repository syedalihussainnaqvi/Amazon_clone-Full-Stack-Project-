import StaticPageLayout from '../components/StaticPageLayout';

const features = [
  { icon: '💰', title: '3% Cash Back', desc: 'Earn 3% back on every SYED purchase, automatically credited to your account.' },
  { icon: '🚚', title: 'Free Expedited Shipping', desc: 'Cardholders get free 2-day shipping on all orders, no minimum spend required.' },
  { icon: '🎁', title: 'Welcome Bonus', desc: 'Earn a $50 statement credit after spending $150 in the first 3 months.' },
  { icon: '🔒', title: 'Zero Fraud Liability', desc: 'You\'re never responsible for unauthorized charges on your SYED Business Card.' },
  { icon: '📊', title: 'Spend Analytics', desc: 'Track all business expenses with categorized monthly reports and export to CSV.' },
  { icon: '👥', title: 'Employee Cards', desc: 'Issue up to 10 employee cards at no extra cost, each with custom spending limits.' },
];

const BusinessCardPage = () => (
  <StaticPageLayout title="SYED Business Card">
    <p style={{ fontSize: 15, marginBottom: 8 }}>
      The <strong>SYED Business Card</strong> is designed for business owners, resellers, and power shoppers who want to maximize their SYED spending.
    </p>
    <p style={{ fontSize: 14, color: '#565959', marginBottom: 28 }}>
      No annual fee. No complicated rewards systems. Just straightforward benefits every time you shop.
    </p>

    {/* Card Visual */}
    <div style={{
      background: 'linear-gradient(135deg, #131921 0%, #232F3E 60%, #37475A 100%)',
      borderRadius: 16,
      padding: '28px 32px',
      marginBottom: 32,
      color: '#fff',
      maxWidth: 380,
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,153,0,0.15)' }} />
      <div style={{ fontSize: 10, color: '#aaa', marginBottom: 24, letterSpacing: 2 }}>SYED</div>
      <div style={{ fontSize: 18, letterSpacing: 4, fontFamily: 'monospace', marginBottom: 24 }}>•••• •••• •••• 4829</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 10, color: '#aaa' }}>CARDHOLDER</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>YOUR NAME</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: '#aaa' }}>EXPIRES</div>
          <div style={{ fontSize: 14 }}>12/29</div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#FF9900', letterSpacing: -1 }}>SYED</div>
      </div>
    </div>

    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Card Features</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
      {features.map(f => (
        <div key={f.title} style={{ border: '1px solid #DDD', borderRadius: 4, padding: 20 }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{f.title}</h3>
          <p style={{ fontSize: 13, color: '#565959', lineHeight: 1.6 }}>{f.desc}</p>
        </div>
      ))}
    </div>

    <div style={{ background: '#F0F2F2', borderRadius: 4, padding: 20, marginBottom: 16 }}>
      <strong>No Annual Fee</strong> · <strong>No Foreign Transaction Fees</strong> · <strong>0% Intro APR for 12 months</strong>
    </div>

    <button
      style={{ background: '#FF9900', color: '#111', fontWeight: 700, fontSize: 14, padding: '10px 32px', borderRadius: 20, border: 'none', cursor: 'pointer' }}
      onClick={() => alert('Card application coming soon!')}
    >
      Apply Now — Takes 2 Minutes
    </button>
  </StaticPageLayout>
);

export default BusinessCardPage;
