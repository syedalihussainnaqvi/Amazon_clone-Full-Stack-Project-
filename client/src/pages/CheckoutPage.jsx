import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const steps = ['Shipping address', 'Payment method', 'Review items & delivery'];

const CheckoutPage = () => {
  const { user } = useAuth();
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName:  user?.name?.split(' ')[0] || '',
    lastName:   user?.name?.split(' ').slice(1).join(' ') || '',
    email:      user?.email || '',
    address:    '',
    city:       '',
    country:    'United States',
    zip:        '',
    cardName:   '',
    cardNumber: '',
    expDate:    '',
    cvv:        '',
  });

  const tax = cartTotal * 0.08;
  const shipping = cartTotal > 100 ? 0 : 15;
  const finalTotal = cartTotal + tax + shipping;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 2) { setStep(step + 1); return; }
    setLoading(true);
    try {
      const orderData = {
        items: items.map(i => ({ 
          productId: i.productId._id, 
          title: i.productId.title,
          image: i.productId.image,
          quantity: i.quantity, 
          size: i.size, 
          color: i.color, 
          price: i.productId.price 
        })),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          zip: formData.zip
        },
        paymentMethod: 'Credit Card',
        subtotal: cartTotal,
        tax,
        shipping,
        totalPrice: finalTotal
      };
      await orderAPI.create(orderData);
      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── ORDER CONFIRMED ── */
  if (success) {
    return (
      <div style={{ background: '#EAEDED', minHeight: '100vh', padding: '16px 0', display: 'flex', justifyContent: 'center' }} id="checkout-success">
        <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '40px 32px', maxWidth: 560, width: '100%', textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f0fff4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg style={{ width: 36, height: 36, color: '#007600' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0F1111', marginBottom: 8 }}>Order Placed!</h1>
          <p style={{ fontSize: 14, color: '#007600', fontWeight: 700, marginBottom: 6 }}>
            Thank you. Your order has been placed.
          </p>
          <p style={{ fontSize: 13, color: '#565959', marginBottom: 24, lineHeight: 1.6 }}>
            A confirmation e-mail will be sent to <strong>{formData.email}</strong>. Your order will be processed within 1–2 business days.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/orders" className="amz-btn-orange" style={{ fontSize: 14, padding: '10px 0', display: 'block' }}>
              View Your Orders
            </Link>
            <button onClick={() => navigate('/')} style={{ border: '1px solid #DDD', borderRadius: 3, padding: '10px 0', fontSize: 14, color: '#0F1111', background: 'linear-gradient(to bottom,#f7f8f8,#e7e9ec)', cursor: 'pointer' }}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#EAEDED', minHeight: '100vh', padding: '16px 0' }} id="checkout-page">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Breadcrumb */}
        <div className="amz-breadcrumb flex items-center gap-1 mb-4">
          <Link to="/">SYED</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <Link to="/cart">Cart</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <span style={{ color: '#0F1111', fontWeight: 700 }}>Checkout</span>
        </div>

        {/* Step progress */}
        <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '14px 24px', marginBottom: 12 }}>
          <div className="flex items-center gap-0">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center" style={{ flex: i < steps.length - 1 ? 1 : 0 }}>
                <div className="flex items-center gap-2">
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                    background: i <= step ? '#FF9900' : '#f0f0f0',
                    color: i <= step ? '#111' : '#aaa',
                    flexShrink: 0,
                  }}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: i === step ? 700 : 400, color: i <= step ? '#0F1111' : '#aaa', whiteSpace: 'nowrap' }}>
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: 1, background: i < step ? '#FF9900' : '#DDD', margin: '0 8px' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-start">

          {/* ── Form ── */}
          <div style={{ flex: 1 }}>
            <form onSubmit={handleSubmit}>

              {/* Step 0 – Shipping */}
              {step === 0 && (
                <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px', marginBottom: 12 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F1111', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #DDD' }}>
                    Enter a new shipping address
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'First name', name: 'firstName', span: 1 },
                      { label: 'Last name',  name: 'lastName',  span: 1 },
                      { label: 'Email address', name: 'email', type: 'email', span: 2 },
                      { label: 'Street address', name: 'address', placeholder: '123 Main St, Apt 4B', span: 2 },
                      { label: 'City', name: 'city', span: 1 },
                      { label: 'ZIP / Postal Code', name: 'zip', span: 1 },
                    ].map(f => (
                      <div key={f.name} style={{ gridColumn: `span ${f.span}` }}>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 4, color: '#0F1111' }}>{f.label}</label>
                        <input
                          required
                          type={f.type || 'text'}
                          name={f.name}
                          value={formData[f.name]}
                          onChange={handleChange}
                          placeholder={f.placeholder || ''}
                          className="amz-input"
                        />
                      </div>
                    ))}
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 4, color: '#0F1111' }}>Country/Region</label>
                      <select name="country" value={formData.country} onChange={handleChange} className="amz-input">
                        {['United States', 'United Kingdom', 'Canada', 'Australia', 'Pakistan', 'India', 'Germany', 'France'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <button type="submit" className="amz-btn-orange" style={{ padding: '10px 28px', fontSize: 14 }}>
                      Use this address
                    </button>
                  </div>
                </div>
              )}

              {/* Step 1 – Payment */}
              {step === 1 && (
                <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px', marginBottom: 12 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F1111', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #DDD' }}>
                    Select a payment method
                  </h2>

                  <div style={{ border: '1px solid #e77600', borderRadius: 3, padding: '14px 16px', marginBottom: 20, background: '#fffbf2' }}>
                    <div className="flex items-center gap-3">
                      <input type="radio" checked readOnly style={{ accentColor: '#FF9900', width: 16, height: 16 }} />
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#0F1111' }}>Credit or debit card</span>
                      <div className="flex gap-1 ml-auto">
                        {['VISA', 'MC', 'AMEX'].map(m => (
                          <div key={m} style={{ border: '1px solid #DDD', borderRadius: 3, padding: '2px 6px', fontSize: 10, fontWeight: 700, color: '#555', background: '#fff' }}>{m}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Name on card</label>
                      <input required type="text" name="cardName" value={formData.cardName} onChange={handleChange} className="amz-input" />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Card number</label>
                      <input required type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" maxLength="19" className="amz-input" style={{ fontFamily: 'monospace' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Expiration date</label>
                      <input required type="text" name="expDate" value={formData.expDate} onChange={handleChange} placeholder="MM/YY" maxLength="5" className="amz-input" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>CVV</label>
                      <input required type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" maxLength="4" className="amz-input" />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button type="submit" className="amz-btn-orange" style={{ padding: '10px 28px', fontSize: 14 }}>
                      Use this payment method
                    </button>
                    <button type="button" onClick={() => setStep(0)} style={{ border: '1px solid #DDD', borderRadius: 3, padding: '10px 20px', fontSize: 14, color: '#0F1111', background: 'linear-gradient(to bottom,#f7f8f8,#e7e9ec)', cursor: 'pointer' }}>
                      Back
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 – Review */}
              {step === 2 && (
                <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px', marginBottom: 12 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F1111', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #DDD' }}>
                    Review items and delivery
                  </h2>

                  <div style={{ background: '#f0fff4', border: '1px solid #b2f5c8', borderRadius: 3, padding: '10px 14px', marginBottom: 16 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#007600' }}>
                      🚚 Estimated delivery: {new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                  </div>

                  {items.map((item, i) => {
                    const p = item.productId;
                    if (!p) return null;
                    return (
                      <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
                        <div style={{ width: 80, height: 80, background: '#f7f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, flexShrink: 0 }}>
                          <img src={p.image} alt={p.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p className="line-clamp-2" style={{ fontSize: 14, color: '#007185', fontWeight: 700, marginBottom: 3 }}>{p.title}</p>
                          <p style={{ fontSize: 12, color: '#565959' }}>Size: {item.size} · Qty: {item.quantity}</p>
                          <p style={{ fontSize: 13, fontWeight: 700, color: '#CC0C39', marginTop: 4 }}>${(p.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    );
                  })}

                  <div style={{ marginTop: 20 }}>
                    <p style={{ fontSize: 13, color: '#565959', marginBottom: 14 }}>
                      By placing your order, you agree to SYED's{' '}
                      <Link to="/privacy" style={{ color: '#007185' }}>privacy notice</Link> and{' '}
                      <Link to="/terms" style={{ color: '#007185' }}>conditions of use</Link>.
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      id="place-order-btn"
                      className="amz-btn-orange"
                      style={{ padding: '12px 32px', fontSize: 16, fontWeight: 700 }}
                    >
                      {loading ? 'Processing...' : `Place your order  ($${finalTotal.toFixed(2)})`}
                    </button>
                    <button type="button" onClick={() => setStep(1)} style={{ marginLeft: 12, border: '1px solid #DDD', borderRadius: 3, padding: '10px 20px', fontSize: 14, color: '#0F1111', background: 'linear-gradient(to bottom,#f7f8f8,#e7e9ec)', cursor: 'pointer' }}>
                      Back
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* ── Order Summary Sidebar ── */}
          <div style={{ width: '100%', maxWidth: 280 }} className="lg:w-72 lg:max-w-none">
            {step === 2 && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="amz-btn-orange"
                style={{ width: '100%', padding: '10px 0', fontSize: 14, fontWeight: 700, marginBottom: 12 }}
              >
                {loading ? 'Processing...' : 'Place your order'}
              </button>
            )}

            <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F1111', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #DDD' }}>
                Order Summary
              </h3>
              <div style={{ fontSize: 13, color: '#565959' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>Items ({items.length})</span>
                  <span style={{ color: '#0F1111' }}>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>Shipping &amp; handling</span>
                  <span style={{ color: '#0F1111' }}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, paddingBottom: 10, borderBottom: '1px solid #DDD' }}>
                  <span>Estimated tax</span>
                  <span style={{ color: '#0F1111' }}>${tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#0F1111' }}>Order total</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#CC0C39' }}>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '14px 16px', marginTop: 8 }}>
              <p style={{ fontSize: 12, color: '#565959', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <svg style={{ width: 14, height: 14, color: '#007600' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                256-bit SSL Encrypted
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
