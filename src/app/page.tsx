import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";

const TrustStrip = dynamic(() => import("@/components/sections/TrustStrip"));
const Unforgettable = dynamic(() => import("@/components/sections/Unforgettable"));
const Manifesto = dynamic(() => import("@/components/sections/Manifesto"));
const Campaigns = dynamic(() => import("@/components/sections/Campaigns"));
const Archive = dynamic(() => import("@/components/sections/Archive"));
const FounderCredibility = dynamic(() => import("@/components/sections/FounderCredibility"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Why = dynamic(() => import("@/components/sections/Why"));
const ProductionModel = dynamic(() => import("@/components/sections/ProductionModel"));
const Journal = dynamic(() => import("@/components/sections/Journal"));
const Cta = dynamic(() => import("@/components/sections/Cta"));

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Unforgettable />
      <Manifesto />
      <Archive />
      <Campaigns />
      <FounderCredibility />
      <Why />
      <ProductionModel />
      <Services />
      <Process />
      <Journal />
      <Cta />
    </>
  );
}
