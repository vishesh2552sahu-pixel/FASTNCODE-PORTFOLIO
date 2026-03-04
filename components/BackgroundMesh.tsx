
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Use local constants to bypass JSX.IntrinsicElements type checking errors for R3F elements
const GridHelper = 'gridHelper' as any;
const Primitive = 'primitive' as any;
const Mesh = 'mesh' as any;
const SphereGeometry = 'sphereGeometry' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;

const ArchitecturalGrid = () => {
  // Use any for GridHelper ref
  const gridRef = useRef<any>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
    
    // Slow tilt based on mouse
    gridRef.current.rotation.x = -Math.PI / 2.2 + (state.mouse.y * 0.1);
    gridRef.current.rotation.z = time * 0.05 + (state.mouse.x * 0.1);
    
    // Position shift with scroll
    gridRef.current.position.y = -20 - (scroll * 10);
  });

  return (
    <GridHelper 
      ref={gridRef}
      args={[100, 40, '#0052CC', '#000822']} 
      position={[0, -20, 0]} 
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <Primitive object={new (THREE as any).LineBasicMaterial({ transparent: true, opacity: 0.04 })} attach="material" />
    </GridHelper>
  );
};

const Blob = ({ color, position, scale, speed, index, baseOpacity }: { color: string, position: [number, number, number], scale: [number, number, number], speed: number, index: number, baseOpacity: number }) => {
  // Use any for Mesh ref
  const meshRef = useRef<any>(null!);
  const initialPos = useMemo(() => new (THREE as any).Vector3(...position), [position]);
  const lastScrollY = useRef(window.scrollY);
  const velocity = useRef(0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const currentScrollY = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight || 1;
    const scroll = currentScrollY / scrollHeight;
    
    // Detect scroll velocity
    const diff = Math.abs(currentScrollY - lastScrollY.current);
    velocity.current = (THREE as any).MathUtils.lerp(velocity.current, diff * 0.05, 0.1);
    lastScrollY.current = currentScrollY;

    // 1. Drifting movement
    const driftX = Math.sin(time * speed) * 5;
    const driftY = Math.cos(time * speed * 0.8) * 5;

    // 2. Parallax
    const scrollFactorY = (index % 2 === 0 ? 1 : -1) * 25;
    const scrollFactorX = (index % 3 === 0 ? 1 : -1) * 12;
    
    const targetY = initialPos.y + driftY - (scroll * scrollFactorY);
    const targetX = initialPos.x + driftX + (scroll * scrollFactorX);

    // 3. High-damping Liquid Mouse Follow
    const mouseX = state.mouse.x * 18;
    const mouseY = state.mouse.y * 12;
    
    meshRef.current.position.x = (THREE as any).MathUtils.lerp(meshRef.current.position.x, targetX + mouseX, 0.015);
    meshRef.current.position.y = (THREE as any).MathUtils.lerp(meshRef.current.position.y, targetY + mouseY, 0.015);

    // 4. Shape Distortion based on velocity
    const velocityWarp = 1 + (velocity.current * 0.2);
    const baseDistortion = 1 + scroll * 1.2;
    
    meshRef.current.scale.set(
      scale[0] * baseDistortion * velocityWarp,
      scale[1] * baseDistortion * (1 / (velocityWarp * 0.8)),
      scale[2]
    );

    // 5. Opacity shift
    const material = meshRef.current.material as any;
    material.opacity = baseOpacity + (Math.sin(time * speed + index) * 0.03) + (velocity.current * 0.02);
  });

  return (
    <Mesh ref={meshRef} position={position}>
      <SphereGeometry args={[1, 64, 64]} />
      <MeshBasicMaterial color={color} transparent opacity={baseOpacity} />
    </Mesh>
  );
};

const BackgroundMesh: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-brand-obsidian">
      <Canvas camera={{ position: [0, 0, 50], fov: 45 }} dpr={[1, 2]}>
        <ArchitecturalGrid />
        
        {/* Deep background contrast blue - Reduced to sit further back */}
        <Blob 
          index={1}
          color="#000822" 
          position={[35, -20, -10]} 
          scale={[35, 30, 1]} 
          speed={0.2} 
          baseOpacity={0.15}
        />

        {/* The "Obsidian" Void Blob for deep depth */}
        <Blob 
          index={3}
          color="#010101" 
          position={[0, 0, -25]} 
          scale={[60, 55, 1]} 
          speed={0.1} 
          baseOpacity={0.1}
        />

        {/* Core Brand Blue - Vivid Anchor, shifted slightly back to soften */}
        <Blob 
          index={0}
          color="#0055EE" 
          position={[-35, 25, -5]} 
          scale={[25, 25, 1]} 
          speed={0.4} 
          baseOpacity={0.35}
        />
        
        {/* Bright accent highlight - Distinct but small */}
        <Blob 
          index={2}
          color="#00D9FF" 
          position={[15, 15, -12]} 
          scale={[15, 15, 1]} 
          speed={0.5} 
          baseOpacity={0.25}
        />

        {/* Muted deep purple - Adds subtle chromatic richness */}
        <Blob 
          index={4}
          color="#0F0044" 
          position={[-40, -30, -15]} 
          scale={[25, 25, 1]} 
          speed={0.3} 
          baseOpacity={0.12}
        />

        {/* Dark Purple Blob - Balanced presence */}
        <Blob 
          index={5}
          color="#2200CC" 
          position={[-10, -25, -10]} 
          scale={[18, 18, 1]} 
          speed={0.35} 
          baseOpacity={0.15}
        />
      </Canvas>
      
      {/* Increased backdrop blur for deeper separation */}
      <div className="absolute inset-0 backdrop-blur-[140px] pointer-events-none" />
      
      {/* Refined gradient overlays to anchor the content and deepen the corners */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 via-brand-obsidian/75 to-brand-obsidian/95 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(5,5,5,0.4)_100%)] pointer-events-none" />
      
      {/* Subtle tech grid texture - even more subtle to avoid noise behind text */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
           style={{ 
             backgroundImage: 'radial-gradient(#0066FF 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }} />

      <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,1)] pointer-events-none" />
    </div>
  );
};

export default BackgroundMesh;
