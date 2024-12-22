import { motion } from 'framer-motion'

export default function WorkoutSummary({ 
  totalTime,
  exercisesCompleted,
  totalExercises,
  caloriesBurned
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4">Riepilogo Allenamento</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Tempo Totale</p>
          <p className="text-2xl font-bold text-indigo-600">
            {Math.floor(totalTime / 60)}:{String(totalTime % 60).padStart(2, '0')}
          </p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Esercizi Completati</p>
          <p className="text-2xl font-bold text-indigo-600">
            {exercisesCompleted}/{totalExercises}
          </p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Calorie Bruciate</p>
          <p className="text-2xl font-bold text-emerald-600">
            {caloriesBurned} kcal
          </p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Efficacia</p>
          <p className="text-2xl font-bold text-emerald-600">
            {Math.round((exercisesCompleted / totalExercises) * 100)}%
          </p>
        </div>
      </div>
    </motion.div>
  )
} 