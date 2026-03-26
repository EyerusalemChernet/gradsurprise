/**
 * CatPlanet.jsx
 * Colony of astronaut cats floating in space. AstroJerry's home planet.
 * Interactive buttons: Request Tuna, Request Salmon, Feed the Graduation Cat.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame, SCENES } from '../store/gameStore'
import StarBackground from '../components/StarBackground'
import AstroJerry from '../components/AstroJerry'

const CAT_RESPONSES = {
  tuna: [
    "🐟 TUNA ACQUIRED. The cats are pleased. Purring at maximum capacity.",
    "🐟 One tuna delivery incoming from the Tuna Nebula. ETA: 3 light-years.",
    "🐟 The Space Tuna Council has approved your request. Meow.",
  ],
  salmon: [
    "🍣 SALMON DETECTED. All cats are now doing the happy dance.",
    "🍣 Salmon from the Salmon Galaxy, freshly caught by AstroJerry himself.",
    "🍣 The cats have formed a salmon appreciation committee. You're the chair.",
  ],
  feed: [
    "🎓 The Graduation Cat has been fed! It is now floating with joy and wisdom.",
    "🎓 Graduation Cat says: 'Meow' — which translates to 'Congratulations, Dikuse!'",
    "🎓 The Graduation Cat has awarded you the Order of the Space Kibble. Well deserved.",
  ],
}

// Positions for floating cats
const CAT_POSITIONS = [
  { x: 10, y: 20, size: 55, delay: 0 },
  { x: 75, y: 15, size: 50, delay: 0.3 },
  { x: 85, y: 55, size: 45, delay: 0.6 },
  { x: 5, y: 60, size: 52, delay: 0.9 },
  { x: 45, y: 70, size: 48, delay: 1.2 },
]

// Mini astronaut cat SVG
function MiniCat({ size = 50, color = '#e8874a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {/* Helmet */}
      <circle cx="30" cy="22" r="16" fill="rgba(150,220,255,0.15)" stroke="rgba(150,220,255,0.7)" strokeWidth="1.5"/>
      {/* Head */}
      <ellipse cx="30" cy="23" rx="11" ry="10" fill={color}/>
      {/* Ears */}
      <polygon points="20,15 17,7 24,14" fill={color}/>
      <polygon points="40,15 43,7 36,14" fill={color}/>
      {/* Eyes */}
      <circle cx="26" cy="22" r="3" fill="#90ee90"/>
      <circle cx="34" cy="22" r="3" fill="#90ee90"/>
      <circle cx="26" cy="23" r="1.8" fill="#111"/>
      <circle cx="34" cy="23" r="1.8" fill="#111"/>
      <circle cx="27" cy="21" r="0.7" fill="white"/>
      <circle cx="35" cy="21" r="0.7" fill="white"/>
      {/* Nose */}
      <polygon points="30,27 28,30 32,30" fill="#ff8080"/>
      {/* Body suit */}
      <ellipse cx="30" cy="46" rx="13" ry="11" fill="#e8e8e8"/>
      <rect x="23" y="40" width="14" height="9" rx="3" fill="#c0d8f0"/>
      {/* Tail */}
      <path d="M43 46 Q52 38 48 30" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

export default function CatPlanet() {
  const { setScene, visitPlanet } = useGame()
  const [response, setResponse] = useState(null)
  const [activeAction, setActiveAction] = useState(null)

  const handleBack = () => {
    visitPlanet('cat')
    setScene(SCENES.GALAXY)
  }

  const triggerAction = (type) => {
    const msgs = CAT_RESPONSES[type]
    setResponse(msgs[Math.floor(Math.random() * msgs.length)])
    setActiveAction(type)
    setTimeout(() => { setResponse(null); setActiveAction(null) }, 4000)
  }

  const catColors = ['#e8874a', '#888888', '#f5c842', '#cc8844', '#ddaaaa']

  return (
    <div className="relative w-full h-full overflow-hidden">
      <StarBackground speed={0.0001} />

      {/* Orange nebula atmosphere */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(200,100,0,0.2) 0%, transparent 70%)' }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-0 right-0 text-center z-10"
      >
        <h2 className="font-space text-2xl sm:text-3xl text-orange-300 glow-text">🐱 Cat Planet</h2>
        <p className="text-white/50 text-xs mt-1">AstroJerry's home colony</p>
      </motion.div>

      {/* Floating astronaut cats */}
      {CAT_POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -15 - i * 3, 0],
            rotate: [i % 2 === 0 ? -5 : 5, i % 2 === 0 ? 5 : -5, i % 2 === 0 ? -5 : 5],
          }}
          transition={{
            opacity: { duration: 0.5, delay: pos.delay },
            scale: { duration: 0.5, delay: pos.delay },
            y: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: pos.delay },
            rotate: { duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: pos.delay },
          }}
        >
          <MiniCat size={pos.size} color={catColors[i % catColors.length]} />
        </motion.div>
      ))}

      {/* Floating fish treats */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`fish${i}`}
          className="absolute text-lg pointer-events-none"
          style={{ left: `${15 + i * 10}%`, top: `${30 + (i % 3) * 20}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3], rotate: [0, 15, 0] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        >
          {i % 2 === 0 ? '🐟' : '🍣'}
        </motion.div>
      ))}

      {/* Action buttons */}
      <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-3 z-10 px-6">
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm text-center p-4 rounded-2xl mb-2"
              style={{ background: 'rgba(200,100,0,0.3)', border: '1px solid rgba(255,150,50,0.5)' }}
            >
              <p className="text-white text-sm leading-relaxed">{response}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap justify-center gap-2">
          {[
            { key: 'tuna', label: '🐟 Request Tuna', color: 'bg-blue-600 hover:bg-blue-500' },
            { key: 'salmon', label: '🍣 Request Salmon', color: 'bg-pink-600 hover:bg-pink-500' },
            { key: 'feed', label: '🎓 Feed Graduation Cat', color: 'bg-orange-600 hover:bg-orange-500' },
          ].map(btn => (
            <motion.button
              key={btn.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => triggerAction(btn.key)}
              className={`px-4 py-2 ${btn.color} text-white font-space text-xs rounded-full shadow-lg transition-colors`}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* AstroJerry */}
      <div className="absolute bottom-16 right-4 z-10">
        <AstroJerry
          size={70}
          message={activeAction === 'feed' ? "That's ME! 😻 Thank you!" : "Welcome to my home planet! 🐱"}
        />
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
