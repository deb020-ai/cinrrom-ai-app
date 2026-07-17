import JewelryLaunchHero from "@/components/sections/jewelry/JewelryLaunchHero";
import JewelryLaunchDeliverables from "@/components/sections/jewelry/JewelryLaunchDeliverables";
import JewelryLaunchPricing from "@/components/sections/jewelry/JewelryLaunchPricing";
import JewelryFaq from "@/components/sections/jewelry/JewelryFaq";
import JewelryCta from "@/components/sections/jewelry/JewelryCta";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "$399 Jewelry Launch Kit | CINROOM",
  description: "Hollywood VFX Artist creating premium campaign films for modern jewelry brands.",
};

export default function JewelryLaunchPageUs() {
  return (
    <div className="bg-[#02050a] min-h-screen text-white selection:bg-white/20 selection:text-white pb-20 md:pb-0">
      <JewelryLaunchHero country="us" />
      <JewelryLaunchDeliverables />
      <JewelryLaunchPricing country="us" />
      <JewelryFaq country="us" />
      <JewelryCta country="us" />
    </div>
  );
}
