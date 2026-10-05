import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PanelContainer } from './PanelContainer';
import { PROFILE_DATA, type ProjectItem } from '../../data/profile';
import { soundFX } from '../../lib/audio';
import { useGameStore } from '../../store/useGameStore';
import { ExternalLink, Code, ArrowLeft, Orbit } from 'lucide-react';

interface ProjectsPanelProps {
  onClose: () => void;
}

export const ProjectsPanel: React.FC<ProjectsPanelProps> = ({ onClose }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const isSoundMuted = useGameStore((s) => s.isSoundMuted);

  const handleSelect = (proj: ProjectItem) => {
    if (!isSoundMuted) {
      soundFX.playSelect();
    }
    setSelectedProject(proj);
  };

  const handleBack = () => {
    if (!isSoundMuted) {
      soundFX.playClose();
    }
    setSelectedProject(null);
  };

  return (
    <PanelContainer
      title="GUGUS PLANET - PROJECT ARCHIVE"
      subtitle="Pilih satu planet untuk menginspeksi karya digital"
      tag="SEC-03"
      accentColor="#ffde59"
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="relative min-h-[420px]">
        {/* Gallery Grid of Project Planets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROFILE_DATA.projects.map((proj) => {
            return (
              <motion.div
                key={proj.id}
                layoutId={`project-card-${proj.id}`}
                onClick={() => handleSelect(proj)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#1b163a] border-2 border-[#41476e] hover:border-[#ffde59] p-4 cursor-pointer flex flex-col justify-between transition-colors group shadow-[0_4px_0_0_#090714]"
              >
                <div>
                  {/* Planet Icon & Status Header */}
                  <div className="flex items-center justify-between mb-3">
                    {/* Stepped Pixel Planet Sprite */}
                    <div className="w-12 h-12 bg-[#090714] border border-[#ffde59] flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                      <svg width="36" height="36" viewBox="0 0 24 24" className="image-pixelated">
                        <rect x="8" y="2" width="8" height="20" fill="#2a2050" />
                        <rect x="4" y="4" width="16" height="16" fill="#ff9f24" />
                        <rect x="6" y="6" width="12" height="12" fill="#ffde59" />
                        <rect x="0" y="11" width="24" height="2" fill="#38efdf" />
                      </svg>
                    </div>

                    <span className="text-[9px] font-pixel px-2 py-0.5 bg-[#090714] text-[#ffde59] border border-[#ffde59]">
                      {proj.stats.status}
                    </span>
                  </div>

                  <h3 className="text-base font-pixel text-[#ffde59] group-hover:text-[#ffffff] transition-colors mb-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-pixel text-[#ff73c2] mb-2">
                    {proj.tagline}
                  </p>
                  <p className="text-sm text-[#9fa6cc] line-clamp-2 mb-3">
                    {proj.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.techStack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-pixel bg-[#090714] text-[#38efdf] px-1.5 py-0.5 border border-[#41476e]"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.techStack.length > 3 && (
                      <span className="text-[10px] font-pixel text-[#9fa6cc] px-1">
                        +{proj.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="text-[10px] font-pixel text-[#38efdf] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>INSPEKSI PLANET</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Modal Window using Shared Element (layoutId) */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              layoutId={`project-card-${selectedProject.id}`}
              className="absolute inset-0 z-30 bg-[#0f0d24] border-4 border-[#ffde59] p-5 sm:p-6 flex flex-col justify-between shadow-[0_8px_0_0_#090714] overflow-y-auto"
            >
              <div>
                {/* Back Button */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2a2050]">
                  <button
                    onClick={handleBack}
                    className="pixel-btn text-xs font-pixel py-1.5 px-3 flex items-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    <span>KEMBALI KE ORBIT</span>
                  </button>

                  <span className="text-xs font-pixel text-[#38efdf]">
                    ORBIT SECTOR 03
                  </span>
                </div>

                {/* Project Header Info */}
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#1b163a] border-2 border-[#ffde59] flex items-center justify-center p-2 shrink-0">
                    <svg width="48" height="48" viewBox="0 0 24 24" className="image-pixelated">
                      <rect x="8" y="2" width="8" height="20" fill="#2a2050" />
                      <rect x="4" y="4" width="16" height="16" fill="#ff9f24" />
                      <rect x="6" y="6" width="12" height="12" fill="#ffde59" />
                      <rect x="0" y="11" width="24" height="2" fill="#38efdf" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-xl font-pixel text-[#ffde59]">
                        {selectedProject.title}
                      </h3>
                      <span className="text-[10px] font-pixel px-2 py-0.5 bg-[#090714] text-[#38efdf] border border-[#38efdf]">
                        {selectedProject.stats.year}
                      </span>
                    </div>
                    <p className="text-sm font-pixel text-[#ff73c2] mb-1">
                      {selectedProject.tagline}
                    </p>
                    <span className="text-xs text-[#9fa6cc]">
                      Role: {selectedProject.stats.role}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-[#1b163a] border border-[#41476e] p-4 text-[#f5f6ff] leading-relaxed mb-4 text-base">
                  {selectedProject.description}
                </div>

                {/* Tech Stack List */}
                <div className="mb-6">
                  <div className="text-xs font-pixel text-[#38efdf] mb-2 flex items-center gap-1.5">
                    <Orbit size={14} /> TECH STACK ARSENAL:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-pixel bg-[#090714] text-[#f5f6ff] px-2.5 py-1 border border-[#ffde59]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Live Demo & Source Code */}
              <div className="flex flex-wrap gap-3 pt-3 border-t border-[#2a2050]">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pixel-btn pixel-btn-cyan text-xs py-2 px-4 flex items-center gap-2"
                  >
                    <ExternalLink size={14} />
                    <span>LAUNCH DEMO</span>
                  </a>
                )}
                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pixel-btn text-xs py-2 px-4 flex items-center gap-2"
                  >
                    <Code size={14} />
                    <span>INSPECT REPO</span>
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PanelContainer>
  );
};
