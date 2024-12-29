import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function WeightTracker() {
  // Stati per le misurazioni attuali
  const [measurements, setMeasurements] = useState({
    weight: { current: 80, target: 75 },
    bodyFat: { current: 20, target: 15 },
    measurements: {
      chest: 100,
      shoulders: 120,
      waist: 85,
      hips: 95,
      leftArm: 35,
      rightArm: 35,
      leftThigh: 60,
      rightThigh: 60,
      leftCalf: 38,
      rightCalf: 38
    }
  })

  // Stato per lo storico delle misurazioni
  const [history, setHistory] = useState([])

  // Stato per il form
  const [newMeasurement, setNewMeasurement] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    bodyFat: '',
    measurements: {
      chest: '',
      shoulders: '',
      waist: '',
      hips: '',
      leftArm: '',
      rightArm: '',
      leftThigh: '',
      rightThigh: '',
      leftCalf: '',
      rightCalf: ''
    }
  })

  // Carica lo storico dal localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('measurementsHistory')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Salva una nuova misurazione
  const saveMeasurement = (e) => {
    e.preventDefault()
    const updatedHistory = [...history, { ...newMeasurement, id: Date.now() }]
    setHistory(updatedHistory)
    localStorage.setItem('measurementsHistory', JSON.stringify(updatedHistory))
    
    // Aggiorna le misurazioni attuali
    setMeasurements(prev => ({
      ...prev,
      weight: { ...prev.weight, current: Number(newMeasurement.weight) },
      bodyFat: { ...prev.bodyFat, current: Number(newMeasurement.bodyFat) },
      measurements: { ...newMeasurement.measurements }
    }))

    // Reset form
    setNewMeasurement({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      bodyFat: '',
      measurements: {
        chest: '',
        shoulders: '',
        waist: '',
        hips: '',
        leftArm: '',
        rightArm: '',
        leftThigh: '',
        rightThigh: '',
        leftCalf: '',
        rightCalf: ''
      }
    })
  }

  // Stato per il modal informativo
  const [showBFInfo, setShowBFInfo] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20 shadow-xl"
    >
      {/* Header con effetto glassmorphism */}
      <div className="bg-white/5 rounded-lg p-4 mb-8 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Tracciamento Progressi
        </h2>
      </div>

      {/* Grafici Principali */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Grafico Peso */}
        <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
          <h4 className="text-lg font-semibold text-white mb-4">Andamento Peso</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" unit="kg" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Peso"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafico Misure */}
        <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
          <h4 className="text-lg font-semibold text-white mb-4">Misure Attuali</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[measurements.measurements]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" unit="cm" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
                {Object.keys(measurements.measurements).map((key, index) => (
                  <Bar 
                    key={key}
                    dataKey={key}
                    fill={`hsl(${index * 30}, 70%, 50%)`}
                    name={key.replace(/([A-Z])/g, ' $1').trim()}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Form con design moderno */}
      <form onSubmit={saveMeasurement} className="bg-gradient-to-br from-black/30 to-indigo-900/30 rounded-xl p-6 backdrop-blur-sm border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            value={newMeasurement.date}
            onChange={(e) => setNewMeasurement(prev => ({ ...prev, date: e.target.value }))}
            className="bg-black/20 text-white rounded-lg px-4 py-2"
          />
          <input
            type="number"
            placeholder="Peso (kg)"
            value={newMeasurement.weight}
            onChange={(e) => setNewMeasurement(prev => ({ ...prev, weight: e.target.value }))}
            className="bg-black/20 text-white rounded-lg px-4 py-2"
          />
          <div className="relative">
            <input
              type="number"
              placeholder="Grasso Corporeo (%)"
              value={newMeasurement.bodyFat}
              onChange={(e) => setNewMeasurement(prev => ({ ...prev, bodyFat: e.target.value }))}
              className="bg-black/20 text-white rounded-lg px-4 py-2 w-full"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowBFInfo(true)}
              className="absolute right-2 top-2 text-indigo-400"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {Object.keys(measurements.measurements).map(part => (
            <input
              key={part}
              type="number"
              placeholder={`${part.replace(/([A-Z])/g, ' $1').trim()} (cm)`}
              value={newMeasurement.measurements[part]}
              onChange={(e) => setNewMeasurement(prev => ({
                ...prev,
                measurements: {
                  ...prev.measurements,
                  [part]: e.target.value
                }
              }))}
              className="bg-black/20 text-white rounded-lg px-4 py-2"
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-lg px-4 py-2"
        >
          Salva Misurazioni
        </motion.button>
      </form>

      {/* Storico con effetto hover */}
      <div className="mt-8 bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-white/10">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
          Storico Misurazioni
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="bg-black/20">
                <th className="p-2">Data</th>
                <th className="p-2">Peso</th>
                <th className="p-2">Grasso</th>
                {Object.keys(measurements.measurements).map(part => (
                  <th key={part} className="p-2">
                    {part.replace(/([A-Z])/g, ' $1').trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map(entry => (
                <tr key={entry.id} className="border-t border-gray-700">
                  <td className="p-2">{entry.date}</td>
                  <td className="p-2">{entry.weight}kg</td>
                  <td className="p-2">{entry.bodyFat}%</td>
                  {Object.entries(entry.measurements).map(([part, value]) => (
                    <td key={part} className="p-2">{value}cm</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Informativo */}
      {showBFInfo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-900/90 p-6 rounded-xl max-w-2xl mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Come Misurare il Grasso Corporeo</h3>
            
            <div className="space-y-4 text-gray-300">
              <p>Ci sono diversi metodi per misurare il grasso corporeo:</p>
              
              <div className="space-y-2">
                <h4 className="text-white font-semibold">1. Plicometro (Metodo più accessibile)</h4>
                <p>Misura le pliche cutanee in punti specifici del corpo usando un plicometro:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Uomini: petto, addome, coscia</li>
                  <li>Donne: tricipite, sovrailiaca, coscia</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-semibold">2. Bioimpedenziometria</h4>
                <p>Usa una bilancia o un dispositivo specifico che misura la composizione corporea attraverso una leggera corrente elettrica.</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-semibold">3. Metodi Professionali</h4>
                <ul className="list-disc list-inside ml-4">
                  <li>DEXA Scan</li>
                  <li>Bod Pod</li>
                  <li>Idrostatic Weighing</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-indigo-800/50 rounded-lg">
                <p className="font-semibold text-white">Consiglio:</p>
                <p>Per maggiore precisione, fai eseguire la misurazione da un professionista o utilizza sempre lo stesso metodo per il monitoraggio.</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowBFInfo(false)}
              className="mt-6 w-full bg-indigo-600 text-white rounded-lg px-4 py-2"
            >
              Ho Capito
            </motion.button>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
} 