import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import { soundFX } from '../../lib/audio';
import { useGameStore } from '../../store/useGameStore';

interface EasterEggModalProps {
  isOpen: boolean;
  title: string;
  badge?: string;
  message: string;
  bonus?: string;
  accentColor?: string;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({
  isOpen,
  title,
  badge = 'SECRET DISCOVERY',
  message,
  bonus = '+500 EXP',
  accentColor = '#ffde59',
  onClose,
}) => {
  const isSoundMuted = useGameStore((s) => s.isSoundMuted);

  const handleClose = () => {
    if (!isSoundMuted) {
      soundFX.playClose();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090714]/80 backdrop-blur-[2px] select-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            style={{
              boxShadow: `
                0 -4px 0 0 #090714,
                0 4px 0 0 #090714,
                -4px 0 0 0 #090714,
                4px 0 0 0 #090714,
                0 0 0 4px ${accentColor},
                0 8px 24px rgba(0, 0, 0, 0.9)
              `,
            }}
            className="bg-[#0f0d24] border-2 border-[#1b163a] max-w-md w-full p-5 text-center relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#2a2050]">
              <span
                style={{ backgroundColor: accentColor, color: '#090714' }}
                className="text-[9px] font-pixel px-2 py-0.5 font-bold"
              >
                ★ {badge}
              </span>

              <button
                onClick={handleClose}
                className="text-[#9fa6cc] hover:text-[#ff3864]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Icon & Title */}
            <div className="my-3">
              <Sparkles size={32} className="mx-auto mb-2 text-[#ffde59] animate-bounce" />
              <h3 className="text-base font-pixel text-[#f5f6ff] mb-2">
                {title}
              </h3>
            </div>

            {/* Message Body */}
            <div className="bg-[#1b163a] border border-[#41476e] p-3 text-base font-reading text-[#f5f6ff] leading-relaxed mb-4">
              "{message}"
            </div>

            {/* Reward Bonus Badge */}
            <div className="flex items-center justify-between text-xs font-pixel">
              <span className="text-[#38efdf]">REWARD:</span>
              <span className="text-[#ffde59] px-2 py-1 bg-[#090714] border border-[#ffde59]">
                {bonus}
              </span>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleClose}
              className="pixel-btn pixel-btn-cyan w-full text-xs font-pixel py-2 mt-4"
            >
              KLAIM HADIAH [OK]
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
