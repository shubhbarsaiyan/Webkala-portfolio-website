import React from 'react';
import { motion } from 'motion/react';
import {
  Utensils,
  Activity,
  GraduationCap,
  BookOpen,
  Compass,
  Scale,
  Dumbbell,
  Sparkles,
  Building,
  Home,
  Cpu,
  Heart,
  Rocket,
  User,
  Laptop,
  ShoppingBag,
  LucideProps
} from 'lucide-react';
import { INDUSTRIES } from '../data';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Utensils,
  Activity,
  GraduationCap,
  BookOpen,
  Compass,
  Scale,
  Dumbbell,
  Sparkles,
  Building,
  Home,
  Cpu,
  Heart,
  Rocket,
  User,
  Laptop,
  ShoppingBag
};

export default function Industries() {
  return (
    <section
      id="industries"
      className="relative py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/5 dark:bg-blue-600/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 block">
            03 / Industries We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-slate-950 dark:text-white">
            Bespoke software engineered for <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">diverse vertical markets</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-4 max-w-2xl leading-relaxed">
            Every business sector operates with distinct priorities and regulatory environments. We build fully tailored systems matching your industry-specific parameters with pixel-perfect design.
          </p>
        </div>

        {/* Responsive Industries Grid (Bento Grid Style) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((industry, idx) => {
            const IconComponent = ICON_MAP[industry.iconName] || Rocket;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-blue-500/20 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/5 mb-5 shrink-0">
                    <IconComponent className="h-4.5 w-4.5" />
                  </div>

                  {/* Industry Title */}
                  <h3 className="text-sm font-bold font-sans text-slate-950 dark:text-slate-100 mb-1.5">
                    {industry.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs leading-relaxed">
                    {industry.description}
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
