import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function SmartTimer() {
  const [time, setTime] = useState(90) // Default 90 secondi
  const [isRunning, setIsRunning] = useState(false)
  const [customTime, setCustomTime] = useState('')
  const [progress, setProgress] = useState(100)
  const [initialTime, setInitialTime] = useState(90)
  const [showVai, setShowVai] = useState(false)

  // Presets comuni per il recupero
  const presets = [
    { time: 60, label: '60s' },
    { time: 90, label: '90s' },
    { time: 120, label: '2m' },
    { time: 180, label: '3m' }
  ]

  useEffect(() => {
    let interval
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prev => {
          const newTime = prev - 1
          setProgress((newTime / initialTime) * 100)
          
          // Voce a 6 secondi dalla fine
          if (newTime === 6) {
            const utterance = new SpeechSynthesisUtterance('Ultimi sei secondi')
            utterance.lang = 'it-IT'
            utterance.volume = 1
            utterance.rate = 0.85
            utterance.pitch = 0.9
            window.speechSynthesis.cancel()
            window.speechSynthesis.speak(utterance)
          }
          
          // Esplosione quando arriva a zero
          if (newTime === 0) {
            setShowVai(true)
            // Suono di esplosione
            const explosion = new Audio('https://www.soundjay.com/mechanical/sounds/explosion-01.mp3')
            explosion.volume = 0.7
            explosion.play()
            // Nascondi "VAI!" dopo 2 secondi
            setTimeout(() => setShowVai(false), 2000)
          }
          return newTime
        })
      }, 1000)
    } else if (time === 0) {
      setIsRunning(false)
    }

    return () => clearInterval(interval)
  }, [isRunning, time, initialTime])

  const startTimer = () => setIsRunning(true)
  const pauseTimer = () => setIsRunning(false)
  const resetTimer = () => {
    setTime(initialTime)
    setProgress(100)
    setIsRunning(false)
  }

  const setCustomTimer = (e) => {
    e.preventDefault()
    const newTime = parseInt(customTime)
    if (newTime > 0) {
      setTime(newTime)
      setInitialTime(newTime)
      setProgress(100)
      setCustomTime('')
    }
  }

  // Calcola il colore del bordo basato sul progresso
  const getColor = () => {
    if (progress > 66) return '#22c55e' // verde
    if (progress > 33) return '#eab308' // giallo
    return '#ef4444' // rosso
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Timer Intelligente</h2>

      {/* Timer Circle */}
      <div className="flex justify-center mb-8 relative">
        <motion.div 
          className="relative w-48 h-48 flex items-center justify-center"
          style={{
            background: `conic-gradient(${getColor()} ${progress}%, transparent ${progress}%)`,
            borderRadius: '50%',
            boxShadow: `0 0 20px ${getColor()}40`
          }}
          animate={{
            rotate: isRunning ? 360 : 0,
            scale: showVai ? [1, 1.5, 1.2] : 1,  // Sequenza di scale per l'esplosione
            boxShadow: showVai ? [
              `0 0 20px ${getColor()}40`,
              `0 0 100px ${getColor()}90`,
              `0 0 50px ${getColor()}60`
            ] : `0 0 20px ${getColor()}40`
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 0.5,
              times: [0, 0.2, 0.5],  // Timing della sequenza di scale
              type: "spring",
              stiffness: 200
            },
            boxShadow: {
              duration: 0.5,
              times: [0, 0.2, 0.5]
            }
          }}
        >
          <div className="absolute inset-2 bg-indigo-950 rounded-full flex items-center justify-center overflow-hidden">
            {showVai ? (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: [0, 1.5, 1],
                  rotate: [180, 0],
                  opacity: [0, 1]
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.6, 1],
                  ease: "easeOut"
                }}
                className="flex items-center justify-center w-full h-full"
              >
                <span className="text-4xl font-bold text-green-500 animate-pulse">
                  VAI!
                </span>
              </motion.div>
            ) : (
              <span className="text-4xl font-bold text-white">
                {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
              </span>
            )}
          </div>
        </motion.div>

        {/* Raggi dell'esplosione */}
        {showVai && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [1, 2, 2.5]
            }}
            transition={{
              duration: 0.5,
              times: [0, 0.2, 1]
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-48 h-48 absolute">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-16 bg-green-500/50"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-100%)`,
                    transformOrigin: 'bottom'
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Controlli */}
      <div className="space-y-4">
        {/* Preset Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {presets.map(preset => (
            <motion.button
              key={preset.time}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setTime(preset.time)
                setInitialTime(preset.time)
                setProgress(100)
              }}
              className="bg-indigo-600/50 hover:bg-indigo-700/50 text-white py-2 rounded-lg
                       transition-colors border border-indigo-500/30"
            >
              {preset.label}
            </motion.button>
          ))}
        </div>

        {/* Custom Time Input */}
        <form onSubmit={setCustomTimer} className="flex gap-2">
          <input
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            placeholder="Tempo personalizzato (s)"
            className="flex-1 bg-indigo-950/50 text-white rounded-lg px-4 py-2 
                     outline-none border border-indigo-500/30 focus:border-indigo-400"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg
                     transition-colors border border-indigo-500"
          >
            Imposta
          </motion.button>
        </form>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startTimer}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg
                       transition-colors border border-green-500"
            >
              Start
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={pauseTimer}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2 rounded-lg
                       transition-colors border border-yellow-500"
            >
              Pausa
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetTimer}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-lg
                     transition-colors border border-red-500"
          >
            Reset
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
} 