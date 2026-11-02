const clients = [
  { name: 'EXONLINE', logo: '/images/exonline.webp' },
  { name: 'FIDELIDADE', logo: '/images/fidelidade.webp' },
  { name: 'OPTICA', logo: '/images/optica.webp' },
  { name: 'LUCIANA', logo: '/images/luciana.webp' },
  { name: 'RIOFIBRA', logo: '/images/riofibra.webp' },
  { name: 'NETFLEX', logo: '/images/netflex.webp' },
  { name: 'SCOZ', logo: '/images/scoz.webp' },
  { name: 'VOX', logo: '/images/voxfm.webp' },
];

export default function Clients() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#20447D] py-10 sm:py-14">
      <style>{`
        @keyframes mercavejo-marquee { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-50%, 0, 0); } }
        .marquee-track { animation: mercavejo-marquee 42s linear infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation-play-state: paused; } }
      `}</style>

      <div className="container mx-auto mb-7 px-4 text-center sm:mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4b67b] opacity-80 sm:text-sm sm:tracking-widest">
          Empresas que confiam na Mercavejo
        </p>
      </div>

      <div className="overflow-hidden">
        <div
          className="overflow-hidden sm:[transform:rotateX(10deg)] sm:[transform-style:preserve-3d]"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="marquee-track flex w-max whitespace-nowrap">
            {[...clients, ...clients].map((client, index) => (
              <div key={`${client.name}-${index}`} className="mx-5 flex h-14 w-24 flex-shrink-0 items-center justify-center sm:mx-10 sm:h-20 sm:w-32">
                <img src={client.logo} alt={client.name} loading="lazy" className="max-h-full max-w-full object-contain opacity-65 grayscale brightness-125 transition-opacity duration-300 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
