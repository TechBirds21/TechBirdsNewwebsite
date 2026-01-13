import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const AdvancedCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailRefs = useRef<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      trailRefs.current.unshift({ x: e.clientX, y: e.clientY });
      if (trailRefs.current.length > 10) trailRefs.current.pop();
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, [cursorX, cursorY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Main Cursor Glow */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 blur-xl" />
          <div className="absolute inset-0 w-8 h-8 rounded-full border border-blue-500/50" />
        </div>
      </motion.div>

      {/* Ambient Glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
        style={{
          background: useSpring(
            useMotionValue(`radial-gradient(600px circle at ${cursorXSpring.get()}px ${cursorYSpring.get()}px, rgba(59, 130, 246, 0.03), transparent 80%)`)
          ) as any
        }}
      />
    </>
  );
};

export default AdvancedCursor;
