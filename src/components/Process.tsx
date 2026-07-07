import { motion } from 'motion/react';
import { PROCESS } from '../data';

interface ProcessProps {
  isDedicatedPage?: boolean;
  onNavigate?: (path: string) => void;
}

export default function Process({ isDedicatedPage = false, onNavigate }: ProcessProps) {
  return (
    <section
      id="process"
      className={`relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden ${
        isDedicatedPage ? 'pt-32 pb-24' : 'py-24'
      }`}
    >
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-600/5 dark:bg-indigo-600/2 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative text-left">
        {/* Back navigation button if on dedicated page */}
        {isDedicatedPage && onNavigate && (
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 mb-8 transition-colors cursor-pointer group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
          </button>
        )}
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 block">
            05 / Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-slate-950 dark:text-white">
            How we bring <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">your idea to life</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-4 max-w-lg mx-auto">
            We work together with you at every step. From the initial chat to launch day and beyond, we make sure the process is smooth, transparent, and completely stress-free.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l-2 border-slate-100 dark:border-white/10 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-12 py-4">
          
          {/* Animated timeline background glow connector */}
          <div className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-gradient-to-b from-blue-500 via-cyan-400 to-teal-400 pointer-events-none" />

          {PROCESS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
              className="relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 group"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute left-[-42px] sm:left-[-60px] top-1 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-white dark:bg-[#050505] border-2 border-blue-500 dark:border-blue-400 flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 shadow-md group-hover:scale-110 transition-transform">
                {step.number}
              </div>

              {/* Step Card Content */}
              <div className="flex-1 bg-white dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-2xl p-6 hover:border-blue-500/15 dark:hover:border-blue-500/10 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-bold font-sans text-slate-950 dark:text-slate-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 max-w-fit shrink-0">
                    {step.duration}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
