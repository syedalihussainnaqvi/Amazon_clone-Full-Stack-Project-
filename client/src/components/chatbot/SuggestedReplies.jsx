import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show:   { opacity: 1, y: 0, scale: 1 },
};

const SuggestedReplies = ({ suggestions = [], onSelect, disabled }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <motion.div
      className="chatbot-suggestions"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {suggestions.map((s, i) => (
        <motion.button
          key={i}
          variants={chipVariants}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="chatbot-suggestion-chip"
          onClick={() => !disabled && onSelect(s)}
          disabled={disabled}
          type="button"
        >
          {s}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default SuggestedReplies;
