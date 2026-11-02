import { useRef, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Video, Scissors, Star, CheckCircle2, Instagram, ExternalLink, ClipboardList, Sparkles, Share2 } from "lucide-react";
import { SpotlightOverlay, handleSpotlightMove } from '@/components/effects/spotlight';
import { motion } from "framer-motion";

const podcastPackages = [
  {
    name: "Locação de Estúdio",
    price: "R$ 400",
    unit: "/hora",
    description: "Ideal para quem já tem sua equipe de edição e busca um espaço profissional.",
    features: [
      "Cenário e iluminação profissional",
      "Até 4 microfones Shure/Rode",
      "Técnico de áudio acompanhando",
      "Gravação de vídeo em 4K",
      "Entrega dos arquivos brutos"
    ]
  },
  {
    name: "Produção Completa",
    price: "Sob Consulta",
    unit: "",
    featured: true,
    description: "Nós cuidamos de tudo, do roteiro à publicação final.",
    features: [
      "Tudo do pacote de locação",
      "Edição completa do episódio",
      "Tratamento de áudio e cor",
      "Criação de capas (thumbnails)",
      "Publicação em todas as plataformas",
      "Suporte estratégico de pauta"
    ]
  }
];

const podcastDirectory = [
  { name: 'Treina que Sara', image: '/images/podcasts/treina-que-sara.png', href: 'https://www.instagram.com/treinaquesara/' },
  { name: 'Antes da Consulta', image: '/images/podcasts/antes-da-consulta.png', href: 'https://www.instagram.com/podcastantesdaconsulta/' },
  { name: 'Café com Zakia', image: '/images/podcasts/cafe-com-zakia.jpg', href: 'https://www.instagram.com/cafecomzakia/' },
  { name: 'Sai do Raso', image: '/images/podcasts/sai-do-raso.png', href: 'https://www.instagram.com/lamanna_psicologa/' },
  { name: 'Gente Amiga', image: '/images/podcasts/kung-fu-cast.jpg', href: 'https://www.instagram.com/podcastgenteamiga/' },
  { name: 'Entre Mães no Espectro', image: '/images/podcasts/entre-maes-no-espectro.jpg', href: 'https://www.instagram.com/entremaesnoespectro/' },
  { name: 'Consert Cast', image: '/images/podcasts/consert-cast.png', href: 'https://www.instagram.com/consertcast/' },
  { name: 'SeAmar Podcast', image: '/images/podcasts/seamar.png', href: 'https://www.instagram.com/seamarpodcast/' },
  { name: 'Kung-Fu Cast', image: '/images/podcasts/gente-amiga.png', href: 'https://www.instagram.com/tigresdeshaolin/' },
  { name: 'CeC Vida e Negócios', image: '/images/podcasts/cec-vida-e-negocio.png', href: 'https://www.instagram.com/cecvidaenegociopodcast/' },
];


const cutExamples = [
  { title: 'Corte 01', type: 'Reels / TikTok', video: '/images/corte1.mp4', poster: '/images/corte1-poster.jpg' },
  { title: 'Corte 02', type: 'YouTube Shorts', video: '/images/corte2.mp4', poster: '/images/corte2-poster.jpg' },
];

export default function Podcast() {
  const whatsappPhone = '5517996240418';
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingCut, setPlayingCut] = useState<number | null>(null);

  const handleCutPlay = (index: number) => {
    videoRefs.current.forEach((video, videoIndex) => {
      if (video && videoIndex !== index) video.pause();
    });
    setPlayingCut(index);
  };

  const getPodcastBudgetHref = (packageName: string) => {
    const message = encodeURIComponent(`Olá! Vim pela página de podcast da Mercavejo e gostaria de solicitar um orçamento para o pacote ${packageName}.`);
    return `https://wa.me/${whatsappPhone}?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-[#0F3A7D] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2000')] bg-cover bg-center" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-[#d4b67b] text-[#0F3A7D] text-sm font-bold mb-6">
                  EXCLUSIVIDADE EM CATANDUVA
                </span>
                <h1 className="text-4xl md:text-6xl font-display mb-6 leading-tight">
                  O Único Estúdio de Podcast Profissional em uma Agência de Marketing
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Não somos apenas um espaço para gravar. Somos a única agência em Catanduva com estúdio próprio focado em transformar conversas em autoridade e vendas.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-[#d4b67b] hover:bg-[#bfa46e] text-[#0F3A7D] font-bold" onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}>
                    Reservar meu Horário
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => document.getElementById('podcast-directory')?.scrollIntoView({ behavior: 'smooth' })}>
                    Ver Portfólio
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Podcasts produzidos no estúdio */}
        <section id="podcast-directory" className="bg-slate-50 py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="mb-4 inline-flex rounded-full border border-[#d4b67b]/30 bg-[#d4b67b]/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0F3A7D]">Conteúdo produzido pela Mercavejo</span>
              <h2 className="text-3xl font-display text-[#0F3A7D] sm:text-4xl">Podcasts que ganham voz no nosso estúdio</h2>
              <p className="mt-4 text-gray-600">Marcas, especialistas e histórias transformadas em conteúdo para continuar trabalhando depois da gravação.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {podcastDirectory.map((podcast, index) => (
                <motion.a
                  key={podcast.name}
                  href={podcast.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: index * 0.035 }}
                  onMouseMove={handleSpotlightMove}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-4"
                >
                  <SpotlightOverlay />
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-3 sm:p-5">
                    <img src={podcast.image} alt={`Logo do ${podcast.name}`} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="relative mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold text-[#0F3A7D]">
                    {podcast.name}
                    <Instagram className="h-3.5 w-3.5 shrink-0 text-[#d4b67b]" />
                  </div>
                  <span className="relative mt-1 inline-flex items-center gap-1 text-xs text-slate-400">Ver no Instagram <ExternalLink className="h-3 w-3" /></span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Por que nós? */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display text-[#0F3A7D] mb-4">Por que gravar no Estúdio Mercavejo?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Tecnologia de ponta e visão estratégica de marketing unidas em um só lugar.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Mic className="w-8 h-8" />, title: "Áudio Cristalino", desc: "Microfones de padrão internacional para uma experiência auditiva impecável." },
                { icon: <Video className="w-8 h-8" />, title: "Vídeo em 4K", desc: "Múltiplas câmeras capturando cada ângulo com qualidade de cinema." },
                { icon: <Scissors className="w-8 h-8" />, title: "Foco em Cortes", desc: "Gravamos pensando nos Reels e TikToks que vão viralizar seu conteúdo." }
              ].map((item, i) => (
                <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0F3A7D]/10 text-[#0F3A7D] mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#0F3A7D] mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Cortes */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-display text-[#0F3A7D] mb-6">O Poder dos Cortes</h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Um episódio de 1 hora pode gerar até 10 vídeos curtos de alto impacto. Nós extraímos os melhores momentos para alimentar suas redes sociais durante toda a semana.
                </p>
                <ul className="space-y-4">
                  {[
                    "Aumento de alcance orgânico",
                    "Autoridade instantânea no nicho",
                    "Conteúdo infinito para Instagram e TikTok",
                    "Engajamento multicanal"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="text-[#d4b67b] w-5 h-5" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid w-full grid-cols-2 gap-4 md:w-1/2">
                {cutExamples.map((cut, index) => (
                  <article key={cut.video} className={`group relative overflow-hidden rounded-2xl bg-gray-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl ${index === 1 ? 'mt-8' : ''}`}>
                    <video
                      ref={(element) => { videoRefs.current[index] = element; }}
                      src={cut.video}
                      poster={cut.poster}
                      className="aspect-[9/16] h-full w-full object-cover"
                      controls
                      playsInline
                      preload="none"
                      onPlay={() => handleCutPlay(index)}
                      onPause={() => playingCut === index && setPlayingCut(null)}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-white">
                      <p className="text-sm font-bold">{cut.title}</p>
                      <p className="text-xs text-white/70">{cut.type}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Processo de produção */}
        <section className="bg-slate-50 py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="mb-4 inline-flex rounded-full border border-[#d4b67b]/30 bg-[#d4b67b]/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0F3A7D]">Da agenda à publicação</span>
              <h2 className="text-3xl font-display text-[#0F3A7D] sm:text-4xl">Um processo pensado para gerar conteúdo</h2>
              <p className="mt-4 text-gray-600">Cada etapa é planejada para transformar uma conversa em um ativo de comunicação para sua marca.</p>
            </div>

            <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-5 md:gap-4">
              <div aria-hidden="true" className="absolute left-7 top-8 h-[calc(100%-64px)] w-px bg-[#d4b67b]/50 md:left-0 md:right-0 md:top-8 md:h-px md:w-auto" />
              {[
                { number: '01', title: 'Agenda', text: 'Agendamos o dia e preparamos o estúdio para receber você.', icon: ClipboardList },
                { number: '02', title: 'Gravação', text: 'Captação de áudio e vídeo no estúdio.', icon: Mic },
                { number: '03', title: 'Edição personalizada', text: 'Editamos áudio, vídeo e ritmo de acordo com o que você quiser.', icon: Sparkles },
                { number: '04', title: 'Cortes escolhidos por você', text: 'Você seleciona os melhores momentos que serão transformados em cortes.', icon: Scissors },
                { number: '05', title: 'Publicação', text: 'Conteúdo pronto para circular e gerar alcance.', icon: Share2 },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.4, delay: index * 0.07 }} className="relative z-10 flex gap-4 md:block md:text-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-4 border-slate-50 bg-[#0F3A7D] text-[#d4b67b] shadow-lg md:mx-auto">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="pt-1 md:pt-5">
                      <span className="text-xs font-bold tracking-[0.2em] text-[#d4b67b]">{step.number}</span>
                      <h3 className="mt-1 text-xl font-bold text-[#0F3A7D]">{step.title}</h3>
                      <p className="mt-2 max-w-[190px] text-sm leading-relaxed text-gray-600 md:mx-auto">{step.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pacotes */}
        <section id="packages" className="py-20 bg-[#0F3A7D] text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display mb-4">Planos para seu Podcast</h2>
              <p className="text-white/70">Escolha a melhor forma de começar sua jornada no áudio e vídeo.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {podcastPackages.map((pkg, i) => (
                <div key={i} className={`relative p-8 rounded-3xl border ${pkg.featured ? 'border-[#d4b67b] bg-white/5' : 'border-white/10 bg-white/5'}`}>
                  {pkg.featured && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4b67b] text-[#0F3A7D] px-4 py-1 rounded-full text-sm font-bold">
                      MAIS COMPLETO
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[#d4b67b]">{pkg.price}</span>
                    <span className="text-white/60 ml-1">{pkg.unit}</span>
                  </div>
                  <p className="text-white/70 mb-8">{pkg.description}</p>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <CheckCircle2 className="text-[#d4b67b] w-5 h-5 shrink-0" />
                        <span className="text-white/90">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full py-6 font-bold ${pkg.featured ? 'bg-[#d4b67b] text-[#0F3A7D] hover:bg-[#bfa46e]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    <a href={getPodcastBudgetHref(pkg.name)} target="_blank" rel="noopener noreferrer">
                      Solicitar Orçamento
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
