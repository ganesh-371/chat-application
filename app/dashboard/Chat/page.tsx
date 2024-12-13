
'use client';
import React, { useState } from 'react';
import ChatBot from '@/components/ChatBot';
import { themes } from '@/utils/themes';
import { useRouter } from 'next/navigation'; // Import useRouter
import { isAuthenticated } from '@/utils/Authentication';

const ChatPage = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const router = useRouter(); // Initialize the router

  const handleThemeChange = (theme: typeof themes[0]) => {
    setSelectedTheme(theme);
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--hover-color', theme.hover);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
  };

  const handleGenerateScript = () => {
    // Save the selected theme to localStorage or pass it via query params
    if (!isAuthenticated()) {
      alert('please login into website');
      window.location.href = '/login';
      return; // Prevent navigation if not authenticated
    }
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('selectedTheme', JSON.stringify(selectedTheme));
    }
    // Navigate to the script page
    router.push('/dashboard/Script');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Chat</h1>
      <div className="space-y-4 mb-8">
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

      {/* Add the Generate Script button */}
      <button
        onClick={handleGenerateScript}
        style={{
          backgroundColor: selectedTheme.primary,
          color: selectedTheme.textColor,
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Generate Script
      </button>

      <ChatBot theme={selectedTheme} />
    </div>
  );
};

export default ChatPage;
