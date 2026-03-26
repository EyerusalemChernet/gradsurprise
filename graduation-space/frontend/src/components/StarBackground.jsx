/**
 * StarBackground.jsx
 * Three.js animated starfield rendered as a full-screen canvas background.
 */
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function StarBackground({ count = 1500, speed = 0.0003 }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const w = mount.clientWidth
    const h = mount.clientHeight

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Stars geometry
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200
      // Slight color variation: white, blue-white, yellow-white
      const t = Math.random()
      colors[i * 3]     = 0.8 + t * 0.2
      colors[i * 3 + 1] = 0.8 + t * 0.1
      colors[i * 3 + 2] = 0.9 + t * 0.1
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    })
    const stars = new THREE.Points(geo, mat)
    scene.add(stars)

    // Animation loop
    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      stars.rotation.y += speed
      stars.rotation.x += speed * 0.3
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const onResize = () => {
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [count, speed])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'radial-gradient(ellipse at center, #0a0a2e 0%, #000008 100%)' }}
    />
  )
}
