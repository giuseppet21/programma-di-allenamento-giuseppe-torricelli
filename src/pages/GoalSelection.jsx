import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function GoalSelection() {
  const navigate = useNavigate()
  const selectedGender = localStorage.getItem('selectedGender')

  const backgroundImage = selectedGender === 'female' 
    ? "url('https://images.unsplash.com/photo-1518310383802-640c2de311b2')"  // Sfondo femminile
    : "url('https://images.unsplash.com/photo-1605296867424-35fc25c9212a')"   // Sfondo maschile

  const handleGoalSelect = (goal) => {
    navigate('/workouts')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Immagine di sfondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage,
          filter: 'brightness(0.7)'
        }}
      />

      {/* Overlay Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-indigo-900/60" />

      {/* Contenuto */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Qual è il tuo obiettivo?
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Scegli il tuo percorso di allenamento
            </p>
          </motion.div>

          {/* Selection Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGoalSelect('muscle')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-semibold 
                       shadow-lg hover:bg-indigo-700 transition-all duration-300
                       hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                       hover:border-white hover:border-2"
            >
              <div className="flex items-center gap-6">
                <span className="text-4xl">💪</span>
                <span className="text-xl font-semibold">SVILUPPO MASSA</span>
                <span className="text-xl">→</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGoalSelect('loss')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-semibold 
                       shadow-lg hover:bg-indigo-700 transition-all duration-300
                       hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                       hover:border-white hover:border-2"
            >
              <div className="flex items-center gap-6">
                <span className="text-4xl">⚖️</span>
                <span className="text-xl font-semibold">PERDITA PESO</span>
                <span className="text-xl">→</span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
} 