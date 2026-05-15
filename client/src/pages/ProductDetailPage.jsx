import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, isAuthenticated, toggleWishlist } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  
  // Selection state
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (user?.wishlist && product) {
      setIsWishlisted(user.wishlist.some(item => (typeof item === 'object' ? item._id : item) === product._id));
    }
  }, [user, product]);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      setIsWishlisted(!isWishlisted);
      await toggleWishlist(product._id);
    } catch {
      setIsWishlisted(isWishlisted);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await productAPI.getById(id);
        setProduct(data);
        setMainImage(data.image);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return false;
    }
    
    setAddingToCart(true);
    const result = await addToCart(product._id, quantity, selectedSize, selectedColor);
    setAddingToCart(false);
    
    if (result.success) {
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 2000);
      return true;
    }
    return false;
  };

  if (loading) return <LoadingSpinner size="lg" text="Loading product details..." />;
  if (!product) return <div style={{ textAlign: 'center', padding: '40px 0', fontSize: 18, fontWeight: 700 }}>Product not found</div>;

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: '16px 0' }} id="product-detail-page">
      <div className="max-w-[1500px] mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="amz-breadcrumb flex items-center gap-1 mb-4">
          <Link to="/">SYED</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <Link to="/products">Men's Clothing</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <Link to={`/products?category=${product.category}`}>{product.category}</Link>
          <span style={{ color: '#aaa' }}>›</span>
          <span style={{ color: '#0F1111', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
            {product.title}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* ── IMAGES GALLERY ── */}
          <div style={{ flex: '0 0 auto' }} className="w-full lg:w-[40%] flex gap-4">
            {/* Thumbnails */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 40, flexShrink: 0 }}>
              {[product.image, ...(product.images || [])].filter((img, i, arr) => arr.indexOf(img) === i).map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setMainImage(img)}
                  style={{ 
                    width: 40, height: 50, border: `1px solid ${mainImage === img ? '#e77600' : '#DDD'}`, 
                    borderRadius: 2, padding: 2, background: '#fff', cursor: 'pointer',
                    boxShadow: mainImage === img ? '0 0 3px rgba(228,121,17,0.5)' : 'none'
                  }}
                  className="hover:border-[#e77600]"
                >
                  <img src={img} alt={`Thumbnail ${i}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <img src={mainImage} alt={product.title} style={{ maxWidth: '100%', maxHeight: 600, objectFit: 'contain' }} />
            </div>
          </div>

          {/* ── PRODUCT INFO ── */}
          <div style={{ flex: 1 }} className="w-full lg:min-w-0 lg:px-4">
            <h1 style={{ fontSize: 24, fontWeight: 400, color: '#0F1111', lineHeight: 1.3, marginBottom: 4 }}>
              {product.title}
            </h1>
            <Link to="/" style={{ fontSize: 14, color: '#007185' }} className="hover:underline">Visit the SYED Store</Link>
            
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 14, color: '#0F1111' }}>{product.averageRating?.toFixed(1) || '0.0'}</span>
                <div style={{ display: 'flex' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} style={{ width: 16, height: 16, color: star <= Math.round(product.averageRating || 0) ? '#FF9900' : '#DDD' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span style={{ fontSize: 14, color: '#007185' }} className="hover:underline cursor-pointer">{product.reviews?.length || 0} ratings</span>
            </div>

            <div style={{ height: 1, background: '#DDD', margin: '12px 0' }} />

            {/* Price */}
            <div style={{ marginBottom: 12 }}>
              {discount > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 28, color: '#CC0C39' }}>-{discount}%</span>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 13, color: '#0F1111', marginTop: 4 }}>$</span>
                    <span style={{ fontSize: 28, fontWeight: 500, color: '#0F1111' }}>{Math.floor(product.price)}</span>
                    <span style={{ fontSize: 13, color: '#0F1111', marginTop: 4 }}>{String(product.price.toFixed(2)).split('.')[1]}</span>
                  </div>
                </div>
              )}
              {discount === 0 && (
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 13, color: '#0F1111', marginTop: 4 }}>$</span>
                  <span style={{ fontSize: 28, fontWeight: 500, color: '#0F1111' }}>{Math.floor(product.price)}</span>
                  <span style={{ fontSize: 13, color: '#0F1111', marginTop: 4 }}>{String(product.price.toFixed(2)).split('.')[1]}</span>
                </div>
              )}
              {product.originalPrice && (
                <p style={{ fontSize: 12, color: '#565959' }}>
                  Typical price: <span style={{ textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>
                </p>
              )}
              <p style={{ fontSize: 14, color: '#0F1111', marginTop: 8 }}>FREE Returns</p>
            </div>

            {/* Selectors */}
            <div style={{ marginBottom: 16 }}>
              {/* Colors */}
              {product.colors?.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 14, color: '#565959', marginBottom: 6 }}>
                    Color: <span style={{ fontWeight: 700, color: '#0F1111' }}>{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{ 
                          padding: '6px 12px', fontSize: 13, background: '#fff', cursor: 'pointer',
                          border: `1px solid ${selectedColor === color ? '#e77600' : '#888'}`, 
                          boxShadow: selectedColor === color ? '0 0 3px rgba(228,121,17,0.5)' : 'none',
                          color: '#0F1111', borderRadius: 2
                        }}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <p style={{ fontSize: 14, color: '#565959' }}>
                      Size: <span style={{ fontWeight: 700, color: '#0F1111' }}>{selectedSize}</span>
                    </p>
                    <button style={{ fontSize: 13, color: '#007185', background: 'none', border: 'none', cursor: 'pointer' }} className="hover:underline">Size Chart</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{ 
                          minWidth: 40, padding: '6px 10px', fontSize: 13, background: '#fff', cursor: 'pointer',
                          border: `1px solid ${selectedSize === size ? '#e77600' : '#888'}`, 
                          boxShadow: selectedSize === size ? '0 0 3px rgba(228,121,17,0.5)' : 'none',
                          color: '#0F1111', borderRadius: 2
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ marginTop: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F1111', marginBottom: 8 }}>About this item</h3>
              <ul style={{ paddingLeft: 18, margin: 0, fontSize: 14, color: '#0F1111', lineHeight: 1.5, listStyleType: 'disc' }}>
                <li style={{ marginBottom: 4 }}>Premium quality construction and materials.</li>
                <li style={{ marginBottom: 4 }}>Designed for comfort and durability.</li>
                <li style={{ marginBottom: 4 }}>Machine washable, imported.</li>
                <li style={{ marginBottom: 4 }}>{product.description}</li>
              </ul>
            </div>
          </div>

          {/* ── BUY BOX (Right Sidebar) ── */}
          <div style={{ flex: '0 0 auto' }} className="w-full lg:w-[280px]">
            <div style={{ border: '1px solid #DDD', borderRadius: 8, padding: '14px 18px', width: '100%' }}>
              <div style={{ fontSize: 24, fontWeight: 500, color: '#0F1111', marginBottom: 8 }}>
                ${product.price.toFixed(2)}
              </div>
              <p style={{ fontSize: 14, color: '#0F1111', marginBottom: 4 }}>FREE Returns</p>
              <p style={{ fontSize: 14, color: '#0F1111', marginBottom: 16 }}>
                <span style={{ fontWeight: 700 }}>FREE delivery</span> <span style={{ color: '#007185', fontWeight: 700 }}>Thursday, May 15</span> on orders shipped by SYED over $100
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <svg style={{ width: 14, height: 14, color: '#0F1111' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span style={{ fontSize: 12, color: '#007185' }}>Deliver to New York 10001</span>
              </div>

              <h2 style={{ fontSize: 18, color: '#007600', marginBottom: 16, fontWeight: 400 }}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </h2>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#0F1111', marginBottom: 2 }}>Quantity:</label>
                <select 
                  value={quantity} 
                  onChange={e => setQuantity(Number(e.target.value))}
                  className="amz-input"
                  style={{ padding: '4px 8px', fontSize: 13, width: 'auto', background: '#F0F2F2', borderRadius: 8, boxShadow: '0 2px 5px rgba(15,17,17,.15)' }}
                >
                  {[...Array(Math.min(10, product.stock || 1)).keys()].map(n => (
                    <option key={n+1} value={n+1}>{n+1}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addingToCart || product.stock === 0}
                className="amz-btn-primary"
                style={{ width: '100%', borderRadius: 20, padding: '8px 0', fontSize: 13, marginBottom: 8 }}
              >
                {product.stock === 0 ? 'Out of Stock' : addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              
              <button
                onClick={async () => { 
                  const success = await handleAddToCart(); 
                  if (success) navigate('/checkout'); 
                }}
                disabled={addingToCart || product.stock === 0}
                className="amz-btn-orange"
                style={{ width: '100%', borderRadius: 20, padding: '8px 0', fontSize: 13, marginBottom: 12 }}
              >
                Buy Now
              </button>

              <div style={{ fontSize: 12, color: '#565959' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Ships from</span>
                  <span style={{ color: '#0F1111' }}>SYED</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Sold by</span>
                  <span style={{ color: '#0F1111' }}>SYED</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Returns</span>
                  <span style={{ color: '#007185' }}>Eligible for Return, Refund or Replacement within 30 days of receipt</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #DDD', margin: '16px 0', paddingTop: 16 }}>
                <button 
                  onClick={handleWishlistToggle}
                  style={{ width: '100%', border: '1px solid #DDD', borderRadius: 4, padding: '6px 0', fontSize: 13, background: '#fff', color: '#0F1111', cursor: 'pointer' }}
                >
                  {isWishlisted ? 'Remove from List' : 'Add to List'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: '#DDD', margin: '32px 0' }} />

        {/* ── REVIEWS SECTION ── */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F1111', marginBottom: 16 }}>Customer reviews</h2>
          {(!product.reviews || product.reviews.length === 0) ? (
            <p style={{ fontSize: 14, color: '#565959' }}>No reviews yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews.map((review, idx) => (
                <div key={idx} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#f0f2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#0F1111' }}>
                      👤
                    </div>
                    <span style={{ fontSize: 13, color: '#0F1111' }}>{review.userName}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <div style={{ display: 'flex' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} style={{ width: 14, height: 14, color: star <= review.rating ? '#FF9900' : '#DDD' }} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0F1111' }}>Verified Purchase</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#565959', marginBottom: 8 }}>
                    Reviewed on {new Date(review.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p style={{ fontSize: 13, color: '#0F1111', lineHeight: 1.5 }}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
