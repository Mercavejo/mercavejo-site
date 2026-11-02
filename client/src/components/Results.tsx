import { motion } from 'framer-motion';
import { CalendarDays, Users, Monitor, Mic } from 'lucide-react';
import CountUp from '@/components/effects/CountUp';
import Aurora from '@/components/effects/Aurora';

const stats = [
  { icon: CalendarDays, value: 16, suffix: '+', label: 'Anos de mercado', hint: 'desde 2009' },
  { icon: Users, value: 21, suffix: '', label: 'Marcas atendidas', hint: 'em gestão contínua' },
  { icon: Monitor, value: 10, suffix: '', label: 'Sites entregues', hint: 'landing pages e e-commerce' },
  { icon: Mic, value: 10, suffix: '', label: 'Podcasts no estúdio', hint: 'produzidos internamente' },
];

export default function Results() {
  return (
    <section id="results" className="relative overflow-hidden bg-[#0a192f] py-20 sm:py-24 text-white">
      <Aurora colors={['#20447D', '#d4b67b']} intensity={0.5} speed={0.8} />

      {/* subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex rounded-full border border-[#d4b67b]/30 bg-[#d4b67b]/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#d4b67b]">
            Tecnologia e resultado
          </span>
          <h2 className="text-4xl font-display text-white sm:text-5xl">
            Números que comprovam nosso trabalho
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Da estratégia à execução, entregamos métricas reais para empresas de todos os segmentos.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#d4b67b]/40 hover:bg-white/[0.08] sm:p-8"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4b67b]/15 text-[#d4b67b] transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-4xl font-display text-white sm:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm font-semibold text-white">{stat.label}</div>
                <div className="text-xs text-white/50">{stat.hint}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
