import { useEffect, useRef, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Video, Scissors, Star, CheckCircle2, Instagram, ExternalLink, ClipboardList, Sparkles, Share2, ArrowRight } from "lucide-react";
import { SpotlightOverlay, handleSpotlightMove } from '@/components/effects/spotlight';
import { motion } from "framer-motion";

const podcastPackages = [
  {
    name: "Locação de Estúdio",
    price: "R$ 500",
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
  { name: 'Sai do Raso', image: '/images/podcasts/sai-do-raso.png', href: 'https://www.instagram.com/lamanna_psicologa/', platforms: [{ label: 'YouTube', href: 'https://www.youtube.com/@Sa%C3%ADdoRaso' }] },
  { name: 'Gente Amiga', image: '/images/podcasts/kung-fu-cast.jpg', href: 'https://www.instagram.com/podcastgenteamiga/' },
  { name: 'Entre Mães no Espectro', image: '/images/podcasts/entre-maes-no-espectro.jpg', href: 'https://www.instagram.com/entremaesnoespectro/', platforms: [{ label: 'YouTube', href: 'https://www.youtube.com/@EntreM%C3%A3esnoEspectro' }, { label: 'Spotify', href: 'https://open.spotify.com/show/2smJswLjejkmSHDgYyrcNN' }, { label: 'TikTok', href: 'https://www.tiktok.com/@entremaesnoespectro' }] },
  { name: 'Consert Cast', image: '/images/podcasts/consert-cast.png', href: 'https://www.instagram.com/consertcast/', platforms: [{ label: 'YouTube', href: 'https://www.youtube.com/@ConsertCast' }, { label: 'Spotify', href: 'https://open.spotify.com/show/5dz3gLiANnDZCBLJndiCvt' }, { label: 'TikTok', href: 'https://www.tiktok.com/@consertcast' }] },
  { name: 'SeAmar Podcast', image: '/images/podcasts/seamar.png', href: 'https://www.instagram.com/seamarpodcast/' },
  { name: 'Kung-Fu Cast', image: '/images/podcasts/gente-amiga.png', href: 'https://www.instagram.com/tigresdeshaolin/' },
  { name: 'CeC Vida e Negócios', image: '/images/podcasts/cec-vida-e-negocio.png', href: 'https://www.instagram.com/cecvidaenegociopodcast/', platforms: [{ label: 'YouTube', href: 'https://www.youtube.com/@cecvidaenegociopodcast/' }] },
];


const cutExamples = [
  { title: 'Corte 01', type: 'Reels / TikTok', podcast: 'Outros', video: '/images/corte1.mp4', poster: '/images/corte1-poster.jpg' },
  { title: 'Corte 02', type: 'YouTube Shorts', podcast: 'Outros', video: '/images/corte2.mp4', poster: '/images/corte2-poster.jpg' },
  { title: 'SeAmar Podcast', type: 'Corte vertical', podcast: 'Outros', video: '/images/seamar.mp4', poster: '/images/seamar-poster.jpg' },
  { title: 'Treina que Sara', type: 'Corte vertical', podcast: 'Outros', video: '/images/treina-que-sara.mp4', poster: '/images/treina-que-sara-poster.jpg' },
  { title: 'Antes da Consulta', type: 'Corte vertical', podcast: 'Outros', video: '/images/antes-da-consulta.mp4', poster: '/images/antes-da-consulta-poster.jpg' },
  { title: 'Café com Zakia', type: 'Corte vertical', podcast: 'Outros', video: '/images/cafe-com-zakia.mp4', poster: '/images/cafe-com-zakia-poster.jpg' },
  { title: 'Consert Cast — Corte 01', type: 'Corte vertical', podcast: 'Consert Cast', video: '/images/consert-cast-corte.mp4', poster: '/images/consert-cast-corte-poster.jpg' },
  { title: 'Entre Mães no Espectro — Corte 03', type: 'Corte vertical', podcast: 'Entre Mães', video: '/images/entre-maes-corte.mp4', poster: '/images/entre-maes-corte-poster.jpg' },
  { title: 'Sai do Raso — Corte 01', type: 'Corte vertical', podcast: 'Sai do Raso', video: '/images/sai-do-raso-corte.mp4', poster: '/images/sai-do-raso-corte-poster.jpg' },
  { title: 'CeC Vida e Negócios — Corte 01', type: 'Corte vertical', podcast: 'CeC', video: '/images/cec-vida-e-negocios-corte.mp4', poster: '/images/cec-vida-e-negocios-corte-poster.jpg' },
];

const faqItems = [
  { question: 'Quanto custa a locação do estúdio?', answer: 'A locação do estúdio custa R$ 500 por hora e inclui cenário, iluminação profissional, até quatro microfones, acompanhamento técnico de áudio, gravação em 4K e entrega dos arquivos brutos.' },
  { question: 'Quantas pessoas podem participar da gravação?', answer: 'O estúdio comporta até quatro participantes com microfones individuais, mantendo uma estrutura confortável para conversas, entrevistas e mesas de podcast.' },
  { question: 'Vocês fazem a edição e os cortes?', answer: 'Sim. Na Produção Completa, cuidamos da edição do episódio, tratamento de áudio e cor, criação de capas e cortes para redes sociais.' },
  { question: 'Quem escolhe os melhores momentos para os cortes?', answer: 'A seleção dos momentos é feita por você. Depois, nossa equipe transforma os trechos escolhidos em cortes verticais prontos para publicar.' },
  { question: 'Como faço para agendar?', answer: 'Clique em Solicitar Orçamento, informe o formato desejado e nossa equipe retorna pelo WhatsApp para confirmar disponibilidade e próximos passos.' },
];

const cutFilters = ['Todos', 'Consert Cast', 'Entre Mães', 'Sai do Raso', 'CeC', 'Outros'];

export default function Podcast() {
  const whatsappPhone = '5517996240418';
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingCut, setPlayingCut] = useState<number | null>(null);
  const [selectedCutFilter, setSelectedCutFilter] = useState('Todos');

  useEffect(() => {
    document.title = 'Estúdio de Podcast em Catanduva | Mercavejo';
    const description = 'Grave seu podcast em um estúdio profissional em Catanduva, com áudio, vídeo 4K, edição, cortes para redes sociais e publicação completa.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    const canonicalUrl = 'https://www.mercavejo.com.br/podcast';
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    const structuredData = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) };
    let schema = document.getElementById('podcast-faq-schema') as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'podcast-faq-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(structuredData);
  }, []);

  const filteredCuts = selectedCutFilter === 'Todos'
    ? cutExamples
    : cutExamples.filter((cut) => cut.podcast === selectedCutFilter);

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,182,123,0.28),transparent_32%),radial-gradient(circle_at_80%_65%,rgba(64,125,190,0.35),transparent_38%),linear-gradient(135deg,#0F3A7D_0%,#20447D_55%,#0b2b5c_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
          
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
                <motion.div
                  key={podcast.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: index * 0.035 }}
                  onMouseMove={handleSpotlightMove}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-4"
                >
                  <SpotlightOverlay />
                  <a href={podcast.href} target="_blank" rel="noopener noreferrer" className="relative block">
                    <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-3 sm:p-5">
                      <img src={podcast.image} alt={`Logo do ${podcast.name}`} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="relative mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold text-[#0F3A7D]">
                      {podcast.name}
                      <Instagram className="h-3.5 w-3.5 shrink-0 text-[#d4b67b]" />
                    </div>
                    <span className="relative mt-1 inline-flex items-center gap-1 text-xs text-slate-400">Ver no Instagram <ExternalLink className="h-3 w-3" /></span>
                  </a>
                  {podcast.platforms && (
                    <div className="relative mt-3 flex flex-wrap justify-center gap-1.5 border-t border-slate-100 pt-3">
                      {podcast.platforms.map((platform) => (
                        <a key={platform.label} href={platform.href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0F3A7D]/5 px-2 py-1 text-[10px] font-semibold text-[#0F3A7D] transition-colors hover:bg-[#d4b67b]/25" aria-label={`${platform.label} do ${podcast.name}`}>
                          {platform.label}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
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
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <span className="mb-3 inline-flex rounded-full border border-[#d4b67b]/30 bg-[#d4b67b]/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0F3A7D]">Portfólio em vídeo</span>
                <h2 className="text-3xl md:text-4xl font-display text-[#0F3A7D] mb-4">O Poder dos Cortes</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Um episódio de 1 hora pode gerar até 10 vídeos curtos de alto impacto. Nós extraímos os melhores momentos para alimentar suas redes sociais durante toda a semana.
                </p>
              </div>

              <div className="mb-8 flex flex-col items-center gap-5">
                <div className="flex flex-wrap justify-center gap-2" aria-label="Filtrar cortes por podcast">
                  {cutFilters.map((filter) => {
                    const isActive = selectedCutFilter === filter;
                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => {
                          videoRefs.current.forEach((video) => video?.pause());
                          setPlayingCut(null);
                          setSelectedCutFilter(filter);
                        }}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${isActive ? 'border-[#0F3A7D] bg-[#0F3A7D] text-white' : 'border-[#0F3A7D]/15 bg-white text-[#0F3A7D] hover:border-[#d4b67b] hover:bg-[#d4b67b]/10'}`}
                        aria-pressed={isActive}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
                <div className="grid w-full max-w-3xl gap-3 text-sm text-gray-600 sm:grid-cols-2">
                  {[
                    "Aumento de alcance orgânico",
                    "Autoridade instantânea no nicho",
                    "Conteúdo infinito para Instagram e TikTok",
                    "Engajamento multicanal"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center justify-center gap-2 sm:justify-start">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d4b67b]" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {filteredCuts.map((cut, index) => (
                  <article key={cut.video} className="group relative overflow-hidden rounded-2xl bg-gray-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
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

        {/* FAQ */}
        <section id="faq" className="bg-white py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="mb-4 inline-flex rounded-full border border-[#d4b67b]/30 bg-[#d4b67b]/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#0F3A7D]">Dúvidas frequentes</span>
              <h2 className="text-3xl font-display text-[#0F3A7D] sm:text-4xl">Tudo para você gravar com segurança</h2>
              <p className="mt-4 text-gray-600">Veja como funciona a locação e a produção do seu podcast antes de agendar.</p>
            </div>
            <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-slate-50 px-6 shadow-sm sm:px-8">
              {faqItems.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-semibold text-[#0F3A7D] [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span className="text-2xl font-light text-[#d4b67b] transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl pr-8 text-sm leading-relaxed text-gray-600">{item.answer}</p>
                </details>
              ))}
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
                <div key={i} onMouseMove={handleSpotlightMove} className={`group relative overflow-hidden p-8 rounded-3xl border transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${pkg.featured ? 'border-[#d4b67b] bg-white/10 shadow-[0_24px_70px_-35px_rgba(212,182,123,0.7)]' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                  <SpotlightOverlay />                  {pkg.featured && (
                    <span className="absolute right-6 top-5 rounded-full bg-[#d4b67b] px-4 py-1 text-xs font-bold text-[#0F3A7D] shadow-lg">
                      MAIS COMPLETO
                    </span>
                  )}
                  <h3 className="relative text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="relative mb-5 text-sm uppercase tracking-[0.18em] text-[#d4b67b]/80">{pkg.featured ? 'Para transformar conhecimento em presença digital' : 'Para gravar com estrutura profissional'}</p>
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
                      Solicitar Orçamento <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
