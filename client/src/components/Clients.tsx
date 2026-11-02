import { useState } from 'react';

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
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#20447D] py-14">
      <style>{`
        @keyframes mercavejo-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: mercavejo-marquee 32s linear infinite;
        }
      `}</style>

      <div className="container mx-auto mb-10 px-4 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#d4b67b] opacity-80">
          Empresas que confiam na Mercavejo
        </p>
      </div>

      <div
        className="[perspective:1000px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="overflow-hidden [transform:rotateX(14deg)] [transform-style:preserve-3d]"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <div
            className="marquee-track flex w-max whitespace-nowrap"
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
          >
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="mx-10 flex h-20 w-32 flex-shrink-0 items-center justify-center"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain opacity-70 grayscale brightness-125 transition-all duration-500 hover:scale-110 hover:opacity-100 hover:grayscale-0 hover:brightness-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
