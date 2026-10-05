import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface BootLoadingScreenProps {
  onComplete: () => void;
}

export const BootLoadingScreen: React.FC<BootLoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    'ASTRO-BIOS V1.0 (C) 1989 GALACTIC CORE',
    'CPU: 16-BIT RETRO PROCESSOR AT 12 MHz',
  ]);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const hasCompletedRef = useRef(false);

  const handleFinish = () => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onCompleteRef.current();
    }
  };

  useEffect(() => {
    const bootSequence = [
      { text: 'CHECKING RAM: 640 KB BASE OK', pct: 25 },
      { text: 'INITIALIZING MOTION VECTOR PIPELINE... OK', pct: 50 },
      { text: 'SYNTHESIZING 8-BIT AUDIO CHANNELS... OK', pct: 75 },
      { text: 'CALIBRATING STAR MAP COORDINATES... READY', pct: 100 },
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < bootSequence.length) {
        const item = bootSequence[step];
        setLogs((prev) => [...prev, item.text]);
        setProgress(item.pct);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(handleFinish, 300);
      }
    }, 300);

    // Allow pressing any key to skip loading immediately
    const handleKeyDown = () => {
      clearInterval(interval);
      handleFinish();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const totalBlocks = 20;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleFinish}
      className="fixed inset-0 z-50 bg-[#090714] text-[#38efdf] p-6 sm:p-12 flex flex-col justify-between font-reading text-xl select-none cursor-pointer"
      title="Klik di mana saja untuk melewati loading"
    >
      {/* Top Boot Header */}
      <div>
        <div className="flex items-center justify-between border-b-2 border-[#1b163a] pb-3 mb-6">
          <span className="font-pixel text-xs text-[#ffde59]">
            *** SYSTEM INITIALIZATION ***
          </span>
          <span className="text-[#9fa6cc] text-sm">MEM: 640K</span>
        </div>

        {/* Console Boot Messages */}
        <div className="space-y-2 font-reading text-lg sm:text-xl text-[#f5f6ff] leading-relaxed">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[#ff389b] font-pixel text-xs">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
          <div className="inline-block w-3 h-5 bg-[#38efdf] animate-retro-blink mt-2" />
        </div>
      </div>

      {/* Bottom Retro Chunky Progress Bar */}
      <div className="bg-[#0f0d24] border-2 border-[#41476e] p-4 sm:p-6 shadow-[0_4px_0_0_#090714]">
        <div className="flex justify-between items-center text-xs font-pixel text-[#ffde59] mb-2">
          <span>LOADING UNIVERSE ENGINE</span>
          <span>{progress}%</span>
        </div>

        {/* Stepped Pixel Block Bar */}
        <div className="w-full bg-[#090714] h-7 border-2 border-[#2a2050] p-1 flex gap-1">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full transition-colors duration-100 ${
                i < filledBlocks ? 'bg-[#38efdf]' : 'bg-[#1b163a]'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-[#9fa6cc] mt-2 font-reading">
          <span>STATUS: BOOTING ASSETS</span>
          <span className="text-[#ffde59] animate-retro-blink">[KLIK DI MANA SAJA UNTUK MELEWATI]</span>
        </div>
      </div>
    </motion.div>
  );
};
