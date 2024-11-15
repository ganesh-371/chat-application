// 'use client'
// import React, { useState, useEffect } from 'react';
// import { Button } from './ui/button';
// import { MessageCircle, X, Mic, Send } from 'lucide-react';
// import ReactDOM from 'react-dom';

// interface Theme {
//   name: string;
//   primary: string;
//   secondary: string;
//   gradient: string;
//   hover: string;
//   textColor: string;
// }

// interface Message {
//   type: 'user' | 'bot';
//   text: string;
// }

// interface ChatBotProps {
//   theme: Theme;
//   onScriptGenerate: (script: string) => void; // Callback prop for script generation
// }

// const ChatBot = ({ theme, onScriptGenerate }: ChatBotProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [recognition, setRecognition] = useState<any>(null);

//   // Initialize Speech Recognition
//   useEffect(() => {
//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.continuous = false;
//       recognitionInstance.interimResults = false;
//       recognitionInstance.lang = 'en-US';

//       // Handle errors
//       recognitionInstance.onerror = (event: { error: any }) => {
//         console.error('Speech recognition error detected:', event.error);
//       };

//       setRecognition(recognitionInstance);
//     } else {
//       console.error('Speech Recognition API is not supported in this browser.');
//     }
//   }, []);

//   // Update theme colors whenever the theme prop changes
//   useEffect(() => {
//     const rootStyles = document.documentElement.style;
//     rootStyles.setProperty('--primary-color', theme.primary);
//     rootStyles.setProperty('--secondary-color', theme.secondary);
//     rootStyles.setProperty('--hover-color', theme.hover);
//     rootStyles.setProperty('--text-color', theme.textColor);
//   }, [theme]);

//   // const generateScript = () => {
//   //   const script = `
//   //     <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
//   //     <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
//   //     <script src="https://unpkg.com/lucide-react/dist/lucide-react.umd.js"></script>
//   //     <script>
//   //     const theme = ${JSON.stringify(theme)};
//   //     function renderChatBot() {
//   //       const ChatBot = () => {
//   //         const [messages, setMessages] = React.useState([]);
//   //         const [input, setInput] = React.useState('');
//   //         const handleSend = async () => {
//   //           if (input.trim()) {
//   //             setMessages([...messages, { type: 'user', text: input }]);
//   //             const response = await fetch('https://chatbot.brainwave-labs.com/ask_gpt', {
//   //               method: 'POST',
//   //               headers: {
//   //                 'Content-Type': 'application/json',
//   //                 'Access-Control-Allow-Origin': '*',
//   //                 "Access-Control-Allow-Credentials": 'true',
//   //                 "Accept": "*/*"
//   //               },
//   //               body: JSON.stringify({ "query": input }),
//   //             });
//   //             const data = await response.json();
//   //             setMessages(prev => [...prev, { type: 'bot', text: data?.data?.answer }]);
//   //             setInput('');
//   //           }
//   //         };

//   //         return (
//   //           <div style={{ backgroundColor: theme.primary, color: theme.textColor }}>
//   //             <div>
//   //               {messages.map((msg, index) => (
//   //                 <div key={index} style={{ textAlign: msg.type === 'user' ? 'right' : 'left' }}>
//   //                   <div style={{ backgroundColor: msg.type === 'user' ? theme.primary : theme.secondary }}>
//   //                     <p>{msg.text}</p>
//   //                   </div>
//   //                 </div>
//   //               ))}
//   //             </div>
//   //             <input
//   //               type="text"
//   //               value={input}
//   //               onChange={(e) => setInput(e.target.value)}
//   //               onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//   //               placeholder="Type your message..."
//   //             />
//   //             <button onClick={handleSend}>Send</button>
//   //           </div>
//   //         );
//   //       };
//   //       const root = document.createElement('div');
//   //       document.body.appendChild(root);
//   //       ReactDOM.render(React.createElement(ChatBot), root);
//   //     }
//   //     renderChatBot();
//   //     </script>
//   //   `;
//   //   onScriptGenerate(script); // Call the callback to pass the script to the parent
//   // };
//   const generateEmbeddableScript = () => {
//     // Retrieve the 'domain' from localStorage in your application
//     const domain = localStorage.getItem('domain')?.split(".")[1] || 'default_domain';
//     const serializedDomain = JSON.stringify(domain); // Ensures proper escaping
  
//     const scriptContent = `
//   <!-- Chatbot Styles -->
//   <style>
//     /* Chatbot Styles */
//     .chatbot-container {
//       position: fixed;
//       bottom: 20px;
//       right: 20px;
//       z-index: 1000;
//       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     }
  
//     .chatbot-button {
//       width: 56px;
//       height: 56px;
//       border-radius: 50%;
//       background-color: ${theme.primary};
//       color: ${theme.textColor};
//       border: none;
//       cursor: pointer;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//     }
  
//     .chatbot-window {
//       display: none;
//       position: fixed;
//       bottom: 80px;
//       right: 20px;
//       width: 400px;
//       height: 600px;
//       background-color: white;
//       border-radius: 12px;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//       flex-direction: column;
//     }
  
//     .chatbot-header {
//       padding: 16px;
//       background-color: ${theme.primary};
//       color: ${theme.textColor};
//       border-radius: 12px 12px 0 0;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//     }
  
//     .chatbot-messages {
//       flex: 1;
//       overflow-y: auto;
//       padding: 16px;
//     }
  
//     .message {
//       margin-bottom: 16px;
//       max-width: 80%;
//       padding: 12px;
//       border-radius: 16px;
//     }
  
//     .user-message {
//       margin-left: auto;
//       background-color: ${theme.primary};
//       color: ${theme.textColor};
//     }
  
//     .bot-message {
//       margin-right: auto;
//       background-color: ${theme.secondary};
//       color: ${theme.textColor};
//     }
  
//     .chatbot-input {
//       padding: 16px;
//       border-top: 1px solid #e5e7eb;
//       background-color: #f9fafb;
//     }
  
//     .input-container {
//       display: flex;
//       gap: 8px;
//       background-color: white;
//       padding: 8px;
//       border-radius: 8px;
//       border: 1px solid #e5e7eb;
//     }
  
//     .input-field {
//       flex: 1;
//       border: none;
//       outline: none;
//       padding: 8px;
//     }
  
//     .mic-button, .send-button {
//       background-color: ${theme.primary};
//       color: ${theme.textColor};
//       border: none;
//       border-radius: 8px;
//       padding: 8px;
//       cursor: pointer;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//   </style>
  
//   <!-- Chatbot HTML -->
//   <div id="chatbot-container" class="chatbot-container">
//     <button id="chatbot-toggle" class="chatbot-button">
//       <!-- Chat Icon SVG -->
//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//         <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8
//                 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38
//                 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38
//                 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6
//                 8.38 8.38 0 0 1 3.8-.9h.5a8.48
//                 8.48 0 0 1 8 8v.5z"/>
//       </svg>
//     </button>
  
//     <div id="chatbot-window" class="chatbot-window">
//       <div class="chatbot-header">
//         <h3 style="margin: 0">AI Assistant</h3>
//         <button class="close-button" style="background: none; border: none; color: inherit; cursor: pointer">
//           <!-- Close Icon SVG -->
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//             <line x1="18" y1="6" x2="6" y2="18"></line>
//             <line x1="6" y1="6" x2="18" y2="18"></line>
//           </svg>
//         </button>
//       </div>
  
//       <div id="chatbot-messages" class="chatbot-messages"></div>
  
//       <div class="chatbot-input">
//         <div class="input-container">
//           <input type="text" id="message-input" class="input-field" placeholder="Type your message...">
//           <button class="mic-button">
//             <!-- Mic Icon SVG -->
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//               <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3
//                         3 0 0 0-3-3z"/>
//               <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
//               <line x1="12" y1="19" x2="12" y2="23"/>
//               <line x1="8" y1="23" x2="16" y2="23"/>
//             </svg>
//           </button>
//           <button class="send-button">
//             <!-- Send Icon SVG -->
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//               <line x1="22" y1="2" x2="11" y2="13"/>
//               <polygon points="22 2 15 22 11 13 2 9 22 2"/>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
  
//   <!-- Chatbot Scripts -->
//   <script>
//   (function() {
//     const domain = ${serializedDomain}; // Hardcoded domain value
  
//     function toggleChat() {
//       const chatWindow = document.getElementById('chatbot-window');
//       chatWindow.style.display =
//         chatWindow.style.display === 'none' || chatWindow.style.display === ''
//           ? 'flex'
//           : 'none';
//     }
  
//     function sendMessage() {
//       const input = document.getElementById('message-input');
//       const message = input.value.trim();
//       if (!message) return;
  
//       addMessage('user', message);
//       input.value = '';
  
//       // Prepare the payload
//       const payload = {
//         domain_name: domain,
//         query: message,
//       };
  
//       fetch('https://chatbot.brainwave-labs.com/ai_chatbot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(\`HTTP error! status: \${response.status}\`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           addMessage(
//             'bot',
//             data?.data?.answer || 'Sorry, I could not process your request.'
//           );
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//           addMessage(
//             'bot',
//             'Sorry, there was an error processing your request.'
//           );
//         });
//     }
  
//     function addMessage(type, text) {
//       const messagesContainer = document.getElementById('chatbot-messages');
//       const messageDiv = document.createElement('div');
//       messageDiv.className = \`message \${type}-message\`;
//       messageDiv.textContent = text;
//       messagesContainer.appendChild(messageDiv);
//       messagesContainer.scrollTop = messagesContainer.scrollHeight;
//     }
  
//     function startSpeechRecognition() {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognition = new SpeechRecognition();
//         recognition.continuous = false;
//         recognition.interimResults = false;
//         recognition.lang = 'en-US';
  
//         recognition.onstart = () => {
//           console.log('Voice recognition started...');
//         };
  
//         recognition.onspeechend = () => {
//           recognition.stop();
//         };
  
//         recognition.onresult = (event) => {
//           const transcript = event.results[0][0].transcript;
//           document.getElementById('message-input').value = transcript;
//         };
  
//         recognition.onerror = (event) => {
//           console.error('Speech recognition error:', event.error);
//         };
  
//         recognition.start();
//       } else {
//         console.error('Speech Recognition not supported');
//       }
//     }
  
//     // Add event listeners
//     document
//       .getElementById('chatbot-toggle')
//       .addEventListener('click', toggleChat);
  
//     document
//       .querySelector('.close-button')
//       .addEventListener('click', toggleChat);
  
//     document
//       .querySelector('.mic-button')
//       .addEventListener('click', startSpeechRecognition);
  
//     document
//       .querySelector('.send-button')
//       .addEventListener('click', sendMessage);
  
//     document
//       .getElementById('message-input')
//       .addEventListener('keypress', function (e) {
//         if (e.key === 'Enter') {
//           sendMessage();
//         }
//       });
//   })();
//   </script>`;
  
//     onScriptGenerate(scriptContent);
//   };
  

//   const handleSend = async () => {
//     if (input.trim()) {
//       setMessages([...messages, { type: 'user', text: input }]);

//       try {
//         const domain = localStorage.getItem('domain')?.split(".")[1] || "default_domain";
//         const response = await fetch('https://chatbot.brainwave-labs.com/ai_chatbot', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             "Access-Control-Allow-Credentials": 'true',
//             "Accept": "*/*"
//           },
//           body: JSON.stringify({ "domain_name":domain,"query": input }),
//         });
//         if (!response.ok) {
//           throw new Error(`Backend error: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();
//         setMessages(prev => [...prev, { type: 'bot', text: data?.data?.answer }]);
//       } catch (error) {
//         console.error('Error:', error);
//         setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, there was an error processing your request.' }]);
//       }
//       setInput('');
//     }
//   };

//   const handleMic = () => {
//     if (recognition) {
//       recognition.start();

//       recognition.onstart = () => {
//         console.log('Voice recognition started...');
//       };

//       recognition.onspeechend = () => {
//         recognition.stop();
//       };

//       recognition.onresult = (event: { results: { transcript: any }[][] }) => {
//         const transcript = event.results[0][0].transcript;
//         setInput(transcript);
//       };
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       {isOpen ? (
//         <div 
//           className="bg-white rounded-xl shadow-2xl w-[400px] h-[600px] flex flex-col"
//           style={{ '--primary-color': theme.primary } as React.CSSProperties}
//         >
//           <div 
//             className="flex justify-between items-center p-4 rounded-t-xl"
//             style={{ 
//               backgroundColor: theme.primary,
//               color: theme.textColor 
//             }}
//           >
//             <h3 className="font-semibold text-lg">AI Assistant</h3>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsOpen(false)}
//               style={{ color: theme.textColor }}
//             >
//               <X className="h-5 w-5" />
//             </Button>
//           </div>
//           <div className="flex-1 overflow-y-auto p-4">
//             {messages.map((msg, index) => (
//               <div key={index} className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//                 <div
//                   className="p-3 rounded-2xl max-w-[80%] shadow-sm"
//                   style={{
//                     backgroundColor: msg.type === 'user' ? theme.primary : theme.secondary,
//                     color: theme.textColor,
//                   }}
//                 >
//                   <p className="text-sm leading-relaxed">{msg.text}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
//             <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//                 className="flex-1 px-4 py-3 text-sm focus:outline-none rounded-lg"
//                 placeholder="Type your message..."
//               />
//               <Button 
//                 size="icon" 
//                 variant="ghost" 
//                 onClick={handleMic}
//                 style={{ color: theme.primary }}
//               >
//                 <Mic className="h-4 w-4" />
//               </Button>
//               <Button 
//                 size="icon" 
//                 onClick={handleSend} 
//                 style={{ 
//                   backgroundColor: theme.primary,
//                   color: theme.textColor
//                 }}
//               >
//                 <Send className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//           {/* <button onClick={generateScript}>Generate Script</button> */}
//           <button 
//             onClick={generateEmbeddableScript} 
//             style={{ 
//               backgroundColor: theme.primary, 
//               color: theme.textColor, 
//               padding: '10px 20px', 
//               border: 'none', 
//               borderRadius: '5px', 
//               cursor: 'pointer' 
//             }}
//           >
//             Generate Script
//           </button>
//         </div>
//       ) : (
//         <Button
//           onClick={() => setIsOpen(true)}
//           className="rounded-full w-14 h-14 shadow-lg"
//           style={{ 
//             backgroundColor: theme.primary,
//             color: theme.textColor
//           }}
//         >
//           <MessageCircle className="h-6 w-6" />
//         </Button>
//       )}
//     </div>
//   );
// };

// export default ChatBot;

// chatbot.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MessageCircle, X, Mic, Send } from 'lucide-react';

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
    if (input.trim()) {
      setMessages([...messages, { type: 'user', text: input }]);

      try {
        const domain = localStorage.getItem('domain')?.split(".")[1] || "default_domain";
        const response = await fetch('https://chatbot.brainwave-labs.com/ai_chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": 'true',
            "Accept": "*/*"
          },
          body: JSON.stringify({ "domain_name": domain, "query": input }),
        });
        if (!response.ok) {
          throw new Error(`Backend error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setMessages(prev => [...prev, { type: 'bot', text: data?.data?.answer }]);
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
