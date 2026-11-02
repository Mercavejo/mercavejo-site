import { Button } from '@/components/ui/button';
import { CheckCircle2, TrendingUp, Scale, BarChart, Search, FileText } from 'lucide-react';
import { handleSpotlightMove, SpotlightOverlay } from '@/components/effects/spotlight';

type PlanCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  bestFor: string;
  featured?: boolean;
};

export default function Packages() {
  const whatsappPhone = '5517996240418';
  const whatsappMessage = encodeURIComponent(
    'Olá! Vim pelo site e gostaria de agendar minha análise gratuita de 30 minutos.'
  );
  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  const PlanCard = ({ icon, title, description, price, bestFor, featured = false }: PlanCardProps) => (
    <div
      className={`group relative flex h-full flex-col rounded-3xl p-[1px] transition-transform duration-300 hover:-translate-y-1 ${
        featured
          ? 'bg-gradient-to-br from-[#d4b67b] via-[#d4b67b]/50 to-transparent shadow-[0_0_50px_-12px_rgba(212,182,123,0.5)]'
          : 'bg-gradient-to-br from-slate-200 via-slate-100 to-transparent'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#d4b67b] px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#0F3A7D] shadow-lg">
          Mais popular
        </span>
      )}

      <div
        onMouseMove={handleSpotlightMove}
        className={`flex h-full flex-col overflow-hidden rounded-3xl p-8 backdrop-blur-sm ${
          featured ? 'bg-white shadow-lg' : 'bg-white/95 shadow-lg'
        }`}
      >
        <SpotlightOverlay />

        <div className="relative z-10 flex items-center gap-4 mb-5">
          <div className="p-3 rounded-xl bg-[#0F3A7D]/10 text-[#0F3A7D]">{icon}</div>
          <h3 className="text-2xl font-display text-slate-900">{title}</h3>
        </div>
        <p className="relative z-10 text-slate-600 leading-relaxed flex-grow">{description}</p>
        <div className="relative z-10 my-8">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Investimento mensal médio
          </p>
          <p className="text-4xl font-display text-[#0F3A7D] mt-2">{price}</p>
        </div>
        <div className="relative z-10 mt-auto pt-6 border-t border-slate-200">
          <p className="text-sm font-semibold text-slate-700">Ideal para:</p>
          <p className="text-sm text-slate-500">{bestFor}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="packages" className="py-20 sm:py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-display text-[#0F3A7D] mb-6">
            Investimento em Marketing Digital
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Na Mercavejo, desenvolvemos estratégias personalizadas para negócios que buscam
            resultados consistentes. Cada plano é construído com base em diagnóstico preciso,
            considerando seu cenário, objetivos e capacidade de investimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PlanCard
            icon={<TrendingUp className="w-7 h-7" />}
            title="Presença Estratégica"
            description="Para empresas iniciando sua presença digital profissional e que buscam construir uma base sólida para crescimento futuro."
            price="A partir de R$ 1.000"
            bestFor="Negócios locais, profissionais liberais e startups."
          />
          <PlanCard
            icon={<BarChart className="w-7 h-7" />}
            title="Crescimento Acelerado"
            description="Para negócios estabelecidos que desejam expandir market share, aumentar a geração de leads e otimizar a conversão."
            price="R$ 1.600 - R$ 2.000"
            bestFor="Empresas em expansão e com metas de receita agressivas."
            featured
          />
          <PlanCard
            icon={<Scale className="w-7 h-7" />}
            title="Escala Institucional"
            description="Para operações maiores com foco em domínio de mercado, branding forte e otimização de múltiplos canais de aquisição."
            price="Proposta Personalizada"
            bestFor="Grandes players e empresas com foco em liderança de nicho."
          />
        </div>

        <div className="mt-20 max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-display text-[#0F3A7D] mb-4">
                Primeiros Passos para o Sucesso
              </h3>
              <p className="text-slate-600 mb-6">
                Agende uma <span className="font-bold text-[#0F3A7D]">análise gratuita de 30 minutos</span> e
                receba em 24h um relatório inicial com:
              </p>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <Search className="w-5 h-5 mt-1 text-[#d4b67b] shrink-0" />
                  <span><span className="font-semibold">Diagnóstico da concorrência</span> local e digital.</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 mt-1 text-[#d4b67b] shrink-0" />
                  <span><span className="font-semibold">Oportunidades imediatas</span> de crescimento identificadas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="w-5 h-5 mt-1 text-[#d4b67b] shrink-0" />
                  <span><span className="font-semibold">Proposta preliminar</span> adaptada ao seu perfil e metas.</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <Button
                asChild
                className="w-full lg:w-auto bg-[#0F3A7D] hover:bg-[#0a2555] text-white font-bold rounded-xl shadow-lg px-8 py-8 text-lg transition-all duration-300"
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Agendar Análise Gratuita
                </a>
              </Button>
              <p className="text-xs text-slate-400 mt-4">Via WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
