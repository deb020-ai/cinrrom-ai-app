import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Unforgettable from "@/components/sections/Unforgettable";
import Manifesto from "@/components/sections/Manifesto";
import Campaigns from "@/components/sections/Campaigns";
import Archive from "@/components/sections/Archive";
import FounderCredibility from "@/components/sections/FounderCredibility";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Why from "@/components/sections/Why";
import ProductionModel from "@/components/sections/ProductionModel";
import Journal from "@/components/sections/Journal";
import Cta from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Unforgettable />
      <Manifesto />
      <Campaigns />
      <Archive />
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
