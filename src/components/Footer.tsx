import React, { useState } from 'react';
import { Github, Twitter, Linkedin, Mail, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => {
      setNotice(null);
    }, 4000);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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

  const servicesLinks = [
    { name: 'Business Websites', href: '#services' },
    { name: 'Portfolio Websites', href: '#services' },
    { name: 'E-commerce Stores', href: '#services' }
  ];

  const quickLinks = [
    { name: 'Our Services', id: 'services' },
    { name: 'Start Consultation', id: 'contact' }
  ];

  return (
    <footer
      id="footer"
      className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-white/10 relative overflow-hidden text-left"
    >
      {/* Background visual element */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 relative">
        
        {/* Brand column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/10 border border-white/10 shadow-md overflow-hidden p-1.5">
              <img 
                src="/logo_icon.png" 
                alt="Webकला Logo Icon" 
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-base tracking-wider text-slate-100 uppercase leading-none">
                WEB
              </span>
              <span className="font-mono text-[10px] text-blue-400 font-bold tracking-widest leading-none mt-1">
                कला
              </span>
            </div>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            Webकला is a premium web development agency designing lightning-fast, high-converting digital web experiences for scaling brands.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub Repository Link"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Twitter Profile Link"
            >
              <Twitter className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn Profile Link"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        {/* Services column */}
        <div className="lg:col-span-2.5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
            Services
          </h4>
          <ul className="space-y-2.5 text-xs">
            {servicesLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, 'services')}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links column */}
        <div className="lg:col-span-2.5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleScrollTo(e, link.id)}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div className="lg:col-span-3 space-y-4 text-xs">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
            Contact Us
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <span>Silicon Valley, CA &amp; Bangalore, India</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-blue-500 shrink-0" />
              <a href="mailto:hello@webkala.com" className="hover:text-white transition-colors">
                hello@webkala.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-blue-500 shrink-0" />
              <a href="tel:+917224012727" className="hover:text-white transition-colors">
                +91 72240 12727
              </a>
            </li>
          </ul>

          {/* Newsletter Input */}
          <div className="pt-3 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">Join our newsletter</span>
            <div className="flex gap-1">
              <input
                type="email"
                placeholder="email@domain.com"
                className="px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg outline-none focus:border-blue-500 text-slate-200 w-full"
              />
              <button
                type="button"
                onClick={() => showNotice('Subscription saved! Thank you.')}
                className="p-2 bg-blue-600 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white rounded-lg hover:bg-blue-500 transition-colors cursor-pointer"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Legal Row */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <span>
          &copy; {currentYear} Webकला Portfolio. All Rights Reserved.
        </span>
        <div className="flex items-center gap-6">
          <a
            href="#privacy"
            onClick={(e) => { e.preventDefault(); showNotice('Standard GDPR & CCPA privacy models are active on this agency portfolio.'); }}
            className="hover:text-slate-300 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            onClick={(e) => { e.preventDefault(); showNotice('Terms and Conditions: All designs developed on request remain full IP of the client.'); }}
            className="hover:text-slate-300 transition-colors"
          >
            Terms &amp; Conditions
          </a>
        </div>
      </div>

      {/* Modern Notice Toast */}
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900/90 dark:bg-slate-100/90 backdrop-blur border border-white/10 dark:border-black/10 text-white dark:text-slate-900 text-xs font-medium shadow-2xl max-w-sm w-[90%] sm:w-auto"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{notice}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
