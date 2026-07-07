import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowRight, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { THEMES } from '../lib/themes';

interface NavbarProps {
  isDark: boolean;
  onThemeToggle: () => void;
  activeThemeId: string;
  onThemeChange: (id: string) => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Navbar({ isDark, onThemeToggle, activeThemeId, onThemeChange, currentPath, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '/services' },
    { name: 'Process', href: '/process' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Book a Call', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background shift on scroll
      setScrolled(window.scrollY > 20);

      // Scroll progress computation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Detect active section
      const sections = ['hero', 'about', 'services', 'process', 'portfolio', 'pricing', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href.startsWith('#')) {
      if (currentPath !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = target.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 150);
      } else {
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = target.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      onNavigate(href);
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-black/40 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/10 py-3 shadow-lg dark:shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-100" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/10 shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden p-1.5">
            <img 
              src="/logo_icon.png" 
              alt="Webकला Logo Icon" 
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-base tracking-wider text-slate-800 dark:text-white uppercase leading-none">
              WEB
            </span>
            <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold tracking-widest leading-none mt-1">
              कला
            </span>
          </div>
        </a>

        {/* Desktop Links */}
          {navLinks.map((link) => {
            const isActive = link.href.startsWith('/')
              ? currentPath === link.href
              : (currentPath === '/' && activeSection === link.href.substring(1));
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors duration-300 rounded-lg ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-blue-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

        {/* Toolbar (Theme Toggle, Consultation CTA, Mobile Menu Toggle) */}
        <div className="flex items-center gap-3">
          {/* Palette Accent Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowThemePicker(!showThemePicker)}
              className={`p-2.5 rounded-xl border text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer ${
                showThemePicker 
                  ? 'border-blue-500 bg-blue-500/5 text-blue-500 dark:border-blue-500/40' 
                  : 'border-slate-200/60 dark:border-white/10'
              }`}
              title="Change Accent Color Theme"
              aria-label="Change Accent Color Theme"
            >
              <Palette className="h-4.5 w-4.5" />
            </button>

            <AnimatePresence>
              {showThemePicker && (
                <>
                  {/* Backdrop overlay to close picker on tap outside */}
                  <div className="fixed inset-0 z-10" onClick={() => setShowThemePicker(false)} />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-48 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-xl p-2.5 z-20 flex flex-col gap-1"
                  >
                    <div className="px-2 py-1 text-[10px] font-bold tracking-wider font-mono text-slate-400 dark:text-slate-500 uppercase border-b border-slate-100 dark:border-white/5 mb-1.5">
                      Select Accent Theme
                    </div>
                    {THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => {
                          onThemeChange(theme.id);
                          setShowThemePicker(false);
                        }}
                        className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl text-xs font-medium text-left transition-all duration-200 cursor-pointer ${
                          activeThemeId === theme.id
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                      >
                        <span 
                          className="h-3 w-3 rounded-full shrink-0 border border-black/10 dark:border-white/10" 
                          style={{ backgroundColor: theme.color }}
                        />
                        <span className="flex-1 truncate">{theme.name}</span>
                        {activeThemeId === theme.id && (
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onThemeToggle}
            className="p-2.5 rounded-xl border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer"
            aria-label="Toggle theme color mode"
          >
            {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* Consultation CTA Desktop */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="hidden lg:flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 dark:bg-none dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-all duration-300"
          >
            Consultation
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="flex flex-col gap-2 px-6 py-5 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = link.href.startsWith('/')
                  ? currentPath === link.href
                  : (currentPath === '/' && activeSection === link.href.substring(1));
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`px-4 py-3 rounded-xl text-xs font-medium uppercase tracking-wide transition-colors ${
                      isActive
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="mt-2 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-xs font-semibold tracking-wide uppercase bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10"
              >
                Get Free Consultation
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
