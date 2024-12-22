import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ExerciseDataContext = createContext()

export function ExerciseDataProvider({ children }) {
  const [exerciseData, setExerciseData] = useLocalStorage('exercise-data', {
    weights: {},  // { exerciseName: { date: weight } }
    notes: {},    // { exerciseName: { date: note } }
    history: {},  // { exerciseName: [{ date, weight, reps, note }] }
  })

  const addExerciseData = (exerciseName, data) => {
    const date = new Date().toISOString()
    setExerciseData(prev => ({
      ...prev,
      weights: {
        ...prev.weights,
        [exerciseName]: {
          ...prev.weights[exerciseName],
          [date]: data.weight
        }
      },
      notes: {
        ...prev.notes,
        [exerciseName]: {
          ...prev.notes[exerciseName],
          [date]: data.note
        }
      },
      history: {
        ...prev.history,
        [exerciseName]: [
          ...(prev.history[exerciseName] || []),
          { date, ...data }
        ]
      }
    }))
  }

  const getLastWeight = (exerciseName) => {
    const weights = exerciseData.weights[exerciseName]
    if (!weights) return null
    const lastDate = Object.keys(weights).sort().pop()
    return weights[lastDate]
  }

  return (
    <ExerciseDataContext.Provider value={{ 
      exerciseData, 
      addExerciseData,
      getLastWeight
    }}>
      {children}
    </ExerciseDataContext.Provider>
  )
}

export function useExerciseData() {
  const context = useContext(ExerciseDataContext)
  if (!context) {
    throw new Error('useExerciseData must be used within an ExerciseDataProvider')
  }
  return context
} 