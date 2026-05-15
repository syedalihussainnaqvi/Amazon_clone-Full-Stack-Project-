import { motion } from 'framer-motion';

const dotVariants = {
  animate: (i) => ({
    y: [0, -6, 0],
    transition: {
      duration: 0.7,
      repeat: Infinity,
      delay: i * 0.15,
      ease: 'easeInOut',
    },
  }),
};

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="chatbot-typing-wrap"
    >
      {/* Avatar */}
      <div className="chatbot-avatar-sm">
        <span>O</span>
      </div>

      <div className="chatbot-typing-bubble">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="chatbot-typing-dot"
            custom={i}
            animate="animate"
            variants={dotVariants}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
