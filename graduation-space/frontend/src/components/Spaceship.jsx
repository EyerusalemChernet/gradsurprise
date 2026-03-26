/**
 * Spaceship.jsx
 * Animated SVG spaceship used on the galaxy map for travel animation.
 */
import { motion } from 'framer-motion'

export default function Spaceship({ x = 50, y = 50, size = 40 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)' }}
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        {/* Engine glow */}
        <ellipse cx="30" cy="52" rx="8" ry="5" fill="rgba(255,150,50,0.6)"/>
        <ellipse cx="30" cy="54" rx="5" ry="3" fill="rgba(255,200,100,0.8)"/>
        {/* Body */}
        <path d="M30 5 L45 40 L30 35 L15 40 Z" fill="#c0c8e0"/>
        <path d="M30 5 L45 40 L30 35 Z" fill="#a0a8c0"/>
        {/* Cockpit */}
        <ellipse cx="30" cy="22" rx="7" ry="9" fill="rgba(100,200,255,0.7)" stroke="rgba(150,220,255,0.9)" strokeWidth="1"/>
        {/* Wings */}
        <path d="M15 40 L5 50 L20 44 Z" fill="#8090b0"/>
        <path d="M45 40 L55 50 L40 44 Z" fill="#8090b0"/>
        {/* Exhaust flames */}
        <path d="M24 40 Q30 55 36 40" fill="rgba(255,120,30,0.7)"/>
        <path d="M26 40 Q30 50 34 40" fill="rgba(255,200,50,0.9)"/>
      </svg>
    </motion.div>
  )
}
