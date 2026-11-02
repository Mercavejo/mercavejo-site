import { motion } from 'framer-motion';

type AuroraProps = {
  className?: string;
  /** Gradient colors for the drifting blobs. Defaults to the Mercavejo palette. */
  colors?: [string, string, string?];
  /** Animation speed multiplier. Lower = slower. */
  speed?: number;
  /** Opacity scale for the blobs. */
  intensity?: number;
};

/**
 * Animated "aurora" background: large blurred gradient blobs drifting slowly.
 * Pure framer-motion, no WebGL dependency. Layer it behind content with pointer-events-none.
 */
export default function Aurora({
  className = '',
  colors = ['#20447D', '#d4b67b', '#0F3A7D'],
  speed = 1,
  intensity = 1,
}: AuroraProps) {
  const [c1, c2, c3] = colors;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute -top-[20%] -left-[15%] h-[70vmax] w-[70vmax] rounded-full"
        style={{
          background: `radial-gradient(circle at center, ${c1}, transparent 62%)`,
          opacity: 0.35 * intensity,
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, 140, -60, 0], y: [0, 80, 140, 0], scale: [1, 1.18, 0.94, 1] }}
        transition={{ duration: 22 / speed, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[10%] -right-[15%] h-[60vmax] w-[60vmax] rounded-full"
        style={{
          background: `radial-gradient(circle at center, ${c2}, transparent 62%)`,
          opacity: 0.28 * intensity,
          filter: 'blur(100px)',
        }}
        animate={{ x: [0, -120, 70, 0], y: [0, -90, 60, 0], scale: [1, 0.92, 1.12, 1] }}
        transition={{ duration: 26 / speed, repeat: Infinity, ease: 'easeInOut' }}
      />
      {c3 && (
        <motion.div
          className="absolute bottom-[-25%] left-[25%] h-[55vmax] w-[55vmax] rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${c3}, transparent 62%)`,
            opacity: 0.3 * intensity,
            filter: 'blur(100px)',
          }}
          animate={{ x: [0, 90, -90, 0], y: [0, -60, -110, 0], scale: [1, 1.1, 0.96, 1] }}
          transition={{ duration: 30 / speed, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}
