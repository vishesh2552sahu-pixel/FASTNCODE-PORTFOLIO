
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import LaptopIntro from './components/LaptopIntro';
import Starfield from './components/Starfield';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import Contact from './pages/Contact';

export type View = 'home' | 'services' | 'work' | 'contact';

const App: React.FC = () => {
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [targetedServiceId, setTargetedServiceId] = useState<string | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Scroll Progress Logic for the top progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Global Smooth Scroll Initialization (High-End Lerp Configuration)
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06, 
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isLoaderActive) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isLoaderActive]);

  // Cinematic View Navigation with Scroll Reset
  useEffect(() => {
    // If we're navigating to a specific service, we don't want to reset to top immediately
    // or we handle the scroll in the component itself.
    if (!targetedServiceId) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { 
          immediate: true,
          force: true 
        });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [currentView, targetedServiceId]);

  useEffect(() => {
    if (!isLoaderActive) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoaderActive]);

  const handleNavigate = (view: View, subview?: string) => {
    setTargetedServiceId(subview || null);
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Home onNavigate={handleNavigate} />;
      case 'services': return <Services targetedId={targetedServiceId} />;
      case 'work': return <Work onNavigate={handleNavigate} />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <CustomCursor />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-brand-blue z-[2000] origin-left shadow-[0_0_20px_rgba(0,102,255,0.6)]"
        style={{ scaleX }}
      />

      <AnimatePresence mode="wait">
        {isLoaderActive ? (
          <LaptopIntro key="loader" onComplete={() => setIsLoaderActive(false)} />
        ) : (
          showContent && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20"
            >
              <Starfield />
              <Header currentView={currentView} onNavigate={handleNavigate} />
              
              <motion.main className="relative z-10 pt-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentView}
                    initial={{ opacity: 0, y: 40, filter: 'blur(15px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -40, filter: 'blur(15px)' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {renderView()}
                  </motion.div>
                </AnimatePresence>
                <Footer onNavigate={handleNavigate} />
              </motion.main>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
