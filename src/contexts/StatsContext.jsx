import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const StatsContext = createContext()

export function StatsProvider({ children }) {
  const [stats, setStats] = useLocalStorage('workout-stats', {
    workouts: [],
    totalTime: 0,
    exercisesCompleted: 0,
    caloriesBurned: 0,
    lastWorkout: null,
    weeklyProgress: Array(7).fill(0),
  })

  const addWorkout = (workout) => {
    const today = new Date()
    const dayOfWeek = today.getDay()

    setStats(prev => {
      const newWeeklyProgress = [...prev.weeklyProgress]
      newWeeklyProgress[dayOfWeek] += workout.duration

      return {
        ...prev,
        workouts: [...prev.workouts, { ...workout, date: today.toISOString() }],
        totalTime: prev.totalTime + workout.duration,
        exercisesCompleted: prev.exercisesCompleted + workout.exercisesCompleted,
        caloriesBurned: prev.caloriesBurned + workout.calories,
        lastWorkout: today.toISOString(),
        weeklyProgress: newWeeklyProgress,
      }
    })
  }

  return (
    <StatsContext.Provider value={{ stats, addWorkout }}>
      {children}
    </StatsContext.Provider>
  )
}

export function useStats() {
  const context = useContext(StatsContext)
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider')
  }
  return context
} 