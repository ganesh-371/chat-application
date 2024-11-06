'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { MessageCircle, X, Mic, Send } from 'lucide-react'
import styles from '../app/theme.module.css'

interface Theme {
  name: string
  primary: string
  secondary: string
  gradient: string
  hover: string
  textColor: string
}

interface Message {
  type: 'user' | 'bot'
  text: string
}

interface ChatBotProps {
  theme: Theme
}

const ChatBot = ({ theme }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'en-US'
      setRecognition(recognitionInstance)
    }
  }, [])

  // Update theme colors whenever the theme prop changes
  useEffect(() => {
    const rootStyles = document.documentElement.style
    rootStyles.setProperty('--primary-color', theme.primary)
    rootStyles.setProperty('--secondary-color', theme.secondary)
    rootStyles.setProperty('--hover-color', theme.hover)
    rootStyles.setProperty('--text-color', theme.textColor)
  }, [theme])

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: Message = { type: 'user', text: input }
      setMessages(prevMessages => [...prevMessages, newMessage])
      setInput('')

      const botMessage: Message = {
        type: 'bot',
        text: 'This is a response from the chatbot.'
      }
      setMessages(prevMessages => [...prevMessages, botMessage])
    }
  }

  const handleMic = () => {
    if (recognition) {
      recognition.start()
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
      }
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div 
          className="bg-white rounded-xl shadow-2xl w-[400px] h-[600px] flex flex-col"
          style={{ '--primary-color': theme.primary } as React.CSSProperties}
        >
          <div 
            className="flex justify-between items-center p-4 rounded-t-xl"
            style={{ 
              backgroundColor: theme.primary,
              color: theme.textColor 
            }}
          >
            <h3 className="font-semibold text-lg">AI Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              style={{ color: theme.textColor }}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="p-3 rounded-2xl max-w-[80%] shadow-sm"
                  style={{
                    backgroundColor: msg.type === 'user' ? theme.primary : theme.secondary,
                    color: theme.textColor,
                  }}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-4 py-3 text-sm focus:outline-none rounded-lg"
                placeholder="Type your message..."
              />
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={handleMic}
                style={{ color: theme.primary }}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                onClick={handleSend} 
                style={{ 
                  backgroundColor: theme.primary,
                  color: theme.textColor
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg"
          style={{ 
            backgroundColor: theme.primary,
            color: theme.textColor
          }}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

export default ChatBot