import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  // Stato iniziale che legge da localStorage o usa il valore iniziale
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  // Salva in localStorage quando lo stato cambia
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.log(error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
} 