import StaticPageLayout from '../components/StaticPageLayout';
import { Link } from 'react-router-dom';

const steps = [
  { step: '1', title: 'Go to Your Orders', desc: 'Find the item you want to return in your order history.' },
  { step: '2', title: 'Select Return Reason', desc: 'Choose the reason for your return from the dropdown menu.' },
  { step: '3', title: 'Print Return Label', desc: 'Download and print your free pre-paid return shipping label.' },
  { step: '4', title: 'Drop Off Package', desc: 'Drop it at any authorized carrier location within 30 days.' },
];

const ReturnsPage = () => (
  <StaticPageLayout title="Returns & Replacements">
    <p style={{ fontSize: 15, marginBottom: 24 }}>
      We want you to be completely satisfied with your purchase. Return most items within <strong>30 days</strong> of delivery for a full refund.
    </p>

    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>How to Return an Item</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
      {steps.map(s => (
        <div key={s.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#F0F2F2', borderRadius: 4, padding: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FF9900', color: '#111', fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {s.step}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: '#565959' }}>{s.desc}</div>
          </div>
        </div>
      ))}
    </div>

    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Return Policy Highlights</h2>
    <ul style={{ paddingLeft: 20, marginBottom: 24, lineHeight: 2 }}>
      <li>Most items can be returned within <strong>30 days</strong> of the delivery date.</li>
      <li>Items must be in their original condition and packaging.</li>
      <li>Free returns on all eligible orders — we'll cover the shipping.</li>
      <li>Refunds are processed within <strong>3–5 business days</strong> of receiving the item.</li>
      <li>Sale and clearance items marked <em>Final Sale</em> are not eligible for returns.</li>
    </ul>

    <div style={{ border: '1px solid #FF9900', borderRadius: 4, padding: 16, background: '#FFFBF0' }}>
      <strong>Need to start a return?</strong>{' '}
      <Link to="/orders" style={{ color: '#007185' }}>Go to Your Orders →</Link>
    </div>
  </StaticPageLayout>
);

export default ReturnsPage;
