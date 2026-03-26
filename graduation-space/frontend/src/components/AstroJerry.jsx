/**
 * AstroJerry.jsx
 * SVG cartoon of AstroJerry - a playful astronaut kitty guide.
 * Orange tabby cat in a white space suit with a bubble helmet.
 */
import { motion } from 'framer-motion'

export default function AstroJerry({ size = 120, floating = true, message = null }) {
  const floatAnim = floating ? {
    y: [0, -12, 0],
    rotate: [3, -3, 3],
  } : {}

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Speech bubble */}
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative bg-white/90 text-gray-800 rounded-2xl px-4 py-3 max-w-xs text-sm font-medium shadow-lg"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          {message}
          {/* Bubble tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid rgba(255,255,255,0.9)' }}
          />
        </motion.div>
      )}

      <motion.div
        animate={floatAnim}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: size, height: size * 1.2 }}
      >
        <svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          {/* Space suit body - white */}
          <ellipse cx="40" cy="72" rx="22" ry="20" fill="#e8e8e8"/>
          {/* Suit chest panel */}
          <rect x="30" y="62" width="20" height="14" rx="4" fill="#c0d8f0"/>
          <circle cx="40" cy="67" r="3" fill="#4a90d9"/>
          <rect x="33" y="72" width="14" height="2" rx="1" fill="#4a90d9"/>
          {/* Arms */}
          <ellipse cx="18" cy="70" rx="7" ry="5" fill="#e8e8e8" transform="rotate(-20 18 70)"/>
          <ellipse cx="62" cy="70" rx="7" ry="5" fill="#e8e8e8" transform="rotate(20 62 70)"/>
          {/* Gloves - orange paws */}
          <ellipse cx="13" cy="74" rx="5" ry="4" fill="#e8874a"/>
          <ellipse cx="67" cy="74" rx="5" ry="4" fill="#e8874a"/>
          {/* Legs */}
          <ellipse cx="32" cy="90" rx="7" ry="5" fill="#e8e8e8"/>
          <ellipse cx="48" cy="90" rx="7" ry="5" fill="#e8e8e8"/>
          {/* Boots */}
          <ellipse cx="32" cy="94" rx="7" ry="3" fill="#555"/>
          <ellipse cx="48" cy="94" rx="7" ry="3" fill="#555"/>

          {/* Helmet bubble */}
          <circle cx="40" cy="34" r="26" fill="rgba(150,220,255,0.15)" stroke="rgba(150,220,255,0.8)" strokeWidth="2"/>
          {/* Helmet shine */}
          <ellipse cx="32" cy="24" rx="7" ry="4" fill="rgba(255,255,255,0.3)" transform="rotate(-25 32 24)"/>

          {/* Cat head - orange tabby */}
          <ellipse cx="40" cy="36" rx="18" ry="17" fill="#e8874a"/>
          {/* Tabby stripes */}
          <path d="M32 28 Q40 24 48 28" stroke="#c06020" strokeWidth="1.5" fill="none"/>
          <path d="M34 32 Q40 29 46 32" stroke="#c06020" strokeWidth="1" fill="none"/>
          {/* Cat ears */}
          <polygon points="24,22 20,10 30,20" fill="#e8874a"/>
          <polygon points="56,22 60,10 50,20" fill="#e8874a"/>
          {/* Inner ears */}
          <polygon points="25,21 22,13 29,20" fill="#f0a0a0"/>
          <polygon points="55,21 58,13 51,20" fill="#f0a0a0"/>
          {/* Eyes - big and cute */}
          <ellipse cx="34" cy="36" rx="5" ry="5.5" fill="#90ee90"/>
          <ellipse cx="46" cy="36" rx="5" ry="5.5" fill="#90ee90"/>
          <ellipse cx="34" cy="37" rx="3" ry="4" fill="#1a1a1a"/>
          <ellipse cx="46" cy="37" rx="3" ry="4" fill="#1a1a1a"/>
          <circle cx="35" cy="35" r="1.2" fill="white"/>
          <circle cx="47" cy="35" r="1.2" fill="white"/>
          {/* Nose */}
          <polygon points="40,43 38,46 42,46" fill="#ff8080"/>
          {/* Mouth */}
          <path d="M38 46 Q40 49 42 46" stroke="#c06020" strokeWidth="1" fill="none"/>
          {/* Whiskers */}
          <line x1="22" y1="44" x2="36" y2="45" stroke="white" strokeWidth="0.8" opacity="0.8"/>
          <line x1="22" y1="47" x2="36" y2="47" stroke="white" strokeWidth="0.8" opacity="0.8"/>
          <line x1="44" y1="45" x2="58" y2="44" stroke="white" strokeWidth="0.8" opacity="0.8"/>
          <line x1="44" y1="47" x2="58" y2="47" stroke="white" strokeWidth="0.8" opacity="0.8"/>
          {/* Tail curling out from suit */}
          <path d="M58 80 Q72 70 68 58 Q64 48 70 44" stroke="#e8874a" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M58 80 Q72 70 68 58 Q64 48 70 44" stroke="#c06020" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 4"/>
        </svg>
      </motion.div>
    </div>
  )
}
