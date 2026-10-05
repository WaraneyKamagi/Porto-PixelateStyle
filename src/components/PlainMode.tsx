import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { PROFILE_DATA } from '../data/profile';
import { soundFX } from '../lib/audio';
import { ArrowLeft, ExternalLink, Code, Mail, Globe, Send, CheckCircle2, Shield, Orbit, Sparkles } from 'lucide-react';

export const PlainMode: React.FC = () => {
  const { togglePlainMode, isSoundMuted } = useGameStore();

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const handleReturnToSpace = () => {
    if (!isSoundMuted) {
      soundFX.playWarp();
    }
    togglePlainMode();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setFormSent(true);
    if (!isSoundMuted) {
      soundFX.playSelect();
    }
  };

  return (
    <div className="min-h-screen bg-[#090714] text-[#f5f6ff] p-4 sm:p-10 overflow-y-auto max-w-4xl mx-auto font-reading text-xl selection:bg-[#38efdf] selection:text-[#090714]">
      {/* Skip to Content for Screen Readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#38efdf] text-[#090714] font-pixel text-xs p-3 outline-none"
      >
        Lompat ke konten utama (Skip to content)
      </a>

      {/* Navigation & Mode Switcher */}
      <nav aria-label="Mode Navigation" className="mb-8 flex items-center justify-between border-b-2 border-[#1b163a] pb-4">
        <button
          onClick={handleReturnToSpace}
          className="pixel-btn pixel-btn-cyan text-xs font-pixel py-2.5 px-4 flex items-center gap-2 focus-visible:ring-4 focus-visible:ring-[#ffde59]"
        >
          <ArrowLeft size={16} />
          <span>KEMBALI KE GALAXY MODE</span>
        </button>

        <span className="text-xs font-pixel text-[#9fa6cc] hidden sm:inline">
          ACCESSIBILITY & PLAIN HTML MODE
        </span>
      </nav>

      {/* Main Semantic Content */}
      <main id="main-content" role="main">
        {/* Header Section */}
        <header className="border-b-4 border-[#38efdf] pb-6 mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#38efdf] inline-block animate-retro-blink" />
            <span className="text-xs font-pixel text-[#38efdf] tracking-wider">
              VERIFIED PORTFOLIO DOSSIER
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-pixel text-[#f5f6ff] mb-3">
            {PROFILE_DATA.name}
          </h1>
          <p className="text-xl sm:text-2xl text-[#ffde59] mb-3 font-pixel">
            {PROFILE_DATA.classTitle}
          </p>
          <p className="text-2xl text-[#9fa6cc] leading-relaxed italic">
            "{PROFILE_DATA.tagline}"
          </p>
        </header>

        {/* 01. About / Character Bio */}
        <section aria-labelledby="heading-about" className="mb-12 bg-[#0f0d24] border-2 border-[#41476e] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={20} className="text-[#ff389b]" />
            <h2 id="heading-about" className="text-xl sm:text-2xl font-pixel text-[#ff389b]">
              01. PROFIL KARAKTER & BIOGRAFI
            </h2>
          </div>
          <p className="leading-relaxed text-[#f5f6ff] text-2xl mb-6">
            {PROFILE_DATA.bio}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-pixel text-[#9fa6cc]">
            <div className="bg-[#1b163a] p-3 border border-[#41476e]">
              <div>LEVEL PENGALAMAN</div>
              <div className="text-base text-[#38efdf] mt-1">LVL {PROFILE_DATA.level} ({PROFILE_DATA.level} TAHUN)</div>
            </div>
            <div className="bg-[#1b163a] p-3 border border-[#41476e]">
              <div>HEALTH POINTS (HP)</div>
              <div className="text-base text-[#ff3864] mt-1">{PROFILE_DATA.hp} / {PROFILE_DATA.hp}</div>
            </div>
            <div className="bg-[#1b163a] p-3 border border-[#41476e]">
              <div>MANA POINTS (MP)</div>
              <div className="text-base text-[#29a4ff] mt-1">{PROFILE_DATA.mp} / {PROFILE_DATA.mp}</div>
            </div>
            <div className="bg-[#1b163a] p-3 border border-[#41476e]">
              <div>STATUS ORBIT</div>
              <div className="text-base text-[#ffde59] mt-1">READY FOR DEPLOY</div>
            </div>
          </div>
        </section>

        {/* 02. Skill Tree Matrix */}
        <section aria-labelledby="heading-skills" className="mb-12 bg-[#0f0d24] border-2 border-[#41476e] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-[#38efdf]" />
            <h2 id="heading-skills" className="text-xl sm:text-2xl font-pixel text-[#38efdf]">
              02. SKILL MATRIX & KOMPETENSI
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROFILE_DATA.skills.map((skill) => (
              <div key={skill.id} className="bg-[#1b163a] p-4 border border-[#41476e]">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="font-pixel text-xs text-[#f5f6ff]">{skill.name}</span>
                  <span className="text-[#38efdf] font-mono font-bold">{skill.level}%</span>
                </div>
                <div
                  role="meter"
                  aria-label={skill.name}
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="w-full bg-[#090714] h-3 border border-[#41476e]"
                >
                  <div
                    className="bg-[#38efdf] h-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-[11px] font-pixel text-[#9fa6cc] mt-1.5 block">
                  CATEGORY: {skill.category.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 03. Projects Portfolio */}
        <section aria-labelledby="heading-projects" className="mb-12 bg-[#0f0d24] border-2 border-[#41476e] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Orbit size={20} className="text-[#ffde59]" />
            <h2 id="heading-projects" className="text-xl sm:text-2xl font-pixel text-[#ffde59]">
              03. GUGUS PROYEK (PORTFOLIO ARCHIVE)
            </h2>
          </div>
          <div className="space-y-6">
            {PROFILE_DATA.projects.map((proj) => (
              <article
                key={proj.id}
                className="bg-[#1b163a] p-6 border-2 border-[#41476e]"
              >
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-2xl font-pixel text-[#ffde59]">
                      {proj.title}
                    </h3>
                    <p className="text-base font-pixel text-[#ff73c2] mt-0.5">
                      {proj.tagline}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-pixel px-2 py-0.5 bg-[#090714] text-[#38efdf] border border-[#38efdf]">
                      {proj.stats.status}
                    </span>
                    <span className="text-xs font-pixel px-2 py-0.5 bg-[#090714] text-[#ffde59] border border-[#ffde59]">
                      {proj.stats.year}
                    </span>
                  </div>
                </div>

                <p className="text-lg text-[#f5f6ff] my-3 leading-relaxed">
                  {proj.description}
                </p>

                <div className="mb-4">
                  <span className="text-xs font-pixel text-[#38efdf] block mb-1">TECH STACK:</span>
                  <div className="flex flex-wrap gap-2">
                    {proj.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[#090714] text-[#ff73c2] px-2.5 py-1 border border-[#41476e]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-3 border-t border-[#41476e] text-sm font-pixel">
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#38efdf] hover:underline flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#38efdf]"
                    >
                      <ExternalLink size={14} /> LIVE DEMO
                    </a>
                  )}
                  {proj.repoUrl && (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#9fa6cc] hover:underline flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#9fa6cc]"
                    >
                      <Code size={14} /> SOURCE CODE
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 04. Experience Log */}
        <section aria-labelledby="heading-exp" className="mb-12 bg-[#0f0d24] border-2 border-[#41476e] p-6 sm:p-8">
          <h2 id="heading-exp" className="text-xl sm:text-2xl font-pixel text-[#29a4ff] mb-6">
            04. REKAM JEJAK / LOG ORBITAL KARIER
          </h2>
          <div className="space-y-8">
            {PROFILE_DATA.experiences.map((exp) => (
              <div key={exp.id} className="border-l-4 border-[#29a4ff] pl-5">
                <span className="text-xs font-pixel text-[#29a4ff]">
                  {exp.period}
                </span>
                <h3 className="text-xl font-pixel text-[#f5f6ff] mt-1">
                  {exp.role} @ {exp.organization}
                </h3>
                <p className="text-base text-[#9fa6cc] mb-2">{exp.location}</p>
                <p className="text-lg text-[#f5f6ff] mb-3 leading-relaxed">{exp.description}</p>
                <ul className="list-disc list-inside text-base text-[#9fa6cc] space-y-1">
                  {exp.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 05. Contact Terminal & Transmission Form */}
        <section aria-labelledby="heading-contact" className="bg-[#0f0d24] border-2 border-[#ff73c2] p-6 sm:p-8 mb-12">
          <h2 id="heading-contact" className="text-xl sm:text-2xl font-pixel text-[#ff73c2] mb-6">
            05. TERMINAL KONTAK & PESAN
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-lg text-[#f5f6ff] leading-relaxed">
                Silakan hubungi saya untuk peluang kolaborasi, proyek freelance, atau sekadar berdiskusi tentang arsitektur frontend dan teknologi web interaktif.
              </p>
              <div className="flex flex-col gap-3 text-lg">
                <a
                  href={`mailto:${PROFILE_DATA.contact.email}`}
                  className="flex items-center gap-3 text-[#38efdf] hover:underline"
                >
                  <Mail size={20} /> {PROFILE_DATA.contact.email}
                </a>
                <a
                  href={PROFILE_DATA.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-[#9fa6cc] hover:underline"
                >
                  <Code size={20} /> GitHub Profile
                </a>
                <a
                  href={PROFILE_DATA.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-[#29a4ff] hover:underline"
                >
                  <Globe size={20} /> LinkedIn Profile
                </a>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-[#1b163a] border border-[#41476e] p-5">
              {formSent ? (
                <div className="text-center py-6">
                  <CheckCircle2 size={40} className="text-[#38efdf] mx-auto mb-2" />
                  <div className="text-base font-pixel text-[#38efdf] mb-1">PESAN TERKIRIM!</div>
                  <p className="text-sm text-[#9fa6cc]">Terima kasih, pesan Anda telah dicatat.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-pixel text-[#9fa6cc] mb-1">NAMA:</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#090714] border border-[#41476e] focus:border-[#38efdf] p-2 text-[#f5f6ff] text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-pixel text-[#9fa6cc] mb-1">EMAIL:</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#090714] border border-[#41476e] focus:border-[#38efdf] p-2 text-[#f5f6ff] text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-pixel text-[#9fa6cc] mb-1">PESAN:</label>
                    <textarea
                      rows={3}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#090714] border border-[#41476e] focus:border-[#38efdf] p-2 text-[#f5f6ff] text-base resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="pixel-btn pixel-btn-magenta w-full text-xs font-pixel py-2.5 flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    <span>KIRIM PESAN</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm font-reading text-[#9fa6cc] border-t-2 border-[#1b163a] pt-6 pb-12">
        <p>© 2026 {PROFILE_DATA.name}. Built with Vite, React 19, TypeScript, and Motion.</p>
        <p className="mt-1 text-xs font-pixel text-[#38efdf]">16-BIT RETRO INTERACTIVE UNIVERSE</p>
      </footer>
    </div>
  );
};
