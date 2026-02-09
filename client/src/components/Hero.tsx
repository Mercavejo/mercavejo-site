import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/hero-ai-clean.jpg')] bg-cover bg-center opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/60" />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full border border-black/10">
              <div className="w-2 h-2 bg-[#d4b67b] rounded-full"></div>
              <span className="text-[#0F3A7D] text-sm font-medium">
                Desde 2009 transformando negócios
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display text-[#0F3A7D] mb-6 leading-tight">
              O Melhor do <span className="text-[#d4b67b]">Marketing</span> para seu Negócio
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#0F3A7D] mb-8 max-w-xl leading-relaxed">
              Planejamos, criamos e executamos estratégias digitais que geram leads e aumentam sua receita. Com estúdio de podcast, tráfego pago e muito mais.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-[#d4b67b] hover:bg-[#c9a36a] text-[#0F3A7D] font-semibold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Solicite um Orçamento
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                className="border-2 border-[#0F3A7D] text-[#0F3A7D] hover:bg-[#0F3A7D]/5 font-semibold text-lg px-8 py-6 rounded-lg transition-all duration-300"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Conheça Nossos Serviços
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
