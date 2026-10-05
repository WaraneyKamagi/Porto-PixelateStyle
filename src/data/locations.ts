/**
 * Galaxy Universe Coordinates & Location Definitions
 */

export interface LocationItem {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  x: number;
  y: number;
  color: string;
  accentHex: string;
  iconType: 'launchpad' | 'planet' | 'cluster' | 'constellation' | 'station' | 'satellite' | 'blackhole';
  description: string;
}

export const WORLD_BOUNDS = {
  width: 3400,
  height: 2600,
  padding: 100,
};

export const LOCATIONS: LocationItem[] = [
  {
    id: 'launchpad',
    name: 'LAUNCH PAD ALPHA',
    subtitle: 'Base Origin / Title',
    tag: 'SEC-01',
    x: 600,
    y: 700,
    color: 'neon-cyan',
    accentHex: '#38efdf',
    iconType: 'launchpad',
    description: 'Titik keberangkatan kosmik. Tekan START untuk meluncurkan pesawat penjelajah.',
  },
  {
    id: 'origin-planet',
    name: 'PLANET ASAL',
    subtitle: 'Character Profile & Lore',
    tag: 'SEC-02',
    x: 1400,
    y: 1200,
    color: 'neon-magenta',
    accentHex: '#ff389b',
    iconType: 'planet',
    description: 'Planet asal sang arsitek web. Berisi lembar karakter, stat level, dan riwayat atribut.',
  },
  {
    id: 'project-cluster',
    name: 'GUGUS PLANET',
    subtitle: 'Project Archive',
    tag: 'SEC-03',
    x: 2400,
    y: 800,
    color: 'retro-yellow',
    accentHex: '#ffde59',
    iconType: 'cluster',
    description: 'Kumpulan planet karya digital berenergi tinggi yang siap dieksplorasi satu per satu.',
  },
  {
    id: 'constellation',
    name: 'KONSTELASI BINTANG',
    subtitle: 'Skill Tree Matrix',
    tag: 'SEC-04',
    x: 2500,
    y: 1800,
    color: 'neon-cyan',
    accentHex: '#38efdf',
    iconType: 'constellation',
    description: 'Gugusan bintang keahlian yang terhubung garis transmisi data bercahaya.',
  },
  {
    id: 'space-station',
    name: 'STASIUN LUAR ANGKASA',
    subtitle: 'Career Orbit & Log',
    tag: 'SEC-05',
    x: 1500,
    y: 2100,
    color: 'neon-blue',
    accentHex: '#29a4ff',
    iconType: 'station',
    description: 'Modul stasiun orbital bertingkat yang merekam rekam jejak profesional dan pendidikan.',
  },
  {
    id: 'comms-satellite',
    name: 'SATELIT KOMUNIKASI',
    subtitle: 'Terminal Transmisi',
    tag: 'SEC-06',
    x: 550,
    y: 1850,
    color: 'neon-pink',
    accentHex: '#ff73c2',
    iconType: 'satellite',
    description: 'Pusat transmisi gelombang radio untuk mengirimkan pesan, transmisi email, dan tautan sosial.',
  },
  {
    id: 'singularity',
    name: 'BLACK HOLE EVENT HORIZON',
    subtitle: 'Anomaly Gravitasi Tersembunyi',
    tag: 'SEC-X',
    x: 3000,
    y: 2200,
    color: 'retro-red',
    accentHex: '#ff3864',
    iconType: 'blackhole',
    description: 'Singularitas ruang-waktu berisiko tinggi. Memiliki gravitasi kuat yang menyedot kursor.',
  }
];
