import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValueEvent, animate, AnimatePresence } from 'motion/react';
import { useCamera } from '../hooks/useCamera';
import { BackgroundLayer } from './Layers/BackgroundLayer';
import { MidLayer } from './Layers/MidLayer';
import { ForegroundLayer } from './Layers/ForegroundLayer';
import { LocationMarker } from './Location/LocationMarker';
import { Spaceship } from './Spaceship/Spaceship';
import { Hud } from './Hud/Hud';
import { LaunchPadPanel } from './panels/LaunchPadPanel';
import { AboutPanel } from './panels/AboutPanel';
import { ProjectsPanel } from './panels/ProjectsPanel';
import { SkillsPanel } from './panels/SkillsPanel';
import { ExperiencePanel } from './panels/ExperiencePanel';
import { ContactPanel } from './panels/ContactPanel';
import { CometEasterEgg } from './EasterEggs/CometEasterEgg';
import { UfoEasterEgg } from './EasterEggs/UfoEasterEgg';
import { BlackHole } from './EasterEggs/BlackHole';
import { EasterEggModal } from './EasterEggs/EasterEggModal';
import { MobileTouchControls } from './Spaceship/MobileTouchControls';
import { LOCATIONS, WORLD_BOUNDS, type LocationItem } from '../data/locations';
import { useGameStore } from '../store/useGameStore';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { getDistance, lerp } from '../lib/pixelUtils';
import { soundFX } from '../lib/audio';

export const World: React.FC = () => {
  const {
    worldX,
    worldY,
    snappedWorldX,
    snappedWorldY,
    dragConstraints,
    centerOn,
    viewport,
    isReducedMotion,
  } = useCamera(LOCATIONS[0].x, LOCATIONS[0].y);

  const {
    activeLocationId,
    setActiveLocationId,
    activePanel,
    setActivePanel,
    setIsDragging,
    shipX,
    shipY,
    shipRotation,
    isThrusting,
    isTraveling,
    setShipPos,
    setShipRotation,
    setThrusting,
    setTraveling,
    isSoundMuted,
  } = useGameStore();

  const [coords, setCoords] = useState({
    x: LOCATIONS[0].x,
    y: LOCATIONS[0].y,
  });

  // Easter Egg Modal State
  const [easterEgg, setEasterEgg] = useState<{
    isOpen: boolean;
    title: string;
    badge: string;
    message: string;
    bonus: string;
    accentColor: string;
  } | null>(null);

  // Track live coordinates from motion values
  useMotionValueEvent(worldX, 'change', (latestX) => {
    const curWorldX = -latestX + viewport.width / 2;
    setCoords((prev) => ({ ...prev, x: curWorldX }));
  });

  useMotionValueEvent(worldY, 'change', (latestY) => {
    const curWorldY = -latestY + viewport.height / 2;
    setCoords((prev) => ({ ...prev, y: curWorldY }));
  });

  // Check proximity to any location for the docking prompt
  const nearestLocation = LOCATIONS.find(
    (loc) => getDistance(shipX, shipY, loc.x, loc.y) < 160
  );

  // Smooth camera follow for keyboard flight
  const handleFollowShip = useCallback(
    (targetX: number, targetY: number) => {
      if (activePanel || easterEgg?.isOpen) return;
      const targetCamX = -(targetX - viewport.width / 2);
      const targetCamY = -(targetY - viewport.height / 2);

      const clampedX = Math.max(dragConstraints.left, Math.min(0, targetCamX));
      const clampedY = Math.max(dragConstraints.top, Math.min(0, targetCamY));

      const currentX = worldX.get();
      const currentY = worldY.get();
      worldX.set(currentX + (clampedX - currentX) * 0.08);
      worldY.set(currentY + (clampedY - currentY) * 0.08);
    },
    [viewport.width, viewport.height, dragConstraints.left, dragConstraints.top, worldX, worldY, activePanel, easterEgg]
  );

  // Fast Travel auto-pilot flight sequence
  const travelAnimRef = useRef<{ stop: () => void } | null>(null);

  const triggerFastTravel = useCallback(
    (targetLoc: LocationItem) => {
      if (isTraveling) return;

      const startX = shipX;
      const startY = shipY;
      const targetX = targetLoc.x;
      const targetY = targetLoc.y;

      const dx = targetX - startX;
      const dy = targetY - startY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 40 || isReducedMotion) {
        setShipPos(targetX, targetY);
        setActiveLocationId(targetLoc.id);
        centerOn(targetX, targetY, !isReducedMotion);
        setActivePanel(targetLoc.id);
        if (!isSoundMuted) {
          soundFX.playSelect();
        }
        return;
      }

      const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      setShipRotation(targetAngle);
      setThrusting(true);
      setTraveling(true);

      if (!isSoundMuted) {
        soundFX.playWarp();
      }

      const flightDuration = Math.min(2.0, Math.max(0.85, dist / 1400));

      const anim = animate(0, 1, {
        duration: flightDuration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (progress) => {
          const curX = lerp(startX, targetX, progress);
          const curY = lerp(startY, targetY, progress);
          setShipPos(curX, curY);

          const camX = Math.max(
            dragConstraints.left,
            Math.min(0, -(curX - viewport.width / 2))
          );
          const camY = Math.max(
            dragConstraints.top,
            Math.min(0, -(curY - viewport.height / 2))
          );
          worldX.set(camX);
          worldY.set(camY);
        },
        onComplete: () => {
          setShipPos(targetX, targetY);
          setThrusting(false);
          setTraveling(false);
          setActiveLocationId(targetLoc.id);
          setActivePanel(targetLoc.id);
          if (!isSoundMuted) {
            soundFX.playSelect();
          }
        },
      });

      travelAnimRef.current = anim;
    },
    [
      isTraveling,
      shipX,
      shipY,
      setShipRotation,
      setThrusting,
      setTraveling,
      setShipPos,
      isSoundMuted,
      setActiveLocationId,
      setActivePanel,
      centerOn,
      dragConstraints.left,
      dragConstraints.top,
      viewport.width,
      viewport.height,
      worldX,
      worldY,
    ]
  );

  useEffect(() => {
    return () => {
      travelAnimRef.current?.stop();
    };
  }, []);

  // Keyboard navigation & interaction hook
  useKeyboardControls({
    onFollowShip: handleFollowShip,
    onInteract: (loc) => {
      setActiveLocationId(loc.id);
      setActivePanel(loc.id);
      if (!isSoundMuted) {
        soundFX.playSelect();
      }
    },
    onEscape: () => {
      if (easterEgg?.isOpen) {
        setEasterEgg(null);
      } else if (activePanel) {
        setActivePanel(null);
      } else {
        setActiveLocationId(null);
      }
      if (!isSoundMuted) {
        soundFX.playClose();
      }
    },
  });

  const activeLocation = LOCATIONS.find((l) => l.id === activeLocationId) || LOCATIONS[0];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#090714] cursor-grab active:cursor-grabbing select-none">
      {/* 1. Deep Space Far Background (Canvas 2D Stars & Nebulae - Parallax 0.15x) */}
      <BackgroundLayer worldX={worldX} worldY={worldY} />

      {/* 2. Mid-Ground Cosmic Dust & Deep Space Clusters (Parallax 0.45x) */}
      <MidLayer worldX={worldX} worldY={worldY} />

      {/* 3. Main World Layer 1:1 (Draggable with Inertia + Snapped 2px Pixel Grid) */}
      <motion.div
        drag={!activePanel && !easterEgg?.isOpen}
        dragConstraints={dragConstraints}
        dragElastic={0.06}
        dragMomentum={true}
        dragTransition={{ power: 0.22, timeConstant: 240 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        style={{
          x: snappedWorldX,
          y: snappedWorldY,
          width: WORLD_BOUNDS.width,
          height: WORLD_BOUNDS.height,
          willChange: 'transform',
        }}
        className="absolute top-0 left-0 z-20"
      >
        {/* Subtle World Border / Galactic Grid Line */}
        <div
          className="absolute inset-0 border-4 border-dashed border-[#41476e]/30 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #41476e 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            opacity: 0.25,
          }}
        />

        {/* Universe Locations */}
        {LOCATIONS.map((loc) => (
          <LocationMarker
            key={loc.id}
            location={loc}
            isActive={loc.id === activeLocationId}
            onSelect={triggerFastTravel}
          />
        ))}

        {/* Easter Egg: Mysterious Alien UFO */}
        <UfoEasterEgg
          onInteract={(msg) => {
            setEasterEgg({
              isOpen: true,
              title: 'ALIEN FIRST CONTACT!',
              badge: 'UFO ENCOUNTER',
              message: msg,
              bonus: '+1000 KARMA',
              accentColor: '#38efdf',
            });
          }}
        />

        {/* Easter Egg: Gravitational Singularity Black Hole */}
        <BlackHole
          onTeleport={(msg) => {
            setEasterEgg({
              isOpen: true,
              title: 'WORMHOLE TELEPORTATION!',
              badge: 'SINGULARITY EVENT',
              message: msg,
              bonus: '+750 SPACE LORE',
              accentColor: '#ff3864',
            });
            centerOn(shipX, shipY, true);
          }}
        />

        {/* The Spaceship */}
        <Spaceship
          x={shipX}
          y={shipY}
          rotation={shipRotation}
          isThrusting={isThrusting}
          nearbyLocationName={nearestLocation?.name}
          onInteract={() => {
            if (nearestLocation) {
              setActiveLocationId(nearestLocation.id);
              setActivePanel(nearestLocation.id);
              if (!isSoundMuted) {
                soundFX.playSelect();
              }
            }
          }}
        />
      </motion.div>

      {/* 4. Foreground Floating Debris & Fast Asteroids (Parallax 1.35x) */}
      <ForegroundLayer worldX={worldX} worldY={worldY} />

      {/* Easter Egg: Random Passing Comet */}
      <CometEasterEgg
        onCatch={(msg) => {
          setEasterEgg({
            isOpen: true,
            title: 'KOMET KOSMIK TERTANGKAP!',
            badge: 'CELESTIAL COMET',
            message: msg,
            bonus: '+500 COSMIC XP',
            accentColor: '#ffde59',
          });
        }}
      />

      {/* 5. Retro CRT Scanline Overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none z-40 opacity-70" />

      {/* 6. Heads-Up Display (HUD) */}
      <Hud
        currentWorldX={coords.x}
        currentWorldY={coords.y}
        activeLocationName={activeLocation?.name || 'DEEP SPACE'}
        viewportWidth={viewport.width}
        viewportHeight={viewport.height}
        onNavigateToCoords={(nx, ny) => {
          centerOn(nx, ny, true);
        }}
        onFastTravel={triggerFastTravel}
      />

      {/* 7. Sector Location Dialog Panels (AnimatePresence) */}
      <AnimatePresence>
        {activePanel === 'launchpad' && (
          <LaunchPadPanel
            onClose={() => setActivePanel(null)}
            onLaunch={() => triggerFastTravel(LOCATIONS[1])}
          />
        )}
        {activePanel === 'origin-planet' && (
          <AboutPanel onClose={() => setActivePanel(null)} />
        )}
        {activePanel === 'project-cluster' && (
          <ProjectsPanel onClose={() => setActivePanel(null)} />
        )}
        {activePanel === 'constellation' && (
          <SkillsPanel onClose={() => setActivePanel(null)} />
        )}
        {activePanel === 'space-station' && (
          <ExperiencePanel onClose={() => setActivePanel(null)} />
        )}
        {activePanel === 'comms-satellite' && (
          <ContactPanel onClose={() => setActivePanel(null)} />
        )}
      </AnimatePresence>

      {/* 8. Easter Egg Secret Popup Modal */}
      {easterEgg && (
        <EasterEggModal
          isOpen={easterEgg.isOpen}
          title={easterEgg.title}
          badge={easterEgg.badge}
          message={easterEgg.message}
          bonus={easterEgg.bonus}
          accentColor={easterEgg.accentColor}
          onClose={() => setEasterEgg(null)}
        />
      )}

      {/* 9. Mobile Touch Directional Controls */}
      <MobileTouchControls onFollowShip={handleFollowShip} />
    </div>
  );
};
