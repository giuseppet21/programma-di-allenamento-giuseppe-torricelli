import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MuscleDetails() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState(90);
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [rotation, setRotation] = useState(0);
  const [scales, setScales] = useState(Array(12).fill(1));
  const [showVai, setShowVai] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  
  const boomAudio = useRef(new Audio('/sounds/boom.mp3'));
  const beepAudio = useRef(new Audio('/sound/beep.mp3'));

  useEffect(() => {
    boomAudio.current.volume = 1.0;
  }, []);

  useEffect(() => {
    beepAudio.current.volume = 0.8;
  }, []);

  // Animazione rotazione e raggi
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setRotation(prev => (prev - 2) % 360);
        setScales(prev => prev.map((_, i) => {
          const phase = (i * 30 + rotation) * (Math.PI / 180);
          return 1 + 0.5 * Math.sin(phase);
        }));
      }, 16);
    }
    return () => clearInterval(interval);
  }, [rotation, isRunning]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            setShowVai(true);
            setIsRunning(false);
            boomAudio.current.currentTime = 0;
            boomAudio.current.play();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Reset "VAI" effect
  useEffect(() => {
    if (showVai) {
      const timer = setTimeout(() => {
        setShowVai(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showVai]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(90);
    setShowVai(false);
    boomAudio.current.pause();
    boomAudio.current.currentTime = 0;
  };

  const handleTimeSelect = (seconds) => {
    setTime(seconds);
    setIsRunning(true);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customTime) {
      setTime(parseInt(customTime));
      setCustomTime('');
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm p-4 rounded-lg shadow-lg 
                   text-white font-semibold flex items-center gap-2
                   hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                   hover:border-white hover:border-2
                   transition-all duration-300"
      >
        <span>Menu</span>
        <svg 
          className={`w-5 h-5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Menu Items */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 z-40 w-80 bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden p-4 space-y-3"
          >
            <button 
              onClick={() => {
                setShowAnalytics(true);
                setShowProgress(false);
                setIsMenuOpen(false);
              }}
              className="w-full p-4 rounded-lg bg-indigo-600/50 hover:bg-indigo-700/50
                        text-white font-medium text-left transition-all
                        hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                        hover:border-white hover:border-2
                        duration-300"
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl">📊</span>
                <span>Analitiche</span>
              </div>
              <p className="text-sm text-gray-300 ml-8">
                Visualizza le statistiche di allenamento
              </p>
            </button>

            <button 
              onClick={() => {
                setShowProgress(true);
                setShowAnalytics(false);
                setIsMenuOpen(false);
              }}
              className="w-full p-4 rounded-lg bg-indigo-600/50 hover:bg-indigo-700/50
                        text-white font-medium text-left transition-all
                        hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                        hover:border-white hover:border-2
                        duration-300"
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl">📈</span>
                <span>Traccia i Progressi</span>
              </div>
              <p className="text-sm text-gray-300 ml-8">
                Registra i tuoi miglioramenti
              </p>
            </button>

            <button 
              onClick={() => {
                setShowProgress(false);
                setShowAnalytics(false);
                setIsMenuOpen(false);
              }}
              className="w-full p-4 rounded-lg bg-indigo-600/50 hover:bg-indigo-700/50
                        text-white font-medium text-left transition-all
                        hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                        hover:border-white hover:border-2
                        duration-300"
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl">⏱️</span>
                <span>Timer</span>
              </div>
              <p className="text-sm text-gray-300 ml-8">
                Timer per il recupero
              </p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics Component */}
      {showAnalytics && (
        <Analytics isVisible={showAnalytics} onClose={() => setShowAnalytics(false)} />
      )}

      {/* Progress Component */}
      {showProgress && (
        <Progress isVisible={showProgress} onClose={() => setShowProgress(false)} />
      )}

      {/* Background Image - torniamo all'immagine originale */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e')",
          filter: 'brightness(0.7)'
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-indigo-900/70" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto p-4">
        <div className="mb-8 bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20 mt-32">
          <h2 className="text-2xl font-bold text-white mb-6">Timer Intelligente</h2>
          
          {/* Timer Display */}
          <div className="flex justify-center mb-8 relative">
            {isRunning && scales.map((scale, i) => (
              <div
                key={i}
                className="absolute w-full h-1"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%)',
                  transformOrigin: 'center center',
                  filter: 'blur(4px)',
                  opacity: 0.3,
                  top: '50%',
                  left: 0,
                  transform: `scaleX(${scale}) rotate(${i * 30}deg) translateZ(0)`
                }}
              />
            ))}

            {isRunning && (
              <div 
                className="absolute w-48 h-48 rounded-full"
                style={{
                  boxShadow: '#3b82f6 0 0 40px',
                  opacity: 0.4,
                  transform: `scale(${1 + Math.sin(rotation * Math.PI / 180) * 0.1}) translateZ(0)`
                }}
              />
            )}

            <div 
              className="relative w-48 h-48 flex items-center justify-center z-10"
              style={{
                background: `conic-gradient(#3b82f6 ${(time / 90) * 100}%, transparent ${(time / 90) * 100}%)`,
                borderRadius: '50%',
                boxShadow: 'rgba(59, 130, 246, 0.4) 0 0 20px',
                transform: `rotate(${isRunning ? rotation : 0}deg) translateZ(0)`
              }}
            >
              <div className="absolute inset-2 bg-indigo-950 rounded-full flex items-center justify-center">
                <span className={`text-4xl font-bold ${showVai ? 'text-blue-500' : 'text-white'}`}>
                  {showVai ? "VAI!" : `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}
                </span>
              </div>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => handleTimeSelect(60)} 
                      className="bg-indigo-600/50 hover:bg-indigo-700/50 text-white py-2 rounded-lg
                                transition-colors border border-indigo-500/30">60s</button>
              <button onClick={() => handleTimeSelect(90)}
                      className="bg-indigo-600/50 hover:bg-indigo-700/50 text-white py-2 rounded-lg
                                transition-colors border border-indigo-500/30">90s</button>
              <button onClick={() => handleTimeSelect(120)}
                      className="bg-indigo-600/50 hover:bg-indigo-700/50 text-white py-2 rounded-lg
                                transition-colors border border-indigo-500/30">2m</button>
              <button onClick={() => handleTimeSelect(180)}
                      className="bg-indigo-600/50 hover:bg-indigo-700/50 text-white py-2 rounded-lg
                                transition-colors border border-indigo-500/30">3m</button>
            </div>

            <form onSubmit={handleCustomSubmit} className="flex gap-2">
              <input
                type="number"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                placeholder="Tempo personalizzato (s)"
                className="flex-1 bg-indigo-950/50 text-white rounded-lg px-4 py-2 
                          outline-none border border-indigo-500/30 focus:border-indigo-400"
              />
              <button type="submit" 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg
                                transition-colors border border-indigo-500">
                Imposta
              </button>
            </form>

            <div className="flex justify-center gap-4">
              <button 
                onClick={handleStartStop}
                className={`${
                  isRunning 
                    ? 'bg-red-600 hover:bg-red-700 border-red-500' 
                    : 'bg-green-600 hover:bg-green-700 border-green-500'
                } text-white px-8 py-2 rounded-lg transition-colors border`}
              >
                {isRunning ? 'Stop' : 'Start'}
              </button>
              <button 
                onClick={handleReset}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2 rounded-lg
                         transition-colors border border-yellow-500"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 