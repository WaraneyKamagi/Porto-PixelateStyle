import { useReducedMotion as useFramerReducedMotion } from 'motion/react';

/**
 * Returns true if the user has requested the system minimize the amount of animation or motion it uses.
 */
export function useReducedMotion(): boolean {
  const isReduced = useFramerReducedMotion();
  return Boolean(isReduced);
}
