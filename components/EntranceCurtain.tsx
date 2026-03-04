
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const EntranceCurtain: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[300] flex overflow-hidden pointer-events-none">
      {/* Left Door */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#050505] border-r border-white/5 shadow-2xl z-20"
      />
      {/* Right Door */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#050505] border-l border-white/5 shadow-2xl z-20"
      />

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-[310] m-auto flex flex-col items-center"
      >
        <div className="relative group">
          <div className="w-24 h-24 bg-brand-blue rounded-3xl flex items-center justify-center shadow-[0_0_80px_rgba(0,102,255,0.4)] mb-8">
            <Zap className="text-white fill-white w-12 h-12" />
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border border-brand-blue/20 rounded-full border-dashed"
          />
        </div>
        
        <h1 className="text-2xl font-black tracking-[0.5em] text-white uppercase shimmer-text">
          FAST & CODE
        </h1>
        <p className="mt-4 font-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
          ENGINEERING ARCHITECTS
        </p>
      </motion.div>
    </div>
  );
};

export default EntranceCurtain;
