'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { MessageCircle, X, Mic, Send } from 'lucide-react'

// Add these type declarations
interface Message {
  type: 'user' | 'bot';
  text: string;
}

// Add proper type declarations for Speech Recognition
interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [recognition, setRecognition] = useState<any>(null)

  // Updated Speech Recognition initialization
  useEffect(() => {
    const windowWithSpeech = window as unknown as IWindow
    const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'en-US'
      setRecognition(recognitionInstance)
    }
  }, [])

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: Message = { type: 'user', text: input }
      setMessages(prevMessages => [...prevMessages, newMessage])
  
      try {
        const response = await fetch('https://chatbot.brainwave-labs.com/ask_gpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify({ "query": input }),
        })
        
        const data = await response.json()
        const botMessage: Message = { 
          type: 'bot', 
          text: data?.data?.answer || 'Sorry, I could not process that.' 
        }
        setMessages(prevMessages => [...prevMessages, botMessage])
      } catch (error) {
        console.error('Error:', error)
        const errorMessage: Message = {
          type: 'bot',
          text: 'Sorry, there was an error processing your request.'
        }
        setMessages(prevMessages => [...prevMessages, errorMessage])
      }
      setInput('')
    }
  }

  const handleMic = () => {
    if (recognition) {
      recognition.start()

      recognition.onstart = () => {
        console.log('Voice recognition started...')
      }

      recognition.onspeechend = () => {
        recognition.stop()
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
      }
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-2xl w-[400px] h-[600px] flex flex-col transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <h3 className="font-semibold text-lg">AI Assistant</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Messages Area */}
          <div 
            className="flex-1 overflow-y-auto p-4 scroll-smooth scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    p-3 rounded-2xl max-w-[80%] shadow-sm
                    ${msg.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }
                    transform transition-all duration-200 hover:scale-[1.02]
                  `}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className="text-[10px] mt-1 opacity-70 text-right">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <div className="flex gap-2 items-center bg-white rounded-lg shadow-sm border border-gray-200">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-4 py-3 text-sm focus:outline-none rounded-lg"
                placeholder="Type your message..."
              />
              <div className="flex gap-1 px-2">
                <Button 
                  size="icon" 
                  variant="ghost"
                  onClick={handleMic}
                  className="hover:bg-gray-100 text-gray-600"
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon"
                  onClick={handleSend}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

export default ChatBot