import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  to?: string;
  as?: 'button' | 'a' | 'div';
}

const MagneticButton = ({
  children,
  className = '',
  strength = 0.3,
  onClick,
  href,
  to,
  as = 'button'
}: MagneticButtonProps) => {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      setPosition({
        x: x * strength,
        y: y * strength
      });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [strength]);

  const Component = as === 'a' ? 'a' : as === 'button' ? 'button' : 'div';
  const props: any = {
    ref,
    className: `relative ${className}`,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: 'transform 0.3s ease-out'
    }
  };

  if (href) {
    props.href = href;
    props.target = '_blank';
    props.rel = 'noopener noreferrer';
  }

  if (onClick) {
    props.onClick = onClick;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Component {...props}>
        {children}
      </Component>
    </motion.div>
  );
};

export default MagneticButton;
