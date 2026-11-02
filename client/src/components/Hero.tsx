import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Aurora from '@/components/effects/Aurora';

const rotatingWords = ['Marketing', 'Tráfego', 'Design', 'Podcast'];

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53 + 11) % 100,
  size: 2 + (i % 3),
  duration: 9 + (i % 5) * 2,
  delay: -(i * 0.9),
  color: i % 3 === 0 ? '#d4b67b' : i % 3 === 1 ? '#20447D' : '#9db8dd',
}));

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % rotatingWords.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="inline-block bg-gradient-to-r from-[#d4b67b] via-amber-400 to-[#c9a36a] bg-clip-text text-transparent"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-white">
      <style>{`
        @keyframes hero-float {
          0% { transform: translateY(0); opacity: 0; }
          12% { opacity: 0.6; }
          88% { opacity: 0.6; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>

      {/* Fundo animado: aurora */}
      <Aurora colors={['#20447D', '#d4b67b', '#0F3A7D']} intensity={0.8} speed={1.1} className="z-0" />

      {/* Partículas flutuantes */}
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

      {/* Grid de pontos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(15, 58, 125, 0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 75% 75% at 30% 40%, black 15%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 75% at 30% 40%, black 15%, transparent 78%)',
        }}
      />

      {/* Beam dourado */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-0 w-48 rotate-[-20deg] bg-gradient-to-r from-transparent via-[#d4b67b]/40 to-transparent"
        style={{ left: '-25%' }}
        animate={{ left: ['-25%', '115%'] }}
        transition={{ duration: 9, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
      />

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              {...fadeUp(0)}
              className="mb-6 inline-flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full border border-black/10 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4b67b] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4b67b]" />
              </span>
              <span className="text-[#0F3A7D] text-sm font-medium">
                Desde 2009 transformando negócios
              </span>
            </motion.div>

            {/* Headline com palavra rotativa */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-5xl sm:text-6xl lg:text-7xl font-display text-[#0F3A7D] mb-6 leading-tight"
            >
              O Melhor do <RotatingWord /> para seu Negócio
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-lg sm:text-xl text-[#0F3A7D] mb-8 max-w-xl leading-relaxed"
            >
              Planejamos, criamos e executamos estratégias digitais que geram leads e aumentam sua
              receita. Com estúdio de podcast, tráfego pago e muito mais.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-[#d4b67b] hover:bg-[#c9a36a] text-[#0F3A7D] font-semibold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Solicite um Orçamento
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                className="border-2 border-[#0F3A7D] text-[#0F3A7D] hover:bg-[#0F3A7D]/5 font-semibold text-lg px-8 py-6 rounded-lg transition-all duration-300"
                onClick={() =>
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Conheça Nossos Serviços
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
