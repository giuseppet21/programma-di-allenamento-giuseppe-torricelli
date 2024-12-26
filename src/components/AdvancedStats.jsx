import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AdvancedStats() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  
  const stats = {
    performance: {
      improvement: '+15%',
      trend: 'up',
      details: [
        { name: 'Volume Totale', value: '12,450 kg', change: '+8%' },
        { name: 'Intensità Media', value: '75%', change: '+5%' },
        { name: 'Frequenza', value: '4x/sett', change: '+1' }
      ]
    },
    records: [
      { exercise: 'Squat', value: '120kg', date: '15/03/2024' },
      { exercise: 'Panca', value: '90kg', date: '12/03/2024' },
      { exercise: 'Stacco', value: '140kg', date: '18/03/2024' }
    ],
    trends: {
      volume: [100, 120, 115, 130, 125, 140, 135],
      intensity: [65, 70, 68, 72, 75, 73, 78]
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Statistiche Avanzate</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedPeriod === 'week' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-black/20 text-gray-300'
            }`}
          >
            Settimana
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedPeriod === 'month' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-black/20 text-gray-300'
            }`}
          >
            Mese
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.performance.details.map((metric, index) => (
          <div key={index} className="bg-black/20 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">{metric.name}</h3>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-bold text-white">{metric.value}</span>
              <span className={`text-sm ${
                metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Records */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Record Personali</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.records.map((record, index) => (
            <div key={index} className="bg-black/20 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-medium">{record.exercise}</h4>
                  <p className="text-gray-400 text-sm">{record.date}</p>
                </div>
                <span className="text-xl font-bold text-green-400">{record.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trends Graph */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Tendenze</h3>
        <div className="bg-black/20 rounded-lg p-4 h-64">
          {/* Qui potremmo aggiungere un grafico con una libreria come recharts o chart.js */}
          <div className="text-gray-400 text-center">
            Grafico delle tendenze (volume e intensità)
          </div>
        </div>
      </div>
    </motion.div>
  )
} 