import { motion } from 'framer-motion'
import { useState } from 'react'

export default function MonthlyReport() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  
  const monthlyData = {
    summary: {
      totalWorkouts: 16,
      totalVolume: "48,000 kg",
      avgIntensity: "72%",
      topExercise: "Squat",
      improvement: "+8%"
    },
    highlights: [
      "Nuovo record personale nello Squat: 130kg",
      "Migliorata la costanza negli allenamenti",
      "Aumentata la forza generale del 5%"
    ],
    goals: {
      achieved: ["4 allenamenti/settimana", "Aumento massa magra"],
      inProgress: ["Panca 100kg", "10 trazioni consecutive"],
      nextMonth: ["Aumentare volume totale del 10%", "Migliorare mobilità anche"]
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Report Mensile</h2>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="bg-black/20 text-white rounded-lg px-4 py-2 outline-none"
        >
          {['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 
            'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
          ].map((month, index) => (
            <option key={month} value={index}>{month}</option>
          ))}
        </select>
      </div>

      {/* Riepilogo Mensile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">Allenamenti Totali</h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-white">
              {monthlyData.summary.totalWorkouts}
            </span>
          </div>
        </div>
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">Volume Totale</h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-white">
              {monthlyData.summary.totalVolume}
            </span>
            <span className="text-green-400 text-sm">
              {monthlyData.summary.improvement}
            </span>
          </div>
        </div>
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">Intensità Media</h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-white">
              {monthlyData.summary.avgIntensity}
            </span>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-black/20 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Highlights</h3>
        <ul className="space-y-2">
          {monthlyData.highlights.map((highlight, index) => (
            <li key={index} className="flex items-center gap-2 text-white">
              <span className="text-green-400">✓</span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Obiettivi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3">Obiettivi Raggiunti</h3>
          <ul className="space-y-2">
            {monthlyData.goals.achieved.map((goal, index) => (
              <li key={index} className="text-green-400 flex items-center gap-2">
                <span>✓</span>
                {goal}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3">In Corso</h3>
          <ul className="space-y-2">
            {monthlyData.goals.inProgress.map((goal, index) => (
              <li key={index} className="text-yellow-400 flex items-center gap-2">
                <span>↻</span>
                {goal}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3">Prossimo Mese</h3>
          <ul className="space-y-2">
            {monthlyData.goals.nextMonth.map((goal, index) => (
              <li key={index} className="text-blue-400 flex items-center gap-2">
                <span>→</span>
                {goal}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
} 