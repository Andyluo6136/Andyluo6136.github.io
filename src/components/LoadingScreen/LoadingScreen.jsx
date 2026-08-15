import { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LOADING_STEPS = [
  'BOOTING ICE ENGINE...',
  'FLOODING THE RINK...',
  'SHARPENING SKATES...',
  'PREPARING PUCKS...',
  'READY TO PLAY!',
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(LOADING_STEPS[0]);
  const [isReady, setIsReady] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }

        const next = Math.min(prev + Math.floor(Math.random() * 14) + 6, 100);
        const stepIndex = Math.min(
          Math.floor((next / 100) * LOADING_STEPS.length),
          LOADING_STEPS.length - 1
        );
        setStatusText(LOADING_STEPS[stepIndex]);

        return next;
      });
    }, 140);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    if (!isReady || isOpening) return;
    setIsOpening(true);

    // Wait for the circle expansion animation (0.9s) before unmounting
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isReady && (e.code === 'Space' || e.key === 'Enter')) {
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReady, isOpening]);

  return (
    <aside
      className={`loading-screen ${isOpening ? 'loading-screen--peephole' : ''}`}
      aria-label="Loading Screen"
    >
      <div className="loading-card">
        <h1 className="loading-title">ANDY LUO</h1>
        <p className="loading-subtitle">PIXEL PORTFOLIO • V1.0</p>

        <div className="loading-bar-border">
          <div
            className="loading-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="loading-details">
          <span className="loading-status">{statusText}</span>
          <span className="loading-percent">{progress}%</span>
        </div>

        <div className="loading-action-zone">
          {isReady ? (
            <button
              className="loading-start-btn"
              onClick={handleStart}
              autoFocus
            >
              ► PRESS START / CLICK ◄
            </button>
          ) : (
            <span className="loading-spinner">PLEASE WAIT...</span>
          )}
        </div>
      </div>
    </aside>
  );
}