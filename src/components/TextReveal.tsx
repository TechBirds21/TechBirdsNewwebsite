import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

const TextReveal = ({
  text,
  className = '',
  delay = 0,
  duration = 0.05,
  stagger = 0.02,
  as = 'div'
}: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true);
      let currentIndex = 0;
      
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayText(text.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
            setIsAnimating(false);
          }
        }, duration * 1000);

        return () => clearInterval(interval);
      }, delay * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isInView, text, delay, duration]);

  const Component = as;

  return (
    <Component ref={ref} className={className}>
      {displayText}
      {isAnimating && displayText.length < text.length && (
        <span className="inline-block w-0.5 h-[1em] bg-current animate-pulse ml-1" />
      )}
    </Component>
  );
};

// Letter-by-letter reveal
export const LetterReveal = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.02,
  as = 'div'
}: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Component = as;

  return (
    <Component ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            delay: delay + i * stagger,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Component>
  );
};

export default TextReveal;
