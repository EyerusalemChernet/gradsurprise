/**
 * GalaxyMap.jsx
 * Interactive galaxy map with 5 glowing planets + spaceship travel animation.
 * Clicking a planet animates the spaceship toward it, then opens the planet scene.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame, SCENES } from '../store/gameStore'
import StarBackground from './StarBackground'
import Spaceship from './Spaceship'
import AstroJerry from './AstroJerry'

const PLANETS = [
  {
    id: 'memory',
    scene: SCENES.MEMORY,
    label: 'Memory Planet',
    emoji: '💜',
    color: '#9b59b6',
    glow: 'rgba(155,89,182,0.6)',
    x: 20, y: 25,
    size: 55,
    desc: 'Floating memories',
  },
  {
    id: 'space',
    scene: SCENES.SPACE,
    label: 'Space Planet',
    emoji: '⭐',
    color: '#3498db',
    glow: 'rgba(52,152,219,0.6)',
    x: 72, y: 20,
    size: 60,
    desc: 'Stars & constellations',
  },
  {
    id: 'liverpool',
    scene: SCENES.LIVERPOOL,
    label: 'Liverpool Planet',
    emoji: '⚽',
    color: '#e74c3c',
    glow: 'rgba(231,76,60,0.6)',
    x: 80, y: 60,
    size: 58,
    desc: 'YNWA forever',
  },
  {
    id: 'cat',
    scene: SCENES.CAT,
    label: 'Cat Planet',
    emoji: '🐱',
    color: '#f39c12',
    glow: 'rgba(243,156,18,0.6)',
    x: 18, y: 65,
    size: 52,
    desc: 'Astronaut cats',
  },
  {
    id: 'message',
    scene: SCENES.MESSAGE,
    label: 'Message Station',
    emoji: '📡',
    color: '#1abc9c',
    glow: 'rgba(26,188,156,0.6)',
    x: 50, y: 50,
    size: 50,
    desc: 'Send a message',
  },
]

export default function GalaxyMap() {
  const { setScene, visitedPlanets, travelingTo, setTravelingTo, allPlanetsVisited } = useGame()
  const [shipPos, setShipPos] = useState({ x: 50, y: 85 })
  const [hoveredPlanet, setHoveredPlanet] = useState(null)

  const handlePlanetClick = (planet) => {
    if (travelingTo) return
    setTravelingTo(planet.id)
    // Animate ship to planet position
    setShipPos({ x: planet.x, y: planet.y })
    // After travel animation, open planet scene
    setTimeout(() => {
      setTravelingTo(null)
      setScene(planet.scene)
    }, 1400)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <StarBackground speed={0.0001} />

      {/* Galaxy map title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-0 right-0 text-center z-10"
      >
        <h2 className="font-space text-xl sm:text-3xl text-cyan-300 glow-text">
          🌌 Dikuse's Galaxy
        </h2>
        <p className="text-white/50 text-xs mt-1">
          {visitedPlanets.size}/5 planets explored
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 w-48 h-2 bg-white/10 rounded-full overflow-hidden z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-yellow-300 rounded-full"
          animate={{ width: `${(visitedPlanets.size / 5) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Nebula decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #9b59b6, transparent)', left: '10%', top: '15%' }} />
        <div className="absolute w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3498db, transparent)', right: '15%', top: '10%' }} />
        <div className="absolute w-56 h-56 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #e74c3c, transparent)', right: '5%', bottom: '20%' }} />
      </div>

      {/* Orbit rings (decorative) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <ellipse cx="50%" cy="50%" rx="35%" ry="25%" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="4 8"/>
        <ellipse cx="50%" cy="50%" rx="45%" ry="38%" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="4 8"/>
      </svg>

      {/* Planets */}
      {PLANETS.map((planet) => {
        const visited = visitedPlanets.has(planet.id)
        return (
          <motion.div
            key={planet.id}
            className="absolute cursor-pointer flex flex-col items-center"
            style={{
              left: `${planet.x}%`,
              top: `${planet.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: PLANETS.indexOf(planet) * 0.15 }}
            whileHover={{ scale: 1.15 }}
            onHoverStart={() => setHoveredPlanet(planet.id)}
            onHoverEnd={() => setHoveredPlanet(null)}
            onClick={() => handlePlanetClick(planet)}
          >
            {/* Planet body */}
            <motion.div
              animate={{
                boxShadow: hoveredPlanet === planet.id
                  ? `0 0 30px ${planet.glow}, 0 0 60px ${planet.glow}`
                  : `0 0 15px ${planet.glow}`,
                rotate: [0, 360],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                boxShadow: { duration: 0.3 },
              }}
              style={{
                width: planet.size,
                height: planet.size,
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, white 0%, ${planet.color} 40%, ${planet.color}88 100%)`,
                border: visited ? '3px solid #FFD700' : '2px solid rgba(255,255,255,0.3)',
              }}
              className="flex items-center justify-center text-2xl"
            >
              {planet.emoji}
            </motion.div>

            {/* Planet label */}
            <div className="mt-2 text-center">
              <p className="font-space text-xs text-white/90 whitespace-nowrap">{planet.label}</p>
              {visited && <p className="text-yellow-400 text-xs">✓ Visited</p>}
            </div>

            {/* Tooltip on hover */}
            <AnimatePresence>
              {hoveredPlanet === planet.id && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: -10 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-10 bg-black/80 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap border border-white/20"
                >
                  {planet.desc}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      {/* Spaceship */}
      <motion.div
        animate={{ left: `${shipPos.x}%`, top: `${shipPos.y}%` }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute z-10"
        style={{ transform: 'translate(-50%,-50%)' }}
      >
        <Spaceship x={0} y={0} size={36} />
      </motion.div>

      {/* AstroJerry guide */}
      <motion.div
        className="absolute bottom-4 right-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <AstroJerry
          size={70}
          message={
            travelingTo
              ? "Buckle up! 🚀"
              : allPlanetsVisited
              ? "You've explored everything! Check the ending! 🎉"
              : "Tap a planet to explore!"
          }
        />
      </motion.div>

      {/* All planets visited - ending button */}
      <AnimatePresence>
        {allPlanetsVisited && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 font-space text-sm font-bold text-black bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full cursor-pointer z-20 shadow-lg"
            whileHover={{ scale: 1.05 }}
            onClick={() => setScene(SCENES.ENDING)}
          >
            🎆 Final Celebration!
          </motion.button>
        )}
      </AnimatePresence>

      {/* Admin link */}
      <button
        onClick={() => setScene(SCENES.ADMIN)}
        className="absolute top-4 right-4 text-white/20 hover:text-white/50 text-xs font-space transition-colors z-10"
      >
        ⚙
      </button>
    </div>
  )
}
