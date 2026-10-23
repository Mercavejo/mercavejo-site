import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Mic2, Star } from 'lucide-react';

export default function Studio() {
  const [, setLocation] = useLocation();

  const StudioInfoCard = () => (
    <div className="max-w-md mx-auto">
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/20 via-white/10 to-transparent">
        <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#d4b67b]/20 text-[#d4b67b]">
                <Mic2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display text-white">
                Hub de Conteúdo
              </h3>
            </div>

            <p className="text-white/90 leading-relaxed mb-6">
              O Estúdio Mercavejo é o berço de grandes conversas que geram resultados reais. Mais do que um espaço de gravação, oferecemos a estrutura completa para transformar sua expertise em autoridade digital.
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-xs font-bold tracking-widest text-[#d4b67b] uppercase">
                Podcasts de Sucesso:
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { name: "Treina que Sara", href: "https://www.instagram.com/treinaquesara/" },
                  { name: "Antes da consulta", href: "https://www.instagram.com/podcastantesdaconsulta/" },
                  { name: "Café com Zakia", href: "https://www.instagram.com/cafecomzakia/" },
                  { name: "Sai do raso", href: "https://www.instagram.com/lamanna_psicologa/" },
                  { name: "Gente amiga", href: "https://www.instagram.com/podcastgenteamiga/" },
                  { name: "Entre Mães no Espectro", href: "https://www.instagram.com/entremaesnoespectro/" },
                  { name: "Consert Cast", href: "https://www.instagram.com/consertcast/" }
                ].map((podcast) => (
                  <a
                    key={podcast.name}
                    href={podcast.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 group hover:text-[#d4b67b] transition-colors"
                  >
                    <Star className="w-4 h-4 text-[#d4b67b] fill-[#d4b67b]/20 group-hover:fill-[#d4b67b] transition-all" />
                    <span className="text-sm font-medium underline-offset-4 group-hover:underline">{podcast.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-[#d4b67b] hover:bg-[#bfa46e] text-[#0F3A7D] font-bold text-sm px-4 py-6 rounded-xl shadow-lg transition-all duration-300"
              onClick={() => {
                setLocation('/podcast');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Saiba mais sobre o Estúdio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="studio"
      className="relative py-20 sm:py-32 bg-[#0F3A7D] overflow-hidden"
    >
      {/* Fundo decorativo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-blue-400/10 via-blue-500/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-[#d4b67b]/10 via-yellow-400/5 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-2 w-2 rounded-full bg-[#d4b67b]" />
            <span className="text-sm font-semibold tracking-wider text-white/60 uppercase">
              Exclusividade em Catanduva
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-display text-white mb-6">
            Estúdio Mercavejo
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            A única agência da região com estrutura própria de gravação para elevar o nível do seu posicionamento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <StudioInfoCard />
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-[28px] bg-[#d4b67b]/10 blur-3xl" />

              <div className="group relative h-80 sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <img
                  src="/images/Estúdio.webp"
                  alt="Estúdio Mercavejo"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3A7D]/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
