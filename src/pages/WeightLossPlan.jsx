import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function WeightLossPlan() {
  const navigate = useNavigate()
  const [gender] = useState(localStorage.getItem('selectedGender'))
  const [goal] = useState(localStorage.getItem('selectedGoal'))

  const backgroundImage = "url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5')"

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
        <div className="max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Piano Perdita Peso
            </h1>
            <p className="text-xl text-gray-300">
              In sviluppo...
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 