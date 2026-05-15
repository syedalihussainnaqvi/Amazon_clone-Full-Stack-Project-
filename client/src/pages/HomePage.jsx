import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const categories = [
  { name: 'Shirts',       image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop' },
  { name: 'Pants',        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop' },
  { name: 'Shoes',        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop' },
  { name: 'Accessories',  image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop' },
];

const DealCard = ({ product }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  return (
    <Link
      to={`/products/${product._id}`}
      style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, display: 'block', padding: 12, minWidth: 160 }}
      className="hover:shadow-md transition-shadow shrink-0"
    >
      <div style={{ background: '#f7f8f8', height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, borderRadius: 2 }}>
        <img src={product.image} alt={product.title} style={{ maxHeight: 130, maxWidth: '100%', objectFit: 'contain' }} loading="lazy" />
      </div>
      <p style={{ fontSize: 13, color: '#007185', marginBottom: 4 }} className="line-clamp-2">{product.title}</p>
      {discount > 0 && (
        <span style={{ background: '#CC0C39', color: '#fff', fontSize: 11, fontWeight: 700, padding: '1px 5px', borderRadius: 2 }}>
          Up to {discount}% off
        </span>
      )}
      <p style={{ fontSize: 15, fontWeight: 700, color: '#0F1111', marginTop: 4 }}>${product.price.toFixed(2)}</p>
    </Link>
  );
};

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const trendingRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const [f, t] = await Promise.all([
          productAPI.getAll({ featured: 'true', limit: 8 }),
          productAPI.getAll({ trending: 'true', limit: 10 }),
        ]);
        setFeatured(f.data.products);
        setTrending(t.data.products);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const scrollTrending = (dir) => {
    if (trendingRef.current) trendingRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#EAEDED', minHeight: '100vh' }} id="home-page">

      {/* ── HERO BANNER ── */}
      <section
        id="hero-section"
        style={{
          background: 'linear-gradient(135deg, #131921 0%, #232F3E 50%, #37475A 100%)',
          padding: '40px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1400&h=500&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div className="max-w-[1200px] mx-auto px-4 relative" style={{ zIndex: 1 }}>
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div style={{ flex: 1 }}>
              <div style={{ display: 'inline-block', background: '#FF9900', color: '#111', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 2, marginBottom: 12 }}>
                NEW COLLECTION 2025
              </div>
              <h1 style={{ color: '#fff', fontSize: 36, fontWeight: 700, lineHeight: 1.25, marginBottom: 12, fontFamily: 'Arial, sans-serif' }}>
                Shop Premium<br />
                <span style={{ color: '#FF9900' }}>Men's Fashion</span>
              </h1>
              <p style={{ color: '#ccc', fontSize: 15, marginBottom: 20, maxWidth: 420 }}>
                Discover thousands of styles — shirts, pants, shoes &amp; accessories curated for the modern gentleman.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/products"
                  id="hero-shop-btn"
                  className="amz-btn-primary"
                  style={{ fontSize: 14, padding: '10px 24px' }}
                >
                  Shop Now
                </Link>
                <Link
                  to="/products?sort=popular"
                  id="hero-trending-btn"
                  style={{ border: '1px solid #aaa', color: '#fff', fontSize: 14, padding: '10px 24px', borderRadius: 3, background: 'transparent' }}
                >
                  Best Sellers
                </Link>
              </div>
              {/* Trust stats */}
              <div className="flex gap-8 mt-8">
                {[['2K+', 'Products'], ['15K+', 'Customers'], ['4.8★', 'Rating']].map(([n, l]) => (
                  <div key={l}>
                    <p style={{ color: '#FF9900', fontSize: 20, fontWeight: 700 }}>{n}</p>
                    <p style={{ color: '#aaa', fontSize: 12 }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: '0 0 320px', display: 'none' }} className="lg:block">
              <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=480&fit=crop" alt="Hero" style={{ width: '100%', borderRadius: 4, opacity: 0.9 }} />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 py-3">

        {/* ── SIGN-IN PROMPT (guests only) ── */}
        {!isAuthenticated && (
          <div style={{ background: 'linear-gradient(to bottom, #f3d078, #eea500)', borderRadius: 4, padding: '14px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <p style={{ fontSize: 14, color: '#111', fontWeight: 700 }}>Sign in for the best experience</p>
            <Link to="/login" className="amz-btn-primary" style={{ fontSize: 13 }}>Sign in securely</Link>
          </div>
        )}

        {/* ── TODAY'S DEALS ── */}
        {!loading && trending.length > 0 && (
          <section id="deals-section" style={{ background: '#fff', borderRadius: 4, border: '1px solid #DDD', marginBottom: 16, padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ fontSize: 21, fontWeight: 700, color: '#0F1111' }}>Today's Deals</h2>
              <Link to="/products" style={{ color: '#007185', fontSize: 13 }} className="hover:underline">See all deals</Link>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {trending.slice(0, 6).map(p => <DealCard key={p._id} product={p} />)}
            </div>
          </section>
        )}

        {/* ── SHOP BY CATEGORY ── */}
        <section id="categories-section" style={{ marginBottom: 16 }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                id={`category-${cat.name.toLowerCase()}`}
                style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4, padding: 14, display: 'block', textAlign: 'center' }}
                className="hover:shadow-md transition-shadow"
              >
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 2, marginBottom: 10 }} loading="lazy" />
                <p style={{ fontSize: 16, fontWeight: 700, color: '#0F1111', marginBottom: 4 }}>{cat.name}</p>
                <p style={{ fontSize: 13, color: '#007185' }}>Shop now</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FEATURED PRODUCTS ── */}
        <section id="featured-section" style={{ background: '#fff', borderRadius: 4, border: '1px solid #DDD', marginBottom: 16, padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 21, fontWeight: 700, color: '#0F1111' }}>Featured Products</h2>
            <Link to="/products?featured=true" id="view-all-featured" style={{ color: '#007185', fontSize: 13 }} className="hover:underline">
              See all
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {featured.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </section>

        {/* ── PROMO BANNER ── */}
        <section
          id="promo-section"
          style={{ background: 'linear-gradient(to right, #232F3E, #37475A)', borderRadius: 4, border: '1px solid #444', marginBottom: 16, padding: '24px 28px' }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <p style={{ color: '#FF9900', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>LIMITED TIME OFFER</p>
              <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Summer Sale — Up to <span style={{ color: '#FF9900' }}>40% Off</span></h2>
              <p style={{ color: '#ccc', fontSize: 14 }}>Limited time on selected premium pieces.</p>
            </div>
            <Link to="/products" id="promo-cta" className="amz-btn-primary" style={{ fontSize: 14, padding: '10px 24px', whiteSpace: 'nowrap' }}>
              Shop the Sale
            </Link>
          </div>
        </section>

        {/* ── TRENDING CAROUSEL ── */}
        <section id="trending-section" style={{ background: '#fff', borderRadius: 4, border: '1px solid #DDD', marginBottom: 16, padding: '14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 21, fontWeight: 700, color: '#0F1111' }}>Trending in Menswear</h2>
            <div className="flex gap-2">
              <button onClick={() => scrollTrending(-1)} id="trending-prev" style={{ width: 28, height: 28, border: '1px solid #DDD', borderRadius: 2, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => scrollTrending(1)} id="trending-next" style={{ width: 28, height: 28, border: '1px solid #DDD', borderRadius: 2, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
          {loading ? (
            <div className="flex gap-3 overflow-hidden">
              {[...Array(5)].map((_, i) => <div key={i} style={{ minWidth: 180 }}><ProductSkeleton /></div>)}
            </div>
          ) : (
            <div ref={trendingRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {trending.map(p => (
                <div key={p._id} style={{ minWidth: 180, maxWidth: 200 }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── NEWSLETTER ── */}
        <section id="newsletter-section" style={{ background: '#fff', borderRadius: 4, border: '1px solid #DDD', marginBottom: 16, padding: '20px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: '#0F1111' }}>Stay in the Know</h2>
          <p style={{ fontSize: 13, color: '#565959', marginBottom: 14 }}>Get exclusive deals, style tips, and member-only discounts.</p>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              id="newsletter-email"
              className="amz-input flex-1"
            />
            <button type="submit" id="newsletter-submit" className="amz-btn-primary" style={{ padding: '8px 20px', whiteSpace: 'nowrap' }}>
              Subscribe
            </button>
          </form>
        </section>

      </div>
    </div>
  );
};

export default HomePage;
