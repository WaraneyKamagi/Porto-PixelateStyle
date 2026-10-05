import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFX } from '../../lib/audio';
import { useGameStore } from '../../store/useGameStore';

interface CometEasterEggProps {
  onCatch: (message: string) => void;
}

const COMET_JOKES = [
  'Debugging itu seperti menjadi detektif di film misteri kriminal di mana kamu juga yang melakukannya!',
  'Ada 10 jenis manusia: mereka yang mengerti kode biner, dan mereka yang tidak.',
  'Kenapa programmer suka tema gelap? Karena serangga (bugs) tertarik pada cahaya terang!',
  'CSS is like magic: sesekali margin: 0 auto berhasil, selebihnya kita berdoa kepada dewa piksel.',
  'Commit pesan terbaik: "Jangan disentuh, ini jalan tapi saya tidak tahu kenapa".',
];

export const CometEasterEgg: React.FC<CometEasterEggProps> = ({ onCatch }) => {
  const [active, setActive] = useState(false);
  const [cometKey, setCometKey] = useState(0);
  const isSoundMuted = useGameStore((s) => s.isSoundMuted);

  useEffect(() => {
    // Schedule random comet appearance every 18-35 seconds
    const scheduleNext = () => {
      const delay = Math.floor(Math.random() * 16000) + 18000;
      return setTimeout(() => {
        setCometKey((prev) => prev + 1);
        setActive(true);

        // Turn off after flight finishes (6s)
        setTimeout(() => {
          setActive(false);
          timer = scheduleNext();
        }, 5500);
      }, delay);
    };

    let timer = scheduleNext();
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(false);
    if (!isSoundMuted) {
      soundFX.playSecret();
    }
    const randomJoke = COMET_JOKES[Math.floor(Math.random() * COMET_JOKES.length)];
    onCatch(randomJoke);
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={cometKey}
          initial={{ x: '110vw', y: '-10vh', opacity: 0 }}
          animate={{ x: '-20vw', y: '110vh', opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 5.2, ease: 'linear' }}
          onClick={handleClick}
          className="fixed z-40 cursor-pointer pointer-events-auto flex items-center group"
          title="Klik untuk menangkap komet!"
        >
          {/* Glowing Tail */}
          <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-[#ff389b] to-[#ffde59] opacity-80" />

          {/* Stepped Pixel Comet Head */}
          <div className="relative w-6 h-6 bg-[#ffde59] border-2 border-[#ffffff] shadow-[0_0_12px_#ffde59] group-hover:scale-125 transition-transform flex items-center justify-center">
            <div className="w-2 h-2 bg-[#ffffff]" />
            <span className="absolute -top-6 -left-6 text-[8px] font-pixel text-[#ffde59] bg-[#090714] px-1 border border-[#ffde59] opacity-0 group-hover:opacity-100 whitespace-nowrap">
              CATCH ME!
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
