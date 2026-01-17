import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface WebGLHoverEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const WebGLHoverEffect = ({
  children,
  className = '',
  intensity = 0.1
}: WebGLHoverEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create distortion effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Radial gradient for warp effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 200);
      gradient.addColorStop(0, `rgba(59, 130, 246, ${intensity})`);
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const handleMouseLeave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {children}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay"
      />
    </motion.div>
  );
};

export default WebGLHoverEffect;
