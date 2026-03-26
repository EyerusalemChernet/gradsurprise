/**
 * EndingScene.jsx
 * Final celebration — fireworks, congratulatory message, then food reward.
 */
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGame, SCENES } from '../store/gameStore'
import StarBackground from '../components/StarBackground'
import DikuseCharacter from '../components/DikuseCharacter'
import AstroJerry from '../components/AstroJerry'
import FireworksEffect from '../components/FireworksEffect'

export default function EndingScene() {
  const { setScene } = useGame()

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <StarBackground speed={0.0005} />
      <FireworksEffect />

      {/* Golden atmosphere */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,200,0,0.15) 0%, transparent 70%)' }} />

      {/* Characters */}
      <div className="flex items-end justify-center gap-6 sm:gap-12 mb-6 z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <AstroJerry size={90} message="Mission complete! 🎉" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring' }}
        >
          <DikuseCharacter size={150} floating />
        </motion.div>
      </div>

      {/* Main message */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-center px-6 z-10 max-w-lg"
      >
        <h1 className="font-space text-2xl sm:text-4xl font-black text-yellow-300 glow-text mb-3 leading-tight">
          Congratulations Dikuse.
        </h1>
        <p className="font-space text-base sm:text-xl text-cyan-300 mb-4">
          Your graduation mission is complete.
        </p>
        <p className="text-white/80 text-sm sm:text-base leading-relaxed">
          Your next adventure begins now. The universe is big, but explorers like you make it even more interesting.
        </p>
      </motion.div>

      {/* Stars decoration */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{ left: `${10 + i * 11}%`, top: `${5 + (i % 3) * 10}%` }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5], rotate: [0, 180, 360] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        >
          ⭐
        </motion.div>
      ))}

      {/* Food reward button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(255,200,0,0.8)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setScene(SCENES.FOOD)}
        className="mt-8 px-8 py-4 font-space text-base font-bold text-black bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full cursor-pointer border-2 border-white/30 shadow-lg z-10"
      >
        🍽️ Claim Your Reward
      </motion.button>
    </div>
  )
}
