import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Megaphone,
  Palette,
  Video,
  Users,
  Target,
  TrendingUp,
  ShoppingCart,
  Stethoscope,
  Plus,
  Minus
} from 'lucide-react';
import { handleSpotlightMove, SpotlightOverlay } from '@/components/effects/spotlight';

const services = [
  {
    id: 1,
    title: 'Consultoria especializada em Marketing',
    description:
      'Diagnóstico e direcionamento estratégico para posicionamento, conteúdo e resultados.',
    icon: Briefcase,
    color: 'from-blue-500 to-blue-600',
    placement: 'lg:col-start-4 lg:row-start-1',
  },
  {
    id: 2,
    title: 'Administração das redes sociais',
    description:
      'Gestão completa do perfil: planejamento, calendário editorial, postagem e acompanhamento.',
    icon: Megaphone,
    color: 'from-cyan-500 to-blue-600',
    placement: 'lg:col-start-1 lg:row-start-1',
  },
  {
    id: 9,
    title: 'Marketing na Saúde',
    description:
      'Estratégias para promover serviços, captar e fidelizar pacientes, e divulgar informações médicas. Ideal para hospitais, clínicas, planos de saúde, profissionais de saúde e empresas farmacêuticas.',
    icon: Stethoscope,
    color: 'from-[#d4b67b] to-amber-500',
    featured: true,
    placement: 'lg:col-start-2 lg:col-span-2 lg:row-start-1',
  },
  {
    id: 3,
    title: 'Criação de artes, logotipos e vídeos',
    description:
      'Identidade visual e criativos para campanhas e redes sociais com padrão profissional.',
    icon: Palette,
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 4,
    title: 'Edição e gravação de vídeos profissionais',
    description:
      'Captação e edição com foco em qualidade, ritmo e entrega pronta para redes sociais.',
    icon: Video,
    color: 'from-red-500 to-pink-600',
  },
  {
    id: 5,
    title: 'Consultoria de Vendas',
    description:
      'Ajustes de processo comercial, abordagem e organização para aumentar conversão.',
    icon: Users,
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 6,
    title: 'Configuração e lançamento de campanhas via Google ADS',
    description:
      'Estrutura, configurações e lançamento de campanhas com mensuração e performance.',
    icon: Target,
    color: 'from-yellow-400 to-amber-500',
  },
  {
    id: 7,
    title: 'Tráfego Pago',
    description:
      'Gestão de anúncios para atrair leads e acelerar vendas em múltiplas plataformas.',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 8,
    title: 'Criação de sites (Land Pages, E-commerce)',
    description:
      'Páginas e lojas com foco em conversão, velocidade e experiência do usuário.',
    icon: ShoppingCart,
    color: 'from-indigo-500 to-purple-600',
  },
];

export default function Services() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative py-20 sm:py-32 bg-[#0F3A7D] overflow-hidden"
    >
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#d4b67b]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-display text-white mb-6">
                Nossos Serviços
              </h2>
              <p className="text-lg text-white/85 leading-relaxed">
                Soluções estratégicas desenhadas para escalar seu negócio no ambiente digital.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isExpanded = expandedId === service.id;
              const isFeatured = Boolean((service as any).featured);

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                >
                  <Card
                    onClick={() => setExpandedId(isExpanded ? null : service.id)}
                    onMouseMove={handleSpotlightMove}
                    className={[
                      'group relative h-full p-6 sm:p-8 cursor-pointer transition-all duration-500 overflow-hidden',
                      'bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]',
                      'hover:bg-white/[0.12] hover:border-white/30 hover:shadow-[0_8px_32px_0_rgba(212,182,123,0.2)]',
                      isFeatured ? 'ring-1 ring-[#d4b67b]/50' : '',
                      isExpanded ? 'bg-white/[0.15] border-[#d4b67b]/40' : ''
                    ].join(' ')}
                  >
                    {/* Background Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Mouse-tracking spotlight */}
                    <SpotlightOverlay />

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-white/40 group-hover:text-[#d4b67b] transition-colors">
                          {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </div>
                      </div>

                      <h3 className="text-xl font-heading text-white mb-3 group-hover:text-[#d4b67b] transition-colors">
                        {service.title}
                      </h3>

                      <AnimatePresence mode="wait">
                        {isExpanded ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-white/90 text-sm sm:text-base leading-relaxed mt-4 pt-4 border-t border-white/10">
                              {service.description}
                            </p>
                            <div className="mt-6 flex items-center text-[#d4b67b] text-sm font-bold">
                              SOLICITAR ORÇAMENTO
                              <div className="ml-2 w-4 h-[2px] bg-[#d4b67b]" />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-white/60 text-sm line-clamp-2"
                          >
                            {service.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {isFeatured && (
                      <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#d4b67b]/10 rounded-full blur-2xl" />
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
