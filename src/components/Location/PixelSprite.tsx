import React from 'react';

interface PixelSpriteProps {
  type: 'launchpad' | 'planet' | 'cluster' | 'constellation' | 'station' | 'satellite' | 'blackhole';
  size?: number;
  className?: string;
  theme?: string;
}

export const PixelSprite: React.FC<PixelSpriteProps> = ({
  type,
  size = 128,
  className = '',
}) => {
  switch (type) {
    case 'launchpad':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={`image-pixelated ${className}`}
          fill="none"
        >
          {/* Base Octagon Platform */}
          <rect x="6" y="24" width="20" height="6" fill="#1b163a" />
          <rect x="4" y="26" width="24" height="4" fill="#0f0d24" />
          <rect x="8" y="22" width="16" height="2" fill="#41476e" />
          {/* Caution Stripe Pattern */}
          <rect x="8" y="24" width="2" height="2" fill="#ffde59" />
          <rect x="12" y="24" width="2" height="2" fill="#ffde59" />
          <rect x="16" y="24" width="2" height="2" fill="#ffde59" />
          <rect x="20" y="24" width="2" height="2" fill="#ffde59" />
          <rect x="24" y="24" width="2" height="2" fill="#ffde59" />
          {/* Gantry Towers */}
          <rect x="4" y="10" width="3" height="14" fill="#41476e" />
          <rect x="25" y="10" width="3" height="14" fill="#41476e" />
          <rect x="7" y="14" width="4" height="2" fill="#9fa6cc" />
          <rect x="21" y="14" width="4" height="2" fill="#9fa6cc" />
          {/* Signal Beacon Lights (Blinking) */}
          <rect x="4" y="8" width="3" height="2" fill="#ff3864" className="animate-retro-blink" />
          <rect x="25" y="8" width="3" height="2" fill="#38efdf" className="animate-retro-blink" />
          {/* Center Landing Matrix / Pad Circle */}
          <rect x="12" y="20" width="8" height="2" fill="#38efdf" />
          <rect x="14" y="18" width="4" height="2" fill="#38efdf" />
          <rect x="15" y="19" width="2" height="1" fill="#f5f6ff" />
        </svg>
      );

    case 'planet':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={`image-pixelated ${className}`}
          fill="none"
        >
          {/* Circular Planet Silhouette via stepped pixel layers */}
          <rect x="10" y="2" width="12" height="28" fill="#1b163a" />
          <rect x="6" y="4" width="20" height="24" fill="#1b163a" />
          <rect x="4" y="6" width="24" height="20" fill="#1b163a" />
          <rect x="2" y="10" width="28" height="12" fill="#1b163a" />

          {/* Continents & Oceans (Magenta / Violet / Cyan) */}
          <rect x="6" y="8" width="14" height="16" fill="#794cb5" />
          <rect x="8" y="6" width="10" height="18" fill="#794cb5" />
          <rect x="12" y="10" width="12" height="10" fill="#ff389b" />
          <rect x="8" y="14" width="14" height="6" fill="#ff73c2" />
          <rect x="18" y="8" width="6" height="8" fill="#38efdf" />
          <rect x="14" y="18" width="8" height="4" fill="#ffde59" />

          {/* Atmospheric Rim Highlight */}
          <rect x="10" y="3" width="10" height="1" fill="#38efdf" />
          <rect x="5" y="6" width="2" height="8" fill="#38efdf" />
          <rect x="3" y="10" width="1" height="8" fill="#38efdf" />

          {/* Orbiting Micro Satellite */}
          <rect x="27" y="5" width="3" height="3" fill="#ffde59" />
          <rect x="26" y="6" width="5" height="1" fill="#f5f6ff" />
        </svg>
      );

    case 'cluster':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          className={`image-pixelated ${className}`}
          fill="none"
        >
          {/* Main Ringed Gas Giant */}
          <rect x="14" y="8" width="12" height="24" fill="#2a2050" />
          <rect x="10" y="10" width="20" height="20" fill="#2a2050" />
          <rect x="8" y="12" width="24" height="16" fill="#ff9f24" />
          <rect x="10" y="14" width="20" height="12" fill="#ffde59" />
          <rect x="12" y="16" width="16" height="8" fill="#ff3864" />

          {/* Stepped Pixel Rings */}
          <rect x="0" y="19" width="40" height="2" fill="#38efdf" opacity="0.9" />
          <rect x="2" y="18" width="36" height="4" fill="#38efdf" opacity="0.4" />
          <rect x="6" y="17" width="28" height="6" fill="#38efdf" opacity="0.2" />

          {/* Accompanying Mini Moons */}
          <rect x="4" y="6" width="4" height="4" fill="#ff73c2" />
          <rect x="32" y="30" width="5" height="5" fill="#38efdf" />
          <rect x="34" y="32" width="1" height="1" fill="#ffffff" />
        </svg>
      );

    case 'constellation':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={`image-pixelated ${className}`}
          fill="none"
        >
          <rect x="14" y="2" width="4" height="4" fill="#38efdf" />
          <rect x="4" y="14" width="4" height="4" fill="#ffde59" />
          <rect x="24" y="14" width="4" height="4" fill="#ff73c2" />
          <rect x="10" y="26" width="4" height="4" fill="#38efdf" />
          <rect x="20" y="26" width="4" height="4" fill="#f5f6ff" />
          {/* Dashed pixel lines */}
          <line x1="16" y1="4" x2="6" y2="16" stroke="#41476e" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="16" y1="4" x2="26" y2="16" stroke="#41476e" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="6" y1="16" x2="12" y2="28" stroke="#41476e" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="26" y1="16" x2="22" y2="28" stroke="#41476e" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );

    case 'station':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 36 36"
          className={`image-pixelated ${className}`}
          fill="none"
        >
          {/* Solar Arrays */}
          <rect x="2" y="14" width="10" height="8" fill="#29a4ff" />
          <rect x="24" y="14" width="10" height="8" fill="#29a4ff" />
          <rect x="4" y="16" width="6" height="4" fill="#38efdf" />
          <rect x="26" y="16" width="6" height="4" fill="#38efdf" />
          {/* Central Habitation Hub */}
          <rect x="14" y="8" width="8" height="20" fill="#41476e" />
          <rect x="12" y="12" width="12" height="12" fill="#9fa6cc" />
          <rect x="15" y="14" width="6" height="8" fill="#f5f6ff" />
          <rect x="17" y="6" width="2" height="4" fill="#ff3864" className="animate-retro-blink" />
        </svg>
      );

    case 'satellite':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={`image-pixelated ${className}`}
          fill="none"
        >
          {/* Antenna Dish */}
          <rect x="8" y="4" width="16" height="6" fill="#9fa6cc" />
          <rect x="12" y="2" width="8" height="4" fill="#41476e" />
          <rect x="15" y="0" width="2" height="6" fill="#ffde59" />
          {/* Transmitter Core */}
          <rect x="10" y="12" width="12" height="12" fill="#4d3280" />
          <rect x="12" y="14" width="8" height="8" fill="#ff73c2" />
          <rect x="14" y="16" width="4" height="4" fill="#38efdf" />
          {/* Side Thrusters */}
          <rect x="6" y="16" width="4" height="4" fill="#41476e" />
          <rect x="22" y="16" width="4" height="4" fill="#41476e" />
        </svg>
      );

    case 'blackhole':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 36 36"
          className={`image-pixelated ${className}`}
          fill="none"
        >
          {/* Accretion Disk Swirl */}
          <rect x="2" y="16" width="32" height="4" fill="#ff3864" opacity="0.8" />
          <rect x="6" y="12" width="24" height="12" fill="#ff9f24" opacity="0.6" />
          <rect x="10" y="8" width="16" height="20" fill="#ffde59" opacity="0.4" />
          {/* The Singularity Void */}
          <rect x="13" y="13" width="10" height="10" fill="#090714" />
          <rect x="12" y="14" width="12" height="8" fill="#090714" />
          <rect x="14" y="12" width="8" height="12" fill="#090714" />
        </svg>
      );

    default:
      return null;
  }
};
