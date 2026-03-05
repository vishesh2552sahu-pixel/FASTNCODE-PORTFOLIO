import React from 'react';
import { motion } from 'framer-motion';

const Mockup: React.FC = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto perspective-1000">
      <motion.div
        initial={{ opacity: 0, rotateY: -20, rotateX: 10, y: 50 }}
        animate={{ 
          opacity: 1, 
          rotateY: -15, 
          rotateX: 5, 
          y: 0,
          transition: { duration: 1.5, ease: "easeOut" }
        }}
        whileHover={{ 
          rotateY: -10, 
          rotateX: 0, 
          scale: 1.02,
          transition: { duration: 0.5 }
        }}
        className="relative z-10"
      >
        {/* Floating Animation */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative"
        >
          {/* Laptop Body */}
          <div className="relative bg-zinc-900 rounded-2xl p-2 shadow-2xl border border-white/10 overflow-hidden">
            {/* Screen Content */}
            <div className="aspect-video bg-brand-obsidian rounded-lg overflow-hidden relative border border-white/5">
              {/* Fake UI */}
              <div className="absolute inset-0 p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <div className="w-24 h-2 rounded-full bg-white/5" />
                </div>
                
                <div className="grid grid-cols-12 gap-4 flex-1">
                  <div className="col-span-4 flex flex-col gap-3">
                    <div className="w-full h-4 rounded bg-brand-blue/20" />
                    <div className="w-3/4 h-2 rounded bg-white/10" />
                    <div className="w-1/2 h-2 rounded bg-white/10" />
                    <div className="mt-auto w-full h-12 rounded-lg bg-white/5 border border-white/10" />
                  </div>
                  <div className="col-span-8 bg-white/5 rounded-xl border border-white/10 p-4 flex flex-col gap-4">
                    <div className="w-full h-32 rounded-lg bg-gradient-to-br from-brand-blue/20 to-transparent" />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-16 rounded bg-white/5" />
                      <div className="h-16 rounded bg-white/5" />
                      <div className="h-16 rounded bg-white/5" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-20 bg-brand-blue/20 blur-[100px] pointer-events-none" />
            </div>
          </div>
          
          {/* Laptop Base Shadow */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-brand-blue/20 blur-3xl rounded-full" />
        </motion.div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[150px] rounded-full" />
      </div>
    </div>
  );
};

export default Mockup;
