import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { View } from '../App';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { label: string; view: View }[] = [
    { label: 'HOME', view: 'home' },
    { label: 'SERVICES', view: 'services' },
    { label: 'PORTFOLIO', view: 'work' },
    { label: 'PROCESS', view: 'home' },
    { label: 'CONTACT', view: 'contact' },
  ];

  const handleNav = (view: View) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[100] h-20 md:h-24 px-fluid flex items-center justify-between pointer-events-none"
      >
        <div 
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 md:gap-4 group cursor-pointer pointer-events-auto"
        >
          <div className="w-9 h-9 md:w-10 md:h-10 border border-brand-blue/30 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 overflow-hidden relative bg-brand-obsidian/40 backdrop-blur-md">
            <svg width="18" height="18" viewBox="0 0 100 100" className="relative z-10 text-brand-blue">
               <path d="M50 10 L85 90 L15 90 Z" fill="currentColor" opacity="0.8" />
            </svg>
          </div>
          <span className="text-[10px] md:text-[12px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase text-white hover:text-brand-blue transition-colors">
            FASTNCODE
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10 lg:gap-12 pointer-events-auto">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.view)}
              className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all relative group ${
                currentView === item.view ? 'text-brand-blue' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-2 left-0 h-[1.5px] bg-brand-blue transition-all duration-700 ${
                currentView === item.view ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          ))}
          <button 
            onClick={() => handleNav('contact')}
            className="px-8 py-3 glass text-brand-blue text-[10px] font-black tracking-[0.3em] uppercase rounded-full hover:bg-brand-blue hover:text-white transition-all duration-500 shadow-xl border border-brand-blue/20"
          >
            GET STARTED
          </button>
        </div>

        <button 
          className="md:hidden text-white p-2.5 glass rounded-xl pointer-events-auto border border-white/5 active:scale-90 transition-transform"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-[1000] bg-brand-obsidian p-8 md:p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12 md:mb-24">
              <span className="font-black text-brand-blue tracking-[0.4em] uppercase text-[9px]">PRODUCTION NODE</span>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="text-white glass p-4 rounded-full border border-white/5 active:scale-90 transition-transform"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4 md:gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.view}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 + 0.3 }}
                  onClick={() => handleNav(item.view)}
                  className={`text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-left uppercase transition-all ${
                    currentView === item.view ? 'text-brand-blue translate-x-4' : 'text-zinc-900 hover:text-zinc-100'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
               <div>
                 <p className="font-mono text-zinc-600 text-[8px] uppercase tracking-[0.4em] mb-4 font-black">CONNECT</p>
                 <div className="flex gap-6 md:gap-8 text-zinc-500 font-black uppercase tracking-widest text-[9px] md:text-[10px]">
                   <a href="#" className="hover:text-brand-blue transition-colors">TWITTER</a>
                   <a href="#" className="hover:text-brand-blue transition-colors">GITHUB</a>
                   <a href="#" className="hover:text-brand-blue transition-colors">DRIBBBLE</a>
                 </div>
               </div>
               <div className="text-zinc-900 font-black text-5xl md:text-8xl select-none leading-none">2025</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;