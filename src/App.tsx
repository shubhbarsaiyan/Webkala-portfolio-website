import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Industries from './components/Industries';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
// import Portfolio from './components/Portfolio';
// import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import { THEMES } from './lib/themes';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState<string>('atelier-bronze');
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Synchronize dark/light theme classes on root element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Synchronize dynamic brand color variables based on selected theme accent
  useEffect(() => {
    const selectedTheme = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];
    const root = document.documentElement;
    Object.entries(selectedTheme.colors).forEach(([weight, hex]) => {
      root.style.setProperty(`--brand-${weight}`, hex);
    });
  }, [activeThemeId]);

  // Routing popstate event listener for browser history back/forward controls
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0 });
  };

  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-blue-500/30 dark:selection:bg-blue-500/40 select-text antialiased scroll-smooth overflow-x-hidden">
      


      {/* Startup brand loader intro screen */}
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="flex flex-col relative w-full">
          {/* Navigation Bar with Theme Controls & Routing */}
          <Navbar 
            isDark={isDark} 
            onThemeToggle={handleThemeToggle} 
            activeThemeId={activeThemeId}
            onThemeChange={setActiveThemeId}
            currentPath={currentPath}
            onNavigate={handleNavigate}
          />

          {/* Main Layout Blocks */}
          <main className="flex-1 w-full">
            {/*
            {currentPath === '/work' && (
              <Portfolio isDedicatedPage={true} onNavigate={handleNavigate} />
            )}
            */}
            {currentPath === '/services' && (
              <Services isDedicatedPage={true} onNavigate={handleNavigate} />
            )}
            {currentPath === '/process' && (
              <Process isDedicatedPage={true} onNavigate={handleNavigate} />
            )}
            {currentPath === '/pricing' && (
              <Pricing isDedicatedPage={true} onNavigate={handleNavigate} />
            )}
            {currentPath === '/' && (
              <>
                <Hero onNavigate={handleNavigate} />
                <About />
                <Industries />
                <WhyChooseUs />
                {/* <Testimonials /> */}
                <Contact />
              </>
            )}
          </main>

          {/* Core Interactive Overlays */}
          <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
          <FloatingActions />

          {/* Brand Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}
