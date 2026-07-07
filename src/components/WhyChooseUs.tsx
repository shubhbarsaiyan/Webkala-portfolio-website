import React from 'react';
import { motion } from 'motion/react';
import {
  Paintbrush,
  Zap,
  Smartphone,
  Search,
  ShieldCheck,
  Coins,
  HeartHandshake,
  Layers,
  Terminal,
  Clock,
  LucideProps
} from 'lucide-react';
import { BENEFITS } from '../data';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Paintbrush,
  Zap,
  Smartphone,
  Search,
  ShieldCheck,
  Coins,
  HeartHandshake,
  Layers,
  Terminal,
  Clock
};

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-blue-500/5 dark:bg-blue-600/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 block">
            04 / Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-slate-950 dark:text-white">
            Engineering standards that <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">redefine commercial potential</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-4 max-w-xl">
            We operate at the intersection of stunning visual design and robust engineering. Here is what we prioritize on every single visual product line.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {BENEFITS.map((benefit, idx) => {
            const IconComponent = ICON_MAP[benefit.iconName] || Terminal;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-slate-200/50 dark:border-white/10 hover:border-blue-500/20 dark:hover:border-white/20 transition-colors flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Box */}
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100/30 dark:border-white/5 mb-5 group-hover:scale-105 transition-transform duration-300">
                    <IconComponent className="h-4.5 w-4.5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold font-sans text-slate-950 dark:text-slate-100 mb-2">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
