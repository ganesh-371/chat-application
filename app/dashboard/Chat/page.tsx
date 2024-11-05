'use client'
import React, { useState } from 'react'
import ChatBot from '@/components/ChatBot'
import { Theme, themes } from '@/utils/themes'

const defaultTheme: Theme = themes[0]
const ChatPage = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0] || defaultTheme)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Chat</h1>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Select Theme</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setSelectedTheme(theme)}
              className={`p-4 rounded-xl transition-all duration-200 transform hover:scale-105 font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-3 min-w-[140px] ${theme.primary} ${theme.hover} ${theme.textColor}`}
            >
              <span className={`w-4 h-4 rounded-full ${theme.secondary}`}></span>
              {theme.name}
            </button>
          ))}
        </div>
      </div>
      
      <ChatBot theme={selectedTheme} key={selectedTheme.name}/>
    </div>
  )
}

export default ChatPage