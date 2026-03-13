import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const defaultPersonImage = '/images/default-person.svg';

const testimonials = [
    {
        id: 1,
        name: 'Dr. Ricardo Almeida',
        role: 'Médico - Clínica Oftalmológica',
        content: 'A Mercavejo transformou completamente a presença digital da minha clínica. Em 3 meses triplicamos o número de agendamentos online.',
        rating: 5,
        image: defaultPersonImage,
    },
    {
        id: 2,
        name: 'Marina Costa',
        role: 'Proprietária - Sublime Estética',
        content: 'Profissionais excepcionais! O trabalho de gestão de redes sociais aumentou nosso engajamento em 400%. Recomendo muito!',
        rating: 5,
        image: defaultPersonImage,
    },
    {
        id: 3,
        name: 'Carlos Eduardo',
        role: 'Diretor - Rio Fibra Telecom',
        content: 'As campanhas de tráfego pago geraram um ROI incrível. A equipe é extremamente competente e atenciosa.',
        rating: 5,
        image: defaultPersonImage,
    },
];

export default function Testimonials() {
    return (
        <section className="relative py-20 sm:py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0F3A7D]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4b67b]/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-display text-[#0F3A7D] mb-4">
                        O Que Nossos Clientes Dizem
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Resultados reais de empresas que confiaram na Mercavejo para transformar seu marketing digital.
                    </p>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
                >
                    {[
                        { value: '+200', label: 'Clientes Atendidos' },
                        { value: '15+', label: 'Anos de Experiência' },
                        { value: '98%', label: 'Satisfação' },
                        { value: '+500%', label: 'ROI Médio' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center p-6 rounded-2xl bg-white shadow-lg border border-slate-100">
                            <div className="text-3xl sm:text-4xl font-display text-[#0F3A7D] mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-600">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative p-8 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Quote Icon */}
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#d4b67b] rounded-full flex items-center justify-center shadow-lg">
                                <Quote className="w-6 h-6 text-white" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4 mt-2">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-[#d4b67b] text-[#d4b67b]" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-slate-700 leading-relaxed mb-6">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#0F3A7D]/10"
                                />
                                <div>
                                    <div className="font-semibold text-[#0F3A7D]">{testimonial.name}</div>
                                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
