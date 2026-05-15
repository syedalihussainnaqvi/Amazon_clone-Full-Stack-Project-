import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductRecommendationCard = ({ product, onClose }) => {
  const navigate = useNavigate();

  const handleView = () => {
    if (onClose) onClose();
    navigate(`/products/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="chatbot-product-card"
      whileHover={{ scale: 1.02, y: -2 }}
    >
      {/* Product image */}
      <div className="chatbot-product-img-wrap">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="chatbot-product-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="chatbot-product-img-fallback" style={{ display: product.image ? 'none' : 'flex' }}>
          👔
        </div>
        {/* Category badge */}
        <span className="chatbot-product-badge">{product.category}</span>
      </div>

      {/* Info */}
      <div className="chatbot-product-info">
        <p className="chatbot-product-title">{product.title}</p>
        <p className="chatbot-product-desc">{product.styleDescription}</p>
        <button
          className="chatbot-product-cta"
          onClick={handleView}
          type="button"
        >
          View Item →
        </button>
      </div>
    </motion.div>
  );
};

export default ProductRecommendationCard;
