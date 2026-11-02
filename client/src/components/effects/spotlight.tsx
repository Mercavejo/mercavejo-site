import type { MouseEvent } from 'react';

/**
 * Tracks the cursor and writes its position (relative to the element) into
 * the CSS custom properties --spot-x / --spot-y, which SpotlightOverlay reads.
 * Attach via onMouseMove={handleSpotlightMove} on any card, and add the `group`
 * class so the overlay can reveal on hover.
 */
export function handleSpotlightMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}

const SPOTLIGHT_STYLE = {
  background:
    'radial-gradient(360px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(212, 182, 123, 0.35), transparent 65%)',
} as const;

/**
 * A mouse-tracking glow overlay. Place inside an overflow-hidden card that has
 * the `group` class; reveals on hover (opacity 0 -> 100).
 */
export function SpotlightOverlay({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${className}`}
      style={SPOTLIGHT_STYLE}
    />
  );
}
