import { useState, useRef, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Video, Scissors, Users, Star, CheckCircle2 } from "lucide-react";
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

const cutsExamples = [
  { title: "Corte Estratégico 1", type: "Reels/TikTok" },
  { title: "Corte Estratégico 2", type: "YouTube Shorts" },
  { title: "Corte Estratégico 3", type: "Instagram" },
];

export default function Podcast() {
  const whatsappPhone = '5517996240418';
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const [isMuted1, setIsMuted1] = useState(true);
  const [isMuted2, setIsMuted2] = useState(true);
  const [video1InView, setVideo1InView] = useState(false);
  const [video2InView, setVideo2InView] = useState(false);
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === containerRef1.current) {
            setVideo1InView(entry.isIntersecting);
          } else if (entry.target === containerRef2.current) {
            setVideo2InView(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (containerRef1.current) observer.observe(containerRef1.current);
    if (containerRef2.current) observer.observe(containerRef2.current);

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (videoRef: React.RefObject<HTMLVideoElement>, setMuted: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setMuted(false);
    }
  };

  const handleMouseLeave = (videoRef: React.RefObject<HTMLVideoElement>, setMuted: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      setMuted(true);
    }
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
                  <Button size="lg" className="bg-[#d4b67b] hover:bg-[#bfa46e] text-[#0F3A7D] font-bold">
                    Reservar meu Horário
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Ver Portfólio
                  </Button>
                </div>
              </motion.div>
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
              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                <div 
                  ref={containerRef1}
                  className="aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden relative group shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(videoRef1, setIsMuted1)}
                  onMouseLeave={() => handleMouseLeave(videoRef1, setIsMuted1)}
                >
                   {video1InView ? (
                     <video 
                       ref={videoRef1}
                       src="/images/corte1.mp4" 
                       className="w-full h-full object-cover" 
                       autoPlay
                       loop
                       muted={isMuted1}
                       playsInline
                     />
                   ) : (
                     <div className="w-full h-full bg-gray-800 animate-pulse" />
                   )}
                </div>
                <div 
                  ref={containerRef2}
                  className="aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden relative mt-8 group shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(videoRef2, setIsMuted2)}
                  onMouseLeave={() => handleMouseLeave(videoRef2, setIsMuted2)}
                >
                   {video2InView ? (
                     <video 
                       ref={videoRef2}
                       src="/images/corte2.mp4" 
                       className="w-full h-full object-cover" 
                       autoPlay
                       loop
                       muted={isMuted2}
                       playsInline
                     />
                   ) : (
                     <div className="w-full h-full bg-gray-800 animate-pulse" />
                   )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pacotes */}
        <section className="py-20 bg-[#0F3A7D] text-white">
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
