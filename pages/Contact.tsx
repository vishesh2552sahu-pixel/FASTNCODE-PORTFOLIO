
import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';

const Contact: React.FC = () => {
  return (
    <div className="px-fluid py-fluid-section min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 md:mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-brand-blue text-[9px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] mb-4 md:mb-6 block font-bold"
          >
            Channel Opening
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-fluid-h1 font-black tracking-tighter leading-[0.85] md:leading-[0.8] uppercase text-balance"
          >
            High <span className="shimmer-text">Connection.</span>
          </motion.h1>
        </header>

        <ContactForm />
        
        <div className="mt-16 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 text-center px-6">
          <div className="flex flex-col items-center">
            <h4 className="font-mono text-zinc-600 uppercase text-[8px] md:text-[10px] tracking-[0.3em] mb-3 md:mb-4 font-black">Direct Wire</h4>
            <p className="text-zinc-300 font-bold hover:text-brand-blue transition-colors cursor-pointer text-xs md:text-base break-all">hello@fastandcode.agency</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-mono text-zinc-600 uppercase text-[8px] md:text-[10px] tracking-[0.3em] mb-3 md:mb-4 font-black">Location Matrix</h4>
            <p className="text-zinc-300 font-bold uppercase tracking-tight text-xs md:text-base">Shibuya // San Francisco</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-mono text-zinc-600 uppercase text-[8px] md:text-[10px] tracking-[0.3em] mb-3 md:mb-4 font-black">Urgent Operations</h4>
            <p className="text-zinc-300 font-bold text-xs md:text-base tracking-tighter">+1 (888) VELOCITY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
