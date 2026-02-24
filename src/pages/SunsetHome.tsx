import Navbar from '@/components/sunset/Navbar';
import HeroSection from '@/components/sunset/HeroSection';
import StorySection from '@/components/sunset/StorySection';
import MenuPreview from '@/components/sunset/MenuPreview';
import EventsSection from '@/components/sunset/EventsSection';
import BarSection from '@/components/sunset/BarSection';
import TestimonialsSection from '@/components/sunset/TestimonialsSection';
import Footer from '@/components/sunset/Footer';

const SunsetHome = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <StorySection />
        <MenuPreview />
        <EventsSection />
        <BarSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default SunsetHome;
