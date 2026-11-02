import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Aurora from '@/components/effects/Aurora';

const rotatingWords = ['Marketing', 'Tráfego', 'Design', 'Podcast'];
const particles = Array.from({ length: 10 }, (_, i) => ({
  left: (i * 53 + 11) % 100,
  size: 2 + (i % 3),
  duration: 12 + (i % 4) * 2,
  delay: -(i * 1.2),
  color: i % 3 === 0 ? '#d4b67b' : i % 3 === 1 ? '#20447D' : '#9db8dd',
}));

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % rotatingWords.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="inline-block bg-gradient-to-r from-[#d4b67b] to-[#c9a36a] bg-clip-text text-transparent"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <section className="relative min-h-[calc(100svh-80px)] overflow-hidden bg-white py-24 sm:h-screen sm:min-h-[600px] sm:py-0">
      <style>{`@keyframes hero-float { 0% { transform: translateY(0); opacity: 0; } 12% { opacity: .55; } 88% { opacity: .55; } 100% { transform: translateY(-100vh); opacity: 0; } }`}</style>
      <Aurora colors={['#20447D', '#d4b67b', '#0F3A7D']} intensity={0.65} speed={0.8} className="z-0" />

      {!isMobile && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {particles.map((p, i) => (
            <span
              key={i}
              className="absolute bottom-[-10px] rounded-full"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                background: p.color,
                animation: `hero-float ${p.duration}s linear ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden opacity-25 sm:block"
        style={{
          backgroundImage: 'radial-gradient(rgba(15, 58, 125, 0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 75% 75% at 30% 40%, black 15%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 30% 40%, black 15%, transparent 78%)',
        }}
      />

      <div className="relative z-10 flex min-h-[calc(100svh-80px)] items-center sm:h-full sm:min-h-0">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div {...fadeUp(0)} className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4b67b] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4b67b]" />
              </span>
              <span className="text-sm font-medium text-[#0F3A7D]">Desde 2009 transformando negócios</span>
            </motion.div>

            <motion.h1 {...fadeUp(0.08)} className="mb-5 text-[2.7rem] font-display leading-[1.03] text-[#0F3A7D] sm:text-6xl lg:text-7xl">
              O Melhor do <RotatingWord /> para seu Negócio
            </motion.h1>

            <motion.p {...fadeUp(0.16)} className="mb-7 max-w-xl text-base leading-relaxed text-[#0F3A7D] sm:text-xl">
              Planejamos, criamos e executamos estratégias digitais que geram leads e aumentam sua receita. Com estúdio de podcast, tráfego pago e muito mais.
            </motion.p>

            <motion.div {...fadeUp(0.24)} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button className="w-full bg-[#d4b67b] px-6 py-5 text-base font-semibold text-[#0F3A7D] shadow-md transition-all duration-300 hover:bg-[#c9a36a] sm:w-auto sm:px-8 sm:py-6 sm:text-lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Solicite um Orçamento <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="w-full border-2 border-[#0F3A7D] px-6 py-5 text-base font-semibold text-[#0F3A7D] transition-all duration-300 hover:bg-[#0F3A7D]/5 sm:w-auto sm:px-8 sm:py-6 sm:text-lg" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                Conheça Nossos Serviços
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
