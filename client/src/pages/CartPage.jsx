import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

const CartPage = () => {
  const { items, loading, cartTotal, updateQuantity, removeItem, clearCart } = useCart();
  const { toggleWishlist, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSaveForLater = async (productId, size, color) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await toggleWishlist(productId);
    removeItem(productId, size, color);
  };

  if (loading) return <LoadingSpinner size="lg" text="Loading your cart..." />;

  const tax = cartTotal * 0.08;
  const shipping = cartTotal > 100 ? 0 : 15;
  const finalTotal = cartTotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div style={{ background: '#EAEDED', minHeight: '100vh', padding: '16px 0' }} id="cart-page">
        <div className="max-w-[1200px] mx-auto px-4">
          <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: 40, textAlign: 'center' }}>
            <svg style={{ width: 64, height: 64, color: '#DDD', margin: '0 auto 16px' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7 17h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0F1111', marginBottom: 8 }}>Your Shopping Cart is empty</h2>
            <p style={{ fontSize: 14, color: '#565959', marginBottom: 20 }}>You have no items in your shopping cart. To buy now, click on items that interest you.</p>
            <Link to="/products" className="amz-btn-primary" style={{ fontSize: 14, padding: '10px 24px' }}>Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#EAEDED', minHeight: '100vh', padding: '16px 0' }} id="cart-page">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start">

          {/* ── Cart Items Panel ── */}
          <div style={{ flex: 1 }}>
            <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #DDD' }}>
                <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0F1111' }}>Shopping Cart</h1>
                <p style={{ fontSize: 13, color: '#565959' }}>Price</p>
              </div>

              {items.map((item) => {
                const product = item.productId;
                if (!product) return null;
                return (
                  <div
                    key={`${product._id}-${item.size}-${item.color}`}
                    style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid #DDD' }}
                  >
                    {/* Image */}
                    <Link to={`/products/${product._id}`} style={{ flexShrink: 0, width: 120, height: 120, background: '#f7f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                      <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </Link>

                    {/* Details */}
                    <div style={{ flex: 1 }}>
                      <Link to={`/products/${product._id}`}>
                        <p className="line-clamp-2" style={{ color: '#007185', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{product.title}</p>
                      </Link>
                      <p style={{ color: '#007600', fontSize: 13, marginBottom: 4 }}>In Stock</p>
                      <div style={{ fontSize: 12, color: '#565959', marginBottom: 8 }}>
                        <span>Size: <strong>{item.size}</strong></span>
                        {item.color && <span style={{ marginLeft: 12 }}>Color: <strong>{item.color}</strong></span>}
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Quantity */}
                        <select
                          value={item.quantity}
                          onChange={e => updateQuantity(product._id, Number(e.target.value), item.size, item.color)}
                          className="amz-input"
                          style={{ width: 'auto', fontSize: 13, padding: '4px 8px' }}
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(n => (
                            <option key={n} value={n}>Qty: {n}</option>
                          ))}
                        </select>
                        <span style={{ color: '#DDD' }}>|</span>
                        <button
                          onClick={() => removeItem(product._id, item.size, item.color)}
                          style={{ background: 'none', border: 'none', color: '#007185', fontSize: 13, cursor: 'pointer', padding: 0 }}
                        >
                          Delete
                        </button>
                        <span style={{ color: '#DDD' }}>|</span>
                        <button 
                          onClick={() => handleSaveForLater(product._id, item.size, item.color)}
                          style={{ background: 'none', border: 'none', color: '#007185', fontSize: 13, cursor: 'pointer', padding: 0 }}
                        >
                          Save for later
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 80 }}>
                      <p style={{ fontSize: 18, fontWeight: 700, color: '#0F1111' }}>${(product.price * item.quantity).toFixed(2)}</p>
                      {item.quantity > 1 && <p style={{ fontSize: 12, color: '#565959' }}>${product.price.toFixed(2)} each</p>}
                    </div>
                  </div>
                );
              })}

              {/* Subtotal row */}
              <div style={{ paddingTop: 16, textAlign: 'right' }}>
                <p style={{ fontSize: 18, color: '#0F1111' }}>
                  Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items):{' '}
                  <strong style={{ fontSize: 20 }}>${cartTotal.toFixed(2)}</strong>
                </p>
              </div>
            </div>

            {/* Gift option */}
            <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '12px 24px', marginTop: 8 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: 14, height: 14 }} />
                This order contains a gift
              </label>
            </div>

            {/* Clear cart */}
            <div style={{ marginTop: 8, textAlign: 'right' }}>
              <button onClick={clearCart} style={{ background: 'none', border: 'none', color: '#CC0C39', fontSize: 13, cursor: 'pointer' }}>
                Clear Cart
              </button>
            </div>
          </div>

          {/* ── Order Summary Sidebar ── */}
          <div style={{ width: '100%', maxWidth: 280 }} className="lg:w-72 lg:max-w-none">
            <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: 20 }}>
              <p style={{ color: '#007600', fontSize: 14, marginBottom: 12 }}>
                Your order qualifies for <strong>FREE Delivery</strong>. Choose this option at checkout.
              </p>
              <div style={{ fontSize: 18, color: '#0F1111', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #DDD' }}>
                Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items):{' '}
                <strong style={{ fontSize: 20 }}>${cartTotal.toFixed(2)}</strong>
              </div>

              <div style={{ fontSize: 13, color: '#565959', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>Shipping</span>
                  <span style={{ color: '#007600' }}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>Estimated tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid #DDD', fontWeight: 700, fontSize: 16, color: '#0F1111', marginTop: 6 }}>
                  <span>Order total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                id="checkout-btn"
                className="amz-btn-orange"
                style={{ width: '100%', fontSize: 14, padding: '10px 0', marginBottom: 10 }}
              >
                Proceed to checkout ({items.reduce((a, i) => a + i.quantity, 0)} items)
              </button>

              <Link to="/products" style={{ display: 'block', textAlign: 'center', fontSize: 13, color: '#007185' }} className="hover:underline">
                Continue shopping
              </Link>
            </div>

            {/* Payment icons */}
            <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '12px 16px', marginTop: 8 }}>
              <p style={{ fontSize: 12, color: '#565959', marginBottom: 8 }}>We accept:</p>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'MC', 'Amex', 'PayPal'].map(m => (
                  <div key={m} style={{ border: '1px solid #DDD', borderRadius: 3, padding: '3px 8px', fontSize: 11, color: '#565959' }}>{m}</div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
