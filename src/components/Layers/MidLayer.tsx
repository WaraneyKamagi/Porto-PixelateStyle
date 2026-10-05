import React from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';

interface MidLayerProps {
  worldX: MotionValue<number>;
  worldY: MotionValue<number>;
}

export const MidLayer: React.FC<MidLayerProps> = ({ worldX, worldY }) => {
  // Layer 2 moves at 0.45x speed of main world, snapped to 2px pixel grid
  const midX = useTransform(worldX, (val) => Math.round((val * 0.45) / 2) * 2);
  const midY = useTransform(worldY, (val) => Math.round((val * 0.45) / 2) * 2);

  return (
    <motion.div
      style={{ x: midX, y: midY }}
      className="absolute top-0 left-0 w-[3400px] h-[2600px] pointer-events-none z-10"
    >
      {/* Distant Cosmic Dust Clusters & Nebulae (Pixel SVG shapes) */}
      <div className="absolute top-[200px] left-[500px] opacity-40">
        <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
          <rect x="20" y="20" width="40" height="40" fill="#4d3280" opacity="0.6" />
          <rect x="50" y="10" width="60" height="50" fill="#794cb5" opacity="0.5" />
          <rect x="90" y="30" width="50" height="40" fill="#38efdf" opacity="0.3" />
          <rect x="40" y="50" width="70" height="40" fill="#ff389b" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute top-[800px] left-[1700px] opacity-35">
        <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
          <rect x="30" y="30" width="80" height="60" fill="#29a4ff" opacity="0.4" />
          <rect x="80" y="50" width="90" height="60" fill="#4d3280" opacity="0.5" />
          <rect x="130" y="20" width="50" height="50" fill="#ff73c2" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute top-[1600px] left-[800px] opacity-40">
        <svg width="190" height="130" viewBox="0 0 190 130" fill="none">
          <rect x="20" y="30" width="70" height="50" fill="#794cb5" opacity="0.5" />
          <rect x="70" y="20" width="80" height="70" fill="#ffde59" opacity="0.25" />
          <rect x="100" y="50" width="60" height="50" fill="#38efdf" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute top-[2100px] left-[2200px] opacity-30">
        <svg width="250" height="180" viewBox="0 0 250 180" fill="none">
          <rect x="40" y="40" width="100" height="80" fill="#ff3864" opacity="0.3" />
          <rect x="100" y="60" width="90" height="70" fill="#4d3280" opacity="0.5" />
        </svg>
      </div>

      {/* Floating Space Dust Pixels */}
      {[
        { t: 400, l: 300, c: '#ffde59' },
        { t: 650, l: 900, c: '#38efdf' },
        { t: 1200, l: 1500, c: '#ff73c2' },
        { t: 1450, l: 2600, c: '#29a4ff' },
        { t: 1900, l: 400, c: '#f5f6ff' },
        { t: 2300, l: 1700, c: '#ffde59' },
      ].map((p, idx) => (
        <div
          key={idx}
          className="absolute w-2 h-2"
          style={{
            top: `${p.t}px`,
            left: `${p.l}px`,
            backgroundColor: p.c,
            boxShadow: `0 0 6px ${p.c}`,
          }}
        />
      ))}
    </motion.div>
  );
};
