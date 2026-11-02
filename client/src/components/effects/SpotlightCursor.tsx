import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

/**
 * A soft ambient "spotlight" that follows the cursor across the whole page.
 * Desktop-only (fine pointer), disabled for reduced-motion users, never blocks input.
 */
export default function SpotlightCursor() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 150, damping: 25, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 25, mass: 0.5 });

  const background = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, rgba(212, 182, 123, 0.13), transparent 70%)`;

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
      style={{ background }}
    />
  );
}
