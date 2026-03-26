/**
 * FoodReward.jsx
 * The food reward screen — spaghetti bolognese and Ethiopian kitfo.
 */
import { motion } from 'framer-motion'
import { useGame, SCENES } from '../store/gameStore'
import StarBackground from '../components/StarBackground'
import AstroJerry from '../components/AstroJerry'

const FOODS = [
  {
    emoji: '🍝',
    name: 'Spaghetti Bolognese',
    desc: 'Rich, hearty, and deeply satisfying — just like your journey to graduation.',
  },
  {
    emoji: '🥩',
    name: 'Ethiopian Kitfo',
    desc: 'A taste of home and heritage. The finest celebration food in the galaxy.',
  },
]

export default function FoodReward() {
  const { setScene } = useGame()

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <StarBackground speed={0.0001} />

      {/* Warm atmosphere */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(200,100,0,0.2) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 z-10 px-4"
      >
        <h2 className="font-space text-2xl sm:text-3xl text-yellow-300 glow-text mb-2">
          🍽️ Mission Reward
        </h2>
        <p className="text-white/70 text-sm sm:text-base">
          Every great mission deserves great food.
        </p>
      </motion.div>

      {/* Food cards */}
      <div className="flex flex-col sm:flex-row gap-6 z-10 px-6 max-w-lg w-full">
        {FOODS.map((food, i) => (
          <motion.div
            key={food.name}
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.3, type: 'spring' }}
            className="flex-1 flex flex-col items-center text-center p-6 rounded-3xl"
            style={{
              background: 'rgba(255,150,50,0.15)',
              border: '2px solid rgba(255,180,80,0.4)',
              boxShadow: '0 0 30px rgba(255,150,50,0.2)',
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl sm:text-7xl mb-4"
            >
              {food.emoji}
            </motion.div>
            <h3 className="font-space text-base text-yellow-300 font-bold mb-2">{food.name}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{food.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* AstroJerry */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-6 z-10"
      >
        <AstroJerry
          size={80}
          message="Bon appétit, Dikuse! You earned every bite. 🐱"
        />
      </motion.div>

      {/* Back to galaxy */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setScene(SCENES.GALAXY)}
        className="mt-6 px-6 py-3 font-space text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/50 rounded-full transition-colors z-10"
      >
        🌌 Back to Galaxy
      </motion.button>
    </div>
  )
}
