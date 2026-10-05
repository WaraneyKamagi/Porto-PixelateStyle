import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { WORLD_BOUNDS, LOCATIONS, type LocationItem } from '../data/locations';
import { getDistance } from '../lib/pixelUtils';

interface KeyboardControlsOptions {
  onFollowShip?: (x: number, y: number) => void;
  onInteract?: (loc: LocationItem) => void;
  onEscape?: () => void;
}

export function useKeyboardControls({
  onFollowShip,
  onInteract,
  onEscape,
}: KeyboardControlsOptions = {}) {
  const {
    shipX,
    shipY,
    setShipPos,
    setShipRotation,
    setThrusting,
    isTraveling,
    hasGameStarted,
    isPlainMode,
  } = useGameStore();

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const posRef = useRef({ x: shipX, y: shipY });

  // Sync ref with store position changes (e.g. fast travel updates)
  useEffect(() => {
    posRef.current = { x: shipX, y: shipY };
  }, [shipX, shipY]);

  useEffect(() => {
    if (isPlainMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture keys if typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      keysRef.current[e.code] = true;

      if (e.code === 'Escape') {
        onEscape?.();
      }

      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        // Check if near any location
        const near = LOCATIONS.find(
          (loc) => getDistance(posRef.current.x, posRef.current.y, loc.x, loc.y) < 160
        );
        if (near) {
          onInteract?.(near);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animId: number;
    const speed = 7.5;

    const tick = () => {
      if (!isTraveling) {
        let dx = 0;
        let dy = 0;

        const keys = keysRef.current;
        if (keys['KeyW'] || keys['ArrowUp']) dy -= 1;
        if (keys['KeyS'] || keys['ArrowDown']) dy += 1;
        if (keys['KeyA'] || keys['ArrowLeft']) dx -= 1;
        if (keys['KeyD'] || keys['ArrowRight']) dx += 1;

        if (dx !== 0 || dy !== 0) {
          // Normalize diagonal speed
          const length = Math.sqrt(dx * dx + dy * dy);
          const nx = (dx / length) * speed;
          const ny = (dy / length) * speed;

          const newX = Math.max(60, Math.min(WORLD_BOUNDS.width - 60, posRef.current.x + nx));
          const newY = Math.max(60, Math.min(WORLD_BOUNDS.height - 60, posRef.current.y + ny));

          posRef.current = { x: newX, y: newY };
          setShipPos(newX, newY);

          // Calculate rotation angle in degrees (+90 because sprite default points up)
          const angle = Math.atan2(ny, nx) * (180 / Math.PI) + 90;
          setShipRotation(angle);
          setThrusting(true);

          // Smoothly guide camera to follow ship
          onFollowShip?.(newX, newY);
        } else {
          setThrusting(false);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animId);
    };
  }, [isTraveling, isPlainMode, hasGameStarted, onFollowShip, onInteract, onEscape, setShipPos, setShipRotation, setThrusting]);
}
