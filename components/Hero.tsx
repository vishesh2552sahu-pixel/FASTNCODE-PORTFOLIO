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
        delayChildren: 0.5,
      },
    },
  };

  const item: Variants = {
    hidden: { 
      y: 30, 
      opacity: 0, 
      filter: 'blur(15px)', 
      scale: 0.98 
    },
    show: { 
      y: 0, 
      opacity: 1, 
      filter: 'blur(0px)', 
      scale: 1,
      transition: { 
        duration: 1.4, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      } 
    },
  };

  const sloganText = "web solutions that grow your business";

  return (
    <div className="relative flex flex-col items-center justify-center pt-20 pb-12 md:pt-40 md:pb-32 min-h-[90vh]">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-fluid w-full"
      >
        <motion.div variants={item} className="mb-8 md:mb-14">
          <span className="font-mono text-brand-blue tracking-[0.4em] md:tracking-[0.5em] text-[9px] md:text-xs font-black border-l-2 border-brand-blue/80 pl-4 md:pl-8 py-1.5 md:py-2 block w-fit mx-auto">
            VELOCITY PROTOCOL // TERMINAL-2025
          </span>
        </motion.div>
        
        <motion.div variants={item} className="mb-10 md:mb-16">
          <h1 className="text-fluid-h1 font-black tracking-tighter select-none uppercase flex flex-col items-center justify-center">
            <span className="block leading-[1]">High-end</span>
            <span className="shimmer-text italic block leading-[1] pt-1 md:pt-4 px-2 md:px-8">Engineering.</span>
          </h1>
        </motion.div>

        <motion.div variants={item} className="mb-10 md:mb-20">
          <motion.div 
            initial={{ width: "10%", opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 1 }}
            className="inline-flex items-center gap-3 md:gap-8 px-6 md:px-8 py-3 md:py-4 glass rounded-full border border-brand-blue/20 shadow-[0_0_50px_rgba(0,102,255,0.08)] max-w-[90vw] md:max-w-none"
          >
            <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse shadow-[0_0_10px_#0066FF] flex-shrink-0" />
            <div className="flex overflow-hidden">
              {sloganText.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 5, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 1.2,
                    delay: 1.2 + (i * 0.03),
                    ease: "easeOut"
                  }}
                  className={`font-mono text-white text-[8px] md:text-xs uppercase font-bold inline-block whitespace-pre ${char === ' ' ? 'w-1 md:w-2' : ''}`}
                  style={{ letterSpacing: '0.2em' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse shadow-[0_0_10px_#0066FF] flex-shrink-0" />
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 text-center md:text-left max-w-7xl mx-auto items-center md:items-end">
          <div className="md:col-span-8">
            <h2 className="text-white text-2xl sm:text-3xl md:text-7xl font-black leading-[1.1] md:leading-[1] tracking-tighter uppercase italic text-pretty">
              {sloganText}
            </h2>
          </div>
          <div className="md:col-span-4 flex flex-col items-center md:items-end w-full">
             <button 
               onClick={() => onNavigate('contact')}
               className="group relative px-8 md:px-14 py-5 md:py-8 bg-brand-blue text-white font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px] overflow-hidden transition-all hover:shadow-[0_0_70px_rgba(0,102,255,0.5)] hover:scale-[1.02] active:scale-[0.98] w-full flex items-center justify-center rounded-xl min-h-[58px]"
             >
               <span className="relative z-10">Launch Project</span>
               <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
            </button>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: '60px', opacity: 1 }}
        transition={{ delay: 2, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-brand-blue/60 via-brand-blue/10 to-transparent hidden sm:block" 
      />
    </div>
  );
};

export default Hero;