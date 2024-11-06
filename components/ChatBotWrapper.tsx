'use client'
import { usePathname } from 'next/navigation'
import ChatBot from './ChatBot'
import { themes } from '@/utils/themes'

const ChatBotWrapper = () => {
  const pathname = usePathname()
  const excludedPaths = ['/login', '/signup', '/']

  if (excludedPaths.includes(pathname)) {
    return null
  }

  // return <ChatBot theme={themes[0]} />
}

export default ChatBotWrapper
