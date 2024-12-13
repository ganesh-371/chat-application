'use client';
import React, { useState, useEffect } from 'react';
import { themes } from '@/utils/themes';
import ScriptGeneration from '@/components/script/script';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/utils/Authentication';

// Define theme interface
interface Theme {
  primary: string;
  secondary: string;
  textColor: string;
}

const ScriptPage = () => {

  useEffect(() => {
    // const authenticated = isAuthenticated();
    // if (authenticated !== null && !authenticated) {
    //   alert('please login into website, Alert from pie');
    //   window.location.href = '/login';
    //   return; // Prevent navigation if not authenticated
    // }

    if (typeof window !== "undefined" && window.localStorage) {
      console.log("Local Storage now present");
      const response = localStorage.getItem("isAuthenticated") === "true";
      if (response == false) {
        alert("Not authenticated, login again");
        window.location.href = '/login';
        return; // Prevent navigation if not authenticated

      }
    } else {
      alert("There is an issue with browser");
    }
  }, []);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage) {
      const storedTheme = localStorage.getItem('selectedTheme');
      if (storedTheme) {
        setSelectedTheme(JSON.parse(storedTheme));
      }
    }
    generateEmbeddableScript();
  }, []);

  useEffect(() => {
    generateEmbeddableScript();
  }, [selectedTheme]);

  const generateEmbeddableScript = () => {
    const domain = typeof window !== 'undefined' && localStorage 
      ? localStorage.getItem('domain')?.split('.')?.[1] || 'default_domain'
      : 'default_domain';
    const serializedDomain = JSON.stringify(domain);

    const scriptContent = `
<!-- Chatbot Styles -->
<style>
  .chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .chatbot-button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${selectedTheme.primary};
    color: ${selectedTheme.textColor};
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .chatbot-window {
    display: none;
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 350px;
    height: 570px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    flex-direction: column;
  }

  .chatbot-header {
    padding: 16px;
    background-color: ${selectedTheme.primary};
    color: ${selectedTheme.textColor};
    border-radius: 12px 12px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${selectedTheme.textColor};
  }

  .close-button svg {
    width: 20px;
    height: 20px;
  }

  .chatbot-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    scrollbar-width: thin; /* Firefox */
	  scrollbar-color: #ccc #f5f5f5;
  }

  	/* For WebKit browsers (Chrome, Safari, Edge) */
.chatbot-messages::-webkit-scrollbar {
	width: 0.1px; /* Thin scrollbar width */
  }
  
  .chatbot-messages::-webkit-scrollbar-track {
	background: #f5f5f5; /* Light grey ash background */
  }
  
  .chatbot-messages::-webkit-scrollbar-thumb {
	background: #ccc; /* Thumb color */
	border-radius: 10px; /* Rounded edges for modern look */
  }
  
  .chatbot-messages::-webkit-scrollbar-thumb:hover {
	background: #b3b3b3; /* Slightly darker on hover */
  }
  
  .chatbot-messages::-webkit-scrollbar-button {
	display: none; /* Hide up and down scroll buttons */
  }
  .chatbot-window {
    overscroll-behavior-y: contain;
  }
  
  .chatbot-messages {
	overscroll-behavior-y: none;
	overscroll-behavior: contain;
  }

  .message {
    margin-bottom: 16px;
    max-width: 80%;
    padding: 12px;
    text-align:justify;
    border-radius: 16px;
  }

  .user-message {
    margin-left: auto;
    background-color: ${selectedTheme.primary};
    color: ${selectedTheme.textColor};
    text-align:justify;
  }

  .bot-message {
    margin-right: auto;
    background-color: ${selectedTheme.secondary};
    color: ${selectedTheme.textColor};
    text-align:justify;
  }

  .chatbot-input {
    padding: 16px;
    border-top: 1px solid #e5e7eb;
    background-color: #f9fafb;
  }

  .input-container {
    display: flex;
    gap: 8px;
    background-color: white;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  .input-field {
    flex: 1;
    border: none;
    outline: none;
    padding: 8px;
  }

  .mic-button, .send-button {
    background-color: ${selectedTheme.primary};
    color: ${selectedTheme.textColor};
    border: none;
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mic-button svg, .send-button svg {
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 600px) {
    .chatbot-window {
      bottom: 20px;
      right: 20px;
      width: 90%;
      height: 80%;
      border-radius: 0;
    }

    .chatbot-header {
      padding: 12px;
    }

    .chatbot-messages {
      padding: 8px;
    }

    .chatbot-input {
      padding: 8px;
    }

    .input-container {
      gap: 4px;
      padding: 4px;
    }

    .input-field {
      padding: 6px;
    }

    .mic-button,
    .send-button {
      padding: 6px;
    }

    .chatbot-button {
      width: 40px;
      height: 40px;
    }
  }
</style>

<!-- Chatbot HTML -->
<div id="chatbot-container" class="chatbot-container">
  <button id="chatbot-toggle" class="chatbot-button">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  </button>

  <div id="chatbot-window" class="chatbot-window">
    <div class="chatbot-header">
      <h3>AI Assistant</h3>
      <button class="close-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div id="chatbot-messages" class="chatbot-messages"></div>
    <div class="chatbot-input">
      <div class="input-container">
        <input type="text" id="message-input" class="input-field" placeholder="Type your message...">
        <button class="mic-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>
        <button class="send-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

<script>
(function() {
  const domain = ${serializedDomain};
  console.log("domain:", domain);

  function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (!message) return;

    addMessage('user', message);
    input.value = '';

    const payload = { domain_name: domain, query: message };

    fetch('https://chatbot.brainwave-labs.com/ai_chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
        return response.json();
      })
      .then(data => {
        addMessage('bot', data?.data?.answer || 'Sorry, I could not process your request.');
      })
      .catch(error => {
        console.error('Error:', error);
        addMessage('bot', 'Sorry, there was an error processing your request.');
      });
  }

  function addMessage(type, text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
      const messageDiv = document.createElement('div');
      messageDiv.className = \`message \${type}-message\`;
      messageDiv.textContent = text;
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  function startSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => console.log('Voice recognition started...');
      recognition.onspeechend = () => recognition.stop();
      recognition.onresult = event => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('message-input');
        if (input) input.value = transcript;
      };
      recognition.onerror = event => console.error('Speech recognition error:', event.error);

      recognition.start();
    } else {
      console.error('Speech Recognition not supported');
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('chatbot-toggle')?.addEventListener('click', toggleChat);
    document.querySelector('.close-button')?.addEventListener('click', toggleChat);
    document.querySelector('.mic-button')?.addEventListener('click', startSpeechRecognition);
    document.querySelector('.send-button')?.addEventListener('click', sendMessage);
    document.getElementById('message-input')?.addEventListener('keypress', e => {
      if (e.key === 'Enter') sendMessage();
    });
  });

  function toggleChat() {
    const chatWindow = document.getElementById('chatbot-window');
    if (chatWindow) {
      const isHidden = chatWindow.style.display === 'none' || chatWindow.style.display === '';
      chatWindow.style.display = isHidden ? 'flex' : 'none';
    }
  }
})();
</script>
`;

    setGeneratedScript(scriptContent);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Generated Chatbot Script</h1>
      {generatedScript && <ScriptGeneration script={generatedScript} />}
    </div>
  );
};

export default ScriptPage;
