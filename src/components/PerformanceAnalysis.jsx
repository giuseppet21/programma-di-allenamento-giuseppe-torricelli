import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PerformanceAnalysis() {
  const [selectedExercise, setSelectedExercise] = useState('all')
  const [timeRange, setTimeRange] = useState('month')

  const performanceData = {
    exercises: [
      'Squat',
      'Panca Piana',
      'Stacco',
      'Trazioni',
      'Military Press',
      'Dips',
      'Rematore',
      'Curl con Bilanciere',
      'Leg Press',
      'Lat Machine',
      'Croci con Manubri',
      'Alzate Laterali',
      'Bulgarian Split Squat',
      'Pull-up',
      'Face Pull',
      'Curl con Manubri',
      'French Press',
      'Affondi',
      'Calf Raise',
      'Hip Thrust'
    ],
    metrics: {
      volume: {
        trend: '+12%',
        data: [
          { week: 1, value: 12000 },
          { week: 2, value: 12500 },
          { week: 3, value: 13200 },
          { week: 4, value: 13500 }
        ]
      },
      intensity: {
        trend: '+5%',
        data: [
          { week: 1, value: 70 },
          { week: 2, value: 72 },
          { week: 3, value: 73 },
          { week: 4, value: 75 }
        ]
      },
      frequency: {
        trend: 'stabile',
        value: '4x/settimana'
      },
      recovery: {
        quality: 'Buona',
        avgRestTime: '48h',
        suggestions: [
          'Aumenta il riposo tra le serie negli esercizi compound',
          'Considera un deload tra 2 settimane'
        ]
      }
    },
    insights: [
      {
        type: 'success',
        message: 'Progressione costante nel volume di allenamento'
      },
      {
        type: 'warning',
        message: 'Possibili segnali di affaticamento negli ultimi workout'
      },
      {
        type: 'tip',
        message: 'Prova ad aumentare le proteine per ottimizzare il recupero'
      }
    ]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Analisi Performance</h2>
        <div className="flex gap-4">
          {/* Selezione Esercizio */}
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="bg-black/20 text-white rounded-lg px-4 py-2 outline-none"
          >
            <option value="all">Tutti gli esercizi</option>
            {performanceData.exercises.map((exercise) => (
              <option key={exercise} value={exercise.toLowerCase()}>
                {exercise}
              </option>
            ))}
          </select>

          {/* Selezione Periodo */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-black/20 text-white rounded-lg px-4 py-2 outline-none"
          >
            <option value="week">Settimana</option>
            <option value="month">Mese</option>
            <option value="quarter">Trimestre</option>
          </select>
        </div>
      </div>

      {/* Metriche Principali */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">Volume Totale</h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-white">13,500 kg</span>
            <span className="text-green-400 text-sm">
              {performanceData.metrics.volume.trend} ↑
            </span>
          </div>
        </div>
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">Intensità Media</h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-white">75%</span>
            <span className="text-green-400 text-sm">
              {performanceData.metrics.intensity.trend} ↑
            </span>
          </div>
        </div>
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm mb-2">Frequenza</h3>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-white">
              {performanceData.metrics.frequency.value}
            </span>
            <span className="text-gray-400 text-sm">
              {performanceData.metrics.frequency.trend}
            </span>
          </div>
        </div>
      </div>

      {/* Analisi Recupero */}
      <div className="bg-black/20 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Analisi Recupero</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400 mb-2">
              Qualità Recupero: <span className="text-white">{performanceData.metrics.recovery.quality}</span>
            </p>
            <p className="text-gray-400">
              Tempo Medio Riposo: <span className="text-white">{performanceData.metrics.recovery.avgRestTime}</span>
            </p>
          </div>
          <div>
            <p className="text-gray-400 mb-2">Suggerimenti:</p>
            <ul className="list-disc list-inside text-white">
              {performanceData.metrics.recovery.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm">{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4">Insights</h3>
        {performanceData.insights.map((insight, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg ${
              insight.type === 'success' ? 'bg-green-900/20 border-l-4 border-green-500' :
              insight.type === 'warning' ? 'bg-yellow-900/20 border-l-4 border-yellow-500' :
              'bg-blue-900/20 border-l-4 border-blue-500'
            }`}
          >
            <p className="text-white">{insight.message}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
} 