import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic } from 'lucide-react';
import wesPhoto from './wesOld-photoroom.png'; 

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [responseText, setResponseText] = useState('');
  const audioRef = useRef(null);

  // Clean up audio blob URLs on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current && audioRef.current.src) {
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    setIsThinking(true);

    try {
      // 1. Fetch text from your NEW secure backend proxy instead of Google directly
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      if (!response.ok) throw new Error('Backend response failed');
      
      const data = await response.json();
      const text = data.reply;
      
      setResponseText(text);

      // 2. Pipe text to the secure audio proxy
      await generateAndPlaySpeech(text);

    } catch (error) {
      console.error("Pipeline Error:", error);
      setIsThinking(false);
      setResponseText('');
    }
  };

  const generateAndPlaySpeech = async (text) => {
    try {
      // Fetching audio from your NEW secure audio proxy
      const response = await fetch('/api/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text })
      });

      if (response.status === 402) throw new Error('QUOTA_EXCEEDED');
      if (!response.ok) throw new Error('Speech proxy failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audioRef.current = audio;
      audio.onplay = () => {
        setIsThinking(false);
        setIsSpeaking(true);
      };
      audio.onended = () => {
        setIsSpeaking(false);
        setResponseText(''); 
        URL.revokeObjectURL(audioUrl);
      };
      await audio.play();
    } catch (error) {
      console.error('Audio Generation Failed:', error);
      setIsThinking(false);
      setIsSpeaking(false);
      setResponseText('');
      if (error.message === 'QUOTA_EXCEEDED') {
        alert("System Notice: Voice synthesizer quota exceeded. Please reach out via email.");
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 md:w-96 bg-zinc-950 border border-emerald-500/30 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.15)] relative"
          >
            <div className="relative">
              <div className="overflow-hidden rounded-t-lg">
                <img src={wesPhoto} alt="Wes Davis" className="w-full h-auto object-cover" />
              </div>
              <AnimatePresence>
                {isSpeaking && responseText && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-1/3 -left-[calc(100%+12px)] w-64 max-w-[calc(100vw-4rem)] bg-zinc-900 text-zinc-100 px-4 py-3 rounded-2xl border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  >
                    <p className="text-sm leading-snug">{responseText}</p>
                    <div className="absolute top-6 -right-2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-zinc-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="p-3 bg-zinc-900 border-t border-zinc-800 rounded-b-lg">
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Wes a question..."
                  disabled={isThinking || isSpeaking}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded py-2 pl-3 pr-10 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isThinking || isSpeaking}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-300 disabled:opacity-30 transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{
          boxShadow: isSpeaking 
            ? ['0px 0px 0px rgba(16,185,129,0)', '0px 0px 30px rgba(16,185,129,0.6)', '0px 0px 0px rgba(16,185,129,0)']
            : isOpen ? '0px 0px 15px rgba(16,185,129,0.3)' : '0px 0px 0px rgba(16,185,129,0)',
        }}
        transition={{ duration: isSpeaking ? 1.2 : 2, repeat: Infinity, ease: "easeInOut" }}
        className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-50 overflow-hidden ${
          isThinking ? 'border-amber-500 bg-amber-500/20' : 
          isSpeaking ? 'border-emerald-400 bg-emerald-400/20' : 
          'border-zinc-700 bg-zinc-950 hover:border-emerald-500/50 hover:bg-emerald-900/20'
        }`}
      >
        <img src={wesPhoto} alt="Wes Davis" className="w-full h-full object-cover rounded-full" />
        {isThinking && (
          <div className="absolute inset-0 flex items-center justify-center bg-amber-500/30 rounded-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 rounded-full border-t-2 border-r-2 border-amber-500"
            />
          </div>
        )}
        {isSpeaking && !isThinking && (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-400/20 rounded-full">
            <Mic className="text-emerald-400" size={28} />
          </div>
        )}
        {!isOpen && !isThinking && !isSpeaking && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-zinc-950 rounded-full animate-pulse"></span>
        )}
      </motion.button>
    </div>
  );
}