import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Megaphone,
  Stethoscope,
  Palette,
  Video,
  Users,
  Target,
  TrendingUp,
  ShoppingCart,
  Plus,
  Minus,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Consultoria especializada em Marketing',
    description:
      'Diagnóstico e direcionamento estratégico para posicionamento, conteúdo e resultados.',
    icon: Briefcase,
  },
  {
    id: 2,
    title: 'Administração das redes sociais',
    description:
      'Gestão completa do perfil: planejamento, calendário editorial, postagem e acompanhamento.',
    icon: Megaphone,
  },
  {
    id: 3,
    title: 'Marketing na Saúde',
    description:
      'Estratégias para promover serviços, captar e fidelizar pacientes, e divulgar informações médicas. Ideal para hospitais, clínicas, planos de saúde, profissionais de saúde e empresas farmacêuticas.',
    icon: Stethoscope,
  },
  {
    id: 4,
    title: 'Criação de artes, logotipos e vídeos',
    description:
      'Identidade visual e criativos para campanhas e redes sociais com padrão profissional.',
    icon: Palette,
  },
  {
    id: 5,
    title: 'Edição e gravação de vídeos profissionais',
    description:
      'Captação e edição com foco em qualidade, ritmo e entrega pronta para redes sociais.',
    icon: Video,
  },
  {
    id: 6,
    title: 'Consultoria de Vendas',
    description:
      'Ajustes de processo comercial, abordagem e organização para aumentar conversão.',
    icon: Users,
  },
  {
    id: 7,
    title: 'Configuração e lançamento de campanhas via Google ADS',
    description:
      'Estrutura, configurações e lançamento de campanhas com mensuração e performance.',
    icon: Target,
  },
  {
    id: 8,
    title: 'Tráfego Pago',
    description:
      'Gestão de anúncios para atrair leads e acelerar vendas em múltiplas plataformas.',
    icon: TrendingUp,
  },
  {
    id: 9,
    title: 'Criação de sites (Land Pages, E-commerce)',
    description:
      'Páginas e lojas com foco em conversão, velocidade e experiência do usuário.',
    icon: ShoppingCart,
  },
];

export default function Services() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="services" className="relative overflow-hidden bg-[#0F3A7D] py-20 sm:py-28">
      {/* Fundo decorativo sutil */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[-15%] h-[42%] w-[42%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[42%] w-[42%] rounded-full bg-[#d4b67b]/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#d4b67b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4b67b]" />
            Soluções completas
          </span>
          <h2 className="text-4xl font-display text-white sm:text-5xl">Nossos Serviços</h2>
          <p className="mt-5 text-lg text-white/70">
            Soluções estratégicas desenhadas para escalar seu negócio no ambiente digital.
          </p>
        </motion.div>

        <div className="mt-14 max-w-4xl">
          {services.map((service, index) => {
            const Icon = service.icon;
            const open = expandedId === service.id;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="border-b border-white/10 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(open ? null : service.id)}
                  className="group flex w-full items-center gap-5 py-6 text-left sm:gap-7"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#d4b67b]/15 text-[#d4b67b] transition-colors duration-300 group-hover:bg-[#d4b67b] group-hover:text-[#0F3A7D]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-heading text-white transition-colors duration-300 group-hover:text-[#d4b67b] sm:text-xl">
                      {service.title}
                    </h3>
                    <p
                      className={`mt-1 text-sm text-white/50 transition-all duration-300 ${
                        open ? 'line-clamp-none' : 'line-clamp-1'
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>

                  <div className="shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#d4b67b]">
                    {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#d4b67b] transition-colors hover:text-white"
                      >
                        SOLICITAR ORÇAMENTO
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
