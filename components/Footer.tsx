
import React from 'react';
import { Zap, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { View } from '../App';

interface FooterProps {
  onNavigate?: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-obsidian border-t border-zinc-900 pt-24 pb-12 px-fluid">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12 lg:gap-24 mb-24">
        <div className="col-span-12 md:col-span-6 lg:col-span-5">
          <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => onNavigate?.('home')}>
            <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,102,255,0.3)]">
              <Zap className="text-white fill-white" size={24} />
            </div>
            <span className="text-3xl md:text-4xl font-black tracking-tighter uppercase shimmer-text">
              FAST & CODE
            </span>
          </div>
          <div className="mb-12">
            <span className="font-mono text-brand-blue text-[10px] md:text-xs font-black uppercase tracking-[0.4em] block mb-6">
              web solution that grow your bussness
            </span>
            <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed text-pretty">
              Elite engineering collective specializing in high-velocity digital product design and distributed systems.
            </p>
          </div>
          <div className="flex gap-5">
            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-14 h-14 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 hover:border-brand-blue/50 hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-500">
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-6 md:col-span-3 lg:col-span-3 lg:col-start-8">
          <h4 className="font-mono text-zinc-300 uppercase tracking-[0.4em] text-[10px] md:text-xs font-black mb-10">Navigation</h4>
          <ul className="space-y-6">
            {['Home', 'Services', 'Work', 'Contact'].map(item => (
              <li key={item}>
                <button 
                  onClick={() => onNavigate?.(item.toLowerCase() as View)}
                  className="text-zinc-500 hover:text-white transition-colors text-base font-bold uppercase tracking-tight"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <h4 className="font-mono text-zinc-300 uppercase tracking-[0.4em] text-[10px] md:text-xs font-black mb-10">Resources</h4>
          <ul className="space-y-6">
            {['Terms', 'Privacy', 'Security', 'Approach'].map(item => (
              <li key={item}>
                <a href="#" className="text-zinc-500 hover:text-white transition-colors text-base font-bold uppercase tracking-tight">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.5em] font-black">
          © {new Date().getFullYear()} Fast & Code Agency.
        </p>
        <div className="h-[1px] flex-grow mx-8 bg-zinc-900 hidden md:block" />
        <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.5em] flex items-center gap-3 font-black">
          ENGINEERED WITH <span className="text-brand-blue font-black underline decoration-2 underline-offset-4">PRECISION</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
