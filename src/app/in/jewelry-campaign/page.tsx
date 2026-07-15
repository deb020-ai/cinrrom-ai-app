import JewelryHero from "@/components/sections/jewelry/JewelryHero";
import JewelryTrust from "@/components/sections/jewelry/JewelryTrust";
import JewelryPortfolio from "@/components/sections/jewelry/JewelryPortfolio";
import JewelryDeliverables from "@/components/sections/jewelry/JewelryDeliverables";
import JewelryWhyUs from "@/components/sections/jewelry/JewelryWhyUs";
import JewelryPsychology from "@/components/sections/jewelry/JewelryPsychology";
import JewelryFounder from "@/components/sections/jewelry/JewelryFounder";
import JewelryPricing from "@/components/sections/jewelry/JewelryPricing";
import JewelryFaq from "@/components/sections/jewelry/JewelryFaq";
import JewelryCta from "@/components/sections/jewelry/JewelryCta";

export const metadata = {
  title: "Premium Jewelry Campaign Films | CINROOM",
  description: "AI-powered campaign films for modern jewelry brands. Starting at ₹15,000.",
};

export default function JewelryCampaignPage() {
  return (
    <div className="bg-[#02050a] min-h-screen text-white selection:bg-white/20 selection:text-white">
      <JewelryHero />
      <JewelryTrust />
      <JewelryPortfolio />
      <JewelryDeliverables />
      <JewelryWhyUs />
      <JewelryPsychology />
      <JewelryFounder />
      <JewelryPricing />
      <JewelryFaq />
      <JewelryCta />
    </div>
  );
}
