import React from 'react';
import { motion } from 'motion/react';
import type { LocationItem } from '../../data/locations';
import { PixelSprite } from './PixelSprite';
import { soundFX } from '../../lib/audio';
import { useGameStore } from '../../store/useGameStore';

interface LocationMarkerProps {
  location: LocationItem;
  isActive: boolean;
  onSelect: (loc: LocationItem) => void;
}

export const LocationMarker: React.FC<LocationMarkerProps> = ({
  location,
  isActive,
  onSelect,
}) => {
  const isSoundMuted = useGameStore((s) => s.isSoundMuted);

  const handleMouseEnter = () => {
    if (!isSoundMuted) {
      soundFX.playBlip();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSoundMuted) {
      soundFX.playSelect();
    }
    onSelect(location);
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: location.x,
        top: location.y,
        transform: 'translate(-50%, -50%)',
      }}
      className="flex flex-col items-center justify-center cursor-pointer group z-20"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      {/* Target Reticle / Orbit Rings */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing selection box */}
        <div
          className={`absolute -inset-4 transition-opacity ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
          }`}
          style={{
            border: `2px dashed ${location.accentHex}`,
            animation: 'spin 12s linear infinite',
          }}
        />

        {/* Pixel Sprite with subtle retro hover float */}
        <div className="relative z-10 transition-transform">
          <PixelSprite type={location.iconType} size={110} />
        </div>

        {/* Glow backdrop */}
        <div
          className="absolute w-24 h-24 rounded-none opacity-20 filter blur-md pointer-events-none"
          style={{ backgroundColor: location.accentHex }}
        />
      </div>

      {/* Location Badge & Label */}
      <div className="mt-2 flex flex-col items-center pointer-events-none">
        {/* Tag / Sector */}
        <span
          className="text-[9px] font-pixel px-1.5 py-0.5 tracking-wider mb-1"
          style={{
            backgroundColor: '#090714',
            color: location.accentHex,
            border: `1px solid ${location.accentHex}`,
          }}
        >
          {location.tag}
        </span>

        {/* Location Name */}
        <div
          className={`text-[11px] font-pixel tracking-wider px-2.5 py-1 text-center whitespace-nowrap transition-colors ${
            isActive
              ? 'bg-[#38efdf] text-[#090714] shadow-[0_0_8px_#38efdf]'
              : 'bg-[#0f0d24] text-[#f5f6ff] group-hover:text-[#38efdf] border border-[#41476e]'
          }`}
        >
          {location.name}
        </div>

        {/* Subtitle */}
        <span className="text-[14px] font-reading text-[#9fa6cc] mt-0.5 tracking-wide">
          {location.subtitle}
        </span>
      </div>
    </motion.div>
  );
};
