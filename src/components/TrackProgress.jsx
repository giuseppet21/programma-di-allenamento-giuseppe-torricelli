import { motion } from 'framer-motion'
import { useState } from 'react'

export default function TrackProgress() {
  const [selectedExercise, setSelectedExercise] = useState('')
  const [weight, setWeight] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [notes, setNotes] = useState('')

  const exercises = [
    // Gambe
    'Squat',
    'Leg Press',
    'Leg Extension',
    'Leg Curl',
    'Bulgarian Split Squat',
    'Stacco Rumeno',
    'Affondi',
    'Calf Raise',
    'Hip Thrust',
    
    // Petto
    'Panca Piana',
    'Panca Inclinata',
    'Panca Declinata',
    'Croci con Manubri',
    'Dips',
    'Push-up',
    'Pec Deck',
    
    // Schiena
    'Stacco',
    'Trazioni',
    'Rematore con Bilanciere',
    'Rematore con Manubrio',
    'Lat Machine',
    'Pulley',
    'Face Pull',
    
    // Spalle
    'Military Press',
    'Arnold Press',
    'Alzate Laterali',
    'Alzate Frontali',
    'Alzate Posteriori',
    
    // Braccia
    'Curl con Bilanciere',
    'Curl con Manubri',
    'Hammer Curl',
    'French Press',
    'Push-down al Cavo',
    'Estensioni alla Panca',
    
    // Addominali
    'Crunch',
    'Plank',
    'Russian Twist',
    'Leg Raise',
    'Wood Chop'
  ].sort() // Li ordiniamo alfabeticamente per facilità di ricerca

  const handleSubmit = (e) => {
    e.preventDefault()
    const workout = { selectedExercise, weight, sets, reps, notes, date: new Date() }
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]')
    savedWorkouts.push(workout)
    localStorage.setItem('workouts', JSON.stringify(savedWorkouts))
  }

  const handleExerciseSelect = (e) => {
    const exercise = e.target.value
    setSelectedExercise(exercise)
    
    // Cerca l'ultimo allenamento per questo esercizio
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]')
    const lastWorkout = savedWorkouts
      .reverse()
      .find(w => w.selectedExercise === exercise)
    
    if (lastWorkout) {
      setWeight(lastWorkout.weight)
      setSets(lastWorkout.sets)
      setReps(lastWorkout.reps)
      setNotes(lastWorkout.notes)
    } else {
      // Reset dei campi se non c'è un allenamento precedente
      setWeight('')
      setSets('')
      setReps('')
      setNotes('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Traccia i tuoi Progressi</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selezione Esercizio */}
        <div>
          <label className="block text-indigo-200 mb-2">Esercizio</label>
          <select
            value={selectedExercise}
            onChange={handleExerciseSelect}
            className="w-full bg-indigo-950/50 text-white rounded-lg px-4 py-2 
                     outline-none border border-indigo-500/30 focus:border-indigo-400
                     transition-colors"
            required
          >
            <option value="">Seleziona un esercizio</option>
            {exercises.map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Peso */}
          <div>
            <label className="block text-indigo-200 mb-2">Peso (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-indigo-950/50 text-white rounded-lg px-4 py-2 
                       outline-none border border-indigo-500/30 focus:border-indigo-400
                       transition-colors"
              placeholder="80"
              required
            />
          </div>

          {/* Serie */}
          <div>
            <label className="block text-indigo-200 mb-2">Serie</label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="w-full bg-indigo-950/50 text-white rounded-lg px-4 py-2 
                       outline-none border border-indigo-500/30 focus:border-indigo-400
                       transition-colors"
              placeholder="3"
              required
            />
          </div>

          {/* Ripetizioni */}
          <div>
            <label className="block text-indigo-200 mb-2">Ripetizioni</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full bg-indigo-950/50 text-white rounded-lg px-4 py-2 
                       outline-none border border-indigo-500/30 focus:border-indigo-400
                       transition-colors"
              placeholder="12"
              required
            />
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-indigo-200 mb-2">Note (opzionale)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-indigo-950/50 text-white rounded-lg px-4 py-2 
                     outline-none border border-indigo-500/30 focus:border-indigo-400
                     transition-colors"
            placeholder="Es: Forma buona, aumentare peso prossima volta"
            rows={3}
          />
        </div>

        {/* Pulsante Salva */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold 
                   py-3 rounded-lg transition-all duration-300 border border-indigo-500
                   hover:border-white hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        >
          Salva Progressi
        </motion.button>
      </form>
    </motion.div>
  )
} 