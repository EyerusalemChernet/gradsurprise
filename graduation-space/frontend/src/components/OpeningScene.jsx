import { motion } from 'framer-motion'
import { useGame, SCENES } from '../store/gameStore'
import StarBackground from './StarBackground'
import DikuseCharacter from './DikuseCharacter'
import AstroJerry from './AstroJerry'
import ConfettiEffect from './ConfettiEffect'

export default function OpeningScene() {
  const { setScene } = useGame()

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <StarBackground />
      <ConfettiEffect duration={5000} />

      <div className="flex items-end justify-center gap-6 sm:gap-12 mb-6">
        <motion.div initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}>
          <AstroJerry size={100} message="Congratulations Dikuse! Mission accomplished! Lets explore the galaxy!" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}>
          <DikuseCharacter size={140} floating />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="text-center px-4 w-full flex flex-col items-center">
        <h1 className="font-space text-3xl sm:text-5xl font-black text-yellow-300 glow-text mb-2 tracking-wider">
          MISSION ACCOMPLISHED
        </h1>
        <p className="font-space text-lg sm:text-2xl text-cyan-300 glow-text mb-1">
          Graduation Complete
        </p>
        <p className="text-white/70 text-sm sm:text-base mt-2 text-center">
          The universe has been waiting for you, Dikuse.
        </p>
      </motion.div>

      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-yellow-300"
          style={{ left: `${15 + i * 14}%`, top: `${10 + (i % 3) * 8}%` }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }} />
      ))}

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(100,200,255,0.8)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setScene(SCENES.GALAXY)}
        className="mt-8 px-8 py-4 font-space text-lg font-bold text-black bg-gradient-to-r from-cyan-300 to-yellow-300 rounded-full cursor-pointer border-2 border-white/30 shadow-lg">
        🚀 Start the Journey
      </motion.button>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2.5 }}
        className="absolute bottom-6 text-white/50 text-xs font-space text-center">
        A galaxy of surprises awaits
      </motion.p>
    </div>
  )
}