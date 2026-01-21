import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import OfferShowcase from '@/components/OfferShowcase';
import OfferShowcase2 from '@/components/OfferShowcase2';
import OfferShowcase3 from '@/components/OfferShowcase3';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <OfferShowcase />
      <OfferShowcase2 />
      <OfferShowcase3 />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
