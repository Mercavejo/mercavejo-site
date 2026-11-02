import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type AuroraProps = {
  className?: string;
  colors?: [string, string, string?];
  speed?: number;
  intensity?: number;
};

export default function Aurora({
  className = '',
  colors = ['#20447D', '#d4b67b', '#0F3A7D'],
  speed = 1,
  intensity = 1,
}: AuroraProps) {
  const [c1, c2, c3] = colors;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const blobClass = 'absolute rounded-full';
  const blobStyle = (color: string, opacity: number) => ({
    background: `radial-gradient(circle at center, ${color}, transparent 68%)`,
    opacity: opacity * intensity,
    filter: isMobile ? 'blur(42px)' : 'blur(72px)',
  });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className={`${blobClass} -left-[18%] -top-[18%] h-[58vmax] w-[58vmax]`}
        style={blobStyle(c1, 0.28)}
        animate={isMobile ? undefined : { x: [0, 90, -40, 0], y: [0, 50, 90, 0], scale: [1, 1.08, 0.98, 1] }}
        transition={{ duration: 30 / speed, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${blobClass} -right-[18%] top-[18%] h-[48vmax] w-[48vmax]`}
        style={blobStyle(c2, 0.2)}
        animate={isMobile ? undefined : { x: [0, -80, 40, 0], y: [0, -50, 45, 0], scale: [1, 0.96, 1.06, 1] }}
        transition={{ duration: 34 / speed, repeat: Infinity, ease: 'easeInOut' }}
      />
      {!isMobile && c3 && (
        <motion.div
          className={`${blobClass} bottom-[-24%] left-[28%] h-[42vmax] w-[42vmax]`}
          style={blobStyle(c3, 0.18)}
          animate={{ x: [0, 60, -60, 0], y: [0, -50, -80, 0], scale: [1, 1.05, 0.98, 1] }}
          transition={{ duration: 38 / speed, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}
