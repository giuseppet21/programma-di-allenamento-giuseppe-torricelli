class SoundGenerator {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }

  async createBeep(frequency = 500, duration = 100, volume = 0.1, type = 'sine') {
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.type = type
    oscillator.frequency.value = frequency
    gainNode.gain.value = volume

    oscillator.start()
    
    return new Promise(resolve => {
      setTimeout(() => {
        oscillator.stop()
        resolve()
      }, duration)
    })
  }
}

const soundGen = new SoundGenerator()

export const playSound = async (type) => {
  try {
    if (type === 'countdown') {
      await soundGen.createBeep(600, 100, 0.05) // Beep più leggero per countdown
    } else if (type === 'exercise') {
      // Doppio beep per fine esercizio
      await soundGen.createBeep(700, 100, 0.1)
      setTimeout(async () => {
        await soundGen.createBeep(700, 100, 0.1)
      }, 150)
    }
  } catch (err) {
    console.log('Audio play failed:', err)
  }
}

export const toggleMute = (isMuted) => {
  // Il mute viene gestito dal componente
} 