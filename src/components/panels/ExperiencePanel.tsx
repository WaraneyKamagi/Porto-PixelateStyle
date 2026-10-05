import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PanelContainer } from './PanelContainer';
import { PROFILE_DATA, type ExperienceItem } from '../../data/profile';
import { soundFX } from '../../lib/audio';
import { useGameStore } from '../../store/useGameStore';
import { Briefcase, GraduationCap, ChevronRight } from 'lucide-react';

interface ExperiencePanelProps {
  onClose: () => void;
}

export const ExperiencePanel: React.FC<ExperiencePanelProps> = ({ onClose }) => {
  const [selectedExp, setSelectedExp] = useState<ExperienceItem>(PROFILE_DATA.experiences[0]);
  const isSoundMuted = useGameStore((s) => s.isSoundMuted);

  const handleSelect = (exp: ExperienceItem) => {
    if (!isSoundMuted) {
      soundFX.playBlip();
    }
    setSelectedExp(exp);
  };

  return (
    <PanelContainer
      title="STASIUN LUAR ANGKASA - MISSION LOG"
      subtitle="Modul stasiun orbital bertingkat rekam jejak karier"
      tag="SEC-05"
      accentColor="#29a4ff"
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Column: Orbital Modules List */}
        <div className="md:col-span-5 flex flex-col gap-2.5">
          <div className="text-[10px] font-pixel text-[#29a4ff] mb-1">
            STATION MODULES [TIMELINE]:
          </div>

          {PROFILE_DATA.experiences.map((exp, idx) => {
            const isSelected = exp.id === selectedExp.id;
            return (
              <motion.div
                key={exp.id}
                onClick={() => handleSelect(exp)}
                whileHover={{ x: 3 }}
                className={`p-3 border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#1b163a] border-[#29a4ff] text-[#f5f6ff] shadow-[0_2px_0_0_#29a4ff]'
                    : 'bg-[#090714] border-[#41476e] text-[#9fa6cc] hover:border-[#38efdf]'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-pixel mb-1">
                  <span className="text-[#38efdf]">MOD-0{idx + 1}</span>
                  <span className="text-[#ffde59]">{exp.period}</span>
                </div>
                <div className="text-xs font-pixel text-[#f5f6ff] truncate">
                  {exp.role}
                </div>
                <div className="text-sm font-reading text-[#9fa6cc] truncate">
                  {exp.organization}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Active Module Inspection Detail */}
        <div className="md:col-span-7 bg-[#1b163a] border-2 border-[#29a4ff] p-5 flex flex-col justify-between shadow-[0_4px_0_0_#090714]">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#41476e]">
              <span className="text-[10px] font-pixel px-2 py-0.5 bg-[#090714] text-[#29a4ff] border border-[#29a4ff] flex items-center gap-1.5">
                {selectedExp.type === 'work' ? <Briefcase size={12} /> : <GraduationCap size={12} />}
                {selectedExp.type.toUpperCase()} ORBIT
              </span>
              <span className="text-[10px] font-pixel text-[#ffde59]">
                {selectedExp.period}
              </span>
            </div>

            <h3 className="text-lg font-pixel text-[#f5f6ff] mb-1">
              {selectedExp.role}
            </h3>
            <div className="text-sm font-pixel text-[#38efdf] mb-3">
              {selectedExp.organization} • <span className="text-[#9fa6cc]">{selectedExp.location}</span>
            </div>

            {/* Description */}
            <p className="text-base text-[#f5f6ff] leading-relaxed mb-4 bg-[#090714] p-3 border border-[#41476e]">
              {selectedExp.description}
            </p>

            {/* Verified Mission Achievements */}
            <div className="space-y-1.5">
              <div className="text-xs font-pixel text-[#ff73c2] mb-1.5">
                LOG KEY DELIVERABLES:
              </div>
              {selectedExp.achievements.map((ach, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[#9fa6cc]">
                  <ChevronRight size={14} className="text-[#38efdf] shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#41476e] flex justify-between items-center text-[10px] font-pixel text-[#38efdf]">
            <span>STATUS: DOCKED</span>
            <span>DATA VERIFIED ✓</span>
          </div>
        </div>
      </div>
    </PanelContainer>
  );
};
