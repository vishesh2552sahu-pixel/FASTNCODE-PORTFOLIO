
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

// Use local constants to bypass JSX.IntrinsicElements type checking errors for R3F elements
const Points = 'points' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const PointsMaterial = 'pointsMaterial' as any;

const Particles = ({ isMobile }: { isMobile: boolean }) => {
  // Use any to bypass missing member error
  const points = useRef<any>(null!);
  const { scrollYProgress } = useScroll();

  const count = isMobile ? 800 : 2500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scroll = scrollYProgress.get();
    
    points.current.rotation.y = time * 0.03 + scroll * 1.5;
    points.current.rotation.x = time * 0.01;
    
    // Smooth mouse parallax - Use (THREE as any) for MathUtils
    points.current.position.x = (THREE as any).MathUtils.lerp(points.current.position.x, state.mouse.x * -2, 0.05);
    points.current.position.y = (THREE as any).MathUtils.lerp(points.current.position.y, state.mouse.y * -2, 0.05);

    // Use any for material type
    const material = points.current.material as any;
    // Morph from blue to cyan/purple based on scroll depth
    const hue = (0.6 + scroll * 0.15) % 1;
    material.color.setHSL(hue, 0.8, 0.5);
  });

  return (
    <Points ref={points}>
      <BufferGeometry>
        <BufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </BufferGeometry>
      <PointsMaterial
        size={isMobile ? 0.2 : 0.15}
        color="#0066FF"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={(THREE as any).AdditiveBlending}
      />
    </Points>
  );
};

const PersistentBackground: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full opacity-40">
      <Canvas 
        camera={{ position: [0, 0, 25], fov: 60 }}
        dpr={[1, 2]} // Optimize pixel ratio
      >
        <Particles isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default PersistentBackground;
