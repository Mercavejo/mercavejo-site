import { motion } from 'framer-motion';
import { ExternalLink, MessageCircle } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

type WebsitePreview = {
  src: string;
  alt: string;
  href: string;
};

type WebsiteProject = {
  title: string;
  category: string;
  links: string[];
  previews: WebsitePreview[];
};

const websiteProjects: WebsiteProject[] = [
  {
    title: 'Daniel Devitto Zákia',
    category: 'Pessoal',
    links: ['https://danieldevittozakia.com.br'],
    previews: [
      {
        src: '/images/projects/daniel-devitto-zakia.png',
        alt: 'Preview do site Daniel Devitto Zákia',
        href: 'https://danieldevittozakia.com.br',
      },
    ],
  },
  {
    title: 'Café Com Zákia',
    category: 'Podcast',
    links: ['https://www.cafecomzakia.com.br'],
    previews: [
      {
        src: '/images/projects/cafe-com-zakia.png',
        alt: 'Preview do site Café Com Zákia',
        href: 'https://www.cafecomzakia.com.br',
      },
    ],
  },
  {
    title: 'MMRH',
    category: 'SaaS',
    links: ['https://www.mmrh.com.br', 'https://app.mmrh.com.br'],
    previews: [
      {
        src: '/images/projects/mmrh.png',
        alt: 'Preview do site institucional da MMRH',
        href: 'https://www.mmrh.com.br',
      },
      {
        src: '/images/projects/mmrh-app.png',
        alt: 'Preview do app da MMRH',
        href: 'https://app.mmrh.com.br',
      },
    ],
  },
  {
    title: 'Mateus Casarini',
    category: 'Personal Trainer',
    links: ['https://www.mateuscasarini.com.br'],
    previews: [
      {
        src: '/images/projects/mateus-casarini.png',
        alt: 'Preview do site Mateus Casarini',
        href: 'https://www.mateuscasarini.com.br',
      },
    ],
  },
  {
    title: 'C&C Vida e Negócio',
    category: 'Negócios / Consultoria',
    links: ['https://cecvidaenegocio.com.br'],
    previews: [
      {
        src: '/images/projects/cec-vida-e-negocio.png',
        alt: 'Preview do site C&C Vida e Negócio',
        href: 'https://cecvidaenegocio.com.br',
      },
    ],
  },
  {
    title: 'Andre Borghi Advocacia',
    category: 'Advocacia',
    links: ['https://www.andreborghiadvocacia.com.br'],
    previews: [
      {
        src: '/images/projects/andre-borghi-advocacia.png',
        alt: 'Preview do site Andre Borghi Advocacia',
        href: 'https://www.andreborghiadvocacia.com.br',
      },
    ],
  },
];

const whatsappHref = `https://wa.me/5517996240418?text=${encodeURIComponent('Olá! Vim pelo site da Mercavejo e quero falar sobre a criação de um site.')}`;

export default function WebsiteProjects() {
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
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <span className="mb-4 inline-flex rounded-full border border-[#d4b67b]/30 bg-[#d4b67b]/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#0F3A7D]">
            Sites criados pela Mercavejo
          </span>
          <h2 className="text-4xl font-display text-[#0F3A7D] sm:text-5xl">Projetos desenvolvidos</h2>
        </motion.div>

        <Accordion type="single" collapsible className="mx-auto max-w-6xl space-y-4">
          {websiteProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <AccordionItem
                value={project.title}
                className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_60px_-42px_rgba(15,58,125,0.42)] transition-colors duration-300 data-[state=open]:border-[#0F3A7D]/20 data-[state=open]:shadow-[0_28px_80px_-46px_rgba(15,58,125,0.46)]"
              >
                <AccordionTrigger className="px-6 py-6 text-left hover:no-underline sm:px-8 sm:py-7">
                  <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0F3A7D] text-sm font-bold text-white shadow-lg shadow-[#0F3A7D]/15">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="truncate pr-2 text-xl font-heading text-[#0F3A7D] sm:text-2xl">
                          {project.title}
                        </h3>
                        <span className="inline-flex w-fit rounded-full border border-[#d4b67b]/35 bg-[#d4b67b]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F3A7D]">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6 sm:px-8 sm:pb-8">
                  <div className="border-t border-slate-100 pt-6">
                    <div className="mb-5 flex flex-wrap gap-3">
                      {project.links.map((link) => (
                        <a
                          key={link}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-[#0F3A7D] transition-colors duration-300 hover:border-[#0F3A7D]/20 hover:bg-[#0F3A7D]/5"
                        >
                          {link.replace(/^https?:\/\//, '')}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ))}
                    </div>

                    <div className={['grid gap-4', project.previews.length > 1 ? 'lg:grid-cols-2' : 'grid-cols-1'].join(' ')}>
                      {project.previews.map((preview) => (
                        <a
                          key={preview.src}
                          href={preview.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 shadow-[0_24px_60px_-46px_rgba(15,58,125,0.4)]"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                            <img
                              src={preview.src}
                              alt={preview.alt}
                              loading="lazy"
                              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F3A7D]/12 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-10 max-w-4xl rounded-[28px] bg-[#0F3A7D] p-6 text-center shadow-[0_28px_80px_-42px_rgba(15,58,125,0.62)] sm:mt-14 sm:p-8"
        >
          <Button
            asChild
            size="lg"
            className="h-auto rounded-full bg-[#25D366] px-7 py-4 text-base font-bold text-white shadow-xl shadow-[#25D366]/20 transition-all duration-300 hover:bg-[#20bd5a]"
          >
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              Quero um site
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
