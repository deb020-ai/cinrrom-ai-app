import Benefits from "@/components/sections/Benefits";
import Archive from "@/components/sections/Archive";
import WhatCinroomDoes from "@/components/sections/landing/WhatCinroomDoes";
import WhyWorkWithUs from "@/components/sections/landing/WhyWorkWithUs";
import PostBookingProcess from "@/components/sections/landing/PostBookingProcess";
import PrivatePricing from "@/components/sections/landing/PrivatePricing";
import IsThisForYou from "@/components/sections/landing/IsThisForYou";
import HollywoodTrust from "@/components/sections/landing/HollywoodTrust";
import PrivateCta from "@/components/sections/landing/PrivateCta";

export const metadata = {
  title: "6 Benefits of Using CINROOM",
  description: "Hollywood-Level Quality. Launch Campaigns Faster. Premium Look, Better Perception.",
};

export default function BenefitsPage() {
  return (
    <main className="min-h-screen bg-[#071220] text-foreground pt-0">
      <div className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-serif text-white tracking-tight">
          6 Benefits of Using CINROOM
        </h1>
      </div>
      <WhatCinroomDoes />
      <WhyWorkWithUs />
      <Benefits />
      <Archive />
      <PostBookingProcess />
      <PrivatePricing />
      <IsThisForYou />
      <HollywoodTrust />
      <PrivateCta />
    </main>
  );
}
