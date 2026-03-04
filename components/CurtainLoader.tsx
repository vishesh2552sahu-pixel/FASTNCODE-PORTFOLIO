
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CurtainLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Grand Entrance Panels */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 2.8 }}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#050505] z-20 border-r border-white/5 shadow-[40px_0_100px_rgba(0,0,0,0.8)]"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 2.8 }}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#050505] z-20 border-l border-white/5 shadow-[-40px_0_100px_rgba(0,0,0,0.8)]"
      />

      {/* Logo Reveal Container */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, scale: 1.4, filter: 'blur(30px)' }}
        transition={{ duration: 1, delay: 2.4 }}
        className="relative z-[30] flex flex-col items-center px-6"
      >
        <svg
          width="clamp(120px, 40vw, 180px)"
          height="clamp(120px, 40vw, 180px)"
          viewBox="0 0 100 100"
          className="mb-8 md:mb-10 overflow-visible"
        >
          <defs>
            <filter id="glow-heavy">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="text-shimmer-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0066FF" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#0066FF" />
            </linearGradient>
          </defs>
          
          {/* Main Logo Path - Stroke Animation */}
          <motion.path
            d="M50 15 L85 85 L15 85 Z"
            fill="none"
            stroke="#0066FF"
            strokeWidth="1.2"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0.5, 1] }}
            transition={{ 
              duration: 1.8, 
              ease: [0.43, 0.13, 0.23, 0.96] 
            }}
            filter="url(#glow-heavy)"
          />
          
          {/* Inner Sharp Accents with KINETIC GLITCH Reveal */}
          <motion.path
            d="M50 35 L70 75 L30 75 Z"
            fill="none"
            stroke="#0066FF"
            strokeWidth="3.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0, x: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 1, 0.8, 1, 0, 1],
              x: [0, -2, 2, -1, 0, 3, 0],
              filter: [
                'blur(0px)',
                'blur(4px)',
                'blur(0px)',
                'blur(2px)',
                'blur(0px)'
              ]
            }}
            transition={{ 
              duration: 1.2, 
              ease: "easeInOut", 
              delay: 0.9,
              opacity: { times: [0, 0.1, 0.2, 0.3, 0.4, 0.5] },
              x: { times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6] }
            }}
            filter="url(#glow-heavy)"
          />

          {/* Core Symbol (Flash) */}
          <motion.path
            d="M48 45 L55 45 L45 65 L52 65"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.6 }}
          />
        </svg>

        <motion.div
          className="text-center relative"
        >
          {/* Animated Background Text (Subtle Shadow) */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1, scale: 1.1 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute inset-0 text-xl md:text-3xl font-black text-brand-blue blur-xl select-none"
          >
            FAST & CODE
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, letterSpacing: '0.4em', y: 10 }}
            animate={{ 
              opacity: 1, 
              letterSpacing: '0.6em',
              y: 0 
            }}
            transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-3xl font-black text-white uppercase shimmer-text font-sans relative z-10"
          >
            FAST & CODE
          </motion.h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.8, ease: "easeInOut" }}
            className="h-[1px] bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent mt-4 md:mt-6 mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="font-mono text-[8px] md:text-[10px] text-zinc-400 uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold"
          >
            INITIALIZING ELITE PROTOCOLS
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CurtainLoader;
