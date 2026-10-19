import { ACCENT } from '@/lib/config';
import SectionIndicator from '@/components/SectionIndicator';
import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import Estudio from '@/components/Estudio';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Method from '@/components/Method';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div
      className="root"
      style={{
        '--acc': ACCENT,
        background: '#0B0B0B',
        color: '#F2F1EC',
        fontFamily: "'Schibsted Grotesk', sans-serif",
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'clip',
      }}
    >
      <SectionIndicator />
      <SiteHeader />
      <Hero />
      <Estudio />
      <Marquee />
      <Services />
      <Projects />
      <Method />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}
