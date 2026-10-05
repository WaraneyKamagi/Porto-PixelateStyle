import React, { useRef } from 'react';
import { WORLD_BOUNDS, LOCATIONS, type LocationItem } from '../../data/locations';
import { useGameStore } from '../../store/useGameStore';
import { soundFX } from '../../lib/audio';

interface MinimapProps {
  currentWorldX: number;
  currentWorldY: number;
  viewportWidth: number;
  viewportHeight: number;
  onNavigate: (worldX: number, worldY: number) => void;
  onSelectLocation: (loc: LocationItem) => void;
}

export const Minimap: React.FC<MinimapProps> = ({
  currentWorldX,
  currentWorldY,
  viewportWidth,
  viewportHeight,
  onNavigate,
  onSelectLocation,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { shipX, shipY, activeLocationId, isSoundMuted } = useGameStore();

  const MAP_WIDTH = 180;
  const MAP_HEIGHT = 138;
  const scaleX = MAP_WIDTH / WORLD_BOUNDS.width;
  const scaleY = MAP_HEIGHT / WORLD_BOUNDS.height;

  // Viewport box dimensions and position
  const vpBoxW = Math.min(MAP_WIDTH, viewportWidth * scaleX);
  const vpBoxH = Math.min(MAP_HEIGHT, viewportHeight * scaleY);
  const vpBoxX = Math.max(0, Math.min(MAP_WIDTH - vpBoxW, (currentWorldX - viewportWidth / 2) * scaleX));
  const vpBoxY = Math.max(0, Math.min(MAP_HEIGHT - vpBoxH, (currentWorldY - viewportHeight / 2) * scaleY));

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const targetWorldX = Math.max(100, Math.min(WORLD_BOUNDS.width - 100, clickX / scaleX));
    const targetWorldY = Math.max(100, Math.min(WORLD_BOUNDS.height - 100, clickY / scaleY));

    if (!isSoundMuted) {
      soundFX.playSelect();
    }

    // Check if clicked close to a known location
    const nearestLoc = LOCATIONS.find((loc) => {
      const dx = loc.x - targetWorldX;
      const dy = loc.y - targetWorldY;
      return Math.sqrt(dx * dx + dy * dy) < 250;
    });

    if (nearestLoc) {
      onSelectLocation(nearestLoc);
    } else {
      onNavigate(targetWorldX, targetWorldY);
    }
  };

  return (
    <div className="pointer-events-auto bg-[#0f0d24] border-2 border-[#41476e] p-2 shadow-[0_4px_0_0_#090714] select-none">
      {/* Radar Header */}
      <div className="flex items-center justify-between text-[9px] font-pixel text-[#38efdf] mb-1.5 pb-1 border-b border-[#1b163a]">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-[#38efdf] inline-block animate-retro-blink" />
          MINIMAP
        </span>
        <span className="text-[#9fa6cc]">1:20</span>
      </div>

      {/* Radar Grid Map Screen */}
      <div
        ref={mapRef}
        onClick={handleClick}
        style={{
          width: `${MAP_WIDTH}px`,
          height: `${MAP_HEIGHT}px`,
          backgroundImage: `
            linear-gradient(to right, #1b163a 1px, transparent 1px),
            linear-gradient(to bottom, #1b163a 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
        className="relative bg-[#090714] border border-[#2a2050] overflow-hidden cursor-crosshair group"
      >
        {/* Radar Scanner Sweep Line */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(56,239,223,0.3) 50%, transparent 100%)',
            animation: 'radar-sweep 4s linear infinite',
          }}
        />

        {/* Location Dots */}
        {LOCATIONS.map((loc) => {
          const lx = loc.x * scaleX;
          const ly = loc.y * scaleY;
          const isActive = loc.id === activeLocationId;

          return (
            <div
              key={loc.id}
              style={{
                left: `${lx}px`,
                top: `${ly}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute pointer-events-none"
            >
              {isActive && (
                <div
                  className="absolute -inset-1 border border-[#38efdf] animate-ping"
                  style={{ animationDuration: '1.8s' }}
                />
              )}
              <div
                style={{ backgroundColor: loc.accentHex }}
                className={`w-2 h-2 ${isActive ? 'ring-1 ring-[#ffffff]' : ''}`}
                title={loc.name}
              />
            </div>
          );
        })}

        {/* Current Spaceship Position Marker */}
        <div
          style={{
            left: `${shipX * scaleX}px`,
            top: `${shipY * scaleY}px`,
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute pointer-events-none z-10"
        >
          <div className="w-2.5 h-2.5 bg-[#ffde59] border border-[#ff3864] animate-pulse" />
        </div>

        {/* Current Camera Viewport Rectangle */}
        <div
          style={{
            left: `${vpBoxX}px`,
            top: `${vpBoxY}px`,
            width: `${vpBoxW}px`,
            height: `${vpBoxH}px`,
          }}
          className="absolute border border-dashed border-[#38efdf]/80 pointer-events-none bg-[#38efdf]/5"
        />
      </div>

      <div className="text-[9px] font-reading text-[#9fa6cc] mt-1 text-center">
        [CLICK RADAR TO NAVIGATE]
      </div>
    </div>
  );
};
