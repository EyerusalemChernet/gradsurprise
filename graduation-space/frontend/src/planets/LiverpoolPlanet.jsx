import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame, SCENES } from '../store/gameStore'
import StarBackground from '../components/StarBackground'
import AstroJerry from '../components/AstroJerry'

const MATCH_RESULTS = [
  { score: '4-0', opponent: 'Arsenal', comment: 'Absolutely demolished! YNWA! 🔴' },
  { score: '3-1', opponent: 'Man City', comment: 'Champions League quality! 🏆' },
  { score: '5-0', opponent: 'Everton', comment: 'Merseyside Derby! 😂' },
  { score: '2-0', opponent: 'Chelsea', comment: 'Clean sheet! Klopp would be proud! 🙌' },
  { score: '6-1', opponent: 'Man United', comment: 'Old Trafford nightmare! 🎵' },
]

const FAN_CHANTS = [
  "You'll Never Walk Alone 🎵",
  "We're gonna win the league! 🏆",
  "Allez, Allez, Allez! 🔴",
  "Liverbird upon my chest! ❤️",
  "This means more. 🔴",
]

export default function LiverpoolPlanet() {
  const { setScene, visitPlanet } = useGame()
  const [activeTab, setActiveTab] = useState('stadium')
  const [matchResult, setMatchResult] = useState(null)
  const [chant, setChant] = useState(null)
  const [showArsenal, setShowArsenal] = useState(false)
  const [stadiumLights, setStadiumLights] = useState(false)

  const handleBack = () => { visitPlanet('liverpool'); setScene(SCENES.GALAXY) }

  const simulateMatch = () => {
    setMatchResult(MATCH_RESULTS[Math.floor(Math.random() * MATCH_RESULTS.length)])
    setStadiumLights(true)
    setTimeout(() => setStadiumLights(false), 3000)
  }

  const triggerChant = () => {
    setChant(FAN_CHANTS[Math.floor(Math.random() * FAN_CHANTS.length)])
    setTimeout(() => setChant(null), 3000)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <StarBackground speed={0.0001} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(180,0,0,0.3) 0%, transparent 70%)' }} />

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-0 right-0 text-center z-10">
        <h2 className="font-space text-2xl sm:text-3xl text-red-400 glow-text">⚽ Liverpool Planet</h2>
        <p className="text-white/50 text-xs mt-1">You'll Never Walk Alone</p>
      </motion.div>

      <div className="absolute top-20 left-0 right-0 flex justify-center gap-2 z-10">
        {['stadium', 'fanzone', 'victory'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded-full font-space text-xs transition-all ${
              activeTab === tab ? 'bg-red-600 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}>
            {tab === 'stadium' ? '🏟️ Stadium' : tab === 'fanzone' ? '🎵 Fan Zone' : '🏆 Victory'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'stadium' && (
          <motion.div key="stadium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center pt-28 pb-20 px-4">
            <svg viewBox="0 0 300 160" className="w-full max-w-sm mb-4"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255,50,50,0.5))' }}>
              <ellipse cx="150" cy="130" rx="130" ry="30" fill="#2d5a1b"/>
              <ellipse cx="150" cy="130" rx="100" ry="22" fill="#3a7a25"/>
              <ellipse cx="150" cy="130" rx="60" ry="13" fill="none" stroke="white" strokeWidth="1" opacity="0.5"/>
              <line x1="150" y1="108" x2="150" y2="152" stroke="white" strokeWidth="1" opacity="0.5"/>
              <path d="M20 130 Q10 80 30 60 L80 70 Q60 90 50 130Z" fill="#cc1111"/>
              <path d="M280 130 Q290 80 270 60 L220 70 Q240 90 250 130Z" fill="#cc1111"/>
              <path d="M80 70 Q150 40 220 70 L200 90 Q150 65 100 90Z" fill="#cc1111"/>
              <path d="M30 60 Q150 20 270 60" stroke="#ff6666" strokeWidth="3" fill="none"/>
              {[50, 150, 250].map((x, i) => (
                <g key={i}>
                  <line x1={x} y1="60" x2={x} y2="30" stroke="#aaa" strokeWidth="2"/>
                  <rect x={x - 8} y="25" width="16" height="6" rx="2" fill={stadiumLights ? '#ffff00' : '#ffff88'}/>
                </g>
              ))}
              {[...Array(30)].map((_, i) => (
                <circle key={i} cx={35 + (i % 10) * 24} cy={75 + Math.floor(i / 10) * 8} r="2"
                  fill={['#ff4444', '#ffffff', '#ffdd00'][i % 3]} opacity="0.8"/>
              ))}
            </svg>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={simulateMatch}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-space text-sm rounded-full mb-3">
              ⚽ Simulate Match
            </motion.button>
            <AnimatePresence>
              {matchResult && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="text-center p-4 rounded-2xl"
                  style={{ background: 'rgba(200,0,0,0.3)', border: '1px solid rgba(255,100,100,0.5)' }}>
                  <p className="font-space text-xl text-white font-bold">Liverpool {matchResult.score} {matchResult.opponent}</p>
                  <p className="text-yellow-300 text-sm mt-1">{matchResult.comment}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === 'fanzone' && (
          <motion.div key="fanzone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center pt-28 pb-20 px-4 gap-4">
            <p className="text-white/70 text-sm text-center max-w-xs">
              Dikuse, the Kop is singing for you tonight. You'll never walk alone.
            </p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={triggerChant}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-space text-sm rounded-full">
              🎵 Sing a Chant
            </motion.button>
            <AnimatePresence>
              {chant && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="p-4 rounded-2xl text-center"
                  style={{ background: 'rgba(200,0,0,0.3)', border: '1px solid rgba(255,100,100,0.5)' }}>
                  <p className="font-space text-lg text-yellow-300 font-bold">{chant}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => { setShowArsenal(true); setTimeout(() => setShowArsenal(false), 4500) }}
              className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white/80 font-space text-xs rounded-full border border-white/20">
              💣 What about Arsenal?
            </motion.button>
            <AnimatePresence>
              {showArsenal && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="relative w-72 h-24 overflow-hidden rounded-2xl flex items-center px-3"
                  style={{ background: 'rgba(255,50,0,0.2)', border: '1px solid rgba(255,100,50,0.4)' }}>
                  <motion.span animate={{ rotate: [0, -10, 0, -10, 0] }} transition={{ duration: 0.5, repeat: 2 }}
                    className="text-3xl flex-shrink-0 z-10">💣</motion.span>
                  <motion.span initial={{ x: 0, opacity: 1 }} animate={{ x: 160, opacity: [1,1,1,0] }}
                    transition={{ duration: 0.6, delay: 0.4, ease: 'easeIn' }}
                    className="absolute left-14 text-base font-bold text-orange-300 z-10">●</motion.span>
                  <motion.span initial={{ x: 100 }} animate={{ x: [100, 110, 95, 130, 180, 240] }}
                    transition={{ duration: 1.8, delay: 0.6, ease: 'easeOut' }}
                    className="absolute text-2xl z-10" style={{ top: '30%' }}>🦅</motion.span>
                  <motion.span initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.8, 1.4, 0] }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="absolute text-2xl z-10" style={{ left: '52%', top: '20%' }}>💥</motion.span>
                  <p className="absolute bottom-1 left-0 right-0 text-center text-white/70 text-xs font-space">
                    The Liverbird escapes! Arsenal misses again 😂
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === 'victory' && (
          <motion.div key="victory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center pt-28 pb-20 px-4 gap-4">
            <motion.div animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }} className="text-7xl">🏆</motion.div>
            <p className="font-space text-2xl text-yellow-300 glow-text">Champions!</p>
            <p className="text-white/70 text-sm text-center max-w-xs">
              Just like Liverpool lifts trophies, you've lifted yourself to graduation. YNWA. 🔴
            </p>
            {[...Array(10)].map((_, i) => (
              <motion.div key={i} className="absolute text-xl pointer-events-none"
                style={{ left: `${8 + i * 9}%`, top: `${15 + (i % 3) * 20}%` }}
                animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.2 }}>
                {['🔴', '⭐', '🏆', '❤️', '🎵'][i % 5]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-16 right-4 z-10">
        <AstroJerry size={65} message="YNWA, Dikuse! Even in space! 🔴" />
      </div>
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        onClick={handleBack}
        className="absolute bottom-4 left-4 px-4 py-2 font-space text-xs text-white/70 hover:text-white border border-white/20 hover:border-white/50 rounded-full transition-colors z-10">
        ← Galaxy Map
      </motion.button>
    </div>
  )
}