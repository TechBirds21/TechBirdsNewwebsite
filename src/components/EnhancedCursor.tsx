import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const EnhancedCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  const cursorX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const cursorY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  
  const dotX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const dotY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const dotSpringConfig = { damping: 10, stiffness: 200 };
  const dotXSpring = useSpring(dotX, dotSpringConfig);
  const dotYSpring = useSpring(dotY, dotSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;
      
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        (target.closest && (target.closest('a') || target.closest('button') || target.closest('[data-cursor-hover]')));
      
      if (isInteractive && cursorRef.current) {
        cursorRef.current.style.width = '60px';
        cursorRef.current.style.height = '60px';
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;
      
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        (target.closest && (target.closest('a') || target.closest('button') || target.closest('[data-cursor-hover]')));
      
      if (isInteractive && cursorRef.current) {
        cursorRef.current.style.width = '40px';
        cursorRef.current.style.height = '40px';
      }
    };

    // Hide on touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      return;
    }

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Outer Cursor Ring */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-[10000] hidden md:block w-10 h-10 rounded-full border-2 border-blue-500/60 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      
      {/* Inner Dot */}
      <motion.div
        ref={cursorDotRef}
        className="pointer-events-none fixed z-[10001] hidden md:block w-2 h-2 rounded-full bg-blue-500"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', damping: 10, stiffness: 200 }}
      />
    </>
  );
};

export default EnhancedCursor;
