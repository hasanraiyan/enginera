import React from 'react';
import { motion } from 'framer-motion';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  className = ''
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative overflow-hidden px-6 py-3 rounded-lg
        bg-gradient-to-r from-primary to-primary/80
        text-primary-foreground font-medium
        transition-all duration-300
        hover:shadow-lg hover:shadow-primary/20
        ${className}
      `}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: '100%' }}
        whileHover={{ x: '-100%' }}
        transition={{ duration: 0.4 }}
      />
      {children}
    </motion.button>
  );
};