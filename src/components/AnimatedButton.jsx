import { motion } from 'framer-motion'

export default function AnimatedButton({ children, onClick, className = '' }) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        shadow: "0 0 15px rgba(255,255,255,0.5)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`transition-all duration-300
                 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                 hover:border-white hover:border-2 ${className}`}
    >
      {children}
    </motion.button>
  )
} 