import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Clients from '@/components/Clients';
import Portfolio from '@/components/Portfolio';
import Studio from '@/components/Studio';

import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main>
        {/* 1 - branco */}
        <div className="bg-white">
          <Hero />
        </div>

        <Clients />

        {/* 2 - azul (novo azul #20447D) */}
        <div className="bg-[#20447D] text-white">
          <Services />
        </div>

        {/* 3 - Portfolio */}
        <Portfolio />

        {/* 4 - Depoimentos oculto temporariamente */}

        {/* 5 - azul (novo azul #20447D) */}
        <div className="bg-[#20447D] text-white">
          <Studio />
        </div>



        {/* 6 - FAQ */}
        <FAQ />

        {/* 7 - Contato (Fundo Branco) */}
        <div className="bg-white">
          <Contact />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
