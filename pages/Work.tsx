
import React from 'react';
import { motion } from 'framer-motion';
import ProjectsSection from '../components/ProjectsSection';
import { View } from '../App';

interface WorkProps {
  onNavigate: (view: View) => void;
}

const Work: React.FC<WorkProps> = ({ onNavigate }) => {
  return (
    <div className="px-fluid py-fluid-section min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <header className="mb-24 md:mb-48">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-brand-blue text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 block font-bold"
          >
            Production History // v2.0
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-fluid-h1 font-black tracking-tighter leading-[0.8] uppercase text-balance"
          >
            Selected <br />
            <span className="text-zinc-800 italic">Deliverables.</span>
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="h-[1px] bg-gradient-to-r from-brand-blue/40 via-zinc-800 to-transparent mt-12 md:mt-16"
          />
        </header>

        <div className="relative">
          {/* Decorative index indicator */}
          <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-brand-blue/10 hidden xl:block" />
          
          <ProjectsSection />
        </div>

        <div className="mt-48 md:mt-64 text-center py-20 md:py-32 border-y border-zinc-900 glass rounded-[3rem]">
          <h3 className="text-3xl md:text-6xl font-black tracking-tighter mb-8 italic uppercase text-balance px-6">
            Your vision. <br /> Our <span className="shimmer-text">Architects.</span>
          </h3>
          <p className="text-zinc-500 text-lg md:text-xl mb-16 max-w-lg mx-auto font-medium text-pretty px-6">
            We architect bespoke digital solutions with extreme technical rigor. No compromises.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="w-full md:w-auto px-12 py-7 bg-brand-blue text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs hover:shadow-[0_20px_60px_rgba(0,102,255,0.4)] transition-all active:scale-95 flex items-center justify-center min-h-[54px] mx-auto rounded-xl"
          >
            INITIALIZE NEW PROJECT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Work;
