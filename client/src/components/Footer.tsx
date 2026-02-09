import { Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 pointer-events-auto bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Logo + texto */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.webp"
                alt="Logo"
                className="h-14 w-14 rounded-full object-cover ring-1 ring-slate-200 bg-white"
              />
              <div>
                <div className="text-lg font-semibold text-slate-900">Mercavejo</div>
                <div className="text-sm text-slate-600">Marketing & Estúdio</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-sm">
              Planejamento, criação e execução de estratégias digitais para gerar leads e aumentar sua receita.
            </p>
          </div>

          {/* Links */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Site</h4>
              <ul className="space-y-2 text-sm">
                <li><a className="text-slate-600 hover:text-[#0F3A7D] transition-colors" href="/#services">Serviços</a></li>
                <li><a className="text-slate-600 hover:text-[#0F3A7D] transition-colors" href="/#portfolio">Portfólio</a></li>
                <li><a className="text-slate-600 hover:text-[#0F3A7D] transition-colors" href="/#packages">Pacotes</a></li>
                <li><a className="text-slate-600 hover:text-[#0F3A7D] transition-colors" href="/#contact">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Contato</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Catanduva - SP</li>
                <li><a className="hover:text-[#0F3A7D] transition-colors" href="tel:+5517996240418">(17) 99624-0418</a></li>
                <li><a className="hover:text-[#0F3A7D] transition-colors" href="mailto:clubemercavejo@gmail.com">clubemercavejo@gmail.com</a></li>
              </ul>
            </div>
          </div>

          {/* Ícones sociais */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Redes Sociais</h4>

            <div className="flex items-center gap-4 pointer-events-auto relative z-10">
              <a
                href="https://www.instagram.com/mercavejo_consultoria/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-[#0F3A7D] hover:bg-slate-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>

              <a
                href="https://www.facebook.com/mercavejobrasilmarketing/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-[#0F3A7D] hover:bg-slate-100 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>

              <a
                href="https://wa.me/5517996240418"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-[#0F3A7D] hover:bg-slate-100 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 text-sm text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mercavejo. Todos os direitos reservados.</span>
          <span className="text-slate-500">Feito com estratégia.</span>
        </div>
      </div>
    </footer>
  );
}
