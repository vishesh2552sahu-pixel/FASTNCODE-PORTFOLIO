
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface LaptopIntroProps {
  onComplete: () => void;
}

const LaptopIntro: React.FC<LaptopIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const [typingCode, setTypingCode] = useState('');
  
  const fullCode = `
// Initializing Elite Protocols...
import { AI, NeuralCore } from '@elite/engine';

const bootstrap = async () => {
  const engine = new AI.Engine({
    mode: 'cinematic',
    acceleration: 'hardware',
    theme: 'obsidian'
  });

  await engine.initialize();
  
  NeuralCore.connect({
    latency: 'ultra-low',
    security: 'quantum'
  });

  console.log('SYSTEM_READY: Welcome to the Future.');
};

bootstrap();
  `.trim();

  const codeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !laptopRef.current || !lidRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // 1. Initial State
    // Base must NEVER rotate. We keep laptopRef for position/scale only.
    gsap.set(laptopRef.current, { 
      rotateX: 0, 
      rotateY: 0, 
      z: -300, 
      opacity: 0,
      scale: 0.8
    });
    
    // Screen starts at -95deg (closed position, tilted towards viewer)
    gsap.set(lidRef.current, { 
      rotateX: -95,
      transformOrigin: "bottom center"
    }); 

    // 2. Animation Sequence
    tl.to(laptopRef.current, {
      opacity: 1,
      z: 0,
      scale: 1,
      duration: 2,
      ease: "power3.out"
    })
    .to(lidRef.current, {
      rotateX: 0, // Fully open (vertical)
      duration: 3,
      ease: "power3.inOut"
    }, "-=0.5")
    .to({}, {
      duration: 6, // Coding visible for 6 seconds
      onStart: () => {
        // Typing animation
        let i = 0;
        const interval = setInterval(() => {
          setTypingCode(fullCode.slice(0, i));
          i++;
          if (i > fullCode.length) {
            clearInterval(interval);
            // Start subtle scroll after typing finishes or during
            gsap.to(codeContainerRef.current, {
              y: -150,
              duration: 15,
              ease: "none"
            });
          }
        }, 45);
      }
    })
    // Zoom Transition - Apple Style
    .to(laptopRef.current, {
      z: 1200, // Camera push
      scale: 6, // Deep zoom
      duration: 4.5,
      ease: "power3.inOut"
    })
    .to(baseRef.current, {
      opacity: 0,
      duration: 2.5,
      ease: "power3.inOut"
    }, "-=3.5")
    .to(containerRef.current, {
      opacity: 0,
      duration: 2,
      ease: "power3.inOut"
    }, "-=1.5");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[1000] bg-[#050505] flex items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,102,255,0.15)_0%,_transparent_70%)]" />

      {/* Laptop 3D Wrapper */}
      <div 
        ref={laptopRef}
        className="relative w-[90vw] max-w-[700px] aspect-[16/10]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Laptop Base (Static, No Rotation) */}
        <div 
          ref={baseRef}
          className="absolute inset-0 bg-[#121212] rounded-xl shadow-[0_50px_100px_rgba(0,0,0,0.9)] border-b-4 border-[#080808]"
          style={{ 
            transform: 'translateY(100%) rotateX(0deg)', 
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Keyboard Area */}
          <div className="absolute inset-x-12 top-10 bottom-24 bg-[#050505] rounded-lg opacity-90" />
          {/* Trackpad */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#1a1a1a] rounded-md opacity-40" />
        </div>

        {/* Laptop Lid / Screen */}
        <div 
          ref={lidRef}
          className="absolute inset-0"
          style={{ 
            transformStyle: 'preserve-3d',
            transformOrigin: 'bottom center'
          }}
        >
          {/* Lid Back */}
          <div className="absolute inset-0 bg-[#0a0a0a] rounded-xl border border-white/5 shadow-2xl">
            {/* Glowing Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#111] flex items-center justify-center border border-white/5">
              <div className="w-12 h-12 bg-[#0066FF] rounded-full blur-xl animate-pulse opacity-40" />
              <div className="absolute w-8 h-8 bg-[#0066FF] rounded-full shadow-[0_0_20px_rgba(0,102,255,0.5)]" />
            </div>
          </div>

          {/* Screen Display */}
          <div 
            className="absolute inset-1.5 bg-[#010101] rounded-lg overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,102,255,0.15)]"
            style={{ transform: 'translateZ(1px)' }}
          >
            <div className="w-full h-full p-14 font-mono text-sm overflow-hidden relative">
              {/* Window Controls */}
              <div className="flex gap-3 mb-12">
                <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-[0_0_10px_rgba(255,95,86,0.5)]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-[0_0_10px_rgba(255,189,46,0.5)]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-[0_0_10px_rgba(39,201,63,0.5)]" />
                <div className="ml-8 text-white/30 text-xs tracking-[0.3em] uppercase font-bold">Elite_Engine_v5.0</div>
              </div>

              {/* Code Content with subtle scroll */}
              <div 
                ref={codeContainerRef}
                className="text-white/90 whitespace-pre leading-relaxed"
              >
                {typingCode.split('\n').map((line, idx) => (
                  <div key={idx} className="flex mb-1.5">
                    <span className="text-white/10 w-14 shrink-0 select-none text-xs">{(idx + 1).toString().padStart(2, '0')}</span>
                    <span className={line.includes('//') ? 'text-zinc-600 italic' : 'text-zinc-300'}>
                      {line}
                    </span>
                  </div>
                ))}
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-3 h-6 bg-[#0066FF] ml-1 align-middle shadow-[0_0_20px_#0066FF]" 
                />
              </div>

              {/* Screen Glow Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#0066FF]/15 via-transparent to-white/5 mix-blend-overlay" />
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(0,102,255,0.08)_0%,_transparent_100%)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,1)]" />
    </div>
  );
};

export default LaptopIntro;
