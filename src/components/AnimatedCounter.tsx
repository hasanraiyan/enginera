import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from,
  to,
  duration = 2,
  delay = 0
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  const springConfig = {
    duration: duration * 1000,
    delay: delay * 1000,
    bounce: 0.25
  };

  const count = useSpring(from, springConfig);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      count.set(to);
    }
  }, [inView, count, to]);

  return (
    <motion.span ref={ref}>
      <span ref={nodeRef}>{rounded}</span>
    </motion.span>
  );
};