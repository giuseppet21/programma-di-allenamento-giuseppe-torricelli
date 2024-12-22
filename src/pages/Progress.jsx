import { useStats } from '../contexts/StatsContext'
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'

export default function Progress() {
  const { stats } = useStats()
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
  
  const weeklyData = stats.weeklyProgress.map((minutes, index) => ({
    day: daysOfWeek[index],
    minuti: minutes,
    calorie: Math.round(minutes * 5), // stima approssimativa
  }))

  const recentWorkouts = stats.workouts.slice(-7).map(workout => ({
    data: new Date(workout.date).toLocaleDateString(),
    durata: workout.duration,
    esercizi: workout.exercisesCompleted,
  }))

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">I Tuoi Progressi</h1>

      {/* Statistiche Generali */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Tempo Totale"
          value={`${Math.floor(stats.totalTime / 60)}h ${stats.totalTime % 60}m`}
          icon="⏱️"
        />
        <StatCard
          title="Esercizi Completati"
          value={stats.exercisesCompleted}
          icon="💪"
        />
        <StatCard
          title="Calorie Bruciate"
          value={`${stats.caloriesBurned} kcal`}
          icon="🔥"
        />
        <StatCard
          title="Ultimo Allenamento"
          value={stats.lastWorkout ? new Date(stats.lastWorkout).toLocaleDateString() : 'Mai'}
          icon="📅"
        />
      </div>

      {/* Grafico Settimanale */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Attività Settimanale</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="minuti" fill="#4F46E5" name="Minuti" />
            <Bar dataKey="calorie" fill="#10B981" name="Calorie" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Grafico Progressi Recenti */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Progressi Recenti</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={recentWorkouts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="durata" 
              stroke="#4F46E5" 
              name="Durata (min)"
            />
            <Line 
              type="monotone" 
              dataKey="esercizi" 
              stroke="#10B981" 
              name="Esercizi"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="text-sm text-gray-600">{title}</h3>
          <p className="text-lg font-semibold text-indigo-600">{value}</p>
        </div>
      </div>
    </div>
  )
} 