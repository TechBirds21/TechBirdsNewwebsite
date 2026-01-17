import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Mobile Apps 3D Scene
export const MobileAppsScene = () => {
  const phone1Ref = useRef<THREE.Mesh>(null);
  const phone2Ref = useRef<THREE.Mesh>(null);
  const phone3Ref = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (phone1Ref.current) {
      phone1Ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    }
    if (phone2Ref.current) {
      phone2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2 + 1) * 0.3;
    }
    if (phone3Ref.current) {
      phone3Ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.8 + 2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Phone 1 - iOS style */}
      <group ref={phone1Ref} position={[-2, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.3, 0.6, 0.05]} />
          <meshStandardMaterial
            color="#000000"
            metalness={0.9}
            roughness={0.1}
            emissive="#1a1a1a"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[0.25, 0.55]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Phone 2 - Android style */}
      <group ref={phone2Ref} position={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.3, 0.6, 0.05]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[0.25, 0.55]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Phone 3 - Tablet */}
      <group ref={phone3Ref} position={[2, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.7, 0.05]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[0.45, 0.65]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </group>
  );
};

// CRM 3D Scene
export const CRMScene = () => {
  const dbRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (dbRef.current) {
      dbRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (nodesRef.current) {
      nodesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      {/* Central Database */}
      <group ref={dbRef} position={[0, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 1, 16]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.95}
            roughness={0.05}
            emissive="#1e40af"
            emissiveIntensity={0.6}
          />
        </mesh>
        {/* Data rings */}
        {[0.3, 0, -0.3].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <torusGeometry args={[0.55, 0.03, 8, 16]} />
            <meshStandardMaterial
              color="#00f2ff"
              emissive="#00f2ff"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* CRM Nodes - Customer data points */}
      <group ref={nodesRef}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 2, Math.sin(angle) * 0.5, Math.sin(angle) * 1]}>
              <octahedronGeometry args={[0.2, 0]} />
              <meshStandardMaterial
                color="#06b6d4"
                emissive="#06b6d4"
                emissiveIntensity={0.6}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          );
        })}
      </group>

      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={6}
            array={new Float32Array([
              0, 0, 0, Math.cos(0) * 2, Math.sin(0) * 0.5, Math.sin(0) * 1,
              0, 0, 0, Math.cos(Math.PI / 3) * 2, Math.sin(Math.PI / 3) * 0.5, Math.sin(Math.PI / 3) * 1,
              0, 0, 0, Math.cos(Math.PI * 2 / 3) * 2, Math.sin(Math.PI * 2 / 3) * 0.5, Math.sin(Math.PI * 2 / 3) * 1,
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00f2ff" transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
};

// E-Commerce 3D Scene
export const ECommerceScene = () => {
  const cartRef = useRef<THREE.Group>(null);
  const productsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cartRef.current) {
      cartRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      cartRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
    if (productsRef.current) {
      productsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group>
      {/* Shopping Cart */}
      <group ref={cartRef} position={[0, 0, 0]}>
        {/* Cart base */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.6, 0.1, 0.4]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.9}
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.4}
          />
        </mesh>
        {/* Cart handle */}
        <mesh position={[0, 0.1, -0.2]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Products floating around */}
      <group ref={productsRef}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.5, Math.sin(angle * 2) * 0.3, Math.sin(angle) * 0.5]}
            >
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial
                color={['#ec4899', '#8b5cf6', '#06b6d4', '#10b981'][i]}
                emissive={['#ec4899', '#8b5cf6', '#06b6d4', '#10b981'][i]}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          );
        })}
      </group>

      {/* Payment/Transaction indicator */}
      <mesh position={[0, 1, 0]}>
        <ringGeometry args={[0.3, 0.4, 16]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// ERP Systems 3D Scene
export const ERPScene = () => {
  const modulesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modulesRef.current) {
      modulesRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <group>
      {/* Central ERP Hub */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.95}
          roughness={0.05}
          emissive="#1e40af"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* ERP Modules */}
      <group ref={modulesRef}>
        {[
          { pos: [1.5, 0, 0], color: '#06b6d4', label: 'Inventory' },
          { pos: [-1.5, 0, 0], color: '#8b5cf6', label: 'Accounting' },
          { pos: [0, 1.5, 0], color: '#10b981', label: 'HR' },
          { pos: [0, -1.5, 0], color: '#f59e0b', label: 'Sales' },
        ].map((module, i) => (
          <group key={i} position={module.pos}>
            <mesh>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial
                color={module.color}
                emissive={module.color}
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            {/* Connection line */}
            <lineSegments>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    0, 0, 0,
                    -module.pos[0] * 0.7, -module.pos[1] * 0.7, -module.pos[2] * 0.7,
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={module.color} transparent opacity={0.3} />
            </lineSegments>
          </group>
        ))}
      </group>
    </group>
  );
};

// Custom Apps 3D Scene
export const CustomAppsScene = () => {
  const appsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (appsRef.current) {
      appsRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group>
      {/* Code blocks floating */}
      <group ref={appsRef}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 1.5;
          return (
            <group
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(i) * 0.5,
                Math.sin(angle) * radius,
              ]}
            >
              {/* Code block */}
              <mesh>
                <boxGeometry args={[0.3, 0.4, 0.1]} />
                <meshStandardMaterial
                  color="#3b82f6"
                  emissive="#3b82f6"
                  emissiveIntensity={0.4}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
              {/* Code lines */}
              {[0, 0.1, -0.1].map((y, j) => (
                <mesh key={j} position={[0, y, 0.06]}>
                  <boxGeometry args={[0.25, 0.02, 0.01]} />
                  <meshStandardMaterial
                    color="#00f2ff"
                    emissive="#00f2ff"
                    emissiveIntensity={0.6}
                  />
                </mesh>
              ))}
            </group>
          );
        })}
      </group>
    </group>
  );
};
