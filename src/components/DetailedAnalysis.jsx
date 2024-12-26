import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from 'recharts'

export default function DetailedAnalysis() {
  const [selectedExercise, setSelectedExercise] = useState('all')
  const [timeRange, setTimeRange] = useState('month')

  // Recupera i dati dal localStorage
  const workouts = JSON.parse(localStorage.getItem('workouts') || '[]')

  // Prepara i dati per i grafici
  const progressData = workouts.map(workout => ({
    date: new Date(workout.date).toLocaleDateString(),
    peso: Number(workout.weight),
    serie: Number(workout.sets),
    ripetizioni: Number(workout.reps),
    volume: Number(workout.weight) * Number(workout.sets) * Number(workout.reps),
    esercizio: workout.selectedExercise
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Analisi Dettagliate</h2>

      {/* Filtri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-indigo-200 mb-2">Esercizio</label>
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="w-full bg-indigo-950/50 text-white rounded-lg px-4 py-2 
                     outline-none border border-indigo-500/30 focus:border-indigo-400"
          >
            <option value="all">Tutti gli esercizi</option>
            {[...new Set(workouts.map(w => w.selectedExercise))].map(exercise => (
              <option key={exercise} value={exercise}>{exercise}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-indigo-200 mb-2">Periodo</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full bg-indigo-950/50 text-white rounded-lg px-4 py-2 
                     outline-none border border-indigo-500/30 focus:border-indigo-400"
          >
            <option value="week">Ultima settimana</option>
            <option value="month">Ultimo mese</option>
            <option value="year">Ultimo anno</option>
          </select>
        </div>
      </div>

      {/* Grafici */}
      <div className="space-y-8">
        {/* Grafico Progressione Peso */}
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Progressione Peso</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="peso" 
                  stroke="#6366F1" 
                  strokeWidth={2}
                  dot={{ fill: '#6366F1' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafico Volume Totale */}
        <div className="bg-black/20 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Volume Totale</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Legend />
                <Bar dataKey="volume" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistiche Riassuntive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/20 rounded-lg p-4">
            <h4 className="text-indigo-200 text-sm mb-1">Peso Massimo</h4>
            <p className="text-2xl font-bold text-white">
              {Math.max(...progressData.map(d => d.peso))} kg
            </p>
          </div>
          
          <div className="bg-black/20 rounded-lg p-4">
            <h4 className="text-indigo-200 text-sm mb-1">Volume Medio</h4>
            <p className="text-2xl font-bold text-white">
              {Math.round(progressData.reduce((acc, curr) => acc + curr.volume, 0) / progressData.length)} kg
            </p>
          </div>

          <div className="bg-black/20 rounded-lg p-4">
            <h4 className="text-indigo-200 text-sm mb-1">Sessioni Totali</h4>
            <p className="text-2xl font-bold text-white">
              {progressData.length}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 