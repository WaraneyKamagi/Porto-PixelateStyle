/**
 * Pixel Math & Retro Graphics Utilities
 */

/**
 * Rounds a floating point coordinate to a clean pixel grid.
 * Using step=2 gives a chunky 16-bit retro aesthetic.
 */
export function snapToPixel(value: number, step = 2): number {
  return Math.round(value / step) * step;
}

/**
 * Clamps a number between min and max bounds.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Calculates Euclidean distance between two 2D points.
 */
export function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Linear interpolation.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
