import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PanelContainer } from './PanelContainer';
import { PROFILE_DATA, type SkillItem } from '../../data/profile';
import { soundFX } from '../../lib/audio';
import { useGameStore } from '../../store/useGameStore';
import { Sparkles } from 'lucide-react';

interface SkillsPanelProps {
  onClose: () => void;
}

export const SkillsPanel: React.FC<SkillsPanelProps> = ({ onClose }) => {
  const [activeSkill, setActiveSkill] = useState<SkillItem>(PROFILE_DATA.skills[0]);
  const isSoundMuted = useGameStore((s) => s.isSoundMuted);

  const skills = PROFILE_DATA.skills;

  const handleSelectSkill = (skill: SkillItem) => {
    if (!isSoundMuted) {
      soundFX.playBlip();
    }
    setActiveSkill(skill);
  };

  return (
    <PanelContainer
      title="KONSTELASI BINTANG - SKILL MATRIX"
      subtitle="Jalur transmisi keahlian kosmik berurutan"
      tag="SEC-04"
      accentColor="#38efdf"
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="flex flex-col gap-6">
        {/* SVG Constellation with Path Drawing (pathLength: 0 -> 1) */}
        <div className="relative bg-[#090714] border-2 border-[#41476e] p-3 overflow-hidden select-none">
          <div className="text-[9px] font-pixel text-[#38efdf] mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#ffde59]" />
              ACTIVE CONSTELLATION LINK
            </span>
            <span className="text-[#9fa6cc]">[HOVER / TAP BINTANG]</span>
          </div>

          <svg
            viewBox="0 0 650 200"
            className="w-full h-48 image-pixelated overflow-visible"
          >
            {/* Background Grid Lines */}
            <defs>
              <pattern id="constellation-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <rect width="30" height="30" fill="none" stroke="#1b163a" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="650" height="200" fill="url(#constellation-grid)" />

            {/* Path Drawing Lines between adjacent skills */}
            {skills.map((skill, idx) => {
              if (idx === 0) return null;
              const prev = skills[idx - 1];
              const p1 = prev.coords || { x: idx * 70, y: 100 };
              const p2 = skill.coords || { x: (idx + 1) * 70, y: 100 };

              return (
                <motion.line
                  key={`line-${idx}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#38efdf"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.75 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.2 + idx * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              );
            })}

            {/* Constellation Star Nodes */}
            {skills.map((skill, idx) => {
              const coords = skill.coords || { x: (idx + 1) * 70, y: 100 };
              const isSelected = skill.id === activeSkill.id;

              return (
                <motion.g
                  key={skill.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 + idx * 0.1, type: 'spring' }}
                  onClick={() => handleSelectSkill(skill)}
                  onMouseEnter={() => handleSelectSkill(skill)}
                  className="cursor-pointer"
                >
                  {/* Star Glow */}
                  {isSelected && (
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="12"
                      fill="none"
                      stroke="#ff389b"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      className="animate-spin"
                      style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
                    />
                  )}

                  {/* Diamond/Square Pixel Star Node */}
                  <rect
                    x={coords.x - 5}
                    y={coords.y - 5}
                    width="10"
                    height="10"
                    fill={isSelected ? '#ffde59' : '#38efdf'}
                    className="transition-colors"
                  />
                  <rect
                    x={coords.x - 2}
                    y={coords.y - 2}
                    width="4"
                    height="4"
                    fill="#ffffff"
                  />

                  {/* Star Label Tag */}
                  <text
                    x={coords.x}
                    y={coords.y + 18}
                    fill={isSelected ? '#ffde59' : '#9fa6cc'}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="select-none font-bold"
                  >
                    {skill.name.split(' ')[0]}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Selected Skill Detail Gauge Card */}
        <div className="bg-[#1b163a] border-2 border-[#38efdf] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-pixel px-2 py-0.5 bg-[#090714] text-[#38efdf] border border-[#38efdf]">
                CATEGORY: {activeSkill.category.toUpperCase()}
              </span>
              <span className="text-[10px] font-pixel text-[#ffde59]">
                LEVEL {activeSkill.level}%
              </span>
            </div>
            <h3 className="text-xl font-pixel text-[#f5f6ff] mb-2">
              {activeSkill.name}
            </h3>

            {/* Proficiency Meter */}
            <div className="w-full bg-[#090714] h-4 border border-[#41476e] p-0.5">
              <motion.div
                key={activeSkill.id}
                initial={{ width: 0 }}
                animate={{ width: `${activeSkill.level}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-[#38efdf] h-full"
              />
            </div>
          </div>

          <div className="shrink-0 text-center sm:text-right">
            <div className="text-[9px] font-pixel text-[#9fa6cc]">STATUS</div>
            <div className="text-sm font-pixel text-[#38efdf] mt-0.5">
              ACTIVE NODE
            </div>
          </div>
        </div>

        {/* Full Skills Quick Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {skills.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectSkill(s)}
              className={`p-2 text-left border transition-all ${
                s.id === activeSkill.id
                  ? 'bg-[#1b163a] border-[#38efdf] text-[#38efdf]'
                  : 'bg-[#090714] border-[#41476e] text-[#f5f6ff] hover:border-[#ff73c2]'
              }`}
            >
              <div className="text-[9px] font-pixel truncate">{s.name}</div>
              <div className="text-[12px] font-reading text-[#ffde59] mt-0.5">
                {s.level}% MASTERED
              </div>
            </button>
          ))}
        </div>
      </div>
    </PanelContainer>
  );
};
