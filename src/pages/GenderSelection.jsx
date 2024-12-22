import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function GenderSelection() {
  const navigate = useNavigate()

  const handleGenderSelect = (gender) => {
    navigate('/workouts')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Immagine di sfondo principale */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f')",
          filter: 'brightness(0.7)'
        }}
      />

      {/* Immagine uomo (lato sinistro) */}
      <div 
        className="absolute left-0 bottom-0 h-full w-1/3 bg-contain bg-bottom bg-no-repeat"
        style={{
          backgroundImage: "url('/src/assets/images/male-trainer.png')",
          opacity: '0.9'
        }}
      />

      {/* Immagine donna (lato destro) */}
      <div 
        className="absolute right-0 bottom-0 h-full w-1/3 bg-contain bg-bottom bg-no-repeat"
        style={{
          backgroundImage: "url('/src/assets/images/female-trainer.png')",
          opacity: '0.9'
        }}
      />

      {/* Overlay Gradiente - più leggero per vedere meglio le figure */}
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
              Benvenuto in GTCoorp
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Il tuo percorso verso l'eccellenza inizia qui
            </p>
            <p className="text-2xl text-blue-300 italic font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              "La forza non viene da una capacità fisica. Deriva da una volontà indomabile."
            </p>
          </motion.div>

          {/* Selection Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGenderSelect('male')}
              className="bg-blue-600/90 backdrop-blur-sm text-white py-12 px-8 rounded-xl
                       flex flex-col items-center justify-center 
                       shadow-lg hover:bg-blue-700 transition-all duration-300
                       hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                       hover:border-white hover:border-2"
            >
              <span className="text-3xl font-bold tracking-wide">UOMO</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGenderSelect('female')}
              className="bg-pink-600/90 backdrop-blur-sm text-white py-12 px-8 rounded-xl
                       flex flex-col items-center justify-center 
                       shadow-lg hover:bg-pink-700 transition-all duration-300
                       hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                       hover:border-white hover:border-2"
            >
              <span className="text-3xl font-bold tracking-wide">DONNA</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
} 