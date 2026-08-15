import { useEffect, useRef } from 'react';
import './Snow.css';

export default function Snow({ count = 85 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate randomized pixel snowflakes
    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.floor(Math.random() * 3) + 2, // 2px to 4px square flakes
      speedY: Math.random() * 0.9 + 0.5,       // Downward fall speed
      speedX: (Math.random() - 0.5) * 0.4,     // Slight gentle drift
      opacity: Math.random() * 0.6 + 0.35,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let flake of flakes) {
        flake.y += flake.speedY;
        flake.x += flake.speedX;

        // Wrap around bottom and edges
        if (flake.y > canvas.height) {
          flake.y = -5;
          flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width) flake.x = 0;
        if (flake.x < 0) flake.x = canvas.width;

        // Render pixel-square snowflake
        ctx.fillStyle = `rgba(240, 248, 255, ${flake.opacity})`;
        ctx.fillRect(Math.floor(flake.x), Math.floor(flake.y), flake.size, flake.size);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="snow-canvas" aria-hidden="true" />;
}