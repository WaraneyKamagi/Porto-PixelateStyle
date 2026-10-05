import React, { useEffect, useRef } from 'react';
import type { MotionValue } from 'motion/react';
import { useReducedMotion } from 'motion/react';
import { useGameStore } from '../../store/useGameStore';

interface BackgroundLayerProps {
  worldX: MotionValue<number>;
  worldY: MotionValue<number>;
}

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  twinkleSpeed: number;
  phase: number;
}

const STAR_COLORS = ['#f5f6ff', '#38efdf', '#ff73c2', '#ffde59', '#794cb5'];

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ worldX, worldY }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isTraveling = useGameStore((s) => s.isTraveling);
  const travelRef = useRef(isTraveling);
  const prefersReduced = Boolean(useReducedMotion());
  const reducedRef = useRef(prefersReduced);

  useEffect(() => {
    travelRef.current = isTraveling;
  }, [isTraveling]);

  useEffect(() => {
    reducedRef.current = prefersReduced;
  }, [prefersReduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numStars = Math.min(220, Math.floor((width * height) / 4500));
    const stars: Star[] = Array.from({ length: numStars }, () => ({
      x: Math.random() * 3200,
      y: Math.random() * 2400,
      size: Math.random() > 0.85 ? 3 : Math.random() > 0.5 ? 2 : 1,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      twinkleSpeed: 0.02 + Math.random() * 0.04,
      phase: Math.random() * Math.PI * 2,
    }));

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let warpStreak = 1;

    const render = () => {
      if (isVisible) {
        ctx.fillStyle = '#090714';
        ctx.fillRect(0, 0, width, height);

        // Animate star streak stretching during warp / fast travel (disabled if reduced motion)
        if (travelRef.current && !reducedRef.current) {
          warpStreak = Math.min(8, warpStreak + 0.5);
        } else {
          warpStreak = Math.max(1, warpStreak - 0.5);
        }

        // Distant parallax (reduced factor if prefersReduced)
        const parallaxFactor = reducedRef.current ? 0.05 : 0.15;
        const curX = worldX.get() * parallaxFactor;
        const curY = worldY.get() * parallaxFactor;

        // Nebulae
        const nebulae = [
          { x: 300, y: 250, r: 240, color: 'rgba(77, 50, 128, 0.16)' },
          { x: 1100, y: 650, r: 300, color: 'rgba(56, 239, 223, 0.08)' },
          { x: 700, y: 1100, r: 280, color: 'rgba(255, 56, 155, 0.09)' },
          { x: 1800, y: 400, r: 350, color: 'rgba(41, 164, 255, 0.11)' },
        ];

        nebulae.forEach((neb) => {
          const nx = (((neb.x + curX * 0.5) % 2500) + 2500) % 2500;
          const ny = (((neb.y + curY * 0.5) % 2000) + 2000) % 2000;
          const grad = ctx.createRadialGradient(nx, ny, 10, nx, ny, neb.r);
          grad.addColorStop(0, neb.color);
          grad.addColorStop(1, 'rgba(9, 7, 20, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(nx, ny, neb.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // Stars rendering with warp streaks
        stars.forEach((star) => {
          if (!reducedRef.current) {
            star.phase += star.twinkleSpeed;
          }
          const alpha = reducedRef.current ? 0.75 : 0.4 + 0.6 * Math.abs(Math.sin(star.phase));
          const steppedAlpha = Math.round(alpha * 4) / 4;

          const wrapWidth = Math.max(width, 2400);
          const wrapHeight = Math.max(height, 1800);
          let sx = ((star.x + curX) % wrapWidth + wrapWidth) % wrapWidth;
          let sy = ((star.y + curY) % wrapHeight + wrapHeight) % wrapHeight;

          sx = Math.round(sx / 2) * 2;
          sy = Math.round(sy / 2) * 2;

          ctx.fillStyle = star.color;
          ctx.globalAlpha = steppedAlpha;

          if (warpStreak > 1.2 && !reducedRef.current) {
            ctx.fillRect(sx, sy, Math.round(star.size * warpStreak), star.size);
          } else {
            ctx.fillRect(sx, sy, star.size, star.size);
          }
        });

        ctx.globalAlpha = 1.0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [worldX, worldY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
