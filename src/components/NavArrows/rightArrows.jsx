/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import './rightArrows.css';

function RightArrows({ playerX, destination, label, onNavigate }) {
  const previousPlayerX = useRef(playerX);

  useEffect(() => {
    if (previousPlayerX.current < 92 && playerX >= 92) {
      onNavigate(destination, 'right', true);
    }
    previousPlayerX.current = playerX;
  }, [destination, onNavigate, playerX]);

  return (
    <button
      className="nav-arrow nav-arrow--right"
      type="button"
      onClick={() => onNavigate(destination, 'right', false)}
      aria-label={`Go to ${label}`}
    >
      <span className="nav-arrow__label">{label}</span>
      <span className="nav-arrow__pixel" aria-hidden="true">
        <span className="nav-arrow__trail" />
      </span>
    </button>
  );
}

export default RightArrows;
