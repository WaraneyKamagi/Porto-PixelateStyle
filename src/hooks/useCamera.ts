import { useEffect, useState, useCallback, useRef } from 'react';
import { useMotionValue, useTransform, animate, type MotionValue, useReducedMotion } from 'motion/react';
import { WORLD_BOUNDS } from '../data/locations';

export interface UseCameraResult {
  worldX: MotionValue<number>;
  worldY: MotionValue<number>;
  snappedWorldX: MotionValue<number>;
  snappedWorldY: MotionValue<number>;
  dragConstraints: { left: number; right: number; top: number; bottom: number };
  centerOn: (x: number, y: number, smooth?: boolean, onComplete?: () => void) => void;
  viewport: { width: number; height: number };
  isReducedMotion: boolean;
}

export function useCamera(initialWorldX = 600, initialWorldY = 700): UseCameraResult {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const prefersReduced = useReducedMotion();
  const isReducedMotion = Boolean(prefersReduced);

  const calcOffsetX = (x: number, w: number) => -(x - w / 2);
  const calcOffsetY = (y: number, h: number) => -(y - h / 2);

  const worldX = useMotionValue(calcOffsetX(initialWorldX, viewport.width));
  const worldY = useMotionValue(calcOffsetY(initialWorldY, viewport.height));

  // Chunky 2px retro pixel snapping for the 1:1 render transform
  const snappedWorldX = useTransform(worldX, (val) => Math.round(val / 2) * 2);
  const snappedWorldY = useTransform(worldY, (val) => Math.round(val / 2) * 2);

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dragConstraints = {
    left: -(WORLD_BOUNDS.width - viewport.width),
    right: 0,
    top: -(WORLD_BOUNDS.height - viewport.height),
    bottom: 0,
  };

  const isAnimatingRef = useRef(false);

  const centerOn = useCallback(
    (x: number, y: number, smooth = true, onComplete?: () => void) => {
      const targetX = Math.max(
        dragConstraints.left,
        Math.min(0, calcOffsetX(x, viewport.width))
      );
      const targetY = Math.max(
        dragConstraints.top,
        Math.min(0, calcOffsetY(y, viewport.height))
      );

      // If user prefers reduced motion, always snap directly without flying
      if (!smooth || isReducedMotion) {
        worldX.set(targetX);
        worldY.set(targetY);
        onComplete?.();
        return;
      }

      isAnimatingRef.current = true;

      const animX = animate(worldX, targetX, {
        type: 'spring',
        stiffness: 140,
        damping: 24,
        mass: 1,
      });

      const animY = animate(worldY, targetY, {
        type: 'spring',
        stiffness: 140,
        damping: 24,
        mass: 1,
        onComplete: () => {
          isAnimatingRef.current = false;
          onComplete?.();
        },
      });

      return () => {
        animX.stop();
        animY.stop();
      };
    },
    [viewport.width, viewport.height, dragConstraints.left, dragConstraints.top, worldX, worldY, isReducedMotion]
  );

  return {
    worldX,
    worldY,
    snappedWorldX,
    snappedWorldY,
    dragConstraints,
    centerOn,
    viewport,
    isReducedMotion,
  };
}
