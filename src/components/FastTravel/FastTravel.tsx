import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOCATIONS, type LocationItem } from '../../data/locations';
import { useGameStore } from '../../store/useGameStore';
import { soundFX } from '../../lib/audio';
import { Rocket, ChevronDown, ChevronUp } from 'lucide-react';

interface FastTravelProps {
  onFastTravel: (location: LocationItem) => void;
}

export const FastTravel: React.FC<FastTravelProps> = ({ onFastTravel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeLocationId, isTraveling, isSoundMuted } = useGameStore();

  const handleSelect = (loc: LocationItem) => {
    if (isTraveling) return;
    if (!isSoundMuted) {
      soundFX.playBlip();
    }
    onFastTravel(loc);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!isSoundMuted) {
      soundFX.playBlip();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="pointer-events-auto relative select-none">
      {/* Fast Travel Toggle Button */}
      <button
        onClick={handleToggle}
        disabled={isTraveling}
        className="pixel-btn pixel-btn-cyan text-[10px] px-3 py-2 flex items-center gap-2 shadow-[0_4px_0_0_#090714]"
      >
        <Rocket size={14} className={isTraveling ? 'animate-bounce' : ''} />
        <span className="font-pixel">
          {isTraveling ? 'WARP SPEED...' : 'FAST TRAVEL'}
        </span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

      {/* Dropdown Menu of Locations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full right-0 mb-2 w-72 bg-[#0f0d24] border-2 border-[#38efdf] p-2 shadow-[0_8px_0_0_#090714] z-50"
          >
            <div className="flex items-center justify-between text-[9px] font-pixel text-[#38efdf] mb-2 px-1 pb-1 border-b border-[#2a2050]">
              <span>SELECT DESTINATION</span>
              <span className="text-[#9fa6cc]">AUTO-PILOT</span>
            </div>

            <div className="flex flex-col gap-1.5 max-h-80 overflow-y-auto pr-1">
              {LOCATIONS.map((loc) => {
                const isActive = loc.id === activeLocationId;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleSelect(loc)}
                    className={`w-full text-left p-2 flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-[#1b163a] border border-[#38efdf] text-[#38efdf]'
                        : 'bg-[#090714] border border-[#2a2050] text-[#f5f6ff] hover:border-[#ff73c2] hover:text-[#ff73c2]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 inline-block"
                          style={{ backgroundColor: loc.accentHex }}
                        />
                        <span className="text-[10px] font-pixel truncate">
                          {loc.name}
                        </span>
                      </div>
                      <span className="text-[12px] font-reading text-[#9fa6cc] ml-4">
                        {loc.subtitle}
                      </span>
                    </div>

                    <span
                      className="text-[8px] font-pixel px-1 py-0.5 border"
                      style={{
                        borderColor: loc.accentHex,
                        color: loc.accentHex,
                      }}
                    >
                      {loc.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
