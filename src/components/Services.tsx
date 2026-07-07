import React from 'react';
import { Briefcase, FolderHeart, ShoppingBag, Check } from 'lucide-react';
import { SERVICES } from '../data';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'business-websites': Briefcase,
  'portfolio-websites': FolderHeart,
  'ecommerce-stores': ShoppingBag,
};

interface ServicesProps {
  isDedicatedPage?: boolean;
  onNavigate?: (path: string) => void;
}

export default function Services({ isDedicatedPage = false, onNavigate }: ServicesProps) {
  const handleContactRedirect = () => {
    if (isDedicatedPage && onNavigate) {
      onNavigate('/');
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

  return (
    <section
      id="services"
      className={`relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300 ${
        isDedicatedPage ? 'pt-32 pb-24' : 'py-24'
      }`}
    >
      {/* Background gradients */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-blue-600/5 dark:bg-blue-600/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
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
        <div className="max-w-2xl text-left mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 block">
            01 / Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-slate-950 dark:text-white">
            Everything you need to <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">succeed online</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-4">
            We don't build generic websites. We build custom experiences that tell your story, build trust, and help you connect with your dream clients.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComp = ICON_MAP[service.id] || Briefcase;
            return (
              <div
                key={service.id}
                className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-slate-200/50 dark:border-white/10 text-left flex flex-col justify-between group shadow-sm hover:shadow-lg dark:hover:bg-white/10 hover:border-blue-500/20 dark:hover:border-blue-500/30 transition-all duration-300"
              >
                <div>
                  {/* Icon Container */}
                  <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-950/40 mb-6 group-hover:scale-105 transition-transform duration-300">
                    <IconComp className="h-5.5 w-5.5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-sans text-slate-950 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Divider */}
                  <div className="h-[1px] bg-slate-100 dark:bg-white/10 mb-6" />

                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400">
                      What's Included:
                    </h4>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div className="h-4 w-4 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 text-xs font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct CTA */}
                <button
                  onClick={handleContactRedirect}
                  className="w-full mt-8 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-200/50 dark:border-white/10 transition-all duration-300 cursor-pointer text-center"
                >
                  Let's Talk About This
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
