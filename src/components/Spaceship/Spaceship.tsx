import React from 'react';
import { motion } from 'motion/react';

interface SpaceshipProps {
  x: number;
  y: number;
  rotation: number;
  isThrusting: boolean;
  nearbyLocationName?: string | null;
  onInteract?: () => void;
}

export const Spaceship: React.FC<SpaceshipProps> = ({
  x,
  y,
  rotation,
  isThrusting,
  nearbyLocationName,
  onInteract,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        zIndex: 35,
        pointerEvents: 'none',
      }}
    >
      {/* Ship Container with Rotation */}
      <motion.div
        animate={{
          rotate: rotation,
          y: isThrusting ? 0 : [0, -3, 0],
        }}
        transition={{
          rotate: { duration: 0.12, ease: 'linear' },
          y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative flex items-center justify-center w-14 h-14"
      >
        {/* Pixel Spaceship SVG (32x32 retro grid) */}
        <svg
          width="44"
          height="44"
          viewBox="0 0 32 32"
          fill="none"
          className="image-pixelated filter drop-shadow-[0_0_8px_rgba(56,239,223,0.6)]"
        >
          {/* Main Hull Body (Deep Violet & Slate) */}
          <rect x="14" y="2" width="4" height="6" fill="#f5f6ff" />
          <rect x="12" y="8" width="8" height="14" fill="#1b163a" />
          <rect x="10" y="14" width="12" height="10" fill="#2a2050" />
          <rect x="14" y="6" width="4" height="12" fill="#41476e" />

          {/* Cockpit Canopy (Neon Cyan Glass) */}
          <rect x="14" y="8" width="4" height="6" fill="#38efdf" />
          <rect x="15" y="9" width="2" height="3" fill="#ffffff" />

          {/* Wings & Wingtips */}
          <rect x="6" y="16" width="4" height="10" fill="#794cb5" />
          <rect x="22" y="16" width="4" height="10" fill="#794cb5" />
          <rect x="4" y="20" width="2" height="6" fill="#ff389b" />
          <rect x="26" y="20" width="2" height="6" fill="#ff389b" />
          <rect x="8" y="22" width="2" height="4" fill="#38efdf" />
          <rect x="22" y="22" width="2" height="4" fill="#38efdf" />

          {/* Wing Cannons */}
          <rect x="4" y="14" width="2" height="6" fill="#9fa6cc" />
          <rect x="26" y="14" width="2" height="6" fill="#9fa6cc" />

          {/* Twin Engine Mounts */}
          <rect x="11" y="24" width="3" height="4" fill="#090714" />
          <rect x="18" y="24" width="3" height="4" fill="#090714" />
        </svg>

        {/* Animated Rocket Thruster Flames */}
        {isThrusting && (
          <div className="absolute top-[38px] flex items-center justify-center gap-1 pointer-events-none">
            {/* Left Thruster Flame */}
            <div className="flex flex-col items-center animate-retro-blink">
              <div className="w-1.5 h-3 bg-[#ffde59]" />
              <div className="w-1 h-2 bg-[#ff9f24]" />
              <div className="w-0.5 h-1.5 bg-[#ff3864]" />
            </div>

            {/* Right Thruster Flame */}
            <div
              className="flex flex-col items-center animate-retro-blink"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-1.5 h-3 bg-[#ffde59]" />
              <div className="w-1 h-2 bg-[#ff9f24]" />
              <div className="w-0.5 h-1.5 bg-[#ff3864]" />
            </div>
          </div>
        )}
      </motion.div>

      {/* Docking Hint Prompt when near location */}
      {nearbyLocationName && (
        <div
          onClick={onInteract}
          className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer whitespace-nowrap bg-[#0f0d24] border-2 border-[#38efdf] px-3 py-1 text-center shadow-[0_4px_0_0_#090714]"
        >
          <div className="text-[9px] font-pixel text-[#38efdf] animate-retro-blink">
            [ENTER] TO DOCK
          </div>
          <div className="text-[12px] font-reading text-[#f5f6ff]">
            {nearbyLocationName}
          </div>
        </div>
      )}
    </div>
  );
};
