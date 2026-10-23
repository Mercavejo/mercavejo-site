import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

type ContactReason = 'Orçamento' | 'Suporte' | 'Parceria' | 'Outros';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    reason: 'Orçamento' as ContactReason,
  });

  const canSubmit = useMemo(() => {
    const nameOk = form.name.trim().length >= 2;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const reasonOk = !!form.reason;
    return nameOk && emailOk && reasonOk && !isSubmitting;
  }, [form, isSubmitting]);

  // WhatsApp (número + mensagem pronta)
  const whatsappPhone = '5517996240418';
  const whatsappMessage = encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento.');
  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      toast.error('Preencha nome e email corretamente.');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Contato enviado com sucesso! Em breve retornaremos.');
      setForm({ name: '', email: '', reason: 'Orçamento' });
    } catch (err) {
      toast.error('Erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-32 bg-white overflow-hidden"
    >
      {/* Fundo decorativo sutil para manter o padrão do site */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#0F3A7D]/5 via-blue-500/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-[#d4b67b]/10 via-yellow-400/5 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <Card className="relative overflow-hidden rounded-3xl border border-slate-100 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* LADO ESQUERDO (FORMULÁRIO) */}
                <div className="bg-white p-8 sm:p-10">
                  <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-display text-[#0F3A7D] mb-4">
                      Entre em contato conosco
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      Estamos prontos para ajudar seu negócio a crescer. Descubra como podemos transformar sua estratégia de marketing.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nome */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Nome</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#0F3A7D] focus:ring-2 focus:ring-[#0F3A7D]/10 outline-none transition-all duration-300 bg-gray-50/50"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email</label>
                      <input
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#0F3A7D] focus:ring-2 focus:ring-[#0F3A7D]/10 outline-none transition-all duration-300 bg-gray-50/50"
                        placeholder="seuemail@exemplo.com"
                        inputMode="email"
                      />
                    </div>

                    {/* Motivo */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Motivo</label>
                      <select
                        value={form.reason}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, reason: e.target.value as ContactReason }))
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#0F3A7D] focus:ring-2 focus:ring-[#0F3A7D]/10 outline-none transition-all duration-300 bg-gray-50/50"
                      >
                        <option value="Orçamento">Orçamento</option>
                        <option value="Suporte">Suporte</option>
                        <option value="Parceria">Parceria</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      className="w-full bg-[#0F3A7D] hover:bg-[#0a2555] text-white font-bold rounded-xl shadow-lg py-7 transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          Enviar Mensagem <Send className="w-5 h-5" />
                        </span>
                      )}
                    </Button>

                    <p className="text-xs text-center text-slate-400">
                      Sua solicitação será direcionada para nossa equipe comercial.
                    </p>
                  </form>
                </div>

                {/* LADO DIREITO (painel colorido com infos) */}
                <div className="relative p-8 sm:p-10 text-white bg-[#0F3A7D]">
                  <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(212,182,123,0.4),transparent_70%)]" />

                  <div className="relative h-full flex flex-col">
                    <div className="mb-10">
                      <h3 className="text-2xl sm:text-3xl font-display mb-3">Mercavejo</h3>
                      <p className="text-white/70">
                        Estamos prontos para elevar o nível do seu negócio.
                      </p>
                    </div>

                    <div className="space-y-5 flex-grow">
                      {/* Telefone */}
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#d4b67b] text-[#0F3A7D] shrink-0">
                          <Phone className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#d4b67b] uppercase tracking-widest mb-1">Telefone</div>
                          <a href="tel:+5517996240418" className="text-lg font-medium hover:text-[#d4b67b] transition-colors">
                            (17) 99624-0418
                          </a>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#d4b67b] text-[#0F3A7D] shrink-0">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#d4b67b] uppercase tracking-widest mb-1">Email</div>
                          <a href="mailto:contato@mercavejo.com.br" className="text-lg font-medium hover:text-[#d4b67b] transition-colors truncate block">
                            contato@mercavejo.com.br
                          </a>
                        </div>
                      </div>

                      {/* Localização */}
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#d4b67b] text-[#0F3A7D] shrink-0">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#d4b67b] uppercase tracking-widest mb-1">Localização</div>
                          <div className="text-lg font-medium">Catanduva, SP</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/10">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold transition-all shadow-lg"
                      >
                        <MessageCircle className="w-6 h-6" />
                        Conversar no WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
