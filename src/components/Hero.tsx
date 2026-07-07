import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { STATS } from '../data';

export default function Hero({ onNavigate }: { onNavigate: (path: string) => void }) {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      {/* Premium Background Blurs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-blue-500/10 dark:bg-blue-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-600/5 blur-3xl pointer-events-none" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801f_1px,transparent_1px),linear-gradient(to_bottom,#8080801f_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative w-full flex flex-col items-center text-center">
        
        {/* Hero Text Column */}
        <div className="flex flex-col items-center">
          {/* Tagline Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200/60 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 max-w-fit mb-6 text-xs font-mono font-semibold tracking-wider shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span>Premium Web Studio</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-slate-950 dark:text-white leading-[1.05] mb-6"
          >
            Websites That Feel <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Warm, Fast & Human.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base sm:text-lg text-slate-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-10"
          >
            We design and build custom websites for people who care about their craft. No generic templates, no robotic tech speak—just clean, friendly sites that help you grow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full sm:w-auto"
          >
            <button
              onClick={() => window.open('https://wa.me/917224012727?text=Hello%2C%20I%20want%20to%20build%20a%20website%20for%20my%20business.', '_blank')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-sm tracking-wide uppercase shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all duration-300 group cursor-pointer"
            >
              Let's Chat
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('/services')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border border-slate-200 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-300 group cursor-pointer"
            >
              View Services
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Core Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-y-4 gap-x-8 pt-6 border-t border-slate-100 dark:border-slate-900 w-full"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-blue-500 shrink-0" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Delivered with care</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-blue-500 shrink-0" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Friendly & easy to use</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-blue-500 shrink-0" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Blazing fast & easy to find</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Real Stats Board Grid */}
      <div className="max-w-7xl mx-auto px-6 w-full mt-20 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50/50 dark:bg-[#0a0a0a] border border-slate-200/50 dark:border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center p-3">
              {/* Stat Animated Number */}
              <motion.span
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-3xl md:text-4xl font-extrabold font-sans text-slate-950 dark:text-white tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
              >
                {stat.value}
              </motion.span>
              <span className="text-xs font-medium text-slate-500 dark:text-gray-400 mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
