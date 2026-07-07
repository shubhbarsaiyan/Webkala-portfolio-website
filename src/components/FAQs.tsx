import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQs() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="relative py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-blue-500/5 dark:bg-blue-600/2 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative text-left">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 block">
            09 / FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-slate-950 dark:text-white">
            Frequently asked <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">questions</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200/60 dark:border-white/10 overflow-hidden bg-white dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-colors"
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer group"
                >
                  <span className="text-sm font-bold text-slate-950 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <div className="p-1.5 rounded-lg border border-slate-200/50 dark:border-white/10 text-slate-400 dark:text-slate-500 shrink-0">
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
                  </div>
                </button>

                {/* Body Content with AnimatePresence */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-slate-100 dark:border-white/10">
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic Help Assist banner */}
        <div className="mt-16 text-center max-w-md mx-auto p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 flex items-center gap-4 text-left">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
            <MessageSquare className="h-4.5 w-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-950 dark:text-slate-100 uppercase">Have other questions?</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Feel free to ask Sherya in the chat widget on the bottom right, or drop us a message below.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
