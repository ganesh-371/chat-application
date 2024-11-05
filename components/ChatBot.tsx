'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { MessageCircle, X, Mic, Send } from 'lucide-react'
import { Theme } from '@/utils/themes';

interface Message {
  type: 'user' | 'bot';
  text: string;
}

// const defaultTheme: Theme = {
//   name: 'Ocean Blue',
//   primary: 'bg-blue-600',
//   secondary: 'bg-blue-300',
//   gradient: 'from-blue-500 to-blue-600',
//   hover: 'hover:bg-blue-700',
//   textColor: 'text-white',
// }

interface ChatBotProps {
  theme: Theme;
}

const ChatBot = ({ theme }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [recognition, setRecognition] = useState<any>(null)
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme)
  const [themeName, setThemeName] = useState<string>(theme?.name || "Ocean Blue")
  const [themeColor, setThemeColor] = useState<string>(theme?.primary)


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

  useEffect(() => {
    if (theme) {
      console.log('Theme being applied:', theme)
      setCurrentTheme(theme)
      setThemeName(theme.name)
      setThemeColor(theme.primary)
    }
  }, [theme])

  console.log("Rendered themeName: " + themeName)

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
    <div id={themeName} className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-2xl w-[400px] h-[600px] flex flex-col">
          <h1 id={themeName} className="text-xl font-bold text-white">Hello</h1>
          <div
            className={`flex justify-between items-center p-4 rounded-t-xl ${themeColor}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <h3 className="font-semibold text-lg text-white">AI Assistant {themeName}</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    p-3 rounded-2xl max-w-[80%] shadow-sm
                    ${msg.type === 'user'
                      ? `${currentTheme?.primary} text-white rounded-br-none`
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }
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
                  className={`${currentTheme?.primary} text-white`}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1>{themeName}</h1>
          <Button
            onClick={() => setIsOpen(true)}
            className={`rounded-full w-14 h-14 ${currentTheme?.primary} text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out`}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  )
}

export default ChatBot
