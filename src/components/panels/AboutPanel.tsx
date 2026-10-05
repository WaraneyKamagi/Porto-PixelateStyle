import React from 'react';
import { motion } from 'motion/react';
import { PanelContainer } from './PanelContainer';
import { PROFILE_DATA } from '../../data/profile';
import { Shield, Zap, Sparkles, Heart } from 'lucide-react';

interface AboutPanelProps {
  onClose: () => void;
}

export const AboutPanel: React.FC<AboutPanelProps> = ({ onClose }) => {
  const stats = [
    { name: 'CODING POWER', value: 96, color: '#38efdf' },
    { name: 'SYSTEM ARCHITECTURE', value: 92, color: '#29a4ff' },
    { name: 'CREATIVE UI / MOTION', value: 98, color: '#ff389b' },
    { name: 'PERFORMANCE TUNING', value: 90, color: '#ffde59' },
    { name: 'PROBLEM SOLVING', value: 94, color: '#ff73c2' },
  ];

  return (
    <PanelContainer
      title="PLANET ASAL - CHARACTER SHEET"
      subtitle="Pilot Dossier & Core Atribut"
      tag="SEC-02"
      accentColor="#ff389b"
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Character Sprite & RPG Stats Card */}
        <div className="md:col-span-5 flex flex-col items-center bg-[#1b163a] border-2 border-[#41476e] p-4 text-center">
          {/* Animated Pixel Astronaut Avatar */}
          <div className="relative mb-3 bg-[#090714] p-3 border-2 border-[#ff389b]">
            <svg
              width="80"
              height="80"
              viewBox="0 0 32 32"
              fill="none"
              className="image-pixelated filter drop-shadow-[0_0_10px_rgba(255,56,155,0.5)]"
            >
              {/* Helmet Dome */}
              <rect x="10" y="2" width="12" height="18" fill="#f5f6ff" />
              <rect x="8" y="4" width="16" height="14" fill="#f5f6ff" />
              <rect x="6" y="6" width="20" height="10" fill="#f5f6ff" />
              {/* Visor Glass (Neon Cyan) */}
              <rect x="8" y="8" width="16" height="8" fill="#38efdf" />
              <rect x="10" y="9" width="4" height="4" fill="#ffffff" />
              <rect x="20" y="9" width="2" height="2" fill="#29a4ff" />
              {/* Spacesuit Body */}
              <rect x="8" y="20" width="16" height="10" fill="#2a2050" />
              <rect x="6" y="22" width="20" height="6" fill="#41476e" />
              {/* Chest Controls */}
              <rect x="13" y="22" width="6" height="4" fill="#1b163a" />
              <rect x="14" y="23" width="2" height="2" fill="#ff3864" className="animate-retro-blink" />
              <rect x="17" y="23" width="2" height="2" fill="#ffde59" />
            </svg>
          </div>

          <h3 className="text-xl font-pixel text-[#ffde59] mb-1">
            {PROFILE_DATA.name}
          </h3>
          <span className="text-[10px] font-pixel text-[#38efdf] px-2 py-0.5 bg-[#090714] border border-[#38efdf] mb-3">
            {PROFILE_DATA.classTitle}
          </span>

          {/* RPG Vitals (HP & MP) */}
          <div className="w-full space-y-2 text-left mb-4 text-xs font-pixel">
            <div>
              <div className="flex justify-between text-[#ff3864] mb-1">
                <span className="flex items-center gap-1">
                  <Heart size={12} /> HP
                </span>
                <span>{PROFILE_DATA.hp}/{PROFILE_DATA.hp}</span>
              </div>
              <div className="w-full bg-[#090714] h-2.5 border border-[#41476e]">
                <div className="bg-[#ff3864] h-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#29a4ff] mb-1">
                <span className="flex items-center gap-1">
                  <Zap size={12} /> MP
                </span>
                <span>{PROFILE_DATA.mp}/{PROFILE_DATA.mp}</span>
              </div>
              <div className="w-full bg-[#090714] h-2.5 border border-[#41476e]">
                <div className="bg-[#29a4ff] h-full w-[85%]" />
              </div>
            </div>
          </div>

          {/* Quick Badges */}
          <div className="grid grid-cols-2 gap-2 w-full text-xs font-pixel text-[#9fa6cc]">
            <div className="bg-[#090714] p-2 border border-[#41476e]">
              <div className="text-[9px] text-[#ff73c2]">EXP LEVEL</div>
              <div className="text-[#f5f6ff] text-base mt-0.5">LVL {PROFILE_DATA.level}</div>
            </div>
            <div className="bg-[#090714] p-2 border border-[#41476e]">
              <div className="text-[9px] text-[#38efdf]">FACTION</div>
              <div className="text-[#f5f6ff] text-base mt-0.5">OPEN SOURCE</div>
            </div>
          </div>
        </div>

        {/* Right Column: Lore & Staggered Skill Stat Bars */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <h4 className="text-base font-pixel text-[#ff389b] mb-2 flex items-center gap-2">
              <Sparkles size={16} /> PILOT LOG & BACKGROUND
            </h4>
            <div className="bg-[#1b163a] border border-[#41476e] p-4 text-[#f5f6ff] leading-relaxed mb-5">
              {PROFILE_DATA.bio}
            </div>

            <h4 className="text-base font-pixel text-[#38efdf] mb-3 flex items-center gap-2">
              <Shield size={16} /> ATRIBUT PERFORMA SISTEM
            </h4>

            {/* Staggered Animated Stat Bars */}
            <div className="space-y-3 font-pixel text-xs">
              {stats.map((stat, idx) => (
                <div key={stat.name} className="space-y-1">
                  <div className="flex justify-between text-[#9fa6cc]">
                    <span>{stat.name}</span>
                    <span style={{ color: stat.color }}>{stat.value}%</span>
                  </div>
                  <div className="w-full bg-[#090714] h-3 border border-[#41476e] overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{
                        delay: 0.15 + idx * 0.12,
                        duration: 0.7,
                        ease: 'easeOut',
                      }}
                      style={{ backgroundColor: stat.color }}
                      className="h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PanelContainer>
  );
};
