
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const Mesh = 'mesh' as any;
const Group = 'group' as any;
const TorusGeometry = 'torusGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const PointLight = 'pointLight' as any;
const AmbientLight = 'ambientLight' as any;

const PortalRing = ({ isZooming }: { isZooming: boolean }) => {
  const ringRef = useRef<any>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      const s = 1 + Math.sin(t * 2) * 0.05;
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Mesh ref={ringRef}>
        <TorusGeometry args={[10, 0.05, 16, 100]} />
        <MeshStandardMaterial 
          color="#0066FF" 
          emissive="#0066FF" 
          emissiveIntensity={10} 
          toneMapped={false} 
        />
      </Mesh>
      <Mesh rotation={[0, 0, Math.PI / 4]}>
        <TorusGeometry args={[9.8, 0.02, 16, 100]} />
        <MeshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff" 
          emissiveIntensity={2} 
          transparent 
          opacity={0.3} 
        />
      </Mesh>
    </Float>
  );
};

const CameraController = ({ isZooming, onComplete }: { isZooming: boolean; onComplete: () => void }) => {
  useFrame((state) => {
    if (isZooming) {
      state.camera.position.z = (THREE as any).MathUtils.lerp(state.camera.position.z, -50, 0.04);
      if (state.camera instanceof (THREE as any).PerspectiveCamera) {
        state.camera.fov = (THREE as any).MathUtils.lerp(state.camera.fov, 140, 0.04);
        state.camera.updateProjectionMatrix();
      }
      if (state.camera.position.z < -20) {
        onComplete();
      }
    }
  });
  return null;
};

interface IntroSequenceProps {
  onFinished: () => void;
}

const IntroSequence: React.FC<IntroSequenceProps> = ({ onFinished }) => {
  const [phase, setPhase] = useState<'idle' | 'zooming' | 'completed'>('idle');
  const sloganText = "web solution that grow your bussness";

  const handleInitialize = () => {
    setPhase('zooming');
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#050505] overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 40]} fov={50} />
        <AmbientLight intensity={0.2} />
        <PointLight position={[10, 10, 10]} intensity={1} color="#0066FF" />
        
        <AnimatePresence>
          {phase !== 'completed' && (
            <Group>
              <PortalRing isZooming={phase === 'zooming'} />
            </Group>
          )}
        </AnimatePresence>

        <CameraController 
          isZooming={phase === 'zooming'} 
          onComplete={() => setPhase('completed')} 
        />
      </Canvas>

      <AnimatePresence>
        {phase === 'idle' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-6 flex flex-col items-center"
            >
              <div className="flex overflow-hidden mb-4">
                {sloganText.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.8 + (i * 0.05),
                      ease: "easeOut"
                    }}
                    className={`font-mono text-brand-blue text-[8px] md:text-[10px] uppercase font-black tracking-[0.4em] inline-block whitespace-pre ${char === ' ' ? 'w-2' : ''}`}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 1.5, delay: 1.5 }}
                className="h-[1px] bg-brand-blue/30"
              />
            </motion.div>

            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-12 font-mono text-zinc-500 text-[9px] tracking-[0.6em] uppercase font-black"
            >
              System Offline // Awaiting Command
            </motion.div>
            
            <button
              onClick={handleInitialize}
              className="group relative px-12 py-5 border border-brand-blue/30 overflow-hidden transition-all hover:border-brand-blue"
            >
              <div className="absolute inset-0 bg-brand-blue/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 font-black text-white uppercase tracking-[0.4em] text-xs">
                Initialize Protocol
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence onExitComplete={onFinished}>
        {phase === 'completed' && (
          <div className="absolute inset-0 z-50 flex pointer-events-none">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: [0.8, 0, 0.2, 1], delay: 0.2 }}
              className="absolute inset-y-0 left-0 w-1/2 bg-[#050505] border-r border-white/5 flex items-center justify-end px-12"
            >
              <div className="h-64 w-[1px] bg-brand-blue/20" />
            </motion.div>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.8, ease: [0.8, 0, 0.2, 1], delay: 0.2 }}
              className="absolute inset-y-0 right-0 w-1/2 bg-[#050505] border-l border-white/5 flex items-center justify-start px-12"
            >
              <div className="h-64 w-[1px] bg-brand-blue/20" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, times: [0, 0.5, 1] }}
              className="absolute inset-0 bg-white z-[60]"
            />
          </div>
        )}
      </AnimatePresence>

      {phase === 'zooming' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none z-20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,102,255,0.2)_100%)]" />
        </motion.div>
      )}
    </div>
  );
};

export default IntroSequence;
