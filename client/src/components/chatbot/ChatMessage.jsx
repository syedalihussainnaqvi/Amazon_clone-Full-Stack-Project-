import { motion } from 'framer-motion';
import ProductRecommendationCard from './ProductRecommendationCard';

// Lightweight markdown-like renderer: **bold**, newlines
const renderText = (text) => {
  const lines = String(text || '').split('\n');
  return lines.map((line, li) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={li}>
        {parts.map((part, pi) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pi}>{part.slice(2, -2)}</strong>;
          }
          return <span key={pi}>{part}</span>;
        })}
        {li < lines.length - 1 && <br />}
      </span>
    );
  });
};

const formatTime = (ts) => {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
};

const messageVariants = {
  hidden:  { opacity: 0, y: 14, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
};

const ChatMessage = ({ message, onClose }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={`chatbot-msg-row ${isUser ? 'chatbot-msg-row--user' : 'chatbot-msg-row--bot'}`}
    >
      {/* Bot avatar */}
      {!isUser && (
        <div className="chatbot-avatar-sm" aria-hidden="true">
          <span>O</span>
        </div>
      )}

      <div className={`chatbot-msg-col ${isUser ? 'chatbot-msg-col--user' : ''}`}>
        {/* Bubble */}
        <div className={`chatbot-bubble ${isUser ? 'chatbot-bubble--user' : 'chatbot-bubble--bot'}`}>
          <p className="chatbot-bubble-text">{renderText(message.content)}</p>
        </div>

        {/* Product cards */}
        {!isUser && message.products && message.products.length > 0 && (
          <div className="chatbot-product-list">
            {message.products.map((product) => (
              <ProductRecommendationCard
                key={product.id}
                product={product}
                onClose={onClose}
              />
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className={`chatbot-timestamp ${isUser ? 'chatbot-timestamp--user' : ''}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="chatbot-avatar-sm chatbot-avatar-sm--user" aria-hidden="true">
          <span>U</span>
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
