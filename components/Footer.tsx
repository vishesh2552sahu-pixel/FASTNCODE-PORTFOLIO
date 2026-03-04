
import React from 'react';
import { Zap, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { View } from '../App';

interface FooterProps {
  onNavigate?: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-obsidian border-t border-zinc-900 pt-16 md:pt-24 pb-12 px-fluid">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-y-16 md:gap-12 lg:gap-24 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-6 lg:col-span-5">
          <div className="flex items-center gap-3 mb-8 md:mb-10 group cursor-pointer" onClick={() => onNavigate?.('home')}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-blue rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,102,255,0.3)]">
              <Zap className="text-white fill-white" size={20} />
            </div>
            <span className="text-2xl md:text-4xl font-black tracking-tighter uppercase shimmer-text">
              FAST & CODE
            </span>
          </div>
          <div className="mb-10 md:mb-12">
            <span className="font-mono text-brand-blue text-[9px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em] block mb-4 md:mb-6">
              web solutions that grow your business
            </span>
            <p className="text-zinc-500 text-base md:text-xl font-medium leading-relaxed text-pretty">
              Elite engineering collective specializing in high-velocity digital product design and distributed systems.
            </p>
          </div>
          <div className="flex gap-4 md:gap-5">
            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 md:w-14 md:h-14 border border-zinc-800 rounded-xl md:rounded-2xl flex items-center justify-center text-zinc-500 hover:border-brand-blue/50 hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-500">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-6 md:col-span-3 lg:col-span-3 lg:col-start-8">
          <h4 className="font-mono text-zinc-300 uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-xs font-black mb-8 md:mb-10">Navigation</h4>
          <ul className="space-y-4 md:space-y-6">
            {['Home', 'Services', 'Work', 'Contact'].map(item => (
              <li key={item}>
                <button 
                  onClick={() => onNavigate?.(item.toLowerCase() as View)}
                  className="text-zinc-500 hover:text-white transition-colors text-sm md:text-base font-bold uppercase tracking-tight"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <h4 className="font-mono text-zinc-300 uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-xs font-black mb-8 md:mb-10">Resources</h4>
          <ul className="space-y-4 md:space-y-6">
            {['Terms', 'Privacy', 'Security', 'Approach'].map(item => (
              <li key={item}>
                <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm md:text-base font-bold uppercase tracking-tight">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 md:pt-12 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
        <p className="text-zinc-600 text-[8px] md:text-[10px] font-mono uppercase tracking-[0.4em] md:tracking-[0.5em] font-black text-center">
          © {new Date().getFullYear()} Fast & Code Agency.
        </p>
        <div className="h-[1px] flex-grow mx-8 bg-zinc-900 hidden md:block" />
        <p className="text-zinc-600 text-[8px] md:text-[10px] font-mono uppercase tracking-[0.4em] md:tracking-[0.5em] flex items-center gap-3 font-black text-center">
          ENGINEERED WITH <span className="text-brand-blue font-black underline decoration-2 underline-offset-4">PRECISION</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
