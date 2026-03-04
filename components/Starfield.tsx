import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Points = 'points' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const PointsMaterial = 'pointsMaterial' as any;

const StarFieldContent = ({ isMobile }: { isMobile: boolean }) => {
  const pointsRef = useRef<any>(null!);
  const velocity = useRef(0);
  const lastScroll = useRef(0);
  const touchStart = useRef(0);
  const manualTouchVelocity = useRef(0);

  const count = isMobile ? 800 : 4500;

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0].clientY;
      const delta = Math.abs(touch - touchStart.current);
      manualTouchVelocity.current = Math.max(manualTouchVelocity.current, delta * 0.15);
      touchStart.current = touch;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 15 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.sin(theta) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 600;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const { mouse } = state;
    const currentScroll = window.scrollY || window.pageYOffset;
    const scrollDelta = Math.abs(currentScroll - lastScroll.current);
    lastScroll.current = currentScroll;

    const rawVelocity = (scrollDelta * 0.1) + manualTouchVelocity.current;
    velocity.current = THREE.MathUtils.lerp(velocity.current, rawVelocity, 0.08);
    manualTouchVelocity.current = THREE.MathUtils.lerp(manualTouchVelocity.current, 0, 0.08);

    const baseSpeed = isMobile ? 0.15 : 0.35;
    const currentSpeed = baseSpeed + (velocity.current * 3.5);
    
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const posArray = posAttr.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 2] += currentSpeed;
        if (posArray[i * 3 + 2] > 300) {
          posArray[i * 3 + 2] = -300;
        }
      }
      posAttr.needsUpdate = true;

      const material = pointsRef.current.material as any;
      const targetSize = isMobile ? 0.25 : (0.55 + velocity.current * 0.5);
      material.size = THREE.MathUtils.lerp(material.size, targetSize, 0.1);
      
      const targetRotX = isMobile ? mouse.y * 0.01 : mouse.y * 0.1;
      const targetRotY = isMobile ? mouse.x * 0.01 : mouse.x * 0.1;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotX, 0.05);
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotY, 0.05);
      
      pointsRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <Points key={count} ref={pointsRef}>
      <BufferGeometry>
        <BufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </BufferGeometry>
      <PointsMaterial
        size={0.4}
        color={new THREE.Color("#ffffff")}
        transparent
        opacity={isMobile ? 0.3 : 0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Points>
  );
};

const Starfield: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none touch-none h-full overflow-hidden">
      <Canvas 
        camera={{ 
          position: [0, 0, 100], 
          fov: isMobile ? 80 : 55, 
          near: 0.1, 
          far: 1000 
        }}
        dpr={isMobile ? 1 : [1, 2]}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: true 
        }}
      >
        <StarFieldContent isMobile={isMobile} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />
    </div>
  );
};

export default Starfield;