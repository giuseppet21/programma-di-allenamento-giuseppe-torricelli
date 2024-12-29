import { Line } from 'react-chartjs-2'
import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function MeasurementsTable({ measurements, onDeleteMeasurement }) {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [filterDate, setFilterDate] = useState('')

  // Funzione per ordinare
  const sortedMeasurements = [...measurements].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
  })

  // Funzione per filtrare
  const filteredMeasurements = sortedMeasurements.filter(m => 
    !filterDate || m.date.includes(filterDate)
  )

  // Configurazione grafici
  const weightChartData = {
    labels: filteredMeasurements.map(m => m.date),
    datasets: [{
      label: 'Peso (kg)',
      data: filteredMeasurements.map(m => m.weight),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }

  const fatChartData = {
    labels: filteredMeasurements.map(m => m.date),
    datasets: [{
      label: 'Massa Grassa (%)',
      data: filteredMeasurements.map(m => m.bodyFat),
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Andamento Misurazioni'
      }
    }
  }

  // Funzione per esportare i dati in CSV
  const exportToCSV = () => {
    const headers = ['Data', 'Peso (kg)', 'Massa Grassa (%)', 'Massa Magra (kg)', 'Note']
    const data = filteredMeasurements.map(m => 
      [m.date, m.weight, m.bodyFat, m.leanMass, m.notes].join(',')
    )
    const csv = [headers.join(','), ...data].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'misurazioni.csv'
    a.click()
  }

  return (
    <div className="p-4 space-y-6">
      {/* Controlli */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Filtra per data..."
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <button
          onClick={exportToCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Esporta CSV
        </button>
      </div>

      {/* Grafici */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <Line data={weightChartData} options={chartOptions} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <Line data={fatChartData} options={chartOptions} />
        </div>
      </div>

      {/* Tabella */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <div className="custom-scrollbar">
            <table className="min-w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-2">Data</th>
                  <th className="px-4 py-2">Peso (kg)</th>
                  <th className="px-4 py-2">Massa Grassa (%)</th>
                  <th className="px-4 py-2">Massa Magra (kg)</th>
                  <th className="px-4 py-2">Note</th>
                  <th className="px-4 py-2">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeasurements.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-2 text-center">
                      Nessuna misurazione disponibile
                    </td>
                  </tr>
                ) : (
                  filteredMeasurements.map((measurement, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{measurement.date}</td>
                      <td className="px-4 py-2">{measurement.weight}</td>
                      <td className="px-4 py-2">{measurement.bodyFat}</td>
                      <td className="px-4 py-2">{measurement.leanMass}</td>
                      <td className="px-4 py-2">{measurement.notes}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => onDeleteMeasurement(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Elimina
                        </button>
                      </td>
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