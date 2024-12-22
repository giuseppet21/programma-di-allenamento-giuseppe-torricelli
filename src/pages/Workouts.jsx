import { useState } from 'react'
import { motion } from 'framer-motion'
import WorkoutTimer from '../components/WorkoutTimer'
import { usePreferences } from '../contexts/PreferencesContext'
import { useStats } from '../contexts/StatsContext'
import ExerciseDetails from '../components/ExerciseDetails'

export default function Workouts() {
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const { preferences } = usePreferences()
  const { stats, addWorkout } = useStats()
  const [workoutStats, setWorkoutStats] = useState({
    duration: 0,
    exercisesCompleted: 0,
    calories: 0,
  })

  const workouts = [
    {
      id: 1,
      title: "Allenamento Forza",
      exercises: [
        { name: "Panca Piana", sets: preferences.defaultSets, reps: preferences.defaultReps, rest: preferences.restDuration },
        { name: "Stacchi", sets: preferences.defaultSets, reps: preferences.defaultReps, rest: preferences.restDuration },
        { name: "Pull-up", sets: preferences.defaultSets, reps: preferences.defaultReps, rest: preferences.restDuration },
      ]
    },
    {
      id: 2,
      title: "Cardio HIIT",
      exercises: [
        { name: "Burpees", sets: 4, reps: "30s", rest: 30 },
        { name: "Mountain Climbers", sets: 4, reps: "30s", rest: 30 },
        { name: "Jump Rope", sets: 4, reps: "45s", rest: 30 },
      ]
    }
  ]

  const handleWorkoutComplete = () => {
    addWorkout(workoutStats)
    setSelectedWorkout(null)
    setWorkoutStats({
      duration: 0,
      exercisesCompleted: 0,
      calories: 0,
    })
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Allenamenti</h1>
        {stats.lastWorkout && (
          <div className="text-sm text-gray-600">
            Ultimo allenamento: {new Date(stats.lastWorkout).toLocaleDateString()}
          </div>
        )}
      </div>

      {!selectedWorkout ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workouts.map((workout) => (
            <WorkoutCard 
              key={workout.id}
              workout={workout}
              onClick={() => setSelectedWorkout(workout)}
            />
          ))}
        </div>
      ) : (
        <WorkoutDetail 
          workout={selectedWorkout}
          onBack={() => setSelectedWorkout(null)}
          onComplete={handleWorkoutComplete}
          onStatsUpdate={(newStats) => setWorkoutStats(prev => ({
            ...prev,
            ...newStats
          }))}
          preferences={preferences}
        />
      )}
    </div>
  )
}

function WorkoutCard({ workout, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white p-4 rounded-lg shadow-sm cursor-pointer"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{workout.title}</h2>
      <div className="space-y-1">
        {workout.exercises.map((exercise, index) => (
          <p key={index} className="text-sm text-gray-600">
            • {exercise.name} ({exercise.sets}×{exercise.reps})
          </p>
        ))}
      </div>
    </motion.div>
  )
}

function WorkoutDetail({ workout, onBack, onComplete, onStatsUpdate, preferences }) {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [isResting, setIsResting] = useState(false)
  const [totalDuration, setTotalDuration] = useState(0)
  const [completedExercises, setCompletedExercises] = useState(0)

  const exercise = workout.exercises[currentExercise]

  const handleTimerComplete = () => {
    if (isResting) {
      setIsResting(false)
      if (currentSet < exercise.sets) {
        setCurrentSet(prev => prev + 1)
      } else {
        setCurrentSet(1)
        if (currentExercise < workout.exercises.length - 1) {
          setCurrentExercise(prev => prev + 1)
          setCompletedExercises(prev => prev + 1)
        } else {
          // Workout completato
          onStatsUpdate({
            duration: totalDuration,
            exercisesCompleted: completedExercises + 1,
            calories: Math.round(totalDuration * 5), // stima approssimativa
          })
          onComplete()
        }
      }
    } else {
      setIsResting(true)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="text-indigo-600 hover:text-indigo-700 flex items-center"
        >
          ← Torna agli allenamenti
        </button>
        <div className="text-sm text-gray-600">
          Durata: {Math.floor(totalDuration / 60)}:{String(totalDuration % 60).padStart(2, '0')}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{workout.title}</h2>
        
        <div className="space-y-4">
          {workout.exercises.map((ex, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <ExerciseDetails
                exercise={ex}
                currentSet={index === currentExercise ? currentSet : 0}
                isActive={index === currentExercise}
                onDataSave={(data) => {
                  // Aggiorna le statistiche se necessario
                }}
              />
              {index === currentExercise && (
                <div className="flex justify-center">
                  <WorkoutTimer
                    duration={isResting ? exercise.rest : preferences.exerciseDuration}
                    onComplete={handleTimerComplete}
                    type={isResting ? 'rest' : 'exercise'}
                    onTimeUpdate={() => setTotalDuration(prev => prev + 1)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 