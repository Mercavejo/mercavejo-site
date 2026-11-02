import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const defaultPersonImage = '/images/default-person.svg';

const testimonials = [
  {
    id: 1,
    name: 'Dr. Ricardo Almeida',
    role: 'Médico - Clínica Oftalmológica',
    content:
      'A Mercavejo transformou completamente a presença digital da minha clínica. Em 3 meses triplicamos o número de agendamentos online.',
    rating: 5,
    image: defaultPersonImage,
  },
  {
    id: 2,
    name: 'Marina Costa',
    role: 'Proprietária - Sublime Estética',
    content:
      'Profissionais excepcionais! O trabalho de gestão de redes sociais aumentou nosso engajamento em 400%. Recomendo muito!',
    rating: 5,
    image: defaultPersonImage,
  },
  {
    id: 3,
    name: 'Carlos Eduardo',
    role: 'Diretor - Rio Fibra Telecom',
    content:
      'As campanhas de tráfego pago geraram um ROI incrível. A equipe é extremamente competente e atenciosa.',
    rating: 5,
    image: defaultPersonImage,
  },
];

export default function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20 sm:py-28">
      <style>{`
        @keyframes testimonials-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .testimonials-track {
          animation: testimonials-marquee 40s linear infinite;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-[#0F3A7D]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#d4b67b]/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="mb-4 text-4xl font-display text-[#0F3A7D] sm:text-5xl">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Resultados reais de empresas que confiaram na Mercavejo para transformar seu marketing
            digital.
          </p>
        </motion.div>
      </div>

      <div
        className="relative z-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div
            className="testimonials-track flex w-max"
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="mx-3 w-[320px] flex-shrink-0 sm:w-[400px]"
              >
                <div className="relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
                  <div className="absolute -left-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#d4b67b] shadow-lg">
                    <Quote className="h-6 w-6 text-white" />
                  </div>

                  <div className="mb-4 mt-2 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#d4b67b] text-[#d4b67b]" />
                    ))}
                  </div>

                  <p className="mb-6 leading-relaxed text-slate-700">“{testimonial.content}”</p>

                  <div className="mt-auto flex items-center gap-4 border-t border-slate-100 pt-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-[#0F3A7D]/10"
                    />
                    <div>
                      <div className="font-semibold text-[#0F3A7D]">{testimonial.name}</div>
                      <div className="text-sm text-slate-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
