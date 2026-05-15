import StaticPageLayout from '../components/StaticPageLayout';
import { useState } from 'react';

const denominations = [25, 50, 75, 100, 150, 200];

const GiftCardsPage = () => {
  const [selected, setSelected] = useState(50);
  const [customAmt, setCustomAmt] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const finalAmount = customAmt ? Number(customAmt) : selected;

  const handleSend = (e) => {
    e.preventDefault();
    if (!recipientEmail) return;
    setSent(true);
  };

  return (
    <StaticPageLayout title="Gift Cards">
      {sent ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎁</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Gift Card Sent!</h2>
          <p style={{ fontSize: 14, color: '#565959', marginBottom: 24 }}>
            A ${finalAmount} SYED gift card has been sent to <strong>{recipientEmail}</strong>.
          </p>
          <button
            onClick={() => { setSent(false); setRecipientEmail(''); setRecipientName(''); setMessage(''); }}
            style={{ background: '#FF9900', color: '#111', fontWeight: 700, fontSize: 13, padding: '8px 24px', borderRadius: 20, border: 'none', cursor: 'pointer' }}
          >
            Send Another
          </button>
        </div>
      ) : (
        <>
          <p style={{ fontSize: 15, marginBottom: 24 }}>
            Give the gift of style. SYED gift cards are delivered instantly by email and never expire.
          </p>

          {/* Gift Card Preview */}
          <div style={{
            background: 'linear-gradient(135deg, #131921, #232F3E)',
            borderRadius: 12,
            padding: '24px 28px',
            marginBottom: 28,
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: 400,
          }}>
            <div>
              <div style={{ fontSize: 10, color: '#aaa', letterSpacing: 2 }}>SYED</div>
              <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>GIFT CARD</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#FF9900', marginTop: 8 }}>${finalAmount || '?'}</div>
            </div>
            <div style={{ fontSize: 40 }}>🎁</div>
          </div>

          <form onSubmit={handleSend} style={{ maxWidth: 480 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Select Amount</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              {denominations.map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => { setSelected(d); setCustomAmt(''); }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 20,
                    border: selected === d && !customAmt ? '2px solid #FF9900' : '1px solid #DDD',
                    background: selected === d && !customAmt ? '#FFFBF0' : '#fff',
                    fontWeight: selected === d && !customAmt ? 700 : 400,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  ${d}
                </button>
              ))}
              <input
                type="number"
                placeholder="Custom $"
                value={customAmt}
                onChange={e => setCustomAmt(e.target.value)}
                style={{ width: 100, padding: '8px 12px', border: customAmt ? '2px solid #FF9900' : '1px solid #DDD', borderRadius: 20, fontSize: 14, outline: 'none' }}
                min={1}
                max={2000}
              />
            </div>

            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Recipient Details</h2>
            {[
              { label: "Recipient's Name", val: recipientName, set: setRecipientName, type: 'text', required: false },
              { label: "Recipient's Email *", val: recipientEmail, set: setRecipientEmail, type: 'email', required: true },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>{f.label}</label>
                <input
                  type={f.type}
                  value={f.val}
                  onChange={e => f.set(e.target.value)}
                  required={f.required}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #DDD', borderRadius: 4, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Personal Message (optional)</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={3}
                placeholder="Write a personal note..."
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #DDD', borderRadius: 4, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              style={{ background: '#FF9900', color: '#111', fontWeight: 700, fontSize: 14, padding: '10px 32px', borderRadius: 20, border: 'none', cursor: 'pointer' }}
            >
              Send Gift Card — ${finalAmount || 0}
            </button>
          </form>
        </>
      )}
    </StaticPageLayout>
  );
};

export default GiftCardsPage;
