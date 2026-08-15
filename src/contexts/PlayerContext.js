import { createContext, useContext } from 'react';

export const PlayerContext = createContext({
  position: { x: 50, y: 50 },
  isMoving: false,
  isMovingRight: false,
});

export const usePlayerContext = () => useContext(PlayerContext);
