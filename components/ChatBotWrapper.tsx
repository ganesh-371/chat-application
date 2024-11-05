'use client'
import { usePathname } from 'next/navigation'
import ChatBot from './ChatBot'

const ChatBotWrapper = () => {
  const pathname = usePathname()
  
  // Update excluded paths to match your actual route structure
  const excludedPaths = ['/login', '/signup','/']
  
  // Optional: Add debugging to verify paths
  // console.log('Current pathname:', pathname)
  // console.log('Is path excluded:', excludedPaths.includes(pathname))

  if (excludedPaths.includes(pathname)) {
    return null
  }

  return <ChatBot />
}

export default ChatBotWrapper