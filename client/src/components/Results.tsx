import { motion } from 'framer-motion';
import CountUp from '@/components/effects/CountUp';
import Aurora from '@/components/effects/Aurora';

const stats = [
  { value: 16, suffix: '+', label: 'Anos de mercado', hint: 'desde 2009' },
  { value: 21, suffix: '', label: 'Marcas atendidas', hint: 'em gestão contínua' },
  { value: 10, suffix: '', label: 'Sites entregues', hint: 'landing pages e e-commerce' },
  { value: 10, suffix: '', label: 'Podcasts no estúdio', hint: 'produzidos internamente' },
];

export default function Results() {
  return (
    <section id="results" className="relative overflow-hidden bg-[#20447D] py-20 text-white sm:py-24">
      <Aurora colors={['#20447D', '#d4b67b']} intensity={0.45} speed={0.8} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-display text-white sm:text-4xl">
            Números que comprovam nosso trabalho
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/60">
            Da estratégia à execução, entregamos métricas reais.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="flex flex-col divide-y divide-white/10 border-y border-white/10 sm:flex-row sm:divide-x sm:divide-y-0">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex-1 px-6 py-8 text-center sm:py-10"
              >
                <div className="text-4xl font-display text-white sm:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm font-semibold text-white/80">{stat.label}</div>
                <div className="mt-1 text-xs text-white/45">{stat.hint}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
