import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorGlow = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth out the movement
  const springConfig = { damping: 50, stiffness: 400 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Hide on touch devices or reduced motion
  if (typeof window !== 'undefined') {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-500"
      style={{
        background: `radial-gradient(400px circle at ${smoothX.get()}px ${smoothY.get()}px, rgba(59, 130, 246, 0.03), transparent 80%)`,
      }}
    />
  );
};

export default CursorGlow;
