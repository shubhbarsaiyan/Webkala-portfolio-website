import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Smile, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'client' | 'apex';
  text: string;
  timestamp: string;
}

interface ChatWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function ChatWidget({ isOpen, setIsOpen }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'apex',
      text: 'Hi there! 👋 I am Sherya from Webकला. How can I help you elevate your web presence today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  // Handle client message submission
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const messageText = inputValue.trim();
    if (!messageText) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'client',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: messageText,
          history: [...messages, userMessage]
        })
      });

      if (!response.ok) {
        throw new Error('API server returned error status');
      }

      const data = await response.json();
      
      const apexResponse: ChatMessage = {
        id: `apex-${Date.now()}`,
        sender: 'apex',
        text: data.text || "I'm sorry, I encountered a response layout issue. Could you clarify your request?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, apexResponse]);
    } catch (err) {
      console.error('Error contacting chat AI:', err);
      
      const errorResponse: ChatMessage = {
        id: `apex-error-${Date.now()}`,
        sender: 'apex',
        text: "I experienced a minor network hitch, but we'd love to discuss this with you! Please submit your details via the free consultation form below, or email hello@webkala.com directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="chat-widget" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Floating Chat Box Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            className="w-[330px] sm:w-[360px] h-[480px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white">
                    <Bot className="h-5 w-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold leading-none">Sherya @ Web</span>
                  <span className="text-[10px] text-blue-100 font-medium leading-none mt-1">Direct Developer Desk</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto bg-slate-50/50 dark:bg-[#0a0a0a] space-y-4 text-xs select-text scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === 'client' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed text-left ${
                      msg.sender === 'client'
                        ? 'bg-blue-600 text-white dark:bg-white dark:text-black rounded-tr-none'
                        : 'bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-100 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing Indicator Bubble */}
              {isTyping && (
                <div className="flex flex-col max-w-[85%] items-start">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-400 dark:text-slate-500 rounded-tl-none flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer Area */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-white/10 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Ask about prices, speed, CMS..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-3 py-2.5 bg-slate-50 dark:bg-white/5 text-xs border border-slate-200/50 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 transition-colors text-slate-800 dark:text-slate-200"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-blue-600 dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:bg-blue-500 disabled:opacity-40 text-white transition-colors cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Chat button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/35 border border-blue-400/20 flex items-center justify-center cursor-pointer relative"
        aria-label="Toggle live chat assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="h-6 w-6" />
              {/* Pulse notification dot */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  );
}
