import { motion } from 'framer-motion'

export default function ExercisesList({ onSelectExercise }) {
  const exercises = [
    { id: 'squat', name: 'Squat', icon: '🏋️‍♂️' },
    { id: 'bench', name: 'Panca Piana', icon: '💪' },
    { id: 'deadlift', name: 'Stacco', icon: '🏋️' },
    { id: 'overhead', name: 'Military Press', icon: '🏋️‍♀️' },
    { id: 'pullups', name: 'Trazioni', icon: '🔄' },
    { id: 'dips', name: 'Dips', icon: '⬇️' },
    { id: 'rows', name: 'Rematore', icon: '🚣‍♂️' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Esercizi</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exercises.map((exercise) => (
          <motion.button
            key={exercise.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectExercise(exercise.id)}
            className="p-4 rounded-lg bg-indigo-600/50 hover:bg-indigo-700/50
                     text-white font-medium text-left transition-all
                     flex items-center gap-3"
          >
            <span className="text-xl">{exercise.icon}</span>
            <span>{exercise.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
} 