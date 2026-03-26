/**
 * FireworksEffect.jsx
 * Intense fireworks using canvas-confetti for the ending scene.
 */
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function FireworksEffect() {
  useEffect(() => {
    const duration = 8000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FF4500', '#00CED1', '#FF69B4', '#7B68EE'],
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FF4500', '#00CED1', '#FF69B4', '#7B68EE'],
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return null
}
