import StaticPageLayout from '../components/StaticPageLayout';

const tiers = [
  { type: 'Standard Shipping', time: '5–8 Business Days', cost: 'FREE on orders over $35 · $4.99 otherwise' },
  { type: 'Expedited Shipping', time: '2–3 Business Days', cost: '$8.99' },
  { type: 'Priority Shipping', time: 'Next Business Day', cost: '$14.99' },
  { type: 'Same-Day Delivery', time: 'Same day (order by 12 PM)', cost: '$12.99 — select cities only' },
];

const ShippingPage = () => (
  <StaticPageLayout title="Shipping Rates & Policies">
    <p style={{ fontSize: 15, marginBottom: 24 }}>
      SYED offers multiple shipping options to get your order to you fast. All orders are processed within
      1–2 business days and shipped Monday – Saturday (excluding public holidays).
    </p>

    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Shipping Options</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32, fontSize: 13 }}>
      <thead>
        <tr style={{ background: '#F0F2F2' }}>
          <th style={{ border: '1px solid #DDD', padding: '10px 14px', textAlign: 'left' }}>Shipping Type</th>
          <th style={{ border: '1px solid #DDD', padding: '10px 14px', textAlign: 'left' }}>Estimated Delivery</th>
          <th style={{ border: '1px solid #DDD', padding: '10px 14px', textAlign: 'left' }}>Cost</th>
        </tr>
      </thead>
      <tbody>
        {tiers.map(t => (
          <tr key={t.type}>
            <td style={{ border: '1px solid #DDD', padding: '10px 14px', fontWeight: 600 }}>{t.type}</td>
            <td style={{ border: '1px solid #DDD', padding: '10px 14px' }}>{t.time}</td>
            <td style={{ border: '1px solid #DDD', padding: '10px 14px' }}>{t.cost}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Additional Policies</h2>
    <ul style={{ paddingLeft: 20, lineHeight: 2, marginBottom: 24 }}>
      <li>Shipping times are estimates and not guaranteed (may vary during peak periods).</li>
      <li>International shipping is currently unavailable.</li>
      <li>PO Boxes are not supported for expedited or priority shipping.</li>
      <li>Orders containing multiple items may ship in separate packages.</li>
      <li>You will receive a tracking number by email once your order ships.</li>
    </ul>

    <div style={{ background: '#F0F2F2', borderRadius: 4, padding: 16 }}>
      <strong>🚚 Free Standard Shipping</strong> on all orders over $35. No promo code needed — discount applied at checkout.
    </div>
  </StaticPageLayout>
);

export default ShippingPage;
