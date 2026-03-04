
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Mesh = 'mesh' as any;
const PlaneGeometry = 'planeGeometry' as any;
const ShaderMaterial = 'shaderMaterial' as any;

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uIntensity;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.15;
    
    // Core noise for liquid texture
    float n = noise(uv * 1.5 + time + uScroll * 0.5);
    n += noise(uv * 3.0 - time * 0.3) * 0.4;
    
    // Obsidian base - extremely dark
    vec3 baseColor = vec3(0.002, 0.002, 0.004); 
    
    // Subtle brand highlights
    vec3 accentColor = vec3(0.0, 0.25, 1.0); // Electric Blue
    
    // Anti-Camouflage logic: Highlight only appears as a horizon glow or reaction
    float horizonGlow = smoothstep(0.0, 0.5, uv.y) * 0.05; // Faint bottom glow
    float reaction = smoothstep(0.4, 1.0, n) * (0.08 + uIntensity * 0.1);
    
    // Distance-based mouse glow (subtle)
    float mouseGlow = 0.01 / (distance(uv, uMouse) + 0.3);
    
    vec3 color = baseColor;
    color += accentColor * reaction;
    color += accentColor * horizonGlow;
    color += accentColor * mouseGlow * 0.2;
    
    // Vignette to darken edges even more
    float vignette = 1.0 - distance(uv, vec2(0.5)) * 1.2;
    color *= smoothstep(0.0, 0.8, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const InteractivePlane = () => {
  // Use any for Mesh ref
  const meshRef = useRef<any>(null!);
  const { viewport } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMob = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsMobile(isMob);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: new (THREE as any).Vector2(0.5, 0.5) },
    uIntensity: { value: 0 }
  }), []);

  useFrame((state) => {
    const { clock, mouse } = state;
    const time = clock.getElapsedTime();
    uniforms.uTime.value = time;
    
    const targetScroll = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
    uniforms.uScroll.value = (THREE as any).MathUtils.lerp(uniforms.uScroll.value, targetScroll, 0.05);

    if (!isMobile) {
      // Dynamic mouse follow
      const targetMouseX = (mouse.x + 1) / 2;
      const targetMouseY = (mouse.y + 1) / 2;
      uniforms.uMouse.value.x = (THREE as any).MathUtils.lerp(uniforms.uMouse.value.x, targetMouseX, 0.05);
      uniforms.uMouse.value.y = (THREE as any).MathUtils.lerp(uniforms.uMouse.value.y, targetMouseY, 0.05);
    } else {
      // Passive drift on mobile to save listeners
      uniforms.uMouse.value.x = 0.5 + Math.sin(time * 0.5) * 0.2;
      uniforms.uMouse.value.y = 0.5 + Math.cos(time * 0.3) * 0.2;
    }

    const scrollVelocity = Math.abs(uniforms.uScroll.value - targetScroll);
    uniforms.uIntensity.value = (THREE as any).MathUtils.lerp(uniforms.uIntensity.value, scrollVelocity * 50, 0.1);
  });

  return (
    <Mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <PlaneGeometry args={[1, 1, 16, 16]} />
      <ShaderMaterial 
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
      />
    </Mesh>
  );
};

const BackgroundCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 1] }} 
        dpr={[1, 1.5]} // Performance optimized dpr
        gl={{ antialias: false, stencil: false, depth: false }}
      >
        <InteractivePlane />
      </Canvas>
    </div>
  );
};

export default BackgroundCanvas;
