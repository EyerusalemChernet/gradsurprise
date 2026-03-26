/**
 * DikuseCharacter.jsx
 * SVG cartoon of Dikuse in graduation gown + transparent space helmet.
 * Brown skin tone, short dark hair, friendly expression.
 */
import { motion } from 'framer-motion'

export default function DikuseCharacter({ size = 160, floating = true }) {
  const floatAnim = floating ? {
    y: [0, -18, 0],
    rotate: [-2, 2, -2],
  } : {}

  return (
    <motion.div
      animate={floatAnim}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: size, height: size * 1.4 }}
    >
      <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        {/* Space helmet (transparent bubble) */}
        <ellipse cx="50" cy="38" rx="28" ry="30" fill="rgba(150,220,255,0.15)" stroke="rgba(150,220,255,0.7)" strokeWidth="2"/>
        {/* Helmet shine */}
        <ellipse cx="40" cy="26" rx="8" ry="5" fill="rgba(255,255,255,0.25)" transform="rotate(-20 40 26)"/>

        {/* Head - brown skin */}
        <ellipse cx="50" cy="40" rx="20" ry="22" fill="#8B5E3C"/>
        {/* Short dark hair */}
        <ellipse cx="50" cy="22" rx="20" ry="10" fill="#1a0f00"/>
        <rect x="30" y="18" width="40" height="10" rx="5" fill="#1a0f00"/>
        {/* Ears */}
        <ellipse cx="30" cy="40" rx="4" ry="5" fill="#7a5230"/>
        <ellipse cx="70" cy="40" rx="4" ry="5" fill="#7a5230"/>
        {/* Eyes */}
        <ellipse cx="43" cy="38" rx="4" ry="4.5" fill="white"/>
        <ellipse cx="57" cy="38" rx="4" ry="4.5" fill="white"/>
        <circle cx="44" cy="39" r="2.5" fill="#2a1500"/>
        <circle cx="58" cy="39" r="2.5" fill="#2a1500"/>
        {/* Eye shine */}
        <circle cx="45" cy="38" r="0.8" fill="white"/>
        <circle cx="59" cy="38" r="0.8" fill="white"/>
        {/* Smile */}
        <path d="M43 48 Q50 54 57 48" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Nose */}
        <ellipse cx="50" cy="44" rx="2.5" ry="1.5" fill="#7a5230"/>

        {/* Graduation gown - dark navy */}
        <path d="M28 68 Q20 90 18 120 L82 120 Q80 90 72 68 Q60 75 50 75 Q40 75 28 68Z" fill="#1a1a4a"/>
        {/* Gown collar/shoulders */}
        <path d="M30 68 Q50 80 70 68 L72 72 Q50 85 28 72Z" fill="#2a2a6a"/>
        {/* Graduation sash - red/gold */}
        <path d="M38 68 L46 120" stroke="#c8a000" strokeWidth="3"/>
        <path d="M62 68 L54 120" stroke="#c8a000" strokeWidth="3"/>
        {/* Diploma scroll in hand */}
        <rect x="68" y="88" width="18" height="12" rx="3" fill="#f5e6c8" stroke="#c8a000" strokeWidth="1"/>
        <line x1="71" y1="92" x2="83" y2="92" stroke="#c8a000" strokeWidth="1"/>
        <line x1="71" y1="95" x2="83" y2="95" stroke="#c8a000" strokeWidth="1"/>
        {/* Arms */}
        <path d="M28 72 Q15 80 14 90" stroke="#1a1a4a" strokeWidth="8" strokeLinecap="round"/>
        <path d="M72 72 Q82 80 86 88" stroke="#1a1a4a" strokeWidth="8" strokeLinecap="round"/>
        {/* Hands */}
        <ellipse cx="14" cy="92" rx="5" ry="4" fill="#8B5E3C"/>
        <ellipse cx="86" cy="90" rx="5" ry="4" fill="#8B5E3C"/>
        {/* Graduation cap */}
        <rect x="32" y="16" width="36" height="5" rx="2" fill="#1a1a4a"/>
        <rect x="38" y="11" width="24" height="6" rx="1" fill="#1a1a4a"/>
        {/* Cap tassel */}
        <line x1="66" y1="14" x2="72" y2="22" stroke="#c8a000" strokeWidth="1.5"/>
        <circle cx="72" cy="23" r="2" fill="#c8a000"/>
        {/* Helmet connector ring */}
        <ellipse cx="50" cy="66" rx="22" ry="4" fill="rgba(150,220,255,0.3)" stroke="rgba(150,220,255,0.5)" strokeWidth="1"/>
      </svg>
    </motion.div>
  )
}
