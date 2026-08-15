import { useState, useEffect, useRef, useCallback } from 'react';

export function usePlayerControls(initialX = 50, initialY = 50, speed = 0.5) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isMoving, setIsMoving] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);

  const keysPressed = useRef({});
  const velocity = useRef({ x: 0, y: 0 });

  const setPlayerPosition = useCallback((nextPosition) => {
    velocity.current = { x: 0, y: 0 };
    setPosition(nextPosition);
  }, []);

  const acceleration = speed * 0.05;
  const friction = 0.96;
  const maxSpeed = speed;

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(key)) {
        event.preventDefault();
      }

      keysPressed.current[key.toLowerCase()] = true;
    };

    const handleKeyUp = (event) => {
      keysPressed.current[event.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId;

    const updatePhysics = () => {
        const keys = keysPressed.current;
        // X and Y are stored as viewport percentages. Scale Y so equal input
        // moves the same number of screen pixels in either direction.
        const verticalScale = window.innerWidth / window.innerHeight;
        let ax = 0;
        let ay = 0;
            
        if (keys['arrowup'] || keys['w']) {
            ay -= 1;
        }
        if (keys['arrowdown'] || keys['s']) {
            ay += 1;
        } 
        if (keys['arrowleft'] || keys['a']) {
            ax -= 1;
            setIsMovingRight(false);
        }
        if (keys['arrowright'] || keys['d']) {
            ax += 1;
            setIsMovingRight(true);
        }
        

        if (ax !== 0 && ay !== 0) {
            ax *= 0.7071;
            ay *= 0.7071;
        }

        velocity.current.x += ax * acceleration;
        velocity.current.y += ay * acceleration * verticalScale;

        velocity.current.x *= friction;
        velocity.current.y *= friction;

        const currentSpeed = Math.hypot(
            velocity.current.x,
            velocity.current.y / verticalScale,
        );
        if (currentSpeed > maxSpeed) {
            velocity.current.x = (velocity.current.x / currentSpeed) * maxSpeed;
            velocity.current.y = (velocity.current.y / currentSpeed) * maxSpeed;
        }

        if (Math.abs(velocity.current.x) < 0.001) velocity.current.x = 0;
        if (Math.abs(velocity.current.y / verticalScale) < 0.001) velocity.current.y = 0;

        // Update moving state based on velocity threshold
        const moving = Math.hypot(
            velocity.current.x,
            velocity.current.y / verticalScale,
        ) > 0.01;
        setIsMoving(moving);

        setPosition((prev) => {
            let newX = prev.x + velocity.current.x;
            let newY = prev.y + velocity.current.y;

            if (newX <= 5 || newX >= 95) {
            velocity.current.x = 0;
            newX = Math.max(5, Math.min(95, newX));
            }
            if (newY <= 5 || newY >= 95) {
            velocity.current.y = 0;
            newY = Math.max(5, Math.min(95, newY));
            }

            return { x: newX, y: newY };
        });

        animationFrameId = requestAnimationFrame(updatePhysics);
        };

        animationFrameId = requestAnimationFrame(updatePhysics);

        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        cancelAnimationFrame(animationFrameId);
        };
    }, [speed, acceleration, maxSpeed]);

  return { position, isMoving, isMovingRight, setPlayerPosition };
}
