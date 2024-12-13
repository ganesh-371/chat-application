'use client';
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MessageCircle, X, Mic, Send } from 'lucide-react';
import { isAuthenticated } from '@/utils/Authentication';

interface Theme {
  name: string;
  primary: string;
  secondary: string;
  gradient: string;
  hover: string;
  textColor: string;
}

interface Message {
  type: 'user' | 'bot';
  text: string;
}

interface ChatBotProps {
  theme: Theme;
}

const ChatBot = ({ theme }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      // Handle errors
      recognitionInstance.onerror = (event: { error: any }) => {
        console.error('Speech recognition error detected:', event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error('Speech Recognition API is not supported in this browser.');
    }
  }, []);

  // Update theme colors whenever the theme prop changes
  useEffect(() => {
    const rootStyles = document.documentElement.style;
    rootStyles.setProperty('--primary-color', theme.primary);
    rootStyles.setProperty('--secondary-color', theme.secondary);
    rootStyles.setProperty('--hover-color', theme.hover);
    rootStyles.setProperty('--text-color', theme.textColor);
  }, [theme]);

  const handleSend = async () => {
    if (!isAuthenticated()) {
      alert('please login into website');
      window.location.href = '/login';
      return; // Prevent navigation if not authenticated
    }
    if (input.trim()) {
      setMessages([...messages, { type: 'user', text: input }]);

      try {
        const domain = typeof window !== 'undefined' && localStorage 
          ? localStorage.getItem('domain')?.split(".")[1] || "default_domain"
          : "default_domain";
        const response = await fetch('https://chatbot.brainwave-labs.com/ai_chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": 'true',
            "Accept": "*/*"
          },
          body: JSON.stringify({ "domain_name":domain,"query": input }),
        });
        if (!response.ok) {
          throw new Error(`Backend error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if(data && data.data && typeof data.data.answer==='string'){
          setMessages(prev => [...prev, { type: 'bot', text: data?.data?.answer }]);
        }else{
          setMessages(prev=>[...prev,{type:'bot',text:'please upload files '}])
        }
        
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, there was an error processing your request.' }]);
      }
      setInput('');
    }
  };

  const handleMic = () => {
    if (recognition) {
      recognition.start();

      recognition.onstart = () => {
        console.log('Voice recognition started...');
      };

      recognition.onspeechend = () => {
        recognition.stop();
      };

      recognition.onresult = (event: { results: { transcript: any }[][] }) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div 
          className="bg-white rounded-xl shadow-2xl w-[350px] h-[570px] flex flex-col"
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
          {/* Remove the Generate Script button from here */}
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
  );
};

export default ChatBot;
