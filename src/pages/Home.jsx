import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="relative py-6">
        <div className="px-4 grid md:grid-cols-2 gap-4 items-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
              Il Tuo Programma <span className="text-indigo-600">Personalizzato</span>
            </h1>
            <p className="text-base text-gray-600 mb-4">
              Raggiungi i tuoi obiettivi con un piano di allenamento su misura
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-700 transition-colors duration-200 text-sm"
            >
              Inizia Allenamento
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full max-w-[200px] mx-auto"
          >
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
              alt="Fitness Training"
              className="rounded-lg shadow-lg w-full h-[150px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 px-4 max-w-3xl mx-auto"
      >
        <FeatureCard
          title="Allenamenti"
          description="Esercizi personalizzati"
          buttonText="Vai"
          buttonColor="indigo"
          icon="🏋️‍♂️"
          imageUrl="https://images.unsplash.com/photo-1549060279-7e168fcee0c2"
        />
        <FeatureCard
          title="Progressi"
          description="Monitora i risultati"
          buttonText="Vedi"
          buttonColor="emerald"
          icon="📊"
          imageUrl="https://images.unsplash.com/photo-1461938337379-4b537cd2db74"
        />
        <FeatureCard
          title="Calendario"
          description="Pianifica sessioni"
          buttonText="Apri"
          buttonColor="violet"
          icon="📅"
          imageUrl="https://images.unsplash.com/photo-1548690312-e3b507d8c110"
        />
      </motion.div>

      {/* Programma Section */}
      <section className="py-6 bg-gray-50 rounded max-w-3xl mx-auto">
        <div className="px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-bold text-center mb-4"
          >
            Il Tuo Piano
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
            <ProgramCard
              title="Forza"
              description="Esercizi base"
              icon="💪"
            />
            <ProgramCard
              title="Cardio"
              description="HIIT Training"
              icon="🏃"
            />
            <ProgramCard
              title="Recupero"
              description="Stretching"
              icon="🧘‍♂️"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, description, buttonText, buttonColor, icon, imageUrl }) {
  const colorClasses = {
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
    emerald: 'bg-emerald-600 hover:bg-emerald-700',
    violet: 'bg-violet-600 hover:bg-violet-700'
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white rounded shadow-sm overflow-hidden max-w-[160px] mx-auto w-full"
    >
      <div className="h-20 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2">
        <div className="text-lg mb-1">{icon}</div>
        <h2 className="text-xs font-bold text-gray-800 mb-1">{title}</h2>
        <p className="text-xs text-gray-600 mb-2 line-clamp-1">
          {description}
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`${colorClasses[buttonColor]} text-white px-2 py-1 rounded text-xs font-medium transition-colors duration-200 w-full`}
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.div>
  )
}

function ProgramCard({ title, description, icon }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-2 rounded shadow-sm max-w-[140px] mx-auto w-full"
    >
      <div className="text-center">
        <div className="text-2xl mb-1">{icon}</div>
        <h3 className="font-medium text-xs">{title}</h3>
        <p className="text-gray-600 text-[10px]">{description}</p>
      </div>
    </motion.div>
  )
} 