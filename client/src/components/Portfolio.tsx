import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from '@/components/effects/TiltCard';
import { SpotlightOverlay, handleSpotlightMove } from '@/components/effects/spotlight';

type PortfolioItem = { title: string; category: 'Social Media' | 'Design'; image: string };
const portfolioItems: PortfolioItem[] = [
  { title: 'Exonline', category: 'Design', image: '/images/exonlinearte.webp' },
  { title: 'Optica Brasil', category: 'Design', image: '/images/opticaarte.webp' },
  { title: 'Sublime', category: 'Design', image: '/images/sublimearte.jpg' },
  { title: 'Mercavejo', category: 'Design', image: '/images/mercavejoarte.png' },
  { title: 'Faveni', category: 'Social Media', image: '/images/faveniarte.webp' },
  { title: 'Netflex', category: 'Social Media', image: '/images/netflexarte.png' },
  { title: 'Rio Fibra', category: 'Social Media', image: '/images/riofibraarte.webp' },
  { title: 'Açougue Scoz', category: 'Social Media', image: '/images/scozarte.png' },
];

export default function Portfolio() {
  const [category, setCategory] = useState<'Todos' | PortfolioItem['category']>('Todos');
  const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);
  const items = useMemo(() => category === 'Todos' ? portfolioItems : portfolioItems.filter((item) => item.category === category), [category]);

  useEffect(() => {
    if (!openItem) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpenItem(null);
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKeyDown); };
  }, [openItem]);

  return (
    <section id="portfolio" className="relative overflow-hidden bg-white py-20 sm:py-32">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <h2 className="mb-3 text-4xl font-bold text-[#0F3A7D] sm:text-5xl">Portfólio de Impacto</h2>
          <p className="mx-auto max-w-2xl text-base text-[#0F3A7D]/70 sm:text-lg">Transformando marcas através de design estratégico e gestão de alta performance.</p>
        </motion.div>

        <div className="mb-10 flex justify-center gap-2">
          {(['Todos', 'Design', 'Social Media'] as const).map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${category === item ? 'bg-[#0F3A7D] text-white' : 'border border-slate-200 text-[#0F3A7D] hover:bg-[#0F3A7D]/5'}`}>
              {item}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
          {items.map((item, index) => (
            <TiltCard key={item.title} className="min-w-0" max={5}>
              <motion.button
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                type="button"
                onClick={() => setOpenItem(item)}
                onMouseMove={handleSpotlightMove}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black text-left shadow-lg"
                aria-label={`Abrir ${item.title}`}
              >
                <SpotlightOverlay />
                <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute inset-x-3 bottom-3 z-10">
                  <span className="block truncate text-sm font-semibold text-white sm:text-base">{item.title}</span>
                  <span className="text-xs text-white/70">{item.category}</span>
                </div>
              </motion.button>
            </TiltCard>
          ))}
        </motion.div>

        <AnimatePresence>
          {openItem && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true" onClick={() => setOpenItem(null)}>
              <motion.div initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} className="relative" onClick={(event) => event.stopPropagation()}>
                <button type="button" onClick={() => setOpenItem(null)} aria-label="Fechar" className="absolute -right-3 -top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-xl"><X className="h-5 w-5" /></button>
                <img src={openItem.image} alt={openItem.title} className="block max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-2xl" />
                <div className="absolute bottom-5 left-5 text-white"><h3 className="text-2xl font-bold drop-shadow-lg">{openItem.title}</h3><p className="text-white/80">{openItem.category}</p></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
