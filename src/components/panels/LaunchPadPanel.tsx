import React from 'react';
import { PanelContainer } from './PanelContainer';
import { PROFILE_DATA } from '../../data/profile';
import { useGameStore } from '../../store/useGameStore';
import { soundFX } from '../../lib/audio';
import { Rocket } from 'lucide-react';

interface LaunchPadPanelProps {
  onClose: () => void;
  onLaunch?: () => void;
}

export const LaunchPadPanel: React.FC<LaunchPadPanelProps> = ({ onClose, onLaunch }) => {
  const { isSoundMuted, startGame } = useGameStore();

  const handleStart = () => {
    if (!isSoundMuted) {
      soundFX.playWarp();
    }
    startGame();
    onLaunch?.();
    onClose();
  };

  return (
    <PanelContainer
      title="LAUNCH PAD ALPHA"
      subtitle="Base Station Origin & Pre-Flight Briefing"
      tag="SEC-01"
      accentColor="#38efdf"
      onClose={onClose}
      maxWidth="max-w-xl"
    >
      <div className="flex flex-col items-center text-center py-2">
        {/* Blinking Title Banner */}
        <div className="mb-4">
          <span className="text-[10px] font-pixel text-[#ffde59] tracking-widest block mb-2 animate-retro-blink">
            *** MISSION READY ***
          </span>
          <h1 className="text-2xl sm:text-3xl font-pixel text-[#38efdf] mb-2">
            {PROFILE_DATA.name}
          </h1>
          <p className="text-[15px] font-pixel text-[#ff73c2]">
            {PROFILE_DATA.classTitle}
          </p>
        </div>

        {/* Tagline */}
        <div className="bg-[#1b163a] border-2 border-[#41476e] p-4 my-3 text-left w-full">
          <p className="text-[#f5f6ff] text-xl leading-relaxed italic">
            "{PROFILE_DATA.tagline}"
          </p>
        </div>

        {/* Flight Navigation Instructions */}
        <div className="w-full bg-[#090714] border border-[#2a2050] p-3 text-left my-3 space-y-1.5 text-sm text-[#9fa6cc]">
          <div className="text-[10px] font-pixel text-[#38efdf] mb-1">
            PILOT FLIGHT MANUAL:
          </div>
          <div>• <strong>WASD / PANAH</strong>: Kendalikan arah pesawat penjelajah di angkasa.</div>
          <div>• <strong>DRAG / SWIPE</strong>: Geser peta alam semesta dengan inersia.</div>
          <div>• <strong>FAST TRAVEL & RADAR</strong>: Warp otomatis ke sektor mana saja di galaksi.</div>
        </div>

        {/* Big Start / Launch Action */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            onClick={handleStart}
            className="pixel-btn pixel-btn-cyan text-xs py-3 px-6 flex items-center justify-center gap-2"
          >
            <Rocket size={16} />
            <span className="font-pixel">LAUNCH MISSION [START]</span>
          </button>
        </div>
      </div>
    </PanelContainer>
  );
};
