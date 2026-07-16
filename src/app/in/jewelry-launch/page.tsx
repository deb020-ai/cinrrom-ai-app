import JewelryLaunchHero from "@/components/sections/jewelry/JewelryLaunchHero";
import JewelryLaunchDeliverables from "@/components/sections/jewelry/JewelryLaunchDeliverables";
import JewelryLaunchPricing from "@/components/sections/jewelry/JewelryLaunchPricing";
import JewelryFaq from "@/components/sections/jewelry/JewelryFaq";
import JewelryCta from "@/components/sections/jewelry/JewelryCta";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "₹15,000 Jewelry Launch Kit | CINROOM",
  description: "Hollywood VFX Artist creating premium campaign films for modern jewelry brands.",
};

export default function JewelryLaunchPage() {
  return (
    <div className="bg-[#02050a] min-h-screen text-white selection:bg-white/20 selection:text-white pb-20 md:pb-0">
      <JewelryLaunchHero />
      <JewelryLaunchDeliverables />
      <JewelryLaunchPricing />
      <JewelryFaq />
      <JewelryCta />

      {/* Sticky Mobile CTA Footer */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-[#02050a]/80 backdrop-blur-xl border-t border-white/10 p-3 flex gap-3 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <a
          href="https://wa.me/917003071256?text=Hi,%20I%20am%20interested%20in%20the%2015k%20jewelry%20launch%20kit."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl text-[10px] sm:text-xs font-sans tracking-[0.1em] uppercase font-bold hover:bg-[#20b858] transition-colors"
        >
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width={16} height={16} className="brightness-0 invert" unoptimized />
          WhatsApp
        </a>
        <a
          href="https://cal.com/omnivinci/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.5] flex items-center justify-center gap-2 bg-white text-black py-3.5 rounded-xl text-[10px] sm:text-xs font-sans tracking-[0.1em] uppercase font-bold hover:bg-gray-200 transition-colors"
        >
          Book Strategy Call <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}
