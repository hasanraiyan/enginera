import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxCardProps {
  children: React.ReactNode;
  offset?: number;
}

export const ParallaxCard: React.FC<ParallaxCardProps> = ({ 
  children, 
  offset = 50 
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, offset]);

  return (
    <motion.div
      style={{ y }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};