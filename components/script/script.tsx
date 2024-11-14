'use client'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'

interface ScriptGenerationProps {
  script: string
}

function ScriptGeneration({ script }: ScriptGenerationProps) {
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    // Ensure the pre element scrolls to show new content
    if (preRef.current) {
      preRef.current.scrollTop = 0
    }
  }, [script])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(script)
      alert('Script copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy script:', err)
      alert('Failed to copy script to clipboard')
    }
  }

  return (
    <div className="mt-8 mb-8 bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-semibold">Generated Chatbot Code</h4>
        <Button onClick={copyToClipboard} variant="outline">
          Copy to Clipboard
        </Button>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto max-h-[500px]">
        <pre ref={preRef} className="text-sm whitespace-pre-wrap">
          <code>{script}</code>
        </pre>
      </div>
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h5 className="font-medium mb-2">Installation Instructions:</h5>
        <ol className="list-decimal list-inside space-y-2">
          <li>Copy the code above</li>
          <li>Paste it into the <code className="bg-gray-100 px-2 py-1 rounded">{'<body>'}</code> tag of your HTML file</li>
          <li>The chatbot will appear in the bottom-right corner of your website</li>
        </ol>
      </div>
    </div>
  )
}

export default ScriptGeneration