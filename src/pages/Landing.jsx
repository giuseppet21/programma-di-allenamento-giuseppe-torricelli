import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Immagine di sfondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48')",
          filter: 'brightness(0.7)'
        }}
      />

      {/* Overlay Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-indigo-900/70" />

      {/* Contenuto */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Pronto per allenarti?
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Traccia i tuoi progressi, migliora le tue performance, raggiungi i tuoi obiettivi
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/gender-selection')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-semibold 
                         shadow-lg hover:bg-indigo-700 transition-all duration-300
                         hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                         hover:border-white hover:border-2"
            >
              Inizia Allenamento
            </motion.button>
          </motion.div>
        </div>

        {/* Features Grid con 3 elementi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 px-8 bg-black/30 backdrop-blur-sm">
          <Feature 
            icon="💪"
            title="Traccia i Progressi"
            description="Monitora pesi, serie e ripetizioni"
          />
          <Feature 
            icon="📊"
            title="Analisi Dettagliate"
            description="Visualizza statistiche e grafici"
          />
          <Feature 
            icon="⏱️"
            title="Timer Intelligente"
            description="Gestisci i tempi di recupero"
          />
        </div>
      </div>
    </div>
  )
}

function Feature({ icon, customIcon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center text-white py-2"
    >
      {customIcon ? (
        customIcon
      ) : (
        <span className="text-3xl mb-2 block">{icon}</span>
      )}
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  )
} 