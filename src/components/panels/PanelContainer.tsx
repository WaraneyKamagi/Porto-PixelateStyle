import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { soundFX } from '../../lib/audio';
import { useGameStore } from '../../store/useGameStore';

interface PanelContainerProps {
  title: string;
  subtitle?: string;
  tag?: string;
  accentColor?: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export const PanelContainer: React.FC<PanelContainerProps> = ({
  title,
  subtitle,
  tag = 'TERMINAL',
  accentColor = '#38efdf',
  onClose,
  children,
  maxWidth = 'max-w-2xl',
}) => {
  const isSoundMuted = useGameStore((s) => s.isSoundMuted);

  const handleClose = () => {
    if (!isSoundMuted) {
      soundFX.playClose();
    }
    onClose();
  };

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark Translucent Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-[#090714]/85 backdrop-blur-[2px]"
      />

      {/* Retro Pixel Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 10 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{
          boxShadow: `
            0 -4px 0 0 #090714,
            0 4px 0 0 #090714,
            -4px 0 0 0 #090714,
            4px 0 0 0 #090714,
            0 -8px 0 0 ${accentColor},
            0 8px 0 0 ${accentColor},
            -8px 0 0 0 ${accentColor},
            8px 0 0 0 ${accentColor},
            0 12px 24px rgba(0, 0, 0, 0.8)
          `,
        }}
        className={`relative z-10 w-full ${maxWidth} bg-[#0f0d24] text-[#f5f6ff] my-auto max-h-[88vh] flex flex-col border border-[#1b163a]`}
      >
        {/* Header Bar */}
        <div
          style={{ borderBottom: `2px solid ${accentColor}` }}
          className="bg-[#1b163a] px-3 sm:px-4 py-2.5 flex items-center justify-between select-none"
        >
          <div className="flex items-center gap-2">
            <span
              style={{ backgroundColor: accentColor, color: '#090714' }}
              className="text-[9px] font-pixel px-1.5 py-0.5 tracking-wider font-bold"
            >
              {tag}
            </span>
            <div className="flex flex-col">
              <h2 className="text-[12px] sm:text-[14px] font-pixel text-[#f5f6ff] tracking-wider">
                {title}
              </h2>
              {subtitle && (
                <span className="text-[13px] font-reading text-[#9fa6cc]">
                  {subtitle}
                </span>
              )}
            </div>
          </div>

          {/* Close [X] Button */}
          <button
            onClick={handleClose}
            className="pixel-btn text-[10px] px-2 py-1 flex items-center gap-1 hover:bg-[#ff3864]"
            title="Tutup Panel (ESC)"
          >
            <X size={14} />
            <span className="font-pixel hidden sm:inline">ESC</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(88vh-55px)] font-reading text-[18px]">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
