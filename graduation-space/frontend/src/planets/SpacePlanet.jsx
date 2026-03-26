/**
 * SpacePlanet.jsx
 * Interactive Three.js starfield. Click stars to reveal messages.
 * Includes animated constellations and the special "Dikuse Star".
 */
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { useGame, SCENES } from '../store/gameStore'
import AstroJerry from '../components/AstroJerry'

const STAR_MESSAGES = [
  "The universe is 13.8 billion years old. You've only just begun. 🌌",
  "There are more stars in the universe than grains of sand on Earth. You are one of the brightest. ⭐",
  "Light from distant stars takes thousands of years to reach us. Your impact will last just as long.",
  "Black holes bend time itself. Your potential is equally limitless.",
  "The Milky Way has 200-400 billion stars. You found your own path among them.",
  "Space is mostly empty, but the parts that aren't are extraordinary — just like you.",
  "Astronauts describe seeing Earth from space as life-changing. Graduation is your orbit shift.",
  "Every element in your body was forged in a star. You are literally made of stardust. ✨",
  "The Voyager probe has been traveling for 46 years and is still going. Keep going, Dikuse.",
  "Fun fact: A day on Venus is longer than a year on Venus. Time is relative — enjoy yours.",
]

const DIKUSE_STAR_MESSAGE = "🌟 DIKUSE STAR 🌟\n\nThis star was named in honor of Dikuse's graduation. It shines in the constellation of Achievers, visible from every corner of the galaxy. Congratulations, explorer. The universe is proud of you."

// Constellation lines (pairs of star indices)
const CONSTELLATION_LINES = [[0,3],[3,7],[7,12],[12,5],[5,0],[1,8],[8,15],[15,20]]

export default function SpacePlanet() {
  const { setScene, visitPlanet } = useGame()
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const [clickedMessage, setClickedMessage] = useState(null)
  const [isDikuseStar, setIsDikuseStar] = useState(false)
  const starsRef = useRef([])

  useEffect(() => {
    const mount = mountRef.current
    const w = mount.clientWidth
    const h = mount.clientHeight

    const scene = new THREE.Scene()
    sceneRef.current = scene
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Background stars (non-clickable, many)
    const bgPositions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      bgPositions[i*3]   = (Math.random()-0.5)*100
      bgPositions[i*3+1] = (Math.random()-0.5)*100
      bgPositions[i*3+2] = (Math.random()-0.5)*100
    }
    const bgGeo = new THREE.BufferGeometry()
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3))
    const bgMat = new THREE.PointsMaterial({ size: 0.15, color: 0xaaaacc, transparent: true, opacity: 0.6 })
    scene.add(new THREE.Points(bgGeo, bgMat))

    // Clickable interactive stars
    const clickableStars = []
    const starCount = 30
    const starPositions = []

    for (let i = 0; i < starCount; i++) {
      const isDikuse = i === 0 // First star is the Dikuse Star
      const geo = new THREE.SphereGeometry(isDikuse ? 0.18 : 0.1, 8, 8)
      const mat = new THREE.MeshBasicMaterial({
        color: isDikuse ? 0xFFD700 : new THREE.Color().setHSL(Math.random(), 0.5, 0.8),
      })
      const mesh = new THREE.Mesh(geo, mat)
      const pos = {
        x: (Math.random()-0.5)*16,
        y: (Math.random()-0.5)*10,
        z: (Math.random()-0.5)*5,
      }
      if (isDikuse) { pos.x = 0; pos.y = 1; pos.z = 0 }
      mesh.position.set(pos.x, pos.y, pos.z)
      mesh.userData = { isDikuse, index: i }
      scene.add(mesh)
      clickableStars.push(mesh)
      starPositions.push(pos)
    }
    starsRef.current = clickableStars

    // Constellation lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.3 })
    CONSTELLATION_LINES.forEach(([a, b]) => {
      if (a < starCount && b < starCount) {
        const points = [
          new THREE.Vector3(starPositions[a].x, starPositions[a].y, starPositions[a].z),
          new THREE.Vector3(starPositions[b].x, starPositions[b].y, starPositions[b].z),
        ]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
        scene.add(new THREE.Line(lineGeo, lineMat))
      }
    })

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onClick = (e) => {
      const rect = mount.getBoundingClientRect()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(clickableStars)
      if (intersects.length > 0) {
        const star = intersects[0].object
        if (star.userData.isDikuse) {
          setIsDikuseStar(true)
          setClickedMessage(DIKUSE_STAR_MESSAGE)
        } else {
          setIsDikuseStar(false)
          const idx = star.userData.index % STAR_MESSAGES.length
          setClickedMessage(STAR_MESSAGES[idx])
        }
        // Pulse the star
        const origScale = star.scale.x
        star.scale.setScalar(origScale * 2)
        setTimeout(() => star.scale.setScalar(origScale), 300)
      }
    }

    mount.addEventListener('click', onClick)
    mount.addEventListener('touchend', onClick)

    // Animate
    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      // Twinkle clickable stars
      clickableStars.forEach((s, i) => {
        s.material.opacity = 0.7 + Math.sin(Date.now() * 0.002 + i) * 0.3
        if (!s.material.transparent) s.material.transparent = true
      })
      scene.rotation.y += 0.0003
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      mount.removeEventListener('click', onClick)
      mount.removeEventListener('touchend', onClick)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  const handleBack = () => {
    visitPlanet('space')
    setScene(SCENES.GALAXY)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #050520 0%, #000008 100%)' }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-0 right-0 text-center z-10 pointer-events-none"
      >
        <h2 className="font-space text-2xl sm:text-3xl text-blue-300 glow-text">⭐ Space Planet</h2>
        <p className="text-white/50 text-xs mt-1">Click the stars to discover messages</p>
        <p className="text-yellow-400 text-xs mt-1">✨ Find the golden Dikuse Star!</p>
      </motion.div>

      {/* Message popup */}
      <AnimatePresence>
        {clickedMessage && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setClickedMessage(null)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="relative z-10 max-w-sm w-full rounded-3xl p-8 text-center"
              style={{
                background: isDikuseStar
                  ? 'radial-gradient(circle, rgba(255,215,0,0.3), rgba(20,10,0,0.95))'
                  : 'radial-gradient(circle, rgba(50,100,200,0.3), rgba(5,10,40,0.95))',
                border: `2px solid ${isDikuseStar ? 'rgba(255,215,0,0.8)' : 'rgba(100,150,255,0.5)'}`,
                boxShadow: isDikuseStar ? '0 0 40px rgba(255,215,0,0.5)' : '0 0 30px rgba(50,100,200,0.4)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {isDikuseStar && <p className="text-4xl mb-3">🌟</p>}
              <p className="text-white text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {clickedMessage}
              </p>
              <button
                onClick={() => setClickedMessage(null)}
                className="mt-5 px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm font-space transition-colors"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AstroJerry */}
      <div className="absolute bottom-16 right-4 z-10">
        <AstroJerry size={65} message="The golden star is special — find it! 🌟" />
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
