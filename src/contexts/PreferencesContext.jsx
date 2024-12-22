import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const PreferencesContext = createContext()

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useLocalStorage('workout-preferences', {
    exerciseDuration: 30,
    restDuration: 60,
    isMuted: false,
    countdownStart: 5,
    defaultSets: 3,
    defaultReps: 12,
  })

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreference }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider')
  }
  return context
} 