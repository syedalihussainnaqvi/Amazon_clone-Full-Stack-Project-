import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardSidebar } from './ProfileDashboard';
import ProductCard from '../components/ProductCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const WishlistPage = () => {
  const { user } = useAuth();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.wishlist) {
      setWishlistProducts(user.wishlist);
      setLoading(false);
    } else if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div style={{ background: '#EAEDED', minHeight: '100vh', padding: '16px 0' }} id="wishlist-page">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="amz-breadcrumb flex items-center gap-1 mb-4">
          <Link to="/">SYED</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <Link to="/profile">Your Account</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <span style={{ color: '#0F1111', fontWeight: 700 }}>Your Wish List</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <DashboardSidebar active="/wishlist" />

          <div style={{ flex: 1 }}>
            <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0F1111' }}>Your Wish List</h1>
              </div>
              <p style={{ fontSize: 13, color: '#565959', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #DDD' }}>
                {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''}
              </p>

              {loading ? (
                <LoadingSpinner />
              ) : wishlistProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>❤️</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F1111', marginBottom: 8 }}>Your wish list is empty</h3>
                  <p style={{ fontSize: 14, color: '#565959', marginBottom: 20 }}>
                    Click the heart icon on any product to save it here for later.
                  </p>
                  <Link to="/products" className="amz-btn-primary" style={{ padding: '9px 24px', fontSize: 14 }}>
                    Discover Products
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {wishlistProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
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

export default WishlistPage;
