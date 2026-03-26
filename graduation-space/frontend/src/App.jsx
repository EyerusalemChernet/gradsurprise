/**
 * App.jsx
 * Root component — wires GameProvider and renders the active scene.
 */
import { AnimatePresence, motion } from 'framer-motion'
import { GameProvider, useGame, SCENES } from './store/gameStore'
import OpeningScene from './components/OpeningScene'
import GalaxyMap from './components/GalaxyMap'
import MemoryPlanet from './planets/MemoryPlanet'
import SpacePlanet from './planets/SpacePlanet'
import LiverpoolPlanet from './planets/LiverpoolPlanet'
import CatPlanet from './planets/CatPlanet'
import MessageStation from './planets/MessageStation'
import EndingScene from './planets/EndingScene'
import FoodReward from './planets/FoodReward'
import AdminPage from './planets/AdminPage'

const SCENE_MAP = {
  [SCENES.OPENING]: OpeningScene,
  [SCENES.GALAXY]: GalaxyMap,
  [SCENES.MEMORY]: MemoryPlanet,
  [SCENES.SPACE]: SpacePlanet,
  [SCENES.LIVERPOOL]: LiverpoolPlanet,
  [SCENES.CAT]: CatPlanet,
  [SCENES.MESSAGE]: MessageStation,
  [SCENES.ENDING]: EndingScene,
  [SCENES.FOOD]: FoodReward,
  [SCENES.ADMIN]: AdminPage,
}

function SceneRenderer() {
  const { scene } = useGame()
  const ActiveScene = SCENE_MAP[scene] || GalaxyMap

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene}
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ActiveScene />
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <GameProvider>
      <div className="w-full h-full">
        <SceneRenderer />
      </div>
    </GameProvider>
  )
}
