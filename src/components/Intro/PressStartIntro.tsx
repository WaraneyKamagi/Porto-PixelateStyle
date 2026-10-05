import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE_DATA } from '../../data/profile';
import { soundFX } from '../../lib/audio';
import { useGameStore } from '../../store/useGameStore';
import { Rocket } from 'lucide-react';

interface PressStartIntroProps {
  onLaunchComplete: () => void;
}

export const PressStartIntro: React.FC<PressStartIntroProps> = ({ onLaunchComplete }) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const { isSoundMuted, startGame } = useGameStore();

  const onLaunchCompleteRef = useRef(onLaunchComplete);
  onLaunchCompleteRef.current = onLaunchComplete;

  const handleStart = () => {
    if (countdown !== null) return;
    setCountdown(3);
    if (!isSoundMuted) {
      soundFX.playCountdown(false);
    }
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        const next = countdown - 1;
        setCountdown(next);
        if (!isSoundMuted) {
          soundFX.playCountdown(next === 0);
        }
      }, 750);
      return () => clearTimeout(timer);
    }

    if (countdown === 0) {
      if (!isSoundMuted) {
        soundFX.playWarp();
      }
      const endTimer = setTimeout(() => {
        startGame();
        onLaunchCompleteRef.current();
      }, 800);
      return () => clearTimeout(endTimer);
    }
  }, [countdown, isSoundMuted, startGame]);

  // Support pressing Enter or Space to Start
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [countdown]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[#090714]/80 backdrop-blur-[3px] select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05, y: -20 }}
        transition={{ duration: 0.3 }}
        className="text-center max-w-xl w-full bg-[#0f0d24] border-4 border-[#38efdf] p-6 sm:p-10 shadow-[0_8px_0_0_#090714]"
      >
        {/* Game Title Badge */}
        <div className="mb-6">
          <span className="text-[10px] font-pixel text-[#ffde59] px-2 py-0.5 bg-[#1b163a] border border-[#ffde59] tracking-widest inline-block mb-3">
            ARCADE EDITION • 16-BIT UNIVERSE
          </span>
          <h1 className="text-2xl sm:text-4xl font-pixel text-[#38efdf] tracking-wider mb-2 filter drop-shadow-[0_0_12px_rgba(56,239,223,0.5)]">
            PIXEL GALAXY
          </h1>
          <p className="text-sm sm:text-base font-pixel text-[#ff73c2]">
            {PROFILE_DATA.name} — {PROFILE_DATA.classTitle}
          </p>
        </div>

        {/* Tagline Box */}
        <div className="bg-[#1b163a] border-2 border-[#41476e] p-4 mb-8 text-[#f5f6ff] font-reading text-xl leading-relaxed italic">
          "{PROFILE_DATA.tagline}"
        </div>

        {/* Countdown Overlay or PRESS START Prompt */}
        <AnimatePresence mode="wait">
          {countdown !== null ? (
            <motion.div
              key="countdown"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="py-4"
            >
              <div className="text-[12px] font-pixel text-[#38efdf] mb-2 tracking-widest">
                ROCKET IGNITION IN PROGRESS...
              </div>
              <div className="text-5xl sm:text-6xl font-pixel text-[#ffde59] animate-pulse">
                {countdown === 0 ? 'LIFT OFF!' : countdown}
              </div>
            </motion.div>
          ) : (
            <motion.div key="press-start" className="space-y-4">
              <button
                onClick={handleStart}
                className="pixel-btn pixel-btn-cyan text-sm sm:text-base py-3 px-8 w-full sm:w-auto font-pixel flex items-center justify-center gap-3 mx-auto"
              >
                <Rocket size={18} />
                <span className="animate-retro-blink">PRESS START [ENTER]</span>
              </button>

              <div className="text-xs font-reading text-[#9fa6cc] tracking-wide">
                Gunakan keyboard WASD atau geser layar untuk menjelajah
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
