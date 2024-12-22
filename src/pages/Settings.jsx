import { motion } from 'framer-motion'
import { usePreferences } from '../contexts/PreferencesContext'

export default function Settings() {
  const { preferences, updatePreference } = usePreferences()

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Impostazioni</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        {/* Durata Esercizio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durata Esercizio: {preferences.exerciseDuration}s
          </label>
          <input
            type="range"
            min="10"
            max="120"
            value={preferences.exerciseDuration}
            onChange={(e) => updatePreference('exerciseDuration', Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Durata Riposo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durata Riposo: {preferences.restDuration}s
          </label>
          <input
            type="range"
            min="10"
            max="180"
            value={preferences.restDuration}
            onChange={(e) => updatePreference('restDuration', Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Serie Default */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Serie Default: {preferences.defaultSets}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={preferences.defaultSets}
            onChange={(e) => updatePreference('defaultSets', Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Ripetizioni Default */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ripetizioni Default: {preferences.defaultReps}
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={preferences.defaultReps}
            onChange={(e) => updatePreference('defaultReps', Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Audio */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Audio</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => updatePreference('isMuted', !preferences.isMuted)}
            className={`px-4 py-2 rounded-full ${
              preferences.isMuted ? 'bg-gray-200' : 'bg-indigo-600 text-white'
            }`}
          >
            {preferences.isMuted ? '🔇 Muto' : '🔊 Attivo'}
          </motion.button>
        </div>

        {/* Countdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inizio Countdown: {preferences.countdownStart}s
          </label>
          <input
            type="range"
            min="3"
            max="10"
            value={preferences.countdownStart}
            onChange={(e) => updatePreference('countdownStart', Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
} 