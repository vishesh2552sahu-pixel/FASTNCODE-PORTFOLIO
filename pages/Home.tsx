
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import ServicesGrid from '../components/ServicesGrid';
import { View } from '../App';

interface HomeProps {
  onNavigate: (view: View, subview?: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="w-full relative">
      <Hero onNavigate={onNavigate} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <TrustBar />
      </motion.div>
      
      <div className="px-fluid py-fluid-section w-full">
        {/* Expertise / Process Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mb-24 md:mb-48"
        >
          <div className="mb-12 md:mb-20">
            <span className="font-mono text-brand-blue text-[10px] uppercase tracking-[0.6em] mb-4 md:mb-6 block font-black">
              OUR EXPERTISE
            </span>
            <h2 className="text-fluid-h2 font-black tracking-tighter uppercase mb-6 md:mb-10 max-w-4xl text-pretty">
              High-Velocity <span className="text-zinc-800 italic">Execution.</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-10 text-pretty">
              We eliminate technical friction by deploying elite architectural patterns. Every line of code is a strategic decision towards scalability.
            </p>
          </div>
          <ServicesGrid onNavigate={onNavigate} />
        </motion.div>

        {/* Home CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-24 text-center py-24 md:py-32 glass rounded-[3rem] border border-zinc-900 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-brand-blue/5 pointer-events-none" />
          <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-10 text-pretty px-6">
            Explore the <span className="shimmer-text italic">Portfolio.</span>
          </h3>
          <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-16 font-medium px-6 text-pretty">
            Witness our latest production-grade architectural builds and technical breakthroughs.
          </p>
          
          <button 
            onClick={() => onNavigate('work')}
            className="group relative px-10 md:px-16 py-5 md:py-6 overflow-hidden border border-zinc-800 bg-brand-obsidian/80 backdrop-blur-xl transition-all hover:border-brand-blue/60 w-full md:w-auto mx-auto inline-flex items-center justify-center gap-6"
          >
            <span className="relative z-10 font-mono uppercase tracking-[0.5em] text-[10px] md:text-[11px] font-black text-zinc-400 group-hover:text-white">
              ACCESS PRODUCTION ARCHIVE
            </span>
            <div className="w-12 md:w-20 h-[1px] bg-zinc-800 group-hover:bg-brand-blue transition-all duration-700" />
            <div className="absolute inset-0 bg-brand-blue/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
