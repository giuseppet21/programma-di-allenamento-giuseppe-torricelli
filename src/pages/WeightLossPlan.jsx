import { motion } from 'framer-motion'
import { useState } from 'react'
import PerditaTimerUomo from '../components/PerditaTimerUomo'
import PerditaTimerDonna from '../components/PerditaTimerDonna'
import WeightTracker from '@components/WeightTracker'
import CalorieTracker from '@components/CalorieTracker'
import Toolbar from '@components/Toolbar'

export default function WeightLossPlan() {
  const [showTimer, setShowTimer] = useState(false)
  const [showMonitoring, setShowMonitoring] = useState(false)
  const [gender, setGender] = useState('male')

  const handleToolSelect = (tool) => {
    // Reset tutti gli stati
    setShowTimer(false)
    setShowMonitoring(false)

    // Attiva solo lo strumento selezionato
    switch(tool) {
      case 'timer':
        setShowTimer(true)
        break
      case 'monitoring':
        setShowMonitoring(true)
        break
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Toolbar onSelectTool={handleToolSelect} />
      
      {/* Immagine di sfondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/weight-loss.jpg')",
          filter: 'brightness(0.7)'
        }}
      />

      {/* Overlay Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-indigo-900/60" />

      {/* Contenuto */}
      <div className="relative z-10 min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Monitoraggio Progressi
            </h1>
            <p className="text-xl text-gray-300">
              Traccia i tuoi risultati
            </p>
          </motion.div>

          {/* Gender Selection */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setGender('male')}
              className={`px-4 py-2 rounded ${
                gender === 'male' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Uomo
            </button>
            <button
              onClick={() => setGender('female')}
              className={`px-4 py-2 rounded ${
                gender === 'female' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Donna
            </button>
          </div>

          {/* Timer Section */}
          <div className="mt-8 mb-8">
            {gender === 'male' ? (
              <PerditaTimerUomo duration={60} onComplete={() => console.log('Timer completato!')} />
            ) : (
              <PerditaTimerDonna duration={60} onComplete={() => console.log('Timer completato!')} />
            )}
          </div>

          {/* Monitoraggio */}
          {showMonitoring && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WeightTracker />
              <CalorieTracker />
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 