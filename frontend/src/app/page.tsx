import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import StepsSection from "@/components/landing/StepsSection";
import MissionSection from "@/components/landing/MissionSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhyUsSection />
        <StepsSection />
        <MissionSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
