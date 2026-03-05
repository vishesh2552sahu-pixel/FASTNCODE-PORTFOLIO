
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Database, Cloud, ShieldCheck, Zap } from 'lucide-react';

const icons = [
  { name: 'AWS', icon: Cloud },
  { name: 'NVIDIA', icon: Cpu },
  { name: 'REACT', icon: Zap },
  { name: 'VERCEL', icon: Globe },
  { name: 'POSTGRES', icon: Database },
  { name: 'AUTH0', icon: ShieldCheck },
];

const TrustBar: React.FC = () => {
  return (
    <div className="w-full py-8 md:py-12 border-y border-zinc-900 bg-brand-charcoal overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-brand-charcoal to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-brand-charcoal to-transparent z-10" />
      
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex items-center gap-10 md:gap-16 px-5 md:px-8">
            {icons.map((item, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 text-zinc-600 grayscale hover:grayscale-0 hover:text-brand-blue transition-all cursor-default">
                <item.icon size={isMobileSize() ? 18 : 24} />
                <span className="font-mono text-[9px] md:text-xs font-bold tracking-widest uppercase">{item.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper for mobile size check within the component
const isMobileSize = () => typeof window !== 'undefined' && window.innerWidth < 768;

export default TrustBar;
