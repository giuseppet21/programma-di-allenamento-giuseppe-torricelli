import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Toolbar({ onSelectTool }) {
  const [isOpen, setIsOpen] = useState(false)

  const tools = [
    { 
      id: 'progress', 
      name: 'Traccia Progressi', 
      icon: '📊',
      description: 'Monitora pesi, serie e ripetizioni'
    },
    { 
      id: 'analytics', 
      name: 'Analisi Dettagliate', 
      icon: '📈',
      description: 'Visualizza analisi e grafici'
    },
    { 
      id: 'timer', 
      name: 'Timer Intelligente', 
      icon: '⏱️',
      description: 'Gestisci i tempi di recupero'
    },
    { 
      id: 'nutrition', 
      name: 'AI Nutrizionale', 
      icon: '🥗',
      description: 'Consigli personalizzati per la tua dieta'
    }
  ]

  return (
    <div className="fixed top-0 left-4 z-50">
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black/80 backdrop-blur-sm p-4 rounded-lg shadow-lg 
                   text-white font-semibold flex items-center gap-2"
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
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelectTool(tool.id)
                      setIsOpen(false)
                    }}
                    className="p-4 rounded-lg bg-indigo-600/50 hover:bg-indigo-700/50
                             text-white font-medium text-left transition-all"
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