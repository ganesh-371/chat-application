'use client'
import React, { useState } from 'react'
import ChatBot from '@/components/ChatBot'
import { themes } from '@/utils/themes'

const ChatPage = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0])

  const handleThemeChange = (theme: typeof themes[0]) => {
    setSelectedTheme(theme)
    document.documentElement.style.setProperty('--primary-color', theme.primary)
    document.documentElement.style.setProperty('--secondary-color', theme.secondary)
    document.documentElement.style.setProperty('--hover-color', theme.hover)
    document.documentElement.style.setProperty('--text-color', theme.textColor)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Chat</h1>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Select Theme</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeChange(theme)}
              className="p-4 rounded-xl transition-all duration-200 transform hover:scale-105 font-semibold shadow-md flex items-center justify-center gap-3 min-w-[140px]"
              style={{
                backgroundColor: theme.primary,
                color: theme.textColor,
              }}
            >
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: theme.secondary }}
              ></span>
              {theme.name}
            </button>
          ))}
        </div>
      </div>
      <ChatBot theme={selectedTheme} />
    </div>
  )
}

export default ChatPage
