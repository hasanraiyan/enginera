import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

interface ChatButtonProps {
  onClick: () => void
  isOpen: boolean
}

export const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg z-50 ${
        isOpen ? 'bg-primary/10' : 'bg-primary'
      } transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
      aria-label={isOpen ? "Close chat" : "Open chat"}
      aria-expanded={isOpen}
    >
      <MessageSquare 
        className={`w-6 h-6 ${
          isOpen ? 'text-primary' : 'text-primary-foreground'
        }`} 
        aria-hidden="true"
      />
      <span className="sr-only">{isOpen ? "Close chat" : "Open chat"}</span>
    </motion.button>
  )
}

