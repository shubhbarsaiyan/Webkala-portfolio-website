import { useState } from 'react';
import { CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { PRICING_PLANS } from '../data';

interface PricingProps {
  isDedicatedPage?: boolean;
  onNavigate?: (path: string) => void;
}

export default function Pricing({ isDedicatedPage = false, onNavigate }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(false);

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
      id="pricing"
      className={`relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300 ${
        isDedicatedPage ? 'pt-32 pb-24' : 'py-24'
      }`}
    >
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-blue-600/5 dark:bg-blue-600/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative text-left">
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
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 block">
            08 / Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-slate-950 dark:text-white mb-6">
            Simple, honest <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">pricing</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-md mb-10 leading-relaxed">
            Choose a plan that fits your goals. No hidden fees, no complicated contracts—just clean, upfront pricing.
          </p>

          {/* Billing Toggle Control */}
          <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                !isAnnual
                  ? 'bg-blue-600 dark:bg-white dark:text-black text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative px-4.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer ${
                isAnnual
                  ? 'bg-blue-600 dark:bg-white dark:text-black text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Annual
              <span className="text-[9px] bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded-md font-mono">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, idx) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-300 ${
                  plan.isRecommended
                    ? 'bg-white dark:bg-slate-950 border-2 border-blue-500 dark:border-blue-400 shadow-xl shadow-blue-500/5 lg:scale-105 z-10'
                    : 'bg-white/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                {/* Recommended Badge highlight */}
                {plan.isRecommended && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-sm">
                    <Sparkles className="h-3 w-3" />
                    Recommended
                  </div>
                )}

                {/* Plan Header */}
                <div>
                  <h3 className="text-lg font-bold font-sans text-slate-950 dark:text-slate-100 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed min-h-[40px]">
                    {plan.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="my-8 flex items-baseline gap-1.5">
                    <span className="text-3xl md:text-4xl font-extrabold font-sans text-slate-950 dark:text-white tracking-tight">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-medium text-slate-400 font-mono">
                      / {isAnnual ? 'year' : 'month'} {isAnnual && <span className="text-[10px] text-emerald-500">(billed annually)</span>}
                    </span>
                  </div>

                  {/* Divider line */}
                  <div className="h-[1px] bg-slate-100 dark:bg-white/10 mb-8" />

                  {/* Features List */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      What is Included:
                    </span>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300 text-xs font-medium leading-normal">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button Block */}
                <div className="mt-10">
                  <button
                    onClick={handleContactRedirect}
                    className={`w-full py-4.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      plan.isRecommended
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:from-blue-500 hover:to-cyan-400 dark:bg-none dark:bg-white dark:text-black dark:hover:bg-gray-200'
                        : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200/50 dark:border-white/10'
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                  <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-3 font-mono">
                    Includes direct handoff, easy setup, and friendly support.
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
