import { motion } from 'framer-motion'

export default function CalorieTracker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Tracciamento Calorie</h2>
      {/* Implementazione del tracciamento calorie */}
    </motion.div>
  )
} 