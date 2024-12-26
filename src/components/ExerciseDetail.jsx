import { motion } from 'framer-motion'
import { useState } from 'react'

const exerciseDataMap = {
  "Squat": {
    currentMax: "140kg",
    previousMax: "135kg",
    improvement: "+5kg",
    history: [
      { date: "15/03/2024", weight: "140kg", reps: 5, notes: "Nuovo PR!" },
      { date: "08/03/2024", weight: "135kg", reps: 5, notes: "Forma migliorata" }
    ],
    form: {
      cues: [
        "Mantieni la schiena dritta",
        "Respira nel punto più basso",
        "Spinge attraverso i talloni"
      ],
      commonMistakes: [
        "Ginocchia che collassano internamente",
        "Schiena che si piega",
        "Peso spostato in avanti"
      ]
    },
    accessories: [
      "Front Squat",
      "Bulgarian Split Squat",
      "Leg Press"
    ]
  },
  "Panca Piana": {
    currentMax: "100kg",
    previousMax: "95kg",
    improvement: "+5kg",
    history: [
      { date: "14/03/2024", weight: "100kg", reps: 5, notes: "Nuovo PR!" },
      { date: "07/03/2024", weight: "95kg", reps: 5, notes: "Tecnica migliorata" }
    ],
    form: {
      cues: [
        "Scapole retratte",
        "Piedi ben piantati",
        "Arco lombare controllato"
      ],
      commonMistakes: [
        "Rimbalzo sul petto",
        "Glutei che si alzano",
        "Polsi piegati"
      ]
    },
    accessories: [
      "Panca Inclinata",
      "Dips",
      "Push-up"
    ]
  },
  "Stacco": {
    currentMax: "180kg",
    previousMax: "175kg",
    improvement: "+5kg",
    // ... altri dati specifici per lo stacco
  },
  // ... altri esercizi
}

export default function ExerciseDetail({ exercise }) {
  const [timeRange, setTimeRange] = useState('month')
  const exerciseData = exerciseDataMap[exercise] || exerciseDataMap["Squat"]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{exercise}</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-black/20 text-white rounded-lg px-4 py-2 outline-none"
        >
          <option value="week">Settimana</option>
          <option value="month">Mese</option>
          <option value="year">Anno</option>
        </select>
      </div>

      {/* Massimali */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">PR Attuale</h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-white">
              {exerciseData.currentMax}
            </span>
          </div>
        </div>
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">PR Precedente</h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-white">
              {exerciseData.previousMax}
            </span>
          </div>
        </div>
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">Miglioramento</h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-green-400">
              {exerciseData.improvement}
            </span>
          </div>
        </div>
      </div>

      {/* Storico */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Storico</h3>
        <div className="space-y-3">
          {exerciseData.history.map((session, index) => (
            <div key={index} className="bg-black/20 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-gray-400">{session.date}</span>
                  <div className="text-white font-medium">
                    {session.weight} x {session.reps}
                  </div>
                </div>
                <span className="text-gray-400 italic">{session.notes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form e Tecnica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3">Punti Chiave</h3>
          <ul className="space-y-2">
            {exerciseData.form.cues.map((cue, index) => (
              <li key={index} className="text-green-400 flex items-center gap-2">
                <span>✓</span>
                {cue}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3">Errori Comuni</h3>
          <ul className="space-y-2">
            {exerciseData.form.commonMistakes.map((mistake, index) => (
              <li key={index} className="text-red-400 flex items-center gap-2">
                <span>✗</span>
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Esercizi Accessori */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Esercizi Accessori</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exerciseData.accessories.map((exercise, index) => (
            <div key={index} className="bg-black/20 rounded-lg p-4">
              <span className="text-white">{exercise}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
} 