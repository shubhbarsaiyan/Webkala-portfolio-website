import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-blue-600/5 dark:bg-blue-600/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 block">
            07 / Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-slate-950 dark:text-white">
            What our clients <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">say about working with us</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((current) => (
            <div 
              key={current.id} 
              className="relative bg-white dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Quote Icon watermark */}
              <Quote className="absolute top-6 right-6 h-12 w-12 text-blue-600/5 dark:text-blue-400/5 pointer-events-none group-hover:scale-110 transition-transform duration-300" />

              <div className="space-y-6">
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                  "{current.review}"
                </blockquote>
              </div>

              {/* Client Profile */}
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-white/5">
                <img
                  src={current.avatar}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full object-cover border border-blue-500/20"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-950 dark:text-slate-100">
                    {current.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {current.role} — <span className="font-semibold text-slate-700 dark:text-slate-300">{current.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
