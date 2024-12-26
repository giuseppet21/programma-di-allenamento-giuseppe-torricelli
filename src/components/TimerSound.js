// Crea un oscillatore audio per il beep
const createBeep = (frequency = 520, duration = 200, volume = 0.1) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.type = 'sine'
  oscillator.frequency.value = frequency
  gainNode.gain.value = volume

  oscillator.start()
  setTimeout(() => {
    oscillator.stop()
    audioContext.close()
  }, duration)
}

export const playTimerSound = {
  warning: () => createBeep(440, 200, 0.1),  // Suono di avviso (10 secondi rimanenti)
  finish: () => {
    createBeep(520, 200, 0.1)  // Primo beep
    setTimeout(() => createBeep(520, 200, 0.1), 250)  // Secondo beep
  }
} 