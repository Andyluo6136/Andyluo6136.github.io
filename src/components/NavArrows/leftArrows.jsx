/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import './leftArrows.css';

function LeftArrows({ playerX, destination, label, onNavigate }) {
  const previousPlayerX = useRef(playerX);

  useEffect(() => {
    if (previousPlayerX.current > 8 && playerX <= 8) {
      onNavigate(destination, 'left', true);
    }
    previousPlayerX.current = playerX;
  }, [destination, onNavigate, playerX]);

  return (
    <button
      className="nav-arrow nav-arrow--left"
      type="button"
      onClick={() => onNavigate(destination, 'left', false)}
      aria-label={`Go to ${label}`}
    >
      <span className="nav-arrow__label">{label}</span>
      <span className="nav-arrow__pixel nav-arrow__pixel--left" aria-hidden="true">
        <span className="nav-arrow__trail" />
      </span>
    </button>
  );
}

export default LeftArrows;
