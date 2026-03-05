import React from 'react';
import { motion, Variants } from 'framer-motion';
import { View } from '../App';

interface HeroProps {
  onNavigate: (view: View) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { 
      y: 60, 
      opacity: 0, 
      filter: 'blur(20px)', 
      scale: 0.9 
    },
    show: { 
      y: 0, 
      opacity: 1, 
      filter: 'blur(0px)', 
      scale: 1,
      transition: { 
        duration: 1.5, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      } 
    },
  };

  const sloganText = "web solutions that grow your business";

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] md:min-h-screen overflow-hidden py-20">
      {/* Landing Page Content */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-fluid w-full"
      >
        {/* Flash effect on reveal */}
        <motion.div
          initial={{ opacity: 1, scale: 2 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-brand-blue/10 blur-[120px] pointer-events-none rounded-full"
        />

        <motion.div variants={item} className="mb-8 md:mb-12">
          <span className="font-mono text-brand-blue tracking-[0.4em] md:tracking-[0.6em] text-[10px] md:text-xs font-black border-l-2 border-brand-blue/80 pl-4 md:pl-10 py-2 block w-fit mx-auto">
            VELOCITY PROTOCOL // TERMINAL-2025
          </span>
        </motion.div>
        
        <motion.div variants={item} className="mb-8 md:mb-14">
          <h1 className="text-fluid-h1 font-black tracking-tighter select-none uppercase flex flex-col items-center justify-center leading-[0.9]">
            <span className="block">High-end</span>
            <span className="shimmer-text italic block pt-2 md:pt-6 px-4 md:px-12">Engineering.</span>
          </h1>
        </motion.div>

        <motion.div variants={item} className="mb-12 md:mb-24">
          <motion.div 
            initial={{ width: "20%", opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            className="inline-flex items-center gap-4 md:gap-10 px-8 md:px-12 py-4 md:py-6 glass rounded-full border border-brand-blue/20 shadow-[0_0_80px_rgba(0,102,255,0.1)] max-w-[95vw] md:max-w-none"
          >
            <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse shadow-[0_0_15px_#0066FF] flex-shrink-0" />
            <div className="flex overflow-hidden">
              {sloganText.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 1.5,
                    delay: 0.8 + (i * 0.02),
                    ease: "easeOut"
                  }}
                  className={`font-mono text-white text-[9px] md:text-sm uppercase font-bold inline-block whitespace-pre ${char === ' ' ? 'w-1.5 md:w-3' : ''}`}
                  style={{ letterSpacing: '0.25em' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse shadow-[0_0_15px_#0066FF] flex-shrink-0" />
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col items-center justify-center max-w-7xl mx-auto px-6">
          <div className="w-full max-w-md">
             <button 
               onClick={() => onNavigate('contact')}
               className="group relative px-10 md:px-16 py-6 md:py-10 bg-brand-blue text-white font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[11px] md:text-[12px] overflow-hidden transition-all hover:shadow-[0_0_100px_rgba(0,102,255,0.6)] hover:scale-[1.05] active:scale-[0.95] w-full flex items-center justify-center rounded-2xl min-h-[70px]"
             >
               <span className="relative z-10">Launch Project</span>
               <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
            </button>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: '80px', opacity: 1 }}
        transition={{ delay: 1.5, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-brand-blue/80 via-brand-blue/20 to-transparent hidden sm:block" 
      />
    </div>
  );
};

export default Hero;