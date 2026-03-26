/**
 * MemoryPlanet.jsx
 * Floating memory bubbles with compliments and observations about Dikuse.
 * Click a bubble to expand and reveal the full message.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame, SCENES } from '../store/gameStore'
import StarBackground from '../components/StarBackground'
import AstroJerry from '../components/AstroJerry'

const MEMORIES = [
  { id: 1, preview: '🌟 Curiosity', full: 'Your curiosity about the universe is one of your greatest superpowers. You ask the questions others are afraid to ask.' },
  { id: 2, preview: '📚 Dedication', full: 'You showed up, put in the work, and crossed the finish line. That dedication will take you further than any degree.' },
  { id: 3, preview: '🤝 Kindness', full: 'The way you treat people around you says everything. You are genuinely one of the kindest person i know and you were so kind to Pallino too. I hope your mom knows what a kind soul she raised.' },
  { id: 4, preview: '🔭 Vision', full: 'You see possibilities where others see obstacles. That\'s the mark of someone who will genuinely change things.' },
  { id: 5, preview: '😄 Humor', full: 'Your sense of humor is a gift. You can make anyone laugh, and that\'s a rare and wonderful thing.' },
  { id: 6, preview: '💪 Resilience', full: 'You faced challenges and kept going. Every setback was just a setup for a bigger comeback. And you really inspire me too!' },
  { id: 7, preview: '🌍 Perspective', full: 'You carry a unique perspective shaped by your experiences.' },
  { id: 8, preview: '⚡ Energy', full: 'When you\'re excited about something, that energy is contagious.' },
]

// Deterministic positions for bubbles
const POSITIONS = [
  { x: 10, y: 15 }, { x: 65, y: 10 }, { x: 80, y: 35 },
  { x: 5, y: 50 }, { x: 55, y: 55 }, { x: 25, y: 70 },
  { x: 75, y: 70 }, { x: 40, y: 20 },
]

export default function MemoryPlanet() {
  const { setScene, visitPlanet } = useGame()
  const [expanded, setExpanded] = useState(null)

  const handleBack = () => {
    visitPlanet('memory')
    setScene(SCENES.GALAXY)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <StarBackground speed={0.0001} />

      {/* Purple nebula atmosphere */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(100,0,150,0.3) 0%, transparent 70%)' }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-0 right-0 text-center z-10"
      >
        <h2 className="font-space text-2xl sm:text-3xl text-purple-300 glow-text">💜 Memory Planet</h2>
        <p className="text-white/50 text-xs mt-1">Tap a bubble to reveal a memory</p>
      </motion.div>

      {/* Floating memory bubbles */}
      {MEMORIES.map((mem, i) => (
        <motion.div
          key={mem.id}
          className="absolute cursor-pointer"
          style={{
            left: `${POSITIONS[i].x}%`,
            top: `${POSITIONS[i].y + 8}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12 - (i % 3) * 5, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: i * 0.1 },
            scale: { duration: 0.5, delay: i * 0.1 },
            y: { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
          }}
          onClick={() => setExpanded(mem.id)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className="flex items-center justify-center rounded-full font-space text-xs sm:text-sm font-bold text-white"
            style={{
              width: 70 + (i % 3) * 15,
              height: 70 + (i % 3) * 15,
              background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.3), rgba(150,50,200,0.6))`,
              border: '2px solid rgba(200,100,255,0.6)',
              boxShadow: '0 0 15px rgba(150,50,200,0.5)',
              textAlign: 'center',
              padding: '8px',
            }}
          >
            {mem.preview}
          </div>
        </motion.div>
      ))}

      {/* Particle effects */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`p${i}`}
          className="absolute w-1 h-1 rounded-full bg-purple-300 pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      {/* Expanded bubble modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative z-10 max-w-sm w-full rounded-3xl p-8 text-center"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(180,80,255,0.4), rgba(80,0,120,0.9))',
                border: '2px solid rgba(200,100,255,0.6)',
                boxShadow: '0 0 40px rgba(150,50,200,0.6)',
              }}
              onClick={e => e.stopPropagation()}
            >
              <p className="text-4xl mb-4">{MEMORIES.find(m => m.id === expanded)?.preview.split(' ')[0]}</p>
              <p className="text-white text-base sm:text-lg leading-relaxed font-medium">
                {MEMORIES.find(m => m.id === expanded)?.full}
              </p>
              <button
                onClick={() => setExpanded(null)}
                className="mt-6 px-6 py-2 bg-purple-500/50 hover:bg-purple-500/80 rounded-full text-white text-sm font-space transition-colors"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AstroJerry */}
      <div className="absolute bottom-16 right-4 z-10">
        <AstroJerry size={65} message="These memories are all about you, Dikuse! 💜" />
      </div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={handleBack}
        className="absolute bottom-4 left-4 px-4 py-2 font-space text-xs text-white/70 hover:text-white border border-white/20 hover:border-white/50 rounded-full transition-colors z-10"
      >
        ← Galaxy Map
      </motion.button>
    </div>
  )
}
