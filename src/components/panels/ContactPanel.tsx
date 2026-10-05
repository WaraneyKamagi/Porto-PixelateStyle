import React, { useState, useEffect } from 'react';
import { PanelContainer } from './PanelContainer';
import { PROFILE_DATA } from '../../data/profile';
import { soundFX } from '../../lib/audio';
import { useGameStore } from '../../store/useGameStore';
import { Send, CheckCircle2, Mail, Globe, Code, Info } from 'lucide-react';

interface ContactPanelProps {
  onClose: () => void;
}

export const ContactPanel: React.FC<ContactPanelProps> = ({ onClose }) => {
  const isSoundMuted = useGameStore((s) => s.isSoundMuted);

  // Typewriter effect state
  const [typedHeader, setTypedHeader] = useState('');
  const fullText = '> SATELLITE COMMS LINK ESTABLISHED. READY FOR TRANSMISSION...';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedHeader(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(timer);
      }
    }, 28);
    return () => clearInterval(timer);
  }, []);

  // Form State
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg('Semua kolom transmisi wajib diisi!');
      return;
    }
    if (!form.email.includes('@') || !form.email.includes('.')) {
      setErrorMsg('Alamat frekuensi email tidak valid!');
      return;
    }

    setErrorMsg('');
    setStatus('sending');

    setTimeout(() => {
      setStatus('sent');
      if (!isSoundMuted) {
        soundFX.playSelect();
      }
    }, 800);
  };

  return (
    <PanelContainer
      title="SATELIT KOMUNIKASI - TRANSMISI"
      subtitle="Terminal pengiriman pesan langsung antargalaksi"
      tag="SEC-06"
      accentColor="#ff73c2"
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="flex flex-col gap-6">
        {/* CRT Typewriter Prompt Header */}
        <div className="bg-[#090714] border-2 border-[#41476e] p-3 text-[#38efdf] font-reading text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{typedHeader}</span>
            <span className="w-2.5 h-4 bg-[#38efdf] inline-block animate-retro-blink" />
          </div>
          <span className="text-[10px] font-pixel text-[#ffde59] hidden sm:inline">
            BANDWIDTH: 100%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Direct Links & Connection Channels */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="text-[10px] font-pixel text-[#ff73c2]">
              DIRECT CHANNELS:
            </div>

            <a
              href={`mailto:${PROFILE_DATA.contact.email}`}
              className="bg-[#1b163a] border border-[#41476e] hover:border-[#38efdf] p-3 flex items-center gap-3 text-sm text-[#f5f6ff] transition-colors group"
            >
              <Mail size={18} className="text-[#38efdf] group-hover:scale-110 transition-transform" />
              <div className="flex flex-col truncate">
                <span className="text-[9px] font-pixel text-[#9fa6cc]">EMAIL ADDRESS</span>
                <span className="truncate">{PROFILE_DATA.contact.email}</span>
              </div>
            </a>

            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noreferrer"
              className="bg-[#1b163a] border border-[#41476e] hover:border-[#ffde59] p-3 flex items-center gap-3 text-sm text-[#f5f6ff] transition-colors group"
            >
              <Code size={18} className="text-[#ffde59] group-hover:scale-110 transition-transform" />
              <div className="flex flex-col truncate">
                <span className="text-[9px] font-pixel text-[#9fa6cc]">SOURCE FORGE</span>
                <span className="truncate">{PROFILE_DATA.contact.github}</span>
              </div>
            </a>

            <a
              href={PROFILE_DATA.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="bg-[#1b163a] border border-[#41476e] hover:border-[#29a4ff] p-3 flex items-center gap-3 text-sm text-[#f5f6ff] transition-colors group"
            >
              <Globe size={18} className="text-[#29a4ff] group-hover:scale-110 transition-transform" />
              <div className="flex flex-col truncate">
                <span className="text-[9px] font-pixel text-[#9fa6cc]">NETWORKING LOG</span>
                <span className="truncate">{PROFILE_DATA.contact.linkedin}</span>
              </div>
            </a>

            {/* Note for connecting Formspree / EmailJS */}
            <div className="bg-[#090714] border border-[#41476e] p-3 text-xs text-[#9fa6cc] space-y-1">
              <div className="flex items-center gap-1.5 text-[#38efdf] font-pixel text-[9px]">
                <Info size={12} /> BACKEND INTEGRATION NOTE:
              </div>
              <p>
                Formulir ini siap disambungkan ke layanan pihak ketiga gratis seperti <strong>Formspree</strong> (cukup ubah action endpoint) atau <strong>EmailJS</strong> tanpa perlu membocorkan API key rahasia.
              </p>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="md:col-span-7 bg-[#1b163a] border-2 border-[#ff73c2] p-5 shadow-[0_4px_0_0_#090714]">
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <CheckCircle2 size={48} className="text-[#38efdf] mb-3 animate-bounce" />
                <h4 className="text-lg font-pixel text-[#38efdf] mb-2">
                  TRANSMISI TERKIRIM!
                </h4>
                <p className="text-base text-[#f5f6ff] mb-4">
                  Pesan Anda telah berhasil dikirimkan ke stasiun pusat komunikasi. Respons akan segera dikirim balik.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setForm({ name: '', email: '', message: '' });
                  }}
                  className="pixel-btn text-xs font-pixel py-2 px-4"
                >
                  KIRIM TRANSMISI LAIN
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-xs font-pixel text-[#ff73c2] mb-1">
                  TRANSMISSION FORM:
                </div>

                {errorMsg && (
                  <div className="bg-[#ff3864]/20 border border-[#ff3864] text-[#ff3864] p-2 text-xs font-pixel">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-pixel text-[#9fa6cc] mb-1">
                    PILOT CALLSIGN / NAMA:
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Masukkan nama Anda..."
                    className="w-full bg-[#090714] border-2 border-[#41476e] focus:border-[#38efdf] p-2 text-sm text-[#f5f6ff] outline-none font-reading text-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-pixel text-[#9fa6cc] mb-1">
                    RETURN FREQUENCY / EMAIL:
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="nama@domain.com"
                    className="w-full bg-[#090714] border-2 border-[#41476e] focus:border-[#38efdf] p-2 text-sm text-[#f5f6ff] outline-none font-reading text-lg"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-pixel text-[#9fa6cc] mb-1">
                    TRANSMISSION MESSAGE:
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tulis pesan atau tawaran kolaborasi di sini..."
                    className="w-full bg-[#090714] border-2 border-[#41476e] focus:border-[#38efdf] p-2 text-sm text-[#f5f6ff] outline-none font-reading text-lg resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="pixel-btn pixel-btn-magenta w-full text-xs py-2.5 flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  <span className="font-pixel">
                    {status === 'sending' ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PanelContainer>
  );
};
