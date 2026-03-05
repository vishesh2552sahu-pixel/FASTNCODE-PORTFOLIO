
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface LaptopIntroProps {
  onComplete: () => void;
}

const CodeTerminal: React.FC<{ code: string; isMobile: boolean }> = React.memo(({ code, isMobile }) => {
  return (
    <div className="text-white/90 whitespace-pre leading-relaxed will-change-transform">
      {code.split('\n').map((line, idx) => {
        let colorClass = 'text-zinc-300';
        if (line.includes('//')) colorClass = 'text-zinc-600 italic';
        else if (line.includes('<') || line.includes('/>') || line.includes('html') || line.includes('body') || line.includes('head')) colorClass = 'text-blue-400';
        else if (line.includes('{') || line.includes('}') || line.includes('style')) colorClass = 'text-amber-400';
        else if (line.includes('const') || line.includes('import') || line.includes('script')) colorClass = 'text-purple-400';
        else if (line.includes('console.log') || line.includes('init')) colorClass = 'text-emerald-400';

        return (
          <div key={idx} className="flex mb-1 md:mb-1.5">
            <span className="text-white/5 w-8 md:w-14 shrink-0 select-none text-[8px] md:text-xs">
              {(idx + 1).toString().padStart(2, '0')}
            </span>
            <span className={colorClass}>
              {line}
            </span>
          </div>
        );
      })}
      <motion.span 
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.6 }}
        className="inline-block w-2 md:w-3 h-4 md:h-6 bg-[#0066FF] ml-1 align-middle shadow-[0_0_10px_#0066FF]" 
      />
    </div>
  );
});

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = window.innerWidth < 768 ? 40 : 100;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.fillStyle = `rgba(0, 102, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

const LaptopIntro: React.FC<LaptopIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLDivElement>(null);
  
  const [typingCode, setTypingCode] = useState('');
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [showSlogan, setShowSlogan] = useState(false);
  
  const fullCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    .hero { display: flex; color: #0066FF; }
  </style>
</head>
<body>
  <script>
    const engine = new AI.Core({
      speed: 'ultra',
      mode: 'premium'
    });
    engine.init();
    console.log('SYSTEM_READY');
  </script>
</body>
</html>
  `.trim();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobile = width < 768;
      setIsMobile(mobile);
      
      const laptopWidth = Math.min(width * 0.9, 700);
      const laptopHeight = laptopWidth * (10 / 16);
      const totalHeightNeeded = laptopHeight * 1.8; 
      const scaleW = (width * 0.9) / laptopWidth;
      const scaleH = (height * 0.8) / totalHeightNeeded;
      
      setScale(Math.min(scaleW, scaleH, 1));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !laptopRef.current || !lidRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Wait for slogan animation before finishing
        setTimeout(onComplete, 2200);
      }
    });

    // 1. Initial State
    gsap.set(laptopRef.current, { 
      rotateX: 0, 
      rotateY: 0, 
      z: -200, 
      opacity: 0,
      scale: 0.8,
      willChange: 'transform, opacity'
    });
    
    gsap.set(lidRef.current, { 
      rotateX: -95,
      transformOrigin: "bottom center",
      willChange: 'transform'
    }); 

    // 2. Animation Sequence (Total ~5.5s)
    tl.to(laptopRef.current, {
      opacity: 1,
      z: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(lidRef.current, {
      rotateX: 0,
      duration: 1,
      ease: "power3.inOut"
    }, "-=0.1")
    .to({}, {
      duration: 1.8,
      onStart: () => {
        let i = 0;
        const step = isMobile ? 12 : 8; 
        const interval = setInterval(() => {
          setTypingCode(fullCode.slice(0, i));
          i += step;
          if (i > fullCode.length + step) {
            clearInterval(interval);
            setTypingCode(fullCode);
            gsap.to(codeContainerRef.current, {
              y: isMobile ? -50 : -80,
              duration: 3,
              ease: "none"
            });
          }
        }, 15);
      }
    })
    .to(laptopRef.current, {
      z: isMobile ? 1800 : 2500,
      scale: isMobile ? 15 : 12,
      duration: 1.2,
      ease: "power4.in",
      onStart: () => {
        setTimeout(() => setShowSlogan(true), 400);
      }
    })
    .to([baseRef.current], {
      opacity: 0,
      duration: 0.4,
    }, "-=0.8");

    return () => {
      tl.kill();
    };
  }, [onComplete, isMobile]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[1000] bg-[#050505] flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <ParticlesBackground />
      
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,102,255,0.08)_0%,_transparent_70%)]" />

      {/* Slogan Overlay */}
      <AnimatePresence>
        {showSlogan && (
          <motion.div 
            ref={sloganRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[1100] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm px-6 text-center"
          >
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-4"
            >
              FASTN<span className="text-[#0066FF] drop-shadow-[0_0_15px_rgba(0,102,255,0.5)]">CODE</span>
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="text-lg md:text-2xl font-light text-white/60 tracking-widest uppercase"
            >
              Web Solutions That Grow Your Business
            </motion.p>
            
            {/* Kinetic Typography Accent */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: "circInOut" }}
              className="w-24 h-1 bg-[#0066FF] mt-8 rounded-full shadow-[0_0_20px_#0066FF]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Laptop 3D Wrapper */}
      <div 
        ref={laptopRef}
        className="relative w-[85vw] max-w-[700px] aspect-[16/10]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `scale(${scale})`
        }}
      >
        {/* Laptop Base */}
        <div 
          ref={baseRef}
          className="absolute inset-0 bg-[#121212] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] md:shadow-[0_50px_100px_rgba(0,0,0,0.9)] border-b-2 md:border-b-4 border-[#080808]"
          style={{ 
            transform: 'translateY(100%) rotateX(0deg)', 
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="absolute inset-x-8 md:inset-x-12 top-6 md:top-10 bottom-16 md:bottom-24 bg-[#050505] rounded-lg opacity-80 md:opacity-90" />
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-32 md:w-48 h-16 md:h-24 bg-[#1a1a1a] rounded-md opacity-30 md:opacity-40" />
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
          <div className="absolute inset-0 bg-[#0a0a0a] rounded-xl border border-white/5 shadow-xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 md:w-24 h-16 md:h-24 rounded-full bg-[#111] flex items-center justify-center border border-white/5">
              <div className="w-8 md:w-12 h-8 md:h-12 bg-[#0066FF] rounded-full blur-lg md:blur-xl animate-pulse opacity-30 md:opacity-40" />
              <div className="absolute w-6 md:w-8 h-6 md:w-8 bg-[#0066FF] rounded-full shadow-[0_0_15px_rgba(0,102,255,0.4)] md:shadow-[0_0_20px_rgba(0,102,255,0.5)]" />
            </div>
          </div>

          {/* Screen Display */}
          <div 
            className="absolute inset-1 md:inset-1.5 bg-[#010101] rounded-lg overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,102,255,0.1)] md:shadow-[0_0_60px_rgba(0,102,255,0.15)]"
            style={{ transform: 'translateZ(1px)' }}
          >
            <div className="w-full h-full p-6 md:p-14 font-mono text-[10px] md:text-sm overflow-hidden relative">
              {/* Window Controls */}
              <div className="flex gap-2 md:gap-3 mb-6 md:mb-12">
                <div className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 md:w-3.5 h-2.5 md:h-3.5 rounded-full bg-[#27c93f]" />
                <div className="ml-4 md:ml-8 text-white/20 md:text-white/30 text-[8px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold">Elite_Engine_v5.0</div>
              </div>

              {/* Code Content */}
              <div 
                ref={codeContainerRef}
                className="overflow-hidden h-full"
              >
                <CodeTerminal code={typingCode} isMobile={isMobile} />
              </div>

              {/* Screen Glow Overlay - Simplified */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#0066FF]/10 via-transparent to-white/5 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Vignette - Lighter on mobile */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] md:shadow-[inset_0_0_300px_rgba(0,0,0,1)]" />
    </div>
  );
};

export default LaptopIntro;
