import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg ${
        isOpen ? 'bg-primary/10' : 'bg-primary'
      } transition-colors duration-300`}
    >
      <MessageSquare className={`w-6 h-6 ${
        isOpen ? 'text-primary' : 'text-primary-foreground'
      }`} />
    </motion.button>
  );
};