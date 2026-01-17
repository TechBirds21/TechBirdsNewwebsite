import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Advanced Particle System
const ParticleSystem = ({ count = 1000 }: { count?: number }) => {
  const meshRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
      // Random positions in a sphere
      const radius = Math.random() * 10 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
      
      // Random velocities
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    particlesRef.current = positions;
    velocitiesRef.current = velocities;
    
    // Initialize geometry
    if (meshRef.current?.geometry) {
      const geometry = meshRef.current.geometry;
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [count]);

  useFrame((state) => {
    if (meshRef.current && particlesRef.current && velocitiesRef.current) {
      const positions = particlesRef.current;
      const velocities = velocitiesRef.current;
      
      // Update particle positions
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Boundary check and wrap
        const radius = Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2);
        if (radius > 15) {
          const scale = 5 / radius;
          positions[i] *= scale;
          positions[i + 1] *= scale;
          positions[i + 2] *= scale;
        }
      }
      
      // Update geometry
      const geometry = meshRef.current.geometry;
      if (geometry) {
        const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
        if (positionAttribute && particlesRef.current) {
          positionAttribute.array = particlesRef.current;
          positionAttribute.needsUpdate = true;
        }
      }
      
      // Rotate entire system
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        {particlesRef.current && (
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particlesRef.current}
            itemSize={3}
          />
        )}
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Wrapper Component
const WebGLParticles = ({ className = '', count = 1000 }: { className?: string; count?: number }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ParticleSystem count={count} />
      </Canvas>
    </div>
  );
};

export default WebGLParticles;
