import StaticPageLayout from '../components/StaticPageLayout';

const methods = [
  {
    category: 'Credit & Debit Cards',
    icon: '💳',
    items: ['Visa', 'Mastercard', 'American Express', 'Discover', 'SYED Business Card'],
    notes: 'All major credit and debit cards accepted. Card details are encrypted and never stored on our servers.',
  },
  {
    category: 'Digital Wallets',
    icon: '📱',
    items: ['Apple Pay', 'Google Pay', 'PayPal', 'Venmo'],
    notes: 'Pay with a single tap using your saved digital wallet. Available at checkout on supported devices.',
  },
  {
    category: 'Buy Now, Pay Later',
    icon: '📅',
    items: ['Klarna (Pay in 4)', 'Afterpay', 'Affirm (0% APR offers available)'],
    notes: 'Split your purchase into 4 interest-free payments. Available on orders $35 and above.',
  },
  {
    category: 'Gift Cards',
    icon: '🎁',
    items: ['SYED Gift Cards', 'Promotional Credits', 'Store Credit from Returns'],
    notes: 'Enter your gift card code at checkout. Multiple gift cards can be combined on a single order.',
  },
  {
    category: 'Bank Transfer (ACH)',
    icon: '🏦',
    items: ['Direct bank account payment via Plaid'],
    notes: 'Link your bank account securely for direct payments. Processing takes 1–3 business days.',
  },
];

const PaymentMethodsPage = () => (
  <StaticPageLayout title="Payment Methods">
    <p style={{ fontSize: 15, marginBottom: 8 }}>
      SYED accepts a wide range of payment options to make your checkout experience as convenient as possible.
    </p>
    <p style={{ fontSize: 14, color: '#565959', marginBottom: 28 }}>
      All transactions are secured with 256-bit SSL encryption. We never store your full card number.
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
      {methods.map(m => (
        <div key={m.category} style={{ border: '1px solid #DDD', borderRadius: 8, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>{m.icon}</span>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0F1111', margin: 0 }}>{m.category}</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {m.items.map(item => (
              <span
                key={item}
                style={{ background: '#F0F2F2', borderRadius: 4, padding: '4px 10px', fontSize: 12, color: '#0F1111', fontWeight: 500 }}
              >
                {item}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#565959', margin: 0, lineHeight: 1.6 }}>{m.notes}</p>
        </div>
      ))}
    </div>

    <div style={{ background: '#F0F2F2', borderRadius: 4, padding: 16 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>🔒 Your Payment Security</h3>
      <ul style={{ paddingLeft: 20, lineHeight: 2, fontSize: 13 }}>
        <li>All payments are processed by PCI-DSS Level 1 certified payment processors.</li>
        <li>Your full card number is never stored on SYED servers.</li>
        <li>We use 256-bit SSL/TLS encryption for all transactions.</li>
        <li>Suspicious transactions are flagged by our fraud detection system in real time.</li>
      </ul>
    </div>
  </StaticPageLayout>
);

export default PaymentMethodsPage;
