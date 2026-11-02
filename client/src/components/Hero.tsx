import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Aurora from '@/components/effects/Aurora';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-white">
      {/* Animated aurora blobs (tech backdrop) */}
      <Aurora
        className="z-0"
        colors={['#20447D', '#d4b67b', '#0F3A7D']}
        intensity={0.7}
        speed={1}
      />

      {/* Dot grid with radial mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(15, 58, 125, 0.28) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 75% 75% at 30% 40%, black 15%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 75% at 30% 40%, black 15%, transparent 78%)',
        }}
      />

      {/* Brand image (subtle, over the aurora) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/hero-ai-clean.jpg')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/30" />
      </div>

      {/* Sweeping beam */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-0 w-48 rotate-[-20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent"
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

            {/* Main Heading */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-5xl sm:text-6xl lg:text-7xl font-display text-[#0F3A7D] mb-6 leading-tight"
            >
              O Melhor do <span className="text-[#d4b67b]">Marketing</span> para seu Negócio
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-lg sm:text-xl text-[#0F3A7D] mb-8 max-w-xl leading-relaxed"
            >
              Planejamos, criamos e executamos estratégias digitais que geram leads e aumentam sua
              receita. Com estúdio de podcast, tráfego pago e muito mais.
            </motion.p>

            {/* CTA Buttons */}
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
