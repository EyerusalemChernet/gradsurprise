/**
 * gameStore.jsx
 * Simple React context-based global state for the space adventure.
 * Tracks which scene is active and which planets have been visited.
 */
import { createContext, useContext, useState } from 'react'

export const SCENES = {
  OPENING: 'opening',
  GALAXY: 'galaxy',
  MEMORY: 'memory',
  SPACE: 'space',
  LIVERPOOL: 'liverpool',
  CAT: 'cat',
  MESSAGE: 'message',
  ENDING: 'ending',
  FOOD: 'food',
  ADMIN: 'admin',
}

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [scene, setScene] = useState(SCENES.OPENING)
  const [visitedPlanets, setVisitedPlanets] = useState(new Set())
  const [travelingTo, setTravelingTo] = useState(null)

  const visitPlanet = (planetId) => {
    setVisitedPlanets(prev => new Set([...prev, planetId]))
  }

  const allPlanetsVisited = visitedPlanets.size >= 5

  return (
    <GameContext.Provider value={{
      scene, setScene,
      visitedPlanets, visitPlanet,
      travelingTo, setTravelingTo,
      allPlanetsVisited,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)
