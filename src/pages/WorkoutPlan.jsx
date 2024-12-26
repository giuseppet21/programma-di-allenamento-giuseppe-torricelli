import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function WorkoutPlan() {
  const navigate = useNavigate()
  const [gender] = useState(localStorage.getItem('selectedGender'))
  const [goal] = useState(localStorage.getItem('selectedGoal'))

  const backgroundImage = gender === 'female' 
    ? "url('https://images.unsplash.com/photo-1518310383802-640c2de311b2')"
    : "url('https://images.unsplash.com/photo-1605296867424-35fc25c9212a')"

  const [showProgress, setShowProgress] = useState(false)
  const [showObjectives, setShowObjectives] = useState(false)
  const [showDiary, setShowDiary] = useState(false)
  const [showPhotoProgress, setShowPhotoProgress] = useState(false)
  const [showStrengthTests, setShowStrengthTests] = useState(false)
  const [showChallenges, setShowChallenges] = useState(false)
  const [showNonWeightSuccess, setShowNonWeightSuccess] = useState(false)

  const objectives = {
    current: [
      {
        exercise: "Squat",
        start: "50kg",
        target: "80kg",
        deadline: "3 mesi",
        progress: 65 // percentuale
      },
      {
        exercise: "Corsa",
        start: "2km",
        target: "5km",
        deadline: "2 mesi",
        progress: 40
      },
      {
        exercise: "Panca Piana",
        start: "40kg",
        target: "65kg",
        deadline: "3 mesi",
        progress: 55
      }
    ]
  }

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

  const photoProgress = [
    {
      date: "26/12/2024",
      frontView: "/src/assets/images/progress-front-1.jpg",
      sideView: "/src/assets/images/progress-side-1.jpg",
      notes: "Prima settimana di allenamento"
    },
    {
      date: "10/01/2025",
      frontView: "/src/assets/images/progress-front-2.jpg",
      sideView: "/src/assets/images/progress-side-2.jpg",
      notes: "Si iniziano a vedere i primi risultati"
    }
  ]

  const strengthTests = [
    {
      date: "26/12/2024",
      exercises: [
        { name: "Squat", weight: "80kg", reps: "5" },
        { name: "Panca", weight: "60kg", reps: "5" },
        { name: "Stacco", weight: "100kg", reps: "5" }
      ]
    },
    {
      date: "24/01/2025",
      exercises: [
        { name: "Squat", weight: "85kg", reps: "5" },
        { name: "Panca", weight: "65kg", reps: "5" },
        { name: "Stacco", weight: "105kg", reps: "5" }
      ]
    }
  ]

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
      }
    ]
  }

  const nonWeightSuccess = [
    {
      category: "Postura",
      improvements: [
        "Spalle più dritte",
        "Meno dolore alla schiena",
        "Migliore allineamento"
      ],
      date: "Ultimo mese"
    },
    {
      category: "Energia",
      improvements: [
        "Sveglia più facile la mattina",
        "Meno stanchezza pomeridiana",
        "Migliore concentrazione"
      ],
      date: "Ultime 2 settimane"
    },
    {
      category: "Alimentazione",
      improvements: [
        "Meno voglie di dolci",
        "Porzioni più controllate",
        "Scelte più consapevoli"
      ],
      date: "Ultimo mese"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
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

          <div className="flex gap-4 justify-center mb-8 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowProgress(!showProgress)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg 
                       text-lg font-semibold shadow-lg hover:bg-indigo-700 
                       transition-all duration-300"
            >
              {showProgress ? "Nascondi Progressi" : "Mostra Progressi"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowObjectives(!showObjectives)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg 
                       text-lg font-semibold shadow-lg hover:bg-indigo-700 
                       transition-all duration-300"
            >
              {showObjectives ? "Nascondi Obiettivi" : "Mostra Obiettivi"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDiary(!showDiary)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg 
                       text-lg font-semibold shadow-lg hover:bg-indigo-700 
                       transition-all duration-300"
            >
              {showDiary ? "Nascondi Diario" : "Mostra Diario"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPhotoProgress(!showPhotoProgress)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg 
                       text-lg font-semibold shadow-lg hover:bg-indigo-700 
                       transition-all duration-300"
            >
              {showPhotoProgress ? "Nascondi Foto" : "Progressi Foto"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowStrengthTests(!showStrengthTests)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg 
                       text-lg font-semibold shadow-lg hover:bg-indigo-700 
                       transition-all duration-300"
            >
              {showStrengthTests ? "Nascondi Test" : "Test di Forza"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowChallenges(!showChallenges)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg 
                       text-lg font-semibold shadow-lg hover:bg-indigo-700 
                       transition-all duration-300"
            >
              {showChallenges ? "Nascondi Sfide" : "Sfide Personali"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowNonWeightSuccess(!showNonWeightSuccess)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg 
                       text-lg font-semibold shadow-lg hover:bg-indigo-700 
                       transition-all duration-300"
            >
              {showNonWeightSuccess ? "Nascondi Successi" : "Altri Successi"}
            </motion.button>
          </div>

          {/* Sezione Progressi */}
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
                            {index > 0 && (
                              <span className="text-green-400">
                                +5kg
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {challenges.current.map((challenge, index) => (
                  <div key={index} className="bg-black/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-semibold bg-indigo-500 text-white px-2 py-1 rounded-full">
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
                    
                    <p className="text-gray-300 mb-3">
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
                    ) : (
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
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sezione Successi Non Legati al Peso */}
          {showNonWeightSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Altri Successi</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600/80 text-white px-4 py-2 rounded-lg 
                           text-sm font-semibold hover:bg-green-700"
                >
                  + Nuovo Successo
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {nonWeightSuccess.map((success, index) => (
                  <div key={index} className="bg-black/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-white">
                        {success.category}
                      </h3>
                      <span className="text-sm text-gray-400">
                        {success.date}
                      </span>
                    </div>
                    
                    <ul className="space-y-2">
                      {success.improvements.map((improvement, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-center">
                          <span className="text-green-400 mr-2">✓</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 