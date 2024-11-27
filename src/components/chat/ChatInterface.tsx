"use client"

import React, { useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Trash2 } from 'lucide-react'
import { useChat } from '../../hooks/useChat'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'

interface ChatInterfaceProps {
  isOpen: boolean
  onClose: () => void
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const { messages, isLoading, error, sendMessage, clearChat } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [isOpen, messages, scrollToBottom])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 md:inset-auto md:bottom-0 md:right-0 w-full md:w-[400px] h-full md:h-screen bg-card border rounded-t-lg md:rounded-lg shadow-xl z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
    >
      <div className="flex items-center justify-between p-4 border-b backdrop-blur-sm bg-background/50">
        <div className="flex items-center gap-2">
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-primary" aria-hidden="true" />
            {isLoading && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
            )}
          </div>
          <h2 id="chat-title" className="font-semibold text-card-foreground">AI Assistant</h2>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearChat}
            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors duration-300 group"
            aria-label="Clear chat"
          >
            <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" aria-hidden="true" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors duration-300"
            aria-label="Close chat"
          >
            <X className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          </motion.button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex-grow overflow-y-auto overflow-x-auto p-4 space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center text-muted-foreground py-8"
            >
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary/20" aria-hidden="true" />
              <p>How can I help you today?</p>
            </motion.div>
          ) : (
            messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={{
                  ...message,
                  role: message.role === "system" ? "assistant" : message.role
                }} 
              />
            ))
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20"
              role="alert"
            >
              {error}
            </motion.div>
          )}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 text-muted-foreground p-4"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                <div className="relative w-full h-full rounded-full bg-primary/30 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
              <span>AI is thinking...</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 sm:p-0 border-t backdrop-blur-sm bg-background/50">
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
    </motion.div>
  )
}
