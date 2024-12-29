import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Toolbar({ onSelectTool }) {
  const [isOpen, setIsOpen] = useState(false)

  const tools = [
    { 
      id: 'timer', 
      name: 'Timer', 
      icon: '⏱️',
      description: 'Timer per il recupero'
    },
    { 
      id: 'monitoring', 
      name: 'Monitoraggio', 
      icon: '📊',
      description: 'Traccia peso e calorie'
    }
  ]

  return (
    <div className="fixed top-0 left-4 z-50">
      <div className="relative">
        <motion.button
          whileHover={{ 
            scale: 1.05,
            shadow: "0 0 15px rgba(255,255,255,0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black/80 backdrop-blur-sm p-4 rounded-lg shadow-lg 
                   text-white font-semibold flex items-center gap-2
                   hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                   hover:border-white hover:border-2
                   transition-all duration-300"
        >
          <span>Menu</span>
          <svg 
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>

        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 mt-2 w-72 bg-black/80 backdrop-blur-sm 
                     rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-2">
              <div className="flex flex-col space-y-2">
                {tools.map((tool) => (
                  <motion.button
                    key={tool.id}
                    whileHover={{ 
                      scale: 1.05,
                      shadow: "0 0 15px rgba(255,255,255,0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onSelectTool(tool.id)
                      setIsOpen(false)
                    }}
                    className="p-4 rounded-lg bg-indigo-600/50 hover:bg-indigo-700/50
                             text-white font-medium text-left transition-all
                             hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                             hover:border-white hover:border-2
                             duration-300"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl">{tool.icon}</span>
                      <span>{tool.name}</span>
                    </div>
                    <p className="text-sm text-gray-300 ml-8">
                      {tool.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 