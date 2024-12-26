import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Toolbar from '@components/Toolbar'
import AdvancedStats from '@components/AdvancedStats'
import PerformanceAnalysis from '@components/PerformanceAnalysis'
import MonthlyReport from '@components/MonthlyReport'
import ExerciseDetail from '@components/ExerciseDetail'
import ExercisesList from '@components/ExercisesList'
import TrackProgress from '@components/TrackProgress'
import DetailedAnalysis from '@components/DetailedAnalysis'
import SmartTimer from '@components/SmartTimer'

export default function MuscleDetails() {
  const navigate = useNavigate()
  const [gender] = useState(localStorage.getItem('selectedGender'))
  const [goal] = useState(localStorage.getItem('selectedGoal'))

  const backgroundImage = "url('https://images.unsplash.com/photo-1584466977773-e625c37cdd50')"

  // Stati per le varie sezioni
  const [showProgress, setShowProgress] = useState(false)
  const [showObjectives, setShowObjectives] = useState(false)
  const [showDiary, setShowDiary] = useState(false)
  const [showPhotoProgress, setShowPhotoProgress] = useState(false)
  const [showStrengthTests, setShowStrengthTests] = useState(false)
  const [showChallenges, setShowChallenges] = useState(false)
  const [showNonWeightSuccess, setShowNonWeightSuccess] = useState(false)
  const [showRoutine, setShowRoutine] = useState(false)
  const [showAdvancedStats, setShowAdvancedStats] = useState(false)
  const [showPerformance, setShowPerformance] = useState(false)
  const [showMonthlyReport, setShowMonthlyReport] = useState(false)
  const [showSquat, setShowSquat] = useState(false)
  const [showBench, setShowBench] = useState(false)
  const [showDeadlift, setShowDeadlift] = useState(false)
  const [showOverhead, setShowOverhead] = useState(false)
  const [showPullups, setShowPullups] = useState(false)
  const [showDips, setShowDips] = useState(false)
  const [showRows, setShowRows] = useState(false)
  const [showExercises, setShowExercises] = useState(false)
  const [showTrackProgress, setShowTrackProgress] = useState(false)
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false)
  const [showTimer, setShowTimer] = useState(false)

  // Dati dei progressi
  const progressData = {
    lastWeek: {
      panchaPiana: "80kg",
      squat: "100kg",
      rematore: "70kg"
    },
    thisWeek: {
      panchaPiana: "82.5kg",
      squat: "105kg",
      rematore: "72.5kg"
    }
  }

  // Dati degli obiettivi
  const objectives = {
    current: [
      {
        exercise: "Squat",
        start: "50kg",
        target: "80kg",
        deadline: "3 mesi",
        progress: 65
      },
      {
        exercise: "Panca Piana",
        start: "40kg",
        target: "65kg",
        deadline: "3 mesi",
        progress: 55
      },
      {
        exercise: "Stacco",
        start: "60kg",
        target: "100kg",
        deadline: "3 mesi",
        progress: 45
      }
    ]
  }

  // Dati del diario
  const diaryEntries = [
    {
      date: "26/12/2024",
      workout: "Panca Piana",
      sets: "3x10",
      weight: "70kg",
      notes: "Ero stanco, ma ho finito tutte le serie.",
      measurements: {
        bodyWeight: "75kg",
        chest: "95cm",
        waist: "80cm",
        biceps: "35cm"
      }
    },
    {
      date: "24/12/2024",
      workout: "Squat",
      sets: "4x8",
      weight: "100kg",
      notes: "Ottima sessione, aumentato il peso.",
      measurements: {
        bodyWeight: "75.2kg",
        chest: "95cm",
        waist: "80cm",
        biceps: "35cm"
      }
    }
  ]

  // Dati delle foto dei progressi
  const photoProgress = [
    {
      date: "26/12/2024",
      frontView: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50",
      sideView: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50",
      notes: "Prima settimana di allenamento"
    },
    {
      date: "10/01/2025",
      frontView: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50",
      sideView: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50",
      notes: "Si iniziano a vedere i primi risultati"
    }
  ]

  // Dati dei test di forza
  const strengthTests = [
    {
      date: "26/12/2024",
      exercises: [
        { name: "Squat", weight: "80kg", reps: "5", improvement: null },
        { name: "Panca", weight: "60kg", reps: "5", improvement: null },
        { name: "Stacco", weight: "100kg", reps: "5", improvement: null }
      ]
    },
    {
      date: "24/01/2025",
      exercises: [
        { name: "Squat", weight: "85kg", reps: "5", improvement: "+5kg" },
        { name: "Panca", weight: "65kg", reps: "5", improvement: "+5kg" },
        { name: "Stacco", weight: "105kg", reps: "5", improvement: "+5kg" }
      ]
    }
  ]

  // Dati delle sfide personali
  const challenges = {
    current: [
      {
        type: "AMRAP",
        exercise: "Push-ups",
        goal: "Massimo numero in 2 minuti",
        lastResult: "35 ripetizioni",
        bestResult: "42 ripetizioni",
        deadline: "1 settimana"
      },
      {
        type: "Costanza",
        exercise: "Allenamenti Settimanali",
        goal: "4 allenamenti a settimana",
        progress: 3,
        target: 4,
        deadline: "Questa settimana"
      },
      {
        type: "Record Personale",
        exercise: "Trazioni",
        goal: "10 ripetizioni consecutive",
        current: "7 ripetizioni",
        deadline: "2 settimane"
      }
    ]
  }

  // Dati della routine di allenamento
  const workoutRoutine = {
    days: [
      {
        name: "Giorno 1 - Petto e Tricipiti",
        exercises: [
          {
            name: "Panca Piana",
            sets: 4,
            reps: "8-12",
            rest: 90, // secondi
            notes: "Aumentare il peso quando raggiungi 12 rep"
          },
          {
            name: "Panca Inclinata",
            sets: 3,
            reps: "10-12",
            rest: 90,
            notes: "Mantieni le scapole retratte"
          },
          {
            name: "Dips",
            sets: 3,
            reps: "10-15",
            rest: 60,
            notes: "Aggiungere peso se troppo facile"
          }
          // ... altri esercizi
        ]
      },
      {
        name: "Giorno 2 - Schiena e Bicipiti",
        exercises: [
          {
            name: "Stacchi",
            sets: 4,
            reps: "6-8",
            rest: 120,
            notes: "Mantieni la schiena dritta"
          },
          {
            name: "Trazioni",
            sets: 4,
            reps: "8-12",
            rest: 90,
            notes: "Presa larga per enfatizzare la schiena"
          }
          // ... altri esercizi
        ]
      }
      // ... altri giorni
    ]
  }

  const handleToolSelect = (toolId) => {
    // Resetta tutti gli stati
    setShowTrackProgress(false)
    setShowDetailedAnalysis(false)
    setShowTimer(false)
    setShowProgress(false)
    setShowObjectives(false)
    setShowDiary(false)
    setShowPhotoProgress(false)
    setShowStrengthTests(false)
    setShowChallenges(false)
    setShowRoutine(false)
    setShowExercises(false)
    
    // Attiva solo la sezione selezionata
    switch(toolId) {
      case 'progress':
        setShowTrackProgress(true)
        break
      case 'analytics':
        setShowDetailedAnalysis(true)
        break
      case 'squat':
        setShowSquat(true)
        break
      case 'bench':
        setShowBench(true)
        break
      case 'deadlift':
        setShowDeadlift(true)
        break
      case 'overhead':
        setShowOverhead(true)
        break
      case 'pullups':
        setShowPullups(true)
        break
      case 'dips':
        setShowDips(true)
        break
      case 'rows':
        setShowRows(true)
        break
      case 'objectives':
        setShowObjectives(true)
        break
      case 'diary':
        setShowDiary(true)
        break
      case 'photos':
        setShowPhotoProgress(true)
        break
      case 'strength':
        setShowStrengthTests(true)
        break
      case 'challenges':
        setShowChallenges(true)
        break
      case 'routine':
        setShowRoutine(true)
        break
      case 'advanced-stats':
        setShowAdvancedStats(true)
        break
      case 'performance':
        setShowPerformance(true)
        break
      case 'monthly-report':
        setShowMonthlyReport(true)
        break
      case 'exercises':
        setShowExercises(true)
        break
      case 'timer':
        setShowTimer(true)
        break
      default:
        break
    }
  }

  const handleExerciseSelect = (exerciseId) => {
    setShowExercises(false)
    // Qui puoi gestire la visualizzazione del dettaglio dell'esercizio
    switch(exerciseId) {
      case 'squat':
        setShowSquat(true)
        break
      case 'bench':
        setShowBench(true)
        break
      // ... altri case ...
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Toolbar onSelectTool={handleToolSelect} />

      {/* Immagine di sfondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage,
          filter: 'brightness(0.7)'
        }}
      />

      {/* Overlay Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-indigo-900/60" />

      {/* Contenuto */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Il Tuo Piano di Allenamento
            </h1>
            <p className="text-xl text-gray-300">
              Programma {goal === 'muscle' ? 'Sviluppo Massa' : 'Perdita Peso'}
            </p>
          </motion.div>

          {/* Sezione Progressi */}
          {showTrackProgress && <TrackProgress />}

          {showProgress && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">I Tuoi Progressi</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.keys(progressData.lastWeek).map((exercise) => (
                  <div key={exercise} className="bg-black/20 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
                    </h3>
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <p className="text-gray-400">Settimana Scorsa</p>
                        <p className="text-white">{progressData.lastWeek[exercise]}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400">Questa Settimana</p>
                        <p className="text-green-400">{progressData.thisWeek[exercise]}</p>
                      </div>
                    </div>
                    <div className="mt-2 h-1 bg-gray-700 rounded">
                      <div 
                        className="h-full bg-green-500 rounded"
                        style={{ 
                          width: '100%',
                          transform: 'scaleX(1.03)',
                          transformOrigin: 'left'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sezione Obiettivi */}
          {showObjectives && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">I Tuoi Obiettivi</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600/80 text-white px-4 py-2 rounded-lg 
                           text-sm font-semibold hover:bg-green-700"
                >
                  + Nuovo Obiettivo
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {objectives.current.map((objective, index) => (
                  <div key={index} className="bg-black/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-white">
                        {objective.exercise}
                      </h3>
                      <span className="text-sm text-gray-400">
                        Scadenza: {objective.deadline}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Partenza: {objective.start}</span>
                        <span className="text-gray-400">Obiettivo: {objective.target}</span>
                      </div>
                      
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-green-600">
                              {objective.progress}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                          <div 
                            style={{ width: `${objective.progress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap 
                                     text-white justify-center bg-green-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sezione Diario */}
          {showDiary && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Diario Allenamenti</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600/80 text-white px-4 py-2 rounded-lg 
                           text-sm font-semibold hover:bg-green-700"
                >
                  + Nuova Voce
                </motion.button>
              </div>

              <div className="space-y-4">
                {diaryEntries.map((entry, index) => (
                  <div key={index} className="bg-black/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {entry.workout}
                        </h3>
                        <p className="text-sm text-gray-400">{entry.date}</p>
                      </div>
                      <span className="text-white font-semibold">
                        {entry.sets} @ {entry.weight}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-3 italic">
                      "{entry.notes}"
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-gray-400">
                        Peso: <span className="text-white">{entry.measurements.bodyWeight}</span>
                      </div>
                      <div className="text-gray-400">
                        Petto: <span className="text-white">{entry.measurements.chest}</span>
                      </div>
                      <div className="text-gray-400">
                        Vita: <span className="text-white">{entry.measurements.waist}</span>
                      </div>
                      <div className="text-gray-400">
                        Bicipiti: <span className="text-white">{entry.measurements.biceps}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sezione Foto Progressi */}
          {showPhotoProgress && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Foto Progressi</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600/80 text-white px-4 py-2 rounded-lg 
                           text-sm font-semibold hover:bg-green-700"
                >
                  + Nuove Foto
                </motion.button>
              </div>

              <div className="space-y-8">
                {photoProgress.map((entry, index) => (
                  <div key={index} className="bg-black/20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-white">{entry.date}</h3>
                      <p className="text-gray-400 text-sm italic">{entry.notes}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                        <img 
                          src={entry.frontView} 
                          alt={`Progresso frontale ${entry.date}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                        <img 
                          src={entry.sideView} 
                          alt={`Progresso laterale ${entry.date}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sezione Test di Forza */}
          {showStrengthTests && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Test di Forza</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600/80 text-white px-4 py-2 rounded-lg 
                           text-sm font-semibold hover:bg-green-700"
                >
                  + Nuovo Test
                </motion.button>
              </div>

              <div className="space-y-4">
                {strengthTests.map((test, index) => (
                  <div key={index} className="bg-black/20 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">{test.date}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {test.exercises.map((exercise, i) => (
                        <div key={i} className="bg-black/20 p-3 rounded-lg">
                          <h4 className="text-white font-medium mb-2">{exercise.name}</h4>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">
                              {exercise.weight} x {exercise.reps}
                            </span>
                            {exercise.improvement && (
                              <span className="text-green-400">
                                {exercise.improvement}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sezione Sfide Personali */}
          {showChallenges && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Sfide Personali</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600/80 text-white px-4 py-2 rounded-lg 
                           text-sm font-semibold hover:bg-green-700"
                >
                  + Nuova Sfida
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {challenges.current.map((challenge, index) => (
                  <div key={index} className="bg-black/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-500 text-white">
                          {challenge.type}
                        </span>
                        <h3 className="text-lg font-semibold text-white mt-2">
                          {challenge.exercise}
                        </h3>
                      </div>
                      <span className="text-sm text-gray-400">
                        Scadenza: {challenge.deadline}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-3">
                      Obiettivo: {challenge.goal}
                    </p>

                    {challenge.type === 'AMRAP' ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Ultimo risultato:</span>
                          <span className="text-white">{challenge.lastResult}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Record personale:</span>
                          <span className="text-green-400">{challenge.bestResult}</span>
                        </div>
                      </div>
                    ) : challenge.type === 'Costanza' ? (
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-green-600">
                              {(challenge.progress / challenge.target * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                          <div 
                            style={{ width: `${(challenge.progress / challenge.target * 100)}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap 
                                     text-white justify-center bg-green-500"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Attuale:</span>
                          <span className="text-white">{challenge.current}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Obiettivo:</span>
                          <span className="text-green-400">{challenge.goal}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sezione Routine di Allenamento */}
          {showRoutine && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Routine di Allenamento</h2>
              </div>

              <div className="space-y-6">
                {workoutRoutine.days.map((day, dayIndex) => (
                  <div key={dayIndex} className="bg-black/20 rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-white mb-4">{day.name}</h3>
                    <div className="space-y-4">
                      {day.exercises.map((exercise, exIndex) => (
                        <div key={exIndex} className="bg-black/30 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-medium text-white">
                                {exercise.name}
                              </h4>
                              <p className="text-gray-400">
                                {exercise.sets} x {exercise.reps} reps
                              </p>
                            </div>
                          </div>
                          {exercise.notes && (
                            <p className="text-sm text-gray-400 mt-2 italic">
                              Nota: {exercise.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sezione Statistiche Avanzate */}
          {showAdvancedStats && <AdvancedStats />}

          {showPerformance && <PerformanceAnalysis />}

          {showMonthlyReport && <MonthlyReport />}

          {showSquat && <ExerciseDetail exercise="Squat" />}
          {showBench && <ExerciseDetail exercise="Panca Piana" />}
          {showDeadlift && <ExerciseDetail exercise="Stacco" />}
          {showOverhead && <ExerciseDetail exercise="Military Press" />}
          {showPullups && <ExerciseDetail exercise="Trazioni" />}
          {showDips && <ExerciseDetail exercise="Dips" />}
          {showRows && <ExerciseDetail exercise="Rematore" />}

          {showExercises && <ExercisesList onSelectExercise={handleExerciseSelect} />}

          {showDetailedAnalysis && <DetailedAnalysis />}

          {showTimer && <SmartTimer />}
        </div>
      </div>
    </div>
  )
} 