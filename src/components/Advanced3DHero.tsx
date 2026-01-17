import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Sphere, 
  PerspectiveCamera, 
  Environment, 
  OrbitControls 
} from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useService } from '../contexts/ServiceContext';
import { MobileAppsScene, CRMScene, ECommerceScene, ERPScene, CustomAppsScene } from './Service3DScenes';

// Mouse position hook
const useMouse = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return mouse;
};

// Premium Central Hub
const PremiumHub = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.08;
      meshRef.current.rotation.x += mouse.y * 0.03;
      meshRef.current.rotation.y += mouse.x * 0.03;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = -state.clock.elapsedTime * 0.2;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.2}>
        <Sphere ref={meshRef} args={[1.8, 64, 64]}>
          <MeshDistortMaterial 
            color="#4f46e5" 
            distort={0.3} 
            speed={1.5}
            metalness={0.98}
            roughness={0.02}
            emissive="#3730a3"
            emissiveIntensity={0.4}
            transparent
            opacity={0.92}
          />
        </Sphere>
      </Float>
      <mesh ref={glowRef}>
        <torusGeometry args={[2.2, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#00f2ff"
          emissive="#00f2ff"
          emissiveIntensity={1.2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};

// Elegant particles
const ElegantParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0003;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });
  
  const particlesCount = 200;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 25;
    positions[i + 1] = (Math.random() - 0.5) * 25;
    positions[i + 2] = (Math.random() - 0.5) * 25;
    
    const color = new THREE.Color();
    const hue = Math.random() * 0.2 + 0.5;
    color.setHSL(hue, 0.8, 0.6);
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08}
        vertexColors
        transparent 
        opacity={0.5}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Service Transition Wrapper
const ServiceTransition = ({ children, serviceKey }: { children: React.ReactNode; serviceKey: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    setScale(0.8);
    const timer = setTimeout(() => {
      setScale(1);
    }, 100);
    return () => clearTimeout(timer);
  }, [serviceKey]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
};

// Main 3D Scene
const Scene3D = ({ 
  mouse,
  currentService 
}: { 
  mouse: { x: number; y: number };
  currentService?: string;
}) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const normalizedService = currentService?.trim().toLowerCase() || '';

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.x += (mouse.x * 0.4 - cameraRef.current.position.x) * 0.03;
      cameraRef.current.position.y += (mouse.y * 0.25 - cameraRef.current.position.y) * 0.03;
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  const getServiceColor = () => {
    if (normalizedService.includes('mobile apps')) return '#3b82f6';
    if (normalizedService.includes('custom crm')) return '#8b5cf6';
    if (normalizedService.includes('e-commerce')) return '#f59e0b';
    if (normalizedService.includes('erp systems')) return '#10b981';
    return '#4f46e5';
  };

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 6]} fov={60} />
      <color attach="background" args={['#0a0a0f']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color={getServiceColor()} />
      <pointLight position={[-10, -10, -10]} intensity={0.7} color="#00f2ff" />
      <pointLight position={[0, 10, -5]} intensity={0.6} color="#06b6d4" />
      <Environment preset="studio" />
      
      {/* Service-Specific 3D Scenes - Show based on current service */}
      {normalizedService.includes('mobile apps') ? (
        <ServiceTransition serviceKey="mobile">
          <MobileAppsScene />
        </ServiceTransition>
      ) : normalizedService.includes('custom crm') ? (
        <ServiceTransition serviceKey="crm">
          <CRMScene />
        </ServiceTransition>
      ) : normalizedService.includes('e-commerce') ? (
        <ServiceTransition serviceKey="ecommerce">
          <ECommerceScene />
        </ServiceTransition>
      ) : normalizedService.includes('erp systems') ? (
        <ServiceTransition serviceKey="erp">
          <ERPScene />
        </ServiceTransition>
      ) : (
        <ServiceTransition serviceKey="default">
          <PremiumHub mouse={mouse} />
        </ServiceTransition>
      )}
      
      <ElegantParticles />
    </>
  );
};

// Animated Word Component
const AnimatedWord = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -20, rotateX: 90 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{ 
        display: 'inline-block',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: delay + i * 0.03,
            duration: 0.3
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Advanced3DHero = () => {
  const mouse = useMouse();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  const { currentService, setCurrentService } = useService();
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["ERP Systems.", "E-Commerce.", "Mobile Apps.", "Custom CRM."];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [words.length]);

  useEffect(() => {
    const serviceName = words[currentWordIndex].replace('.', '').trim();
    console.log('Advanced3DHero - Setting service:', serviceName, 'from index:', currentWordIndex);
    setCurrentService(serviceName);
  }, [currentWordIndex, setCurrentService]);

  useEffect(() => {
    const initialService = words[0].replace('.', '').trim();
    console.log('Advanced3DHero - Setting initial service:', initialService);
    setCurrentService(initialService);
  }, [setCurrentService]);

  // Get service color for gradient
  const getServiceGradient = () => {
    if (currentService?.includes('Mobile Apps')) return 'from-blue-400 via-cyan-400 to-blue-500';
    if (currentService?.includes('Custom CRM')) return 'from-purple-400 via-pink-400 to-purple-500';
    if (currentService?.includes('E-Commerce')) return 'from-amber-400 via-orange-400 to-amber-500';
    if (currentService?.includes('ERP Systems')) return 'from-emerald-400 via-teal-400 to-emerald-500';
    return 'from-blue-400 via-cyan-400 to-blue-500';
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <Scene3D mouse={mouse} currentService={currentService} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.4}
          />
        </Canvas>
      </div>

      {/* Dynamic gradient overlay based on service */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${
            currentService?.includes('Mobile Apps') ? 'rgba(59, 130, 246, 0.2)' : 
            currentService?.includes('Custom CRM') ? 'rgba(139, 92, 246, 0.2)' : 
            currentService?.includes('E-Commerce') ? 'rgba(245, 158, 11, 0.2)' : 
            currentService?.includes('ERP Systems') ? 'rgba(16, 185, 129, 0.2)' : 
            'rgba(79, 70, 229, 0.2)'
          } 0%, transparent 70%)`,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Content Overlay - Below nav bar */}
      <motion.div 
        style={{ opacity, scale }}
        className="absolute inset-0 z-[10] flex flex-col items-center justify-center px-4 sm:px-6 text-center"
      >
        <div className="max-w-6xl mx-auto w-full pt-24 lg:pt-28 pb-12">
          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[1.1]"
            style={{ perspective: '1000px' }}
          >
            <div className="mb-3">
              <span className={`bg-gradient-to-r ${getServiceGradient()} bg-clip-text text-transparent drop-shadow-2xl`}>
                Own your software
              </span>
            </div>
            <div className="mb-5">
              <span className="text-white font-bold">not just another subscription.</span>
            </div>
            
            {/* Rotating Service Text */}
            <div className="min-h-[1.2em] overflow-visible relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWordIndex}
                  className="text-white font-black"
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -30, rotateX: 90 }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    display: 'inline-block'
                  }}
                >
                  <AnimatedWord text={words[currentWordIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-10 max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-white/80 font-medium leading-relaxed"
          >
            Stop paying subscriptions for tools that don't fit.{' '}
            <span className="text-white font-semibold">Tech Birds builds custom software</span> for{' '}
            <span className="text-white font-semibold">clinics, retailers, and property businesses</span>.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <MagneticButton strength={0.3} to="/contact" as="div">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-slate-950 hover:bg-blue-50 text-lg font-black rounded-2xl shadow-2xl transition-all duration-300 flex items-center gap-3"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  <span>Book free demo</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.button>
            </MagneticButton>
            
            <MagneticButton strength={0.3} to="/projects" as="div">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white text-lg font-black rounded-2xl transition-all duration-300 flex items-center gap-3"
              >
                <Link to="/projects" className="flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  <span>See how it works</span>
                </Link>
              </motion.button>
            </MagneticButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/70 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>No subscriptions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Fully managed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Low maintenance</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Advanced3DHero;
