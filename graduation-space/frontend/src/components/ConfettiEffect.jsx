/**
 * ConfettiEffect.jsx
 * Triggers canvas-confetti on mount. Used in opening and ending scenes.
 */
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function ConfettiEffect({ duration = 4000, colors = null }) {
  useEffect(() => {
    const defaults = {
      spread: 80,
      ticks: 60,
      gravity: 0.8,
      decay: 0.94,
      startVelocity: 30,
      colors: colors || ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
    }

    const shoot = () => {
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.2, y: 0.6 } })
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.8, y: 0.6 } })
    }

    shoot()
    const interval = setInterval(shoot, 800)
    const timeout = setTimeout(() => clearInterval(interval), duration)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [duration, colors])

  return null
}
