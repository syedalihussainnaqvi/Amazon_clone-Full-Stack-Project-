import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestedReplies from './SuggestedReplies';
import TypingIndicator from './TypingIndicator';

const ChatWindow = ({
  messages,
  isTyping,
  suggestions,
  onSend,
  onClose,
  onSuggestionSelect,
  disabled,
  isOpen,
}) => {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom whenever messages or typing change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="chatbot-window"
          className="chatbot-window"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          role="dialog"
          aria-label="SYED AI Style Assistant"
          aria-modal="true"
        >
          {/* ── Header ── */}
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              {/* Animated avatar */}
              <div className="chatbot-header-avatar">
                <span>O</span>
                <span className="chatbot-online-dot" aria-hidden="true" />
              </div>
              <div>
                <p className="chatbot-header-name">SYED AI</p>
                <p className="chatbot-header-status">Your Style Concierge • Online</p>
              </div>
            </div>

            {/* Controls */}
            <div className="chatbot-header-actions">
              {/* Minimise / close */}
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="chatbot-close-btn"
                aria-label="Close chat"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" width="18" height="18">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* ── Message Feed ── */}
          <div className="chatbot-feed" id="chatbot-feed" aria-live="polite">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  onClose={onClose}
                />
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && <TypingIndicator key="typing" />}
            </AnimatePresence>

            {/* Scroll anchor */}
            <div ref={bottomRef} />
          </div>

          {/* ── Suggested Replies ── */}
          <SuggestedReplies
            suggestions={suggestions}
            onSelect={onSuggestionSelect}
            disabled={disabled}
          />

          {/* ── Input bar ── */}
          <ChatInput onSend={onSend} disabled={disabled} />

          {/* Branding footer */}
          <div className="chatbot-footer-brand">
            Powered by <span>SYED AI</span> • Fashion Intelligence
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;
