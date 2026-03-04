
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Preloader: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[200] flex flex-col pointer-events-none">
      {/* Top Panel */}
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 1, ease: [0.83, 0, 0.17, 1], delay: 0.2 }}
        className="absolute inset-x-0 top-0 h-1/2 bg-brand-obsidian border-b border-white/5"
      />
      {/* Bottom Panel */}
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 1, ease: [0.83, 0, 0.17, 1], delay: 0.2 }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-obsidian"
      />

      <motion.div
        exit={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center"
      >
        <div className="relative">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-24 h-24 bg-brand-blue rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(0,102,255,0.6)] mb-12"
          >
            <Zap className="text-white fill-white w-12 h-12" />
          </motion.div>
          
          <div className="absolute -inset-4 border border-brand-blue/20 rounded-full animate-ping pointer-events-none" />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-baseline font-mono text-[clamp(4rem,15vw,12rem)] font-black tracking-tighter text-white">
            <span className="w-[3ch] text-right">{count.toString().padStart(2, '0')}</span>
            <span className="text-brand-blue text-2xl md:text-4xl ml-2">%</span>
          </div>
          
          <div className="mt-4 flex items-center gap-4">
             <div className="h-[1px] w-12 bg-zinc-800" />
             <p className="font-mono text-zinc-500 uppercase tracking-[0.3em] text-[10px]">
               Calibrating Velocity Systems
             </p>
             <div className="h-[1px] w-12 bg-zinc-800" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
