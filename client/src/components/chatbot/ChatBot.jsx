import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';
import { chatAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ChatBot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState(['Show trending styles', 'Casual wear', 'Formal looks']);
  const [sessionId, setSessionId] = useState(null);
  
  // Initialise session ID
  useEffect(() => {
    let sid = localStorage.getItem('chatbot_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('chatbot_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  // Sync user context when logged in
  useEffect(() => {
    if (user && sessionId) {
      chatAPI.updateContext({ sessionId, userId: user._id })
        .catch(console.error);
    }
  }, [user, sessionId]);

  const toggleOpen = () => {
    if (!isOpen && messages.length === 0) {
      // First open -> simulate greeting
      setIsTyping(true);
      setIsOpen(true);
      setTimeout(() => {
        setMessages([{
          id: Date.now(),
          role: 'assistant',
          content: `Hey there! 👋 Welcome to **SYED**.\\n\\nI'm your personal style assistant. Are you looking for something specific today, or would you like me to show you what's trending? 🔥`,
          timestamp: Date.now(),
        }]);
        setIsTyping(false);
      }, 1200);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Add user message optimistically
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setSuggestions([]);

    try {
      const payload = {
        message: text,
        sessionId,
        userId: user ? user._id : undefined,
      };
      
      const res = await chatAPI.sendMessage(payload);
      
      // Remove artificial delay for real-time responsiveness
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: res.data.reply,
        products: res.data.products || [],
        timestamp: Date.now(),
      }]);
      setSuggestions(res.data.suggestions || []);
      setIsTyping(false);
      
    } catch (err) {
      console.error('Chat error:', err);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I'm having a moment! 😅 Please try again shortly.",
        timestamp: Date.now(),
      }]);
      setSuggestions(['Show trending styles', 'Help me find something']);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    handleSend(suggestion);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-fab"
            className="chatbot-fab"
            onClick={toggleOpen}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open style assistant"
          >
            {/* Minimal sparkle / AI icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M12 2L14.43 9.57L22 12L14.43 14.43L12 22L9.57 14.43L2 12L9.57 9.57L12 2Z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        suggestions={suggestions}
        onSend={handleSend}
        onClose={toggleOpen}
        onSuggestionSelect={handleSuggestionSelect}
        disabled={isTyping}
      />
    </>
  );
};

export default ChatBot;
