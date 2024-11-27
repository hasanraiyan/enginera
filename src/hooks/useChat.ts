import { useState, useCallback, useRef, useEffect } from 'react'

// Define types
type Role = 'user' | 'assistant' | 'system'

interface Message {
  id: string
  role: Role
  content: string
  timestamp: number
}

interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
}

interface ChatResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

const API_URL = 'https://text.pollinations.ai/openai'
const STORAGE_KEY = 'chat_history'

export function useChat() {
  // Initialize state from localStorage if available
  const [state, setState] = useState<ChatState>(() => {
    const savedChat = localStorage.getItem(STORAGE_KEY)
    return savedChat ? {
      ...JSON.parse(savedChat),
      isLoading: false,
      error: null
    } : {
      messages: [],
      isLoading: false,
      error: null,
    }
  })

  // Save to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      messages: state.messages
    }))
  }, [state.messages])

  // Use useRef to store the latest messages without causing re-renders
  const messagesRef = useRef(state.messages)
  messagesRef.current = state.messages

  const sendMessage = useCallback(async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    }

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: true,
      error: null,
    }))

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful AI assistant.' },
            ...messagesRef.current.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ChatResponse = await response.json()
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('Invalid response from API')
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: Date.now(),
      }

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }))
    } catch (error) {
      console.error('Error in sendMessage:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      }))
    }
  }, [])

  const clearChat = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null,
    })
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearChat,
  }
}

