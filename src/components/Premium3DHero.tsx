import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, Sphere, Box, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useService } from '../contexts/ServiceContext';
import { MobileAppsScene, CRMScene, ECommerceScene, ERPScene, CustomAppsScene } from './Service3DScenes';

// Central Glowing Platform
const CentralPlatform = () => {
  const platformRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (platformRef.current) {
      platformRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = -state.clock.elapsedTime * 0.15;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Main Platform - Glowing Orb */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh ref={platformRef}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.9}
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* Outer Glow Ring */}
      <mesh ref={glowRef}>
        <torusGeometry args={[1.8, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#00f2ff"
          emissive="#00f2ff"
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner Glow Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.5, 64]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Floating App Block - Represents different software modules
const AppBlock = ({ 
  position, 
  color, 
  delay = 0,
  label 
}: { 
  position: [number, number, number]; 
  color: string; 
  delay?: number;
  label?: string;
}) => {
  const blockRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3 + delay;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + delay) * 0.3;
    }
    if (blockRef.current) {
      blockRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.2;
      blockRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.6 + delay) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <group ref={groupRef} position={position}>
        <mesh ref={blockRef}>
          <boxGeometry args={[0.4, 0.5, 0.3]} />
          <meshStandardMaterial
            color={color}
            metalness={0.95}
            roughness={0.05}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[0.35, 0.45]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Subtle Particles
const SubtleParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useRef(new Float32Array(count * 3));
  useEffect(() => {
    for (let i = 0; i < count * 3; i += 3) {
      positions.current[i] = (Math.random() - 0.5) * 15;
      positions.current[i + 1] = (Math.random() - 0.5) * 15;
      positions.current[i + 2] = (Math.random() - 0.5) * 15;
    }
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#3b82f6"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main 3D Scene - Changes based on service
const Hero3DScene = ({ currentService }: { currentService?: string }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const normalizedService = currentService?.trim().toLowerCase() || '';

  useFrame((state) => {
    if (cameraRef.current) {
      // Smooth camera motion
      const time = state.clock.elapsedTime;
      cameraRef.current.position.x = Math.sin(time * 0.1) * 0.5;
      cameraRef.current.position.y = Math.cos(time * 0.15) * 0.3;
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 8]} fov={75} />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#00f2ff" />
      <pointLight position={[0, 5, -5]} intensity={0.5} color="#06b6d4" />

      {/* Service-Specific 3D Scenes */}
      {normalizedService.includes('mobile apps') && <MobileAppsScene />}
      {normalizedService.includes('custom crm') && <CRMScene />}
      {normalizedService.includes('e-commerce') && <ECommerceScene />}
      {normalizedService.includes('erp systems') && <ERPScene />}
      
      {/* Default: Central Platform with App Blocks (when no specific service) */}
      {(!normalizedService || (!normalizedService.includes('mobile apps') && !normalizedService.includes('custom crm') && !normalizedService.includes('e-commerce') && !normalizedService.includes('erp systems'))) && (
        <>
          <CentralPlatform />
          <AppBlock position={[2.5, 1.5, 0]} color="#3b82f6" delay={0} label="CRM" />
          <AppBlock position={[-2.5, 1.5, 0]} color="#06b6d4" delay={1} label="ERP" />
          <AppBlock position={[0, -2, 1]} color="#8b5cf6" delay={2} label="E-Commerce" />
          <AppBlock position={[2, -1, -1.5]} color="#10b981" delay={1.5} label="Mobile" />
          <AppBlock position={[-2, -1, -1.5]} color="#f59e0b" delay={0.5} label="Analytics" />
          <AppBlock position={[0, 2.5, -1]} color="#ec4899" delay={2.5} label="Reports" />
        </>
      )}

      <SubtleParticles />
      <Environment preset="city" />
    </>
  );
};

// Premium 3D Hero Component
const Premium3DHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  const { currentService } = useService();

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <Hero3DScene currentService={currentService} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80" />

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[1.1]"
          >
            Own your software,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              not just another subscription.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 font-medium max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Tech Birds builds and manages custom software platforms for{' '}
            <span className="text-white font-semibold">clinics, retailers, and property businesses</span>
            {' '}— so you stop depending on many third‑party tools.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticButton 
              strength={0.3}
              to="/contact"
              as="div"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white text-slate-950 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-2xl hover:bg-blue-50 transition-all duration-300 cursor-pointer"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  <span>Book a free demo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </MagneticButton>

            <MagneticButton 
              strength={0.3}
              to="/projects"
              as="div"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/10 backdrop-blur-xl text-white border-2 border-white/30 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 hover:bg-white/20 hover:border-white/50 transition-all duration-300 cursor-pointer"
              >
                <Link to="/projects" className="flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  <span>See how it works</span>
                </Link>
              </motion.div>
            </MagneticButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>No subscriptions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Fully managed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Low maintenance</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Premium3DHero;
