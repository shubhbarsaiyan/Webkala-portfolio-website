import React, { useEffect, useState } from 'react';
import { MessageCircle, Calendar, Mail, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FloatingActions() {
  const [scrolled, setScrolled] = useState(false);

  const handleBookCall = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    if (currentPath !== '/') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // WhatsApp integration link builder
  const whatsappUrl = `https://wa.me/917224012727?text=${encodeURIComponent(
    'Hello, I want to build a website for my business.'
  )}`;

  return (
    <div
      id="floating-actions"
      className="fixed bottom-6 left-6 z-40 flex flex-col gap-3 items-start"
    >
      {/* Scroll-to-Top Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToTop}
            className="h-11 w-11 rounded-xl bg-slate-900/90 dark:bg-slate-100/90 backdrop-blur text-slate-100 dark:text-slate-900 border border-slate-700/30 dark:border-slate-300/30 shadow-lg flex items-center justify-center cursor-pointer"
            aria-label="Scroll back to top of page"
          >
            <ArrowUp className="h-4.5 w-4.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Action Stack */}
      <div className="flex flex-col gap-2.5">
        
        {/* WhatsApp Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="h-11 w-11 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center cursor-pointer"
          aria-label="Contact us via WhatsApp"
        >
          <MessageCircle className="h-5 w-5 fill-current" />
        </motion.a>

        {/* Book a Call Button */}
        <motion.button
          onClick={handleBookCall}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="h-11 w-11 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center cursor-pointer"
          aria-label="Book a consultation call"
        >
          <Calendar className="h-4.5 w-4.5" />
        </motion.button>

        {/* Email Button */}
        <motion.a
          href="mailto:hello@webkala.com"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="h-11 w-11 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center cursor-pointer"
          aria-label="Send direct project email"
        >
          <Mail className="h-4.5 w-4.5" />
        </motion.a>

      </div>
    </div>
  );
}
