import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInput = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);

  // Check browser voice support
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setVoiceSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (e) => {
        const transcript = Array.from(e.results)
          .map((r) => r[0].transcript)
          .join('');
        setText(transcript);
      };

      rec.onend = () => setIsListening(false);
      rec.onerror = (e) => {
        setIsListening(false);
        if (e.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone permissions in your browser settings.');
        } else if (e.error !== 'no-speech') {
          alert(`Voice input error: ${e.error}. It may not be supported by your current browser or requires HTTPS.`);
        }
      };
      recognitionRef.current = rec;
    }
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [text]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const canSend = text.trim().length > 0 && !disabled;

  return (
    <div className="chatbot-input-wrap">
      {/* Listening badge */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="chatbot-listening-badge"
          >
            <span className="chatbot-listening-dot" />
            Listening...
          </motion.div>
        )}
      </AnimatePresence>

      <div className="chatbot-input-row">
        {/* Voice button */}
        {voiceSupported && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            className={`chatbot-voice-btn ${isListening ? 'chatbot-voice-btn--active' : ''}`}
            onClick={toggleVoice}
            aria-label={isListening ? 'Stop listening' : 'Voice input'}
            title={isListening ? 'Stop listening' : 'Speak your message'}
          >
            {/* Mic SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              width="18" height="18">
              <rect x="9" y="2" width="6" height="11" rx="3" />
              <path d="M5 10a7 7 0 0014 0" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="8" y1="22" x2="16" y2="22" />
            </svg>
          </motion.button>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          className="chatbot-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask me anything about style…"
          rows={1}
          disabled={disabled}
          aria-label="Chat message input"
          id="chatbot-message-input"
        />

        {/* Send button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={canSend ? { scale: 1.08 } : {}}
          type="button"
          className={`chatbot-send-btn ${canSend ? 'chatbot-send-btn--active' : ''}`}
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          title="Send"
        >
          {/* Send arrow SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            width="18" height="18">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default ChatInput;
