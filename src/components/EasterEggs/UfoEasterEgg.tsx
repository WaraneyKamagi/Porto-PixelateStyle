import React from 'react';
import { motion } from 'motion/react';
import { soundFX } from '../../lib/audio';
import { useGameStore } from '../../store/useGameStore';

interface UfoEasterEggProps {
  x?: number;
  y?: number;
  onInteract: (msg: string) => void;
}

export const UfoEasterEgg: React.FC<UfoEasterEggProps> = ({
  x = 2950,
  y = 520,
  onInteract,
}) => {
  const isSoundMuted = useGameStore((s) => s.isSoundMuted);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSoundMuted) {
      soundFX.playSecret();
    }
    onInteract(
      '🛸 BEEP-BOOP! Kami dari ras alien Andromeda mengamati arsitektur webmu. Struktur komponen React 19 dan transisi Motion ini sangat bersih dan memukau! Berkat ini, kami berikan buff: +1000 Cosmic Luck dan 0 Merge Conflict selama 1 tahun!'
    );
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        zIndex: 25,
      }}
      className="cursor-pointer select-none group"
      onClick={handleClick}
      title="UFO Misterius! Klik untuk berkomunikasi."
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex flex-col items-center"
      >
        {/* Pixel Flying Saucer UFO */}
        <svg
          width="54"
          height="36"
          viewBox="0 0 36 24"
          className="image-pixelated filter drop-shadow-[0_0_10px_#38efdf]"
        >
          {/* Glass Cockpit Dome */}
          <rect x="14" y="2" width="8" height="6" fill="#38efdf" />
          <rect x="16" y="4" width="4" height="2" fill="#ffffff" />
          {/* Alien Pilot Head */}
          <rect x="17" y="5" width="2" height="2" fill="#38efdf" />

          {/* Saucer Hull */}
          <rect x="8" y="8" width="20" height="4" fill="#794cb5" />
          <rect x="4" y="12" width="28" height="4" fill="#1b163a" />
          <rect x="2" y="14" width="32" height="2" fill="#ff389b" />

          {/* Blinking Saucer Lights */}
          <rect x="6" y="13" width="2" height="2" fill="#ffde59" className="animate-retro-blink" />
          <rect x="14" y="13" width="2" height="2" fill="#38efdf" className="animate-retro-blink" style={{ animationDelay: '0.2s' }} />
          <rect x="20" y="13" width="2" height="2" fill="#ffde59" className="animate-retro-blink" style={{ animationDelay: '0.4s' }} />
          <rect x="28" y="13" width="2" height="2" fill="#38efdf" className="animate-retro-blink" style={{ animationDelay: '0.6s' }} />
        </svg>

        {/* Pulsing Tractor Beam */}
        <div className="w-8 h-10 bg-gradient-to-b from-[#38efdf]/40 to-transparent clip-path-polygon opacity-40 group-hover:opacity-100 transition-opacity" />

        <span className="text-[8px] font-pixel text-[#38efdf] bg-[#090714] px-1 border border-[#38efdf] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          ALIEN CONTACT
        </span>
      </motion.div>
    </div>
  );
};
