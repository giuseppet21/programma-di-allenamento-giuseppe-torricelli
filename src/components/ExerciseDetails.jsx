import { useState } from 'react'
import { useExerciseData } from '../contexts/ExerciseDataContext'

export default function ExerciseDetails({ 
  exercise, 
  currentSet,
  isActive,
  onDataSave 
}) {
  const { getLastWeight, addExerciseData } = useExerciseData()
  const [weight, setWeight] = useState(getLastWeight(exercise.name) || '')
  const [note, setNote] = useState('')
  
  const handleSave = () => {
    const data = {
      weight: parseFloat(weight),
      reps: exercise.reps,
      set: currentSet,
      note: note.trim()
    }
    
    addExerciseData(exercise.name, data)
    onDataSave?.(data)
  }

  return (
    <div className={`p-4 rounded ${
      isActive ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50'
    }`}>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{exercise.name}</h3>
          <span className="text-sm text-gray-600">
            Serie {currentSet}/{exercise.sets} × {exercise.reps}
          </span>
        </div>

        {isActive && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Peso (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
                placeholder="Inserisci peso"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Note
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 border rounded text-sm"
                placeholder="Aggiungi nota"
              />
            </div>
          </div>
        )}

        {isActive && (
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
          >
            Salva Set
          </button>
        )}

        {!isActive && getLastWeight(exercise.name) && (
          <div className="text-sm text-gray-600">
            Ultimo peso: {getLastWeight(exercise.name)} kg
          </div>
        )}
      </div>
    </div>
  )
} 