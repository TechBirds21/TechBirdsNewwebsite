import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';
import { MobileAppsScene, CRMScene, ECommerceScene, ERPScene, CustomAppsScene } from './Service3DScenes';
import { useService } from '../contexts/ServiceContext';

// Main 3D Scene Component
const Scene3D = ({ 
  mousePosition, 
  scrollProgress,
  currentService 
}: { 
  mousePosition: { x: number; y: number }; 
  scrollProgress: number;
  currentService?: string;
}) => {
  // Normalize service name for matching
  const normalizedService = currentService?.trim().toLowerCase() || '';
  
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#00f2ff" />
      <pointLight position={[0, 10, -5]} intensity={0.5} color="#06b6d4" />
      
      {/* Dynamic Service-Specific 3D Scene - Show only when service matches */}
      {normalizedService.includes('mobile apps') && <MobileAppsScene />}
      {normalizedService.includes('custom crm') && <CRMScene />}
      {normalizedService.includes('e-commerce') && <ECommerceScene />}
      {normalizedService.includes('erp systems') && <ERPScene />}
      {normalizedService && !normalizedService.includes('mobile apps') && !normalizedService.includes('custom crm') && !normalizedService.includes('e-commerce') && !normalizedService.includes('erp systems') && <CustomAppsScene />}
      
      <Environment preset="city" />
    </>
  );
};

// Global 3D Scene Wrapper - Persists across routes
const Global3DScene = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const { currentService } = useService();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // IT Development colors per route
  const getRouteColor = () => {
    const colors: Record<string, string> = {
      '/services': '#3b82f6', // Code Blue
      '/projects': '#00f2ff', // API Cyan
      '/about': '#06b6d4', // Database Blue
      '/contact': '#8b5cf6', // Cloud Purple
      '/careers': '#10b981', // DevOps Green
      '/industries': '#f59e0b', // Infrastructure Amber
    };
    return colors[location.pathname] || '#3b82f6';
  };

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <Scene3D 
          mousePosition={mousePosition} 
          scrollProgress={scrollProgress}
          currentService={currentService || ''}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
      
      {/* Dynamic gradient overlay based on route */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${getRouteColor()}60 0%, transparent 70%)`,
          transition: 'background 0.5s ease'
        }}
      />
    </div>
  );
};

export default Global3DScene;
