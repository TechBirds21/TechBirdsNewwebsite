import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassmorphismProps {
  children: ReactNode;
  className?: string;
  blur?: number;
  opacity?: number;
  border?: boolean;
}

const Glassmorphism = ({
  children,
  className = '',
  blur = 10,
  opacity = 0.1,
  border = true
}: GlassmorphismProps) => {
  return (
    <motion.div
      className={`backdrop-blur-[${blur}px] bg-white/[${opacity}] ${border ? 'border border-white/20' : ''} ${className}`}
      style={{
        backdropFilter: `blur(${blur}px)`,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Glassmorphism;
