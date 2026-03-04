import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Layers, HardDrive, Share2 } from 'lucide-react';
import { View } from '../App';

const services = [
  {
    id: 'service-web',
    title: 'High-Performance Web',
    desc: 'Next.js & React ecosystems optimized for sub-second core web vitals and premium interactivity.',
    icon: Code2,
    size: 'col-span-12 md:col-span-6',
    color: 'glass'
  },
  {
    id: 'service-distributed',
    title: 'Distributed Systems',
    desc: 'Rust & Go backends that handle millions of requests with minimal latency and high resilience.',
    icon: Share2,
    size: 'col-span-12 md:col-span-6',
    color: 'glass'
  },
  {
    id: 'service-design',
    title: 'Product Design',
    desc: 'Premium UI systems built for elite user experiences, blending artistic vision with technical logic.',
    icon: Layers,
    size: 'col-span-12 md:col-span-6',
    color: 'glass'
  },
  {
    id: 'service-cloud',
    title: 'Cloud Infrastructure',
    desc: 'Multi-cloud strategy with automated scaling, failover, and CI/CD pipelines optimized for speed.',
    icon: HardDrive,
    size: 'col-span-12 md:col-span-6',
    color: 'glass'
  }
];

interface ServicesGridProps {
  onNavigate?: (view: View, subview?: string) => void;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
      {services.map((s, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: idx * 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
          onClick={() => onNavigate?.('services', s.id)}
          className={`${s.size} ${s.color} p-8 md:p-14 rounded-[2rem] md:rounded-[2.5rem] border border-zinc-900 group cursor-pointer transition-all hover:border-brand-blue/40 shadow-2xl overflow-hidden relative flex flex-col`}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none hidden md:block">
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.15, 0.3, 0.15],
                x: [0, 15, -15, 0],
                y: [0, -10, 10, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-full bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.1)_0%,transparent_60%)]"
            />
          </div>

          <div className="absolute top-0 right-0 p-6 md:p-10 opacity-[0.02] group-hover:opacity-[0.06] transition-all duration-700 group-hover:scale-105 pointer-events-none">
            <s.icon className="w-32 h-32 md:w-48 md:h-48" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-zinc-950 flex items-center justify-center mb-6 md:mb-10 border border-zinc-900 group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-500 shadow-inner group-hover:shadow-[0_0_40px_rgba(0,102,255,0.3)]">
              <s.icon className="text-zinc-600 group-hover:text-white" size={22} />
            </div>
            
            <h3 className="text-xl md:text-4xl font-black mb-4 md:mb-6 tracking-tighter uppercase group-hover:text-brand-blue transition-colors leading-tight">
              {s.title}
            </h3>
            <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed max-w-sm group-hover:text-zinc-300 transition-colors text-pretty flex-grow">
              {s.desc}
            </p>

            <div className="mt-8 md:mt-12 flex items-center gap-4 text-brand-blue font-mono text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-60 md:opacity-40 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
              <span>Explore Detail</span>
              <div className="w-8 md:w-10 h-[1px] bg-brand-blue origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-700" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServicesGrid;