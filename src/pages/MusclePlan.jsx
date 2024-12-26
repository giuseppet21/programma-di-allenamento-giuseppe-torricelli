import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function MusclePlan() {
  const navigate = useNavigate()
  const [gender] = useState(localStorage.getItem('selectedGender'))

  const backgroundImage = gender === 'female' 
    ? "url('https://images.unsplash.com/photo-1518310383802-640c2de311b2')"
    : "url('https://images.unsplash.com/photo-1605296867424-35fc25c9212a')"

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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Piano Sviluppo Massa
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Sei pronto per iniziare il tuo percorso di crescita muscolare?
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/muscle-details')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-semibold 
                       shadow-lg hover:bg-indigo-700 transition-all duration-300
                       hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                       hover:border-white hover:border-2"
            >
              Vai al Piano Dettagliato
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 