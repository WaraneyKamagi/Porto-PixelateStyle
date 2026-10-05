import React, { useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { WORLD_BOUNDS } from '../../data/locations';

interface MobileTouchControlsProps {
  onFollowShip?: (x: number, y: number) => void;
}

export const MobileTouchControls: React.FC<MobileTouchControlsProps> = ({ onFollowShip }) => {
  const {
    shipX,
    shipY,
    setShipPos,
    setShipRotation,
    setThrusting,
    isTraveling,
  } = useGameStore();

  const intervalRef = useRef<number | null>(null);
  const posRef = useRef({ x: shipX, y: shipY });
  posRef.current = { x: shipX, y: shipY };

  const startMoving = (dx: number, dy: number, angle: number) => {
    if (isTraveling) return;
    setShipRotation(angle);
    setThrusting(true);

    const step = () => {
      const speed = 7.5;
      const nx = Math.max(60, Math.min(WORLD_BOUNDS.width - 60, posRef.current.x + dx * speed));
      const ny = Math.max(60, Math.min(WORLD_BOUNDS.height - 60, posRef.current.y + dy * speed));

      posRef.current = { x: nx, y: ny };
      setShipPos(nx, ny);
      onFollowShip?.(nx, ny);
    };

    step();
    intervalRef.current = window.setInterval(step, 16);
  };

  const stopMoving = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setThrusting(false);
  };

  return (
    <div className="pointer-events-auto md:hidden fixed bottom-4 left-4 z-40 flex flex-col items-center gap-1 select-none">
      {/* Up Button */}
      <button
        onTouchStart={(e) => { e.preventDefault(); startMoving(0, -1, 0); }}
        onTouchEnd={stopMoving}
        onMouseDown={() => startMoving(0, -1, 0)}
        onMouseUp={stopMoving}
        className="w-10 h-10 bg-[#1b163a] border-2 border-[#38efdf] text-[#38efdf] font-pixel text-xs active:bg-[#38efdf] active:text-[#090714] shadow-[0_2px_0_0_#090714] flex items-center justify-center"
        aria-label="Fly Up"
      >
        ▲
      </button>

      {/* Middle Row (Left / Right) */}
      <div className="flex gap-2">
        <button
          onTouchStart={(e) => { e.preventDefault(); startMoving(-1, 0, 270); }}
          onTouchEnd={stopMoving}
          onMouseDown={() => startMoving(-1, 0, 270)}
          onMouseUp={stopMoving}
          className="w-10 h-10 bg-[#1b163a] border-2 border-[#38efdf] text-[#38efdf] font-pixel text-xs active:bg-[#38efdf] active:text-[#090714] shadow-[0_2px_0_0_#090714] flex items-center justify-center"
          aria-label="Fly Left"
        >
          ◄
        </button>

        <button
          onTouchStart={(e) => { e.preventDefault(); startMoving(1, 0, 90); }}
          onTouchEnd={stopMoving}
          onMouseDown={() => startMoving(1, 0, 90)}
          onMouseUp={stopMoving}
          className="w-10 h-10 bg-[#1b163a] border-2 border-[#38efdf] text-[#38efdf] font-pixel text-xs active:bg-[#38efdf] active:text-[#090714] shadow-[0_2px_0_0_#090714] flex items-center justify-center"
          aria-label="Fly Right"
        >
          ►
        </button>
      </div>

      {/* Down Button */}
      <button
        onTouchStart={(e) => { e.preventDefault(); startMoving(0, 1, 180); }}
        onTouchEnd={stopMoving}
        onMouseDown={() => startMoving(0, 1, 180)}
        onMouseUp={stopMoving}
        className="w-10 h-10 bg-[#1b163a] border-2 border-[#38efdf] text-[#38efdf] font-pixel text-xs active:bg-[#38efdf] active:text-[#090714] shadow-[0_2px_0_0_#090714] flex items-center justify-center"
        aria-label="Fly Down"
      >
        ▼
      </button>
    </div>
  );
};
