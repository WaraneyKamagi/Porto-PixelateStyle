import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';
import { soundFX } from '../../lib/audio';
import { getDistance } from '../../lib/pixelUtils';
import { LOCATIONS } from '../../data/locations';

interface BlackHoleProps {
  x?: number;
  y?: number;
  onTeleport: (msg: string, destX: number, destY: number) => void;
}

export const BlackHole: React.FC<BlackHoleProps> = ({
  x = 3000,
  y = 2200,
  onTeleport,
}) => {
  const isSuckedRef = useRef(false);
  const onTeleportRef = useRef(onTeleport);
  onTeleportRef.current = onTeleport;

  useEffect(() => {
    let animId: number;

    const checkGravity = () => {
      const state = useGameStore.getState();

      if (!state.isTraveling && !isSuckedRef.current && state.hasGameStarted) {
        const sx = state.shipX;
        const sy = state.shipY;
        const d = getDistance(sx, sy, x, y);

        // Gravitational pull field (radius 260px)
        if (d < 260 && d >= 50) {
          const pull = Math.min(4, (260 - d) * 0.03);
          const angle = Math.atan2(y - sy, x - sx);
          const nextX = sx + Math.cos(angle) * pull;
          const nextY = sy + Math.sin(angle) * pull;
          state.setShipPos(nextX, nextY);
        } else if (d < 50) {
          // Breached event horizon
          isSuckedRef.current = true;
          if (!state.isSoundMuted) {
            soundFX.playVortex();
          }

          // Pick a random safe location (e.g. Launch Pad, Planet Asal, or Gugus Planet)
          const safeLocs = LOCATIONS.slice(0, 3);
          const targetLoc = safeLocs[Math.floor(Math.random() * safeLocs.length)];

          setTimeout(() => {
            // Eject ship to target location
            state.setShipPos(targetLoc.x, targetLoc.y);
            isSuckedRef.current = false;
            onTeleportRef.current(
              `🌀 SINGULARITAS RUANG-WAKTU! Kamu tersedot ke dalam lubang hitam dan terlempar keluar melalui jembatan Einstein-Rosen ke ${targetLoc.name}! Semua sistem navigasi telah dikalibrasi ulang.`,
              targetLoc.x,
              targetLoc.y
            );
          }, 700);
        }
      }

      animId = requestAnimationFrame(checkGravity);
    };

    animId = requestAnimationFrame(checkGravity);
    return () => cancelAnimationFrame(animId);
  }, [x, y]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        zIndex: 18,
      }}
      className="pointer-events-none select-none flex flex-col items-center justify-center"
    >
      {/* Outer Gravitational Distortion Waves */}
      <div className="absolute w-64 h-64 border-2 border-dashed border-[#ff3864]/30 rounded-none animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute w-44 h-44 border border-[#ff9f24]/40 rounded-none animate-ping" style={{ animationDuration: '3s' }} />

      {/* Accretion Disk Swirl */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="relative flex items-center justify-center"
      >
        <svg width="120" height="120" viewBox="0 0 40 40" className="image-pixelated filter drop-shadow-[0_0_16px_rgba(255,56,100,0.8)]">
          {/* Swirling Pixel Particles */}
          <rect x="2" y="18" width="36" height="4" fill="#ff3864" />
          <rect x="6" y="14" width="28" height="12" fill="#ff9f24" opacity="0.8" />
          <rect x="10" y="10" width="20" height="20" fill="#ffde59" opacity="0.6" />
          <rect x="12" y="8" width="16" height="24" fill="#794cb5" opacity="0.5" />
          {/* Central Absolute Black Void */}
          <rect x="14" y="14" width="12" height="12" fill="#090714" />
          <rect x="15" y="13" width="10" height="14" fill="#090714" />
          <rect x="13" y="15" width="14" height="10" fill="#090714" />
        </svg>
      </motion.div>

      {/* Warning Sector Label */}
      <div className="mt-3 bg-[#090714] border border-[#ff3864] px-2 py-0.5 text-center">
        <span className="text-[9px] font-pixel text-[#ff3864] animate-retro-blink block">
          ⚠️ ANOMALI GRAVITASI
        </span>
        <span className="text-[11px] font-reading text-[#9fa6cc]">
          SINGULARITY SEC-X
        </span>
      </div>
    </div>
  );
};
