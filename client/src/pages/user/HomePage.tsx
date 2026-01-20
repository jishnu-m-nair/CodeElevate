import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import HeroSection from '../../components/user/HeroSection';
import FeatureSection from '../../components/user/FeatureSection';
import StatsSection from '../../components/user/StatsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <main>
        <HeroSection />
        <FeatureSection />
        <StatsSection />
      </main>

      <Footer className="mt-16 text-center" />
    </div>
  );
};
