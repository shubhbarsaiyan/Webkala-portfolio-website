import {Target, Eye, Users, ChevronRight} from 'lucide-react';
import {motion} from 'motion/react';

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-blue-500/5 dark:bg-blue-600/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Section Header */}
        <div className="flex flex-col text-left max-w-3xl mb-16">
          <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3">
            01 / Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-slate-950 dark:text-white mb-6">
            A small team with a big <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">passion for the web</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Webकला is a friendly team of developers and designers. We don't use generic templates or boring layouts. Instead, we work closely with you to build a website that feels like your brand and works beautifully for your customers.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Mission Card */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-cyan-400" />
            <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/5 text-blue-600 dark:text-blue-400 mb-6 border border-blue-100 dark:border-white/10">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-sans text-slate-950 dark:text-slate-100 mb-3">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              To construct clean, blistering-fast web architectures that provide seamless user experiences and secure direct commercial growth for businesses of all scales.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 to-blue-500" />
            <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-indigo-500/10 dark:bg-cyan-500/5 text-indigo-600 dark:text-cyan-400 mb-6 border border-indigo-100 dark:border-white/10">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-sans text-slate-950 dark:text-slate-100 mb-3">Our Vision</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              To be the premier digital development partner for forward-thinking enterprises, setting the standard for sub-second web speeds and gorgeous design-driven user loyalty.
            </p>
          </motion.div>
        </div>

        {/* Why Clients Choose Us Statement */}
        <div className="bg-slate-50/50 dark:bg-[#0a0a0a]/50 rounded-3xl border border-slate-200/50 dark:border-white/10 p-8 md:p-12 text-left mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h3 className="text-xl font-bold font-sans text-slate-950 dark:text-white mb-4 flex items-center gap-2">
              <Users className="h-5.5 w-5.5 text-blue-500" />
              Our Promise to You
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              We believe in direct, honest communication. When you work with us, you talk directly to the designers and developers building your site. No middlemen, no confusing tech speak—just absolute transparency, quick updates, and dates we actually stick to.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 group"
            >
              Let's build together
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>



      </div>
    </section>
  );
}
