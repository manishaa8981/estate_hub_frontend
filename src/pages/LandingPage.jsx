import CTASection from '../components/CTASection'
import FeaturedProperties from '../components/FeaturedProperties'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import HowItWorks from '../components/HowItWorks'
import Navbar from '../components/Navbar'
import StatsSection from '../components/StatsSection'
import Testimonials from '../components/Testimonials'

export default function LandingPage() {
  return (
    <div className="font-sans">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturedProperties />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}
