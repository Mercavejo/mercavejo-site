import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SpotlightOverlay, handleSpotlightMove } from '@/components/effects/spotlight';

type Category = 'Todos' | 'Institucional' | 'SaaS' | 'Podcast' | 'Pessoal' | 'Advocacia';

type WebsiteProject = {
  title: string;
  category: Exclude<Category, 'Todos'>;
  description: string;
  image: string;
  href: string;
  featured?: boolean;
};

const categories: Category[] = ['Todos', 'Institucional', 'SaaS', 'Podcast', 'Pessoal', 'Advocacia'];

const websiteProjects: WebsiteProject[] = [
  {
    title: 'MMRH',
    category: 'SaaS',
    description: 'Presença institucional e produto digital para uma plataforma de gestão de pessoas.',
    image: '/images/projects/mmrh.png',
    href: 'https://www.mmrh.com.br',
    featured: true,
  },
  {
    title: 'Café Com Zákia',
    category: 'Podcast',
    description: 'Uma experiência editorial para aproximar o público do podcast.',
    image: '/images/projects/cafe-com-zakia.png',
    href: 'https://www.cafecomzakia.com.br',
  },
  {
    title: 'Daniel Devitto Zákia',
    category: 'Pessoal',
    description: 'Site pessoal com posicionamento, autoridade e presença digital.',
    image: '/images/projects/daniel-devitto-zakia.png',
    href: 'https://danieldevittozakia.com.br',
  },
  {
    title: 'Mateus Casarini',
    category: 'Institucional',
    description: 'Página de apresentação para personal trainer e seus serviços.',
    image: '/images/projects/mateus-casarini.png',
    href: 'https://www.mateuscasarini.com.br',
  },
  {
    title: 'C&C Vida e Negócio',
    category: 'Institucional',
    description: 'Comunicação clara para uma marca de negócios e consultoria.',
    image: '/images/projects/cec-vida-e-negocio.png',
    href: 'https://cecvidaenegocio.com.br',
  },
  {
    title: 'Andre Borghi Advocacia',
    category: 'Advocacia',
    description: 'Uma presença digital sóbria, confiável e orientada a conversão.',
    image: '/images/projects/andre-borghi-advocacia.png',
    href: 'https://www.andreborghiadvocacia.com.br',
  },
];

const whatsappHref = `https://wa.me/5517996240418?text=${encodeURIComponent('Olá! Vim pelo site da Mercavejo e quero falar sobre a criação de um site.')}`;

function ProjectImage({ project, featured = false }: { project: WebsiteProject; featured?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-slate-100 ${featured ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
      <img
        src={project.image}
        alt={`Preview do site ${project.title}`}
        loading="lazy"
        className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.035]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F3A7D]/65 via-[#0F3A7D]/0 to-transparent opacity-70" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
        <div>
          <span className="mb-2 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
            {project.category}
          </span>
          <h3 className={`${featured ? 'text-2xl sm:text-3xl' : 'text-xl'} font-heading`}>{project.title}</h3>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4b67b] text-[#0F3A7D] transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

export default function WebsiteProjects() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');

  const filteredProjects = useMemo(
    () => activeCategory === 'Todos' ? websiteProjects : websiteProjects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  const featuredProject = websiteProjects.find((project) => project.featured);
  const gridProjects = activeCategory === 'Todos'
    ? filteredProjects.filter((project) => project.title !== featuredProject?.title)
    : filteredProjects;
  const showFeatured = activeCategory === 'Todos' && featuredProject;

  return (
    <section id="sites" className="relative overflow-hidden bg-white py-20 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-[#0F3A7D]/6 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#d4b67b]/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
        >
          <span className="mb-4 inline-flex rounded-full border border-[#d4b67b]/30 bg-[#d4b67b]/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#0F3A7D]">
            Sites criados pela Mercavejo
          </span>
          <h2 className="text-4xl font-display text-[#0F3A7D] sm:text-5xl">Projetos que colocam marcas em movimento</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Estratégia, design e tecnologia reunidos em experiências digitais feitas para cada negócio.
          </p>
        </motion.div>

        <div className="mb-10 flex justify-center overflow-x-auto pb-2 sm:mb-14">
          <div className="flex min-w-max gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`min-h-10 rounded-full px-4 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#0F3A7D] text-white shadow-md shadow-[#0F3A7D]/15'
                    : 'text-slate-600 hover:bg-[#0F3A7D]/5 hover:text-[#0F3A7D]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {showFeatured && (
          <motion.a
            href={featuredProject.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            onMouseMove={handleSpotlightMove}
            className="group relative mb-6 block overflow-hidden rounded-[30px] border border-[#0F3A7D]/15 bg-[#0F3A7D] shadow-[0_30px_80px_-42px_rgba(15,58,125,0.7)]"
          >
            <SpotlightOverlay />
            <div className="relative grid lg:grid-cols-[1.45fr_0.55fr]">
              <ProjectImage project={featuredProject} featured />
              <div className="flex flex-col justify-between p-6 text-white sm:p-9 lg:p-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#d4b67b]">Projeto em destaque</span>
                  <h3 className="mt-4 text-3xl font-display sm:text-4xl">{featuredProject.title}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">{featuredProject.description}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#d4b67b]">Visitar projeto <ExternalLink className="h-4 w-4" /></span>
              </div>
            </div>
          </motion.a>
        )}

        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {gridProjects.map((project, index) => (
            <motion.a
              layout
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onMouseMove={handleSpotlightMove}
              className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_24px_60px_-46px_rgba(15,58,125,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#0F3A7D]/20 hover:shadow-[0_28px_70px_-42px_rgba(15,58,125,0.55)]"
            >
              <SpotlightOverlay />
              <ProjectImage project={project} />
              <div className="relative p-5">
                <p className="text-sm leading-relaxed text-slate-600">{project.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0F3A7D]">Abrir site <ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {gridProjects.length === 0 && (
          <p className="py-12 text-center text-slate-500">Nenhum projeto encontrado nesta categoria.</p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-5 rounded-[28px] bg-[#0F3A7D] p-6 text-center shadow-[0_28px_80px_-42px_rgba(15,58,125,0.62)] sm:mt-14 sm:flex-row sm:p-8 sm:text-left"
        >
          <div>
            <p className="text-lg font-heading text-white sm:text-xl">Seu próximo projeto pode estar aqui.</p>
            <p className="mt-1 text-sm text-white/65">Vamos transformar sua presença digital em resultado.</p>
          </div>
          <Button asChild size="lg" className="h-auto shrink-0 rounded-full bg-[#25D366] px-7 py-4 text-base font-bold text-white shadow-xl shadow-[#25D366]/20 transition-all duration-300 hover:bg-[#20bd5a]">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-5 w-5" /> Quero um site</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
