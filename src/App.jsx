import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import About from './About_Page/About';
import { PlayerContext } from './contexts/PlayerContext';
import Home from './Home/Home';
import Games from './Game_Page/Game';
import movingPlayerLeft from './assets/moving_player_left.gif';
import movingPlayerRight from './assets/moving_player_right.gif';
import stationaryPlayerGif from './assets/stationary_player.gif';
import { usePlayerControls } from './hooks/usePlayerControls';
import LeftArrows from './components/NavArrows/leftArrows';
import RightArrows from './components/NavArrows/rightArrows';
import FloatingLinks from './components/FloatingLinks/FloatingLinks';
import PineBorder from './components/SnowBorder/SnowBorder';
import Snow from './components/Snow/Snow';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

const pageTransition = {
  duration: 2,
  ease: [0.22, 1, 0.36, 1],
};

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction === 'left' ? '-12%' : '12%',
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction === 'left' ? '12%' : '-12%',
  }),
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const { position, isMoving, isMovingRight, setPlayerPosition } = usePlayerControls(50, 50, 0.4);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [slideDirection, setSlideDirection] = useState('right');
  const [skateTrails, setSkateTrails] = useState({});
  const lastTrailPoint = useRef(null);
  const trailId = useRef(0);
  const MAX_TRAIL_MARKS = 160;

  // Hint visibility state
  const [showHint, setShowHint] = useState(true);
  const [isFadingHint, setIsFadingHint] = useState(false);
  const interactionStarted = useRef(false);

  const dismissHint = useCallback(() => {
    if (interactionStarted.current) return;
    interactionStarted.current = true;

    // Start fading 2 seconds after first click or movement
    setTimeout(() => {
      setIsFadingHint(true);
      setTimeout(() => setShowHint(false), 800);
    }, 2000);
  }, []);

  // 1. Trigger dismiss on click or touch
  useEffect(() => {
    if (isLoading) return;

    const events = ['mousedown', 'touchstart'];
    events.forEach((evt) => window.addEventListener(evt, dismissHint, { passive: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, dismissHint));
    };
  }, [isLoading, dismissHint]);

  // 2. Trigger dismiss when the player moves
  useEffect(() => {
    if (isLoading) return;
    if (isMoving) {
      dismissHint();
    }
  }, [isLoading, isMoving, dismissHint]);

  useEffect(() => {
    if (!isMoving) {
      lastTrailPoint.current = null;
      return;
    }

    const previousPoint = lastTrailPoint.current;
    if (!previousPoint || previousPoint.pathname !== pathname) {
      lastTrailPoint.current = { ...position, pathname };
      return;
    }

    const dx = position.x - previousPoint.x;
    const dy = position.y - previousPoint.y;
    const distance = Math.hypot(dx, dy);

    if (distance < 0.2) return;

    const DRAW_PROBABILITY = 0.4;
    if (Math.random() > DRAW_PROBABILITY) {
      lastTrailPoint.current = { ...position, pathname };
      return;
    }

    lastTrailPoint.current = { ...position, pathname };
    trailId.current += 1;

    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const midX = (previousPoint.x + position.x) / 2;
    const midY = (previousPoint.y + position.y) / 2;

    const minH = 12;
    const maxH = 24;
    const heightPx = Math.round(minH + Math.random() * (maxH - minH));

    const trailMark = {
      id: trailId.current,
      x: midX,
      y: midY,
      facingRight: isMovingRight,
      angle,
      heightPx,
      createdAt: Date.now(),
    };

    setSkateTrails((currentTrails) => ({
      ...currentTrails,
      [pathname]: (() => {
        const arr = [...(currentTrails[pathname] ?? []), trailMark];
        if (arr.length > MAX_TRAIL_MARKS) {
          return arr.slice(arr.length - MAX_TRAIL_MARKS);
        }
        return arr;
      })(),
    }));
  }, [isMoving, isMovingRight, pathname, position]);

  const changePage = useCallback((destination, direction, crossedEdge) => {
    if (crossedEdge) {
      setPlayerPosition({ x: direction === 'left' ? 90 : 10, y: position.y });
    }
    setSlideDirection(direction);
    navigate(destination);
  }, [navigate, position.y, setPlayerPosition]);

  const playerSprite = !isMoving
    ? stationaryPlayerGif
    : isMovingRight
      ? movingPlayerRight
      : movingPlayerLeft;

  return (
    <div id="root" className="root">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <PlayerContext.Provider value={{ position, isMoving, isMovingRight }}>
        <main className="ice-world">
          <PineBorder />
          <Snow count={85} />
          
          <AnimatePresence initial={false} mode="sync" custom={slideDirection}>
            <motion.div
              key={pathname}
              className="route-content"
              custom={slideDirection}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

          <div className="skate-trail" aria-hidden="true">
            {(skateTrails[pathname] ?? []).map((mark) => (
              <div
                key={mark.id}
                className={`skate-trail__line ${mark.facingRight ? 'skate-trail__line--facing-right' : 'skate-trail__line--facing-left'}`}
                style={{
                  left: `${mark.x}%`,
                  top: `${mark.y}%`,
                  height: `${mark.heightPx}px`,
                  transform: `translate(-50%, 28px) rotate(${mark.angle + 90}deg)`,
                  zIndex: 6,
                }}
              />
            ))}
          </div>

          {pathname !== '/games' && (
            <LeftArrows
              playerX={position.x}
              destination={pathname === '/about' ? '/' : '/games'}
              label={pathname === '/about' ? 'HOME' : 'GAMES'}
              onNavigate={changePage}
            />
          )}

          {pathname !== '/about' && (
            <RightArrows
              playerX={position.x}
              destination={pathname === '/games' ? '/' : '/about'}
              label={pathname === '/games' ? 'HOME' : 'ABOUT'}
              onNavigate={changePage}
            />
          )}

          <FloatingLinks />

          <img
            src={playerSprite}
            alt="Pixel hockey player"
            className={`player-gif ${!isMoving ? 'player-gif--stationary' : 'player-gif--moving'}`}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
          />

          {!isLoading && showHint && (
            <div
              className={`player-start-hint ${isFadingHint ? 'player-start-hint--fading' : ''}`}
              aria-hidden="true"
            >
              <span>[ Use WASD / Arrow Keys or Cursor to Explore ]</span>
            </div>
          )}
        </main>
      </PlayerContext.Provider>
    </div>
  );
}

export default App;