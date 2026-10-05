import { create } from 'zustand';
import { LOCATIONS } from '../data/locations';

interface GameState {
  // Navigation & Location
  activeLocationId: string | null;
  activePanel: string | null;
  cameraX: number;
  cameraY: number;
  shipX: number;
  shipY: number;
  shipRotation: number;
  isThrusting: boolean;
  isTraveling: boolean;
  isDragging: boolean;
  
  // Audio & Systems
  isSoundMuted: boolean;
  hasGameStarted: boolean;
  isPlainMode: boolean;
  viewportSize: { width: number; height: number };

  // Actions
  setActiveLocationId: (id: string | null) => void;
  setActivePanel: (panel: string | null) => void;
  setCameraPos: (x: number, y: number) => void;
  setShipPos: (x: number, y: number) => void;
  setShipRotation: (deg: number) => void;
  setThrusting: (v: boolean) => void;
  setTraveling: (v: boolean) => void;
  setIsDragging: (v: boolean) => void;
  toggleSound: () => void;
  startGame: () => void;
  togglePlainMode: () => void;
  setViewportSize: (w: number, h: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  activeLocationId: LOCATIONS[0].id,
  activePanel: null,
  cameraX: LOCATIONS[0].x,
  cameraY: LOCATIONS[0].y,
  shipX: LOCATIONS[0].x,
  shipY: LOCATIONS[0].y,
  shipRotation: 0,
  isThrusting: false,
  isTraveling: false,
  isDragging: false,
  isSoundMuted: true, // Default MATI as requested
  hasGameStarted: false,
  isPlainMode: false,
  viewportSize: {
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  },

  setActiveLocationId: (id) => set({ activeLocationId: id }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  setCameraPos: (x, y) => set({ cameraX: x, cameraY: y }),
  setShipPos: (x, y) => set({ shipX: x, shipY: y }),
  setShipRotation: (deg) => set({ shipRotation: deg }),
  setThrusting: (isThrusting) => set({ isThrusting }),
  setTraveling: (isTraveling) => set({ isTraveling }),
  setIsDragging: (isDragging) => set({ isDragging }),
  toggleSound: () => set((s) => ({ isSoundMuted: !s.isSoundMuted })),
  startGame: () => set({ hasGameStarted: true }),
  togglePlainMode: () => set((s) => ({ isPlainMode: !s.isPlainMode })),
  setViewportSize: (width, height) => set({ viewportSize: { width, height } }),
}));
