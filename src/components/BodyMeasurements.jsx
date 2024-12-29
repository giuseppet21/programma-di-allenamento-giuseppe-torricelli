import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BodyMeasurements() {
  const [measurements, setMeasurements] = useState([])
  const [newMeasurement, setNewMeasurement] = useState({
    date: new Date().toISOString().split('T')[0],
    petto: '',
    spalle: '',
    vita: '',
    fianchi: '',
    braccioSx: '',
    braccioDx: '',
    cosciaSx: '',
    cosciaDx: '',
    polpaccioSx: '',
    polpaccioDx: '',
    note: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setMeasurements([...measurements, newMeasurement])
    // Resetta il form mantenendo la data di oggi
    setNewMeasurement({
      ...newMeasurement,
      petto: '',
      spalle: '',
      vita: '',
      fianchi: '',
      braccioSx: '',
      braccioDx: '',
      cosciaSx: '',
      cosciaDx: '',
      polpaccioSx: '',
      polpaccioDx: '',
      note: ''
    })
  }

  const formatDate = (dateString) => {
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString('it-IT', options)
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Misurazioni Corporee</h2>
      
      {/* Form per nuove misurazioni */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Data</label>
            <input
              type="date"
              value={newMeasurement.date}
              onChange={(e) => setNewMeasurement({...newMeasurement, date: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          {/* Campi misurazioni */}
          <div>
            <label className="block text-sm font-medium mb-1">Petto (cm)</label>
            <input
              type="number"
              value={newMeasurement.petto}
              onChange={(e) => setNewMeasurement({...newMeasurement, petto: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Spalle (cm)</label>
            <input
              type="number"
              value={newMeasurement.spalle}
              onChange={(e) => setNewMeasurement({...newMeasurement, spalle: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="0"
            />
          </div>
          
          {/* ... Altri campi simili ... */}
          
          <div className="col-span-full">
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea
              value={newMeasurement.note}
              onChange={(e) => setNewMeasurement({...newMeasurement, note: e.target.value})}
              className="w-full p-2 border rounded"
              rows="2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Salva Misurazioni
        </button>
      </form>

      {/* Storico misurazioni */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h3 className="text-xl font-semibold p-4 border-b">Storico Misurazioni</h3>
        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left">Data</th>
                  <th className="px-4 py-2 text-left">Petto</th>
                  <th className="px-4 py-2 text-left">Spalle</th>
                  <th className="px-4 py-2 text-left">Vita</th>
                  <th className="px-4 py-2 text-left">Fianchi</th>
                  <th className="px-4 py-2 text-left">Braccio Sx</th>
                  <th className="px-4 py-2 text-left">Braccio Dx</th>
                  <th className="px-4 py-2 text-left">Coscia Sx</th>
                  <th className="px-4 py-2 text-left">Coscia Dx</th>
                  <th className="px-4 py-2 text-left">Polpaccio Sx</th>
                  <th className="px-4 py-2 text-left">Polpaccio Dx</th>
                  <th className="px-4 py-2 text-left">Note</th>
                </tr>
              </thead>
              <tbody>
                {measurements.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="px-4 py-4 text-center text-gray-500">
                      Nessuna misurazione registrata
                    </td>
                  </tr>
                ) : (
                  measurements.map((m, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{formatDate(m.date)}</td>
                      <td className="px-4 py-2">{m.petto}</td>
                      <td className="px-4 py-2">{m.spalle}</td>
                      <td className="px-4 py-2">{m.vita}</td>
                      <td className="px-4 py-2">{m.fianchi}</td>
                      <td className="px-4 py-2">{m.braccioSx}</td>
                      <td className="px-4 py-2">{m.braccioDx}</td>
                      <td className="px-4 py-2">{m.cosciaSx}</td>
                      <td className="px-4 py-2">{m.cosciaDx}</td>
                      <td className="px-4 py-2">{m.polpaccioSx}</td>
                      <td className="px-4 py-2">{m.polpaccioDx}</td>
                      <td className="px-4 py-2">{m.note}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 