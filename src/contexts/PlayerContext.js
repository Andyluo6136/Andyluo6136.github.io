import { createContext, useContext } from 'react';

export function isInsidePlayableArea(newX, newY) {
  const TOP_MARGIN = 8;      // % padding from top edge
  const BOTTOM_MARGIN = 92;  // % padding from bottom edge
  const LEFT_MARGIN = 4;     // % padding from left edge
  const RIGHT_MARGIN = 96;   // % padding from right edge
  const CORNER_CUT = 14;     // % cut from each corner

  // 1. Check outer edge boundaries
  if (newY < TOP_MARGIN || newY > BOTTOM_MARGIN || newX < LEFT_MARGIN || newX > RIGHT_MARGIN) {
    return false;
  }

  // 2. Check top-left corner
  if (newX + newY < CORNER_CUT + TOP_MARGIN + LEFT_MARGIN) {
    return false;
  }

  // 3. Check top-right corner
  if ((100 - newX) + newY < CORNER_CUT + TOP_MARGIN + (100 - RIGHT_MARGIN)) {
    return false;
  }

  // 4. Check bottom-left corner
  if (newX + (100 - newY) < CORNER_CUT + (100 - BOTTOM_MARGIN) + LEFT_MARGIN) {
    return false;
  }

  // 5. Check bottom-right corner
  if ((100 - newX) + (100 - newY) < CORNER_CUT + (100 - BOTTOM_MARGIN) + (100 - RIGHT_MARGIN)) {
    return false;
  }

  return true;
}

export const PlayerContext = createContext({
  position: { x: 50, y: 50 },
  isMoving: false,
  isMovingRight: false,
});

export const usePlayerContext = () => useContext(PlayerContext);