import { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const handleNavMove = (e: React.MouseEvent) => {
    const el = navRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const navLinks = [
    { label: 'Serviços', href: '/#services' },
    { label: 'Portfólio', href: '/#portfolio' },
    { label: 'Podcast', href: '/podcast' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (location !== '/') {
        setLocation('/');
        // Pequeno delay para garantir que a Home carregou antes de scrollar
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setLocation(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="absolute inset-0 -z-10 bg-[#0F3A7D]" />

      <div className="bg-black/20 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <img
                src="/images/logo.webp"
                alt="Mercavejo"
                className="h-16 w-16 rounded-full object-cover ring-1 ring-white/20"
              />
            </a>

            <nav
              ref={navRef}
              onMouseMove={handleNavMove}
              onMouseLeave={() => setSpot(null)}
              className="relative hidden md:flex items-center gap-8"
            >
              {spot && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(150px circle at ${spot.x}px ${spot.y}px, rgba(212, 182, 123, 0.22), transparent 70%)`,
                  }}
                />
              )}
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-white/85 hover:text-[#d4b67b] font-medium transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <Button
                className="bg-[#0F3A7D] hover:bg-[#0a2555] text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => handleNavClick('/#contact')}
              >
                Fale Conosco
              </Button>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden pb-6 pt-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block text-white/85 hover:text-[#d4b67b] font-medium py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <Button
                className="w-full bg-[#0F3A7D] hover:bg-[#0a2555] text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => handleNavClick('/#contact')}
              >
                Fale Conosco
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
