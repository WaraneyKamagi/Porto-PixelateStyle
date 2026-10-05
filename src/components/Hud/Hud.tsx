import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Volume2, VolumeX, Compass, MapPin } from 'lucide-react';
import { soundFX } from '../../lib/audio';
import { Minimap } from '../Minimap/Minimap';
import { FastTravel } from '../FastTravel/FastTravel';
import type { LocationItem } from '../../data/locations';

interface HudProps {
  currentWorldX: number;
  currentWorldY: number;
  activeLocationName: string;
  viewportWidth: number;
  viewportHeight: number;
  onNavigateToCoords: (x: number, y: number) => void;
  onFastTravel: (loc: LocationItem) => void;
}

export const Hud: React.FC<HudProps> = ({
  currentWorldX,
  currentWorldY,
  activeLocationName,
  viewportWidth,
  viewportHeight,
  onNavigateToCoords,
  onFastTravel,
}) => {
  const {
    isSoundMuted,
    toggleSound,
    isPlainMode,
    togglePlainMode,
  } = useGameStore();

  const handleSoundToggle = () => {
    toggleSound();
    if (isSoundMuted) {
      setTimeout(() => soundFX.playSelect(), 50);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 p-3 sm:p-5 flex flex-col justify-between select-none">
      {/* Top Bar */}
      <div className="flex items-start justify-between w-full">
        {/* Top Left: Deep Space Radar & Coordinates */}
        <div className="pointer-events-auto bg-[#0f0d24] border-2 border-[#41476e] p-2.5 sm:p-3 text-[#f5f6ff] shadow-[0_4px_0_0_#090714]">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-[#38efdf] inline-block animate-retro-blink" />
            <span className="text-[10px] font-pixel text-[#38efdf] tracking-wider">
              GALAXY RADAR
            </span>
          </div>
          <div className="flex items-center gap-3 text-[14px] font-reading text-[#9fa6cc]">
            <div className="flex items-center gap-1">
              <Compass size={14} className="text-[#ffde59]" />
              <span>
                X: <strong className="text-[#f5f6ff]">{Math.round(currentWorldX)}</strong>
              </span>
            </div>
            <div>
              Y: <strong className="text-[#f5f6ff]">{Math.round(currentWorldY)}</strong>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[13px] font-reading text-[#ff73c2]">
            <MapPin size={13} />
            <span className="truncate max-w-[180px] sm:max-w-[240px]">
              {activeLocationName}
            </span>
          </div>
        </div>

        {/* Top Right: System Controls (Audio & Plain Mode) */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Sound Toggle Button */}
          <button
            onClick={handleSoundToggle}
            className="pixel-btn text-[10px] px-2.5 py-2 flex items-center gap-1.5"
            title={isSoundMuted ? 'Aktifkan Suara 8-Bit' : 'Matikan Suara'}
          >
            {isSoundMuted ? (
              <>
                <VolumeX size={14} className="text-[#ff3864]" />
                <span className="hidden sm:inline">SFX: OFF</span>
              </>
            ) : (
              <>
                <Volume2 size={14} className="text-[#38efdf]" />
                <span className="hidden sm:inline">SFX: ON</span>
              </>
            )}
          </button>

          {/* Plain Mode Button */}
          <button
            onClick={togglePlainMode}
            className="pixel-btn pixel-btn-magenta text-[10px] px-2.5 py-2"
            title="Beralih ke tampilan teks biasa (Aksesibilitas & SEO)"
          >
            {isPlainMode ? 'SPACE' : 'PLAIN MODE'}
          </button>
        </div>
      </div>

      {/* Bottom Bar: Controls Guide & Minimap + Fast Travel */}
      <div className="flex items-end justify-between w-full gap-4">
        {/* Bottom Left: Flight Controls Guide */}
        <div className="pointer-events-auto bg-[#0f0d24]/90 border border-[#41476e] p-2 sm:p-2.5 text-[#9fa6cc] font-reading hidden md:flex flex-col gap-1 text-[13px] shadow-[0_2px_0_0_#090714]">
          <div className="flex items-center gap-2">
            <span className="text-[#ffde59] font-pixel text-[8px] px-1 bg-[#1b163a] border border-[#ffde59]">
              WASD / ARROWS
            </span>
            <span>Terbangkan pesawat penjelajah</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#38efdf] font-pixel text-[8px] px-1 bg-[#1b163a] border border-[#38efdf]">
              DRAG / SWIPE
            </span>
            <span>Geser peta galaksi (inersia)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#ff73c2] font-pixel text-[8px] px-1 bg-[#1b163a] border border-[#ff73c2]">
              ENTER / TAP
            </span>
            <span>Interaksi saat mendekati sektor</span>
          </div>
        </div>

        {/* Bottom Right: Minimap and Fast Travel Drawer */}
        <div className="pointer-events-auto flex flex-col items-end gap-2">
          {/* Fast Travel Button & Menu */}
          <FastTravel onFastTravel={onFastTravel} />

          {/* Radar Minimap */}
          <div className="hidden sm:block">
            <Minimap
              currentWorldX={currentWorldX}
              currentWorldY={currentWorldY}
              viewportWidth={viewportWidth}
              viewportHeight={viewportHeight}
              onNavigate={onNavigateToCoords}
              onSelectLocation={onFastTravel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
