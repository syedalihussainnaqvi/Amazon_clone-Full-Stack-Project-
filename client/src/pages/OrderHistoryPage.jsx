import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardSidebar } from './ProfileDashboard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import api from '../services/api';

const statusStyle = (status) => {
  switch (status) {
    case 'Delivered':  return { color: '#007600', background: '#f0fff4', border: '1px solid #b2f5c8' };
    case 'Shipped':    return { color: '#232F3E', background: '#fff8e6', border: '1px solid #FFD580' };
    case 'Processing': return { color: '#007185', background: '#e8f8fa', border: '1px solid #b2e4ec' };
    case 'Cancelled':  return { color: '#CC0C39', background: '#fff5f5', border: '1px solid #ffc9c9' };
    default:           return { color: '#565959', background: '#f7f8f8', border: '1px solid #DDD' };
  }
};

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/myorders')
      .then(({ data }) => setOrders(data))
      .catch(err => console.error('Failed to fetch orders:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: '#EAEDED', minHeight: '100vh', padding: '16px 0' }} id="orders-page">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="amz-breadcrumb flex items-center gap-1 mb-4">
          <Link to="/">SYED</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <Link to="/profile">Your Account</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <span style={{ color: '#0F1111', fontWeight: 700 }}>Your Orders</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <DashboardSidebar active="/orders" />

          <div style={{ flex: 1 }}>
            <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px' }}>
              <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0F1111', marginBottom: 4 }}>Your Orders</h1>
              <p style={{ fontSize: 13, color: '#565959', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #DDD' }}>
                {orders.length} order{orders.length !== 1 ? 's' : ''} placed
              </p>

              {loading ? (
                <LoadingSpinner />
              ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F1111', marginBottom: 8 }}>No orders yet</h3>
                  <p style={{ fontSize: 14, color: '#565959', marginBottom: 20 }}>When you place an order, it will appear here.</p>
                  <Link to="/products" className="amz-btn-primary" style={{ padding: '9px 24px', fontSize: 14 }}>Start Shopping</Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {orders.map((order) => (
                    <div key={order._id} style={{ border: '1px solid #DDD', borderRadius: 4, overflow: 'hidden' }}>
                      {/* Order header */}
                      <div style={{ background: '#f7f8f8', padding: '12px 20px', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', borderBottom: '1px solid #DDD' }}>
                        <div>
                          <p style={{ fontSize: 11, color: '#565959', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Order Placed</p>
                          <p style={{ fontSize: 13, color: '#0F1111' }}>{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: 11, color: '#565959', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Total</p>
                          <p style={{ fontSize: 13, color: '#0F1111', fontWeight: 700 }}>${order.totalPrice?.toFixed(2)}</p>
                        </div>
                        <div>
                          <p style={{ fontSize: 11, color: '#565959', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Order #</p>
                          <p style={{ fontSize: 13, color: '#007185' }}>#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                          <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 12, ...statusStyle(order.status) }}>
                            {order.status || 'Pending'}
                          </span>
                        </div>
                      </div>

                      {/* Order items */}
                      <div style={{ padding: '0 20px' }}>
                        {order.items?.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: idx < order.items.length - 1 ? '1px solid #f0f0f0' : 'none', alignItems: 'center' }}>
                            <div style={{ width: 70, height: 70, background: '#f7f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2, flexShrink: 0 }}>
                              <img src={item.image} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <Link to={`/products/${item.productId}`}>
                                <p className="line-clamp-2" style={{ fontSize: 14, color: '#007185', fontWeight: 700, marginBottom: 3 }}>{item.title}</p>
                              </Link>
                              <p style={{ fontSize: 12, color: '#565959' }}>
                                {item.color && <>Color: <strong>{item.color}</strong> &nbsp;</>}
                                Size: <strong>{item.size}</strong> &nbsp; Qty: <strong>{item.quantity}</strong>
                              </p>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                              <p style={{ fontSize: 14, fontWeight: 700, color: '#0F1111' }}>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order actions */}
                      <div style={{ padding: '12px 20px', background: '#f7f8f8', borderTop: '1px solid #DDD', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <Link to="/products" className="amz-btn-orange" style={{ fontSize: 13, padding: '6px 16px' }}>
                          Buy Again
                        </Link>
                        <Link to="/contact" style={{ border: '1px solid #DDD', borderRadius: 3, padding: '6px 16px', fontSize: 13, color: '#0F1111', background: 'linear-gradient(to bottom,#f7f8f8,#e7e9ec)' }}>
                          Get Help
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
