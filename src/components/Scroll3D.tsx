import { useRef } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Object that responds to scroll
const Scroll3DObject = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      // Rotate based on scroll
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2;
      groupRef.current.rotation.x = scrollProgress * Math.PI * 0.5;
      
      // Pulse animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.8}
          roughness={0.2}
          emissive="#1e40af"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

// Wrapper Component
const Scroll3D = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const scrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rotateY = useTransform(scrollProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 3]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Scroll3DObject scrollProgress={scrollProgress.get()} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        style={{ scale }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Scroll3D;
