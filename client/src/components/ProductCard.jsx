import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import api from '../services/api';

const StarRating = ({ rating, count }) => (
  <div className="flex items-center gap-1">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} style={{ width: 14, height: 14, color: s <= Math.round(rating) ? '#FF9900' : '#DDD' }} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    {count !== undefined && (
      <span style={{ color: '#007185', fontSize: 12 }}>{count.toLocaleString()}</span>
    )}
  </div>
);

const ProductCard = ({ product }) => {
  const { _id, title, price, originalPrice, image, category, averageRating, reviews } = product;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const { user, isAuthenticated, toggleWishlist } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (user?.wishlist) {
      setIsWishlisted(user.wishlist.some(item => (typeof item === 'object' ? item._id : item) === _id));
    }
  }, [user, _id]);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    try {
      setIsWishlisted(!isWishlisted);
      await toggleWishlist(_id);
    } catch {
      setIsWishlisted(isWishlisted);
    }
  };

  return (
    <Link
      to={`/products/${_id}`}
      className="product-card block"
      style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 4 }}
      id={`product-card-${_id}`}
    >
      {/* Image */}
      <div className="relative" style={{ background: '#f7f8f8', padding: 10, aspectRatio: '1' }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain"
          style={{ maxHeight: 200 }}
          loading="lazy"
        />
        {discount > 0 && (
          <span
            className="absolute top-2 left-2"
            style={{ background: '#CC0C39', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 6px', borderRadius: 2 }}
          >
            -{discount}%
          </span>
        )}
        {isAuthenticated && (
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.85)', borderRadius: '50%', width: 28, height: 28, border: 'none', cursor: 'pointer' }}
          >
            <svg style={{ width: 16, height: 16, color: isWishlisted ? '#CC0C39' : '#888', fill: isWishlisted ? '#CC0C39' : 'none' }} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '10px 12px 14px' }}>
        <p className="line-clamp-2" style={{ color: '#007185', fontSize: 14, marginBottom: 4 }}>
          {title}
        </p>

        {averageRating > 0 && (
          <div className="mb-1">
            <StarRating rating={averageRating} count={reviews?.length || 0} />
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1 mt-1">
          <span style={{ color: '#CC0C39', fontSize: 13, verticalAlign: 'super', fontWeight: 700, lineHeight: 1 }}>$</span>
          <span style={{ color: '#CC0C39', fontSize: 21, fontWeight: 700, lineHeight: 1 }}>{Math.floor(price)}</span>
          <span style={{ color: '#CC0C39', fontSize: 13, verticalAlign: 'super', fontWeight: 700, lineHeight: 1 }}>
            {String(price.toFixed(2)).split('.')[1]}
          </span>
          {originalPrice && (
            <span style={{ color: '#565959', fontSize: 12, textDecoration: 'line-through', marginLeft: 4 }}>
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <p style={{ color: '#007600', fontSize: 12, marginTop: 4 }}>In Stock</p>
        <p style={{ color: '#565959', fontSize: 12 }}>
          <span style={{ fontWeight: 700 }}>FREE</span> delivery available
        </p>

        <div style={{ fontSize: 11, color: '#888', marginTop: 4, background: '#f0f2f2', borderRadius: 2, padding: '2px 5px', display: 'inline-block' }}>
          {category}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
