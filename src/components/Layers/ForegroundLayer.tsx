import React from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';

interface ForegroundLayerProps {
  worldX: MotionValue<number>;
  worldY: MotionValue<number>;
}

export const ForegroundLayer: React.FC<ForegroundLayerProps> = ({ worldX, worldY }) => {
  // Layer 4 moves faster (1.35x) to create near-camera depth, snapped to 2px grid
  const fgX = useTransform(worldX, (val) => Math.round((val * 1.35) / 2) * 2);
  const fgY = useTransform(worldY, (val) => Math.round((val * 1.35) / 2) * 2);

  return (
    <motion.div
      style={{ x: fgX, y: fgY }}
      className="absolute top-0 left-0 w-[3400px] h-[2600px] pointer-events-none z-30 overflow-visible"
    >
      {/* Drifting Pixel Asteroids */}
      <div className="absolute top-[350px] left-[750px] opacity-80 animate-float-pixel">
        <svg width="40" height="32" viewBox="0 0 20 16">
          <rect x="4" y="0" width="12" height="16" fill="#41476e" />
          <rect x="0" y="4" width="20" height="8" fill="#41476e" />
          <rect x="4" y="2" width="10" height="10" fill="#9fa6cc" />
          <rect x="6" y="4" width="4" height="4" fill="#f5f6ff" />
        </svg>
      </div>

      <div className="absolute top-[1100px] left-[1900px] opacity-75">
        <svg width="32" height="28" viewBox="0 0 16 14">
          <rect x="4" y="0" width="8" height="14" fill="#41476e" />
          <rect x="0" y="4" width="16" height="6" fill="#41476e" />
          <rect x="4" y="2" width="6" height="8" fill="#794cb5" />
          <rect x="6" y="4" width="2" height="2" fill="#38efdf" />
        </svg>
      </div>

      <div className="absolute top-[1750px] left-[650px] opacity-85 animate-float-pixel">
        <svg width="36" height="36" viewBox="0 0 18 18">
          <rect x="4" y="2" width="10" height="14" fill="#2a2050" />
          <rect x="2" y="4" width="14" height="10" fill="#41476e" />
          <rect x="6" y="6" width="6" height="6" fill="#ff9f24" />
          <rect x="8" y="8" width="2" height="2" fill="#ffde59" />
        </svg>
      </div>

      <div className="absolute top-[2150px] left-[1350px] opacity-80">
        <svg width="48" height="24" viewBox="0 0 24 12">
          <rect x="4" y="0" width="16" height="12" fill="#41476e" />
          <rect x="0" y="2" width="24" height="8" fill="#41476e" />
          <rect x="6" y="2" width="12" height="6" fill="#9fa6cc" />
          <rect x="8" y="4" width="4" height="2" fill="#f5f6ff" />
        </svg>
      </div>
    </motion.div>
  );
};
