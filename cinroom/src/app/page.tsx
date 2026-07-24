import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/features/landing/hero";
import { TemplateShowcase } from "@/components/features/landing/template-showcase";
import { FeatureCards } from "@/components/features/landing/features";
import { Pricing } from "@/components/features/landing/pricing";
import { FaqCta } from "@/components/features/landing/faq-cta";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] selection:bg-amber-900/30 selection:text-amber-200">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TemplateShowcase />
        <FeatureCards />
        <Pricing />
        <FaqCta />
      </main>
      <Footer />
    </div>
  );
}
