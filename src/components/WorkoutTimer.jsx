import { useState, useEffect, useCallback } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { motion } from 'framer-motion'
import { playSound } from '../utils/sounds'

export default function WorkoutTimer({ 
  duration, 
  onComplete, 
  type = 'exercise',
  onTimeUpdate,
  customDuration,
  onDurationChange 
}) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const reset = useCallback(() => {
    setTimeLeft(duration)
    setIsActive(false)
    setIsPaused(false)
  }, [duration])

  useEffect(() => {
    let interval = null
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          const newTime = time - 1
          if (!isMuted && newTime <= 5 && newTime > 0) {
            playSound('countdown')
          }
          onTimeUpdate?.(newTime)
          return newTime
        })
      }, 1000)
    } else if (timeLeft === 0) {
      if (!isMuted) playSound(type)
      onComplete?.()
      reset()
    }
    return () => clearInterval(interval)
  }, [isActive, isPaused, timeLeft, onComplete, reset, type, isMuted, onTimeUpdate])

  const toggleTimer = () => {
    if (!isActive) {
      setIsActive(true)
    } else {
      setIsPaused(!isPaused)
    }
  }

  return (
    <div className="w-32 mx-auto">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTimer}
        className="cursor-pointer relative"
      >
        <CircularProgressbar
          value={(timeLeft / duration) * 100}
          text={`${timeLeft}s`}
          styles={buildStyles({
            pathColor: isActive && !isPaused ? 
              type === 'exercise' ? '#4F46E5' : '#10B981' 
              : '#9CA3AF',
            textColor: type === 'exercise' ? '#4F46E5' : '#10B981',
            trailColor: '#E5E7EB',
          })}
        />
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsMuted(!isMuted)
          }}
          className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-sm"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </motion.div>
      
      {customDuration && (
        <input
          type="range"
          min="5"
          max="300"
          value={duration}
          onChange={(e) => onDurationChange?.(Number(e.target.value))}
          className="w-full mt-2"
        />
      )}
      
      <div className="text-center mt-2">
        <p className="text-sm text-gray-600">
          {!isActive ? 'Click per iniziare' : 
           isPaused ? 'Click per riprendere' : 'Click per pausa'}
        </p>
        {(isActive || timeLeft < duration) && (
          <button
            onClick={reset}
            className="text-xs text-indigo-600 hover:text-indigo-800 mt-1"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  )
} 