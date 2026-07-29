import { Navbar } from "@/components/Navbar";
import { LandingHero } from "@/components/LandingHero";
import { TrustedTechnologies } from "@/components/TrustedTechnologies";
import { FeaturesSection } from "@/components/FeaturesSection";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { AILaunchKit } from "@/components/AILaunchKit";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LandingHero />
        <TrustedTechnologies />
        <FeaturesSection />
        <InteractiveDemo />
        <HowItWorksSection />
        <AILaunchKit />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
