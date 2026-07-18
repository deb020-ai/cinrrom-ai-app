import AgencyHero from "@/components/sections/agency/AgencyHero";
import AgencyProblem from "@/components/sections/agency/AgencyProblem";
import AgencySolution from "@/components/sections/agency/AgencySolution";
import AgencyServices from "@/components/sections/agency/AgencyServices";
import AgencyWorkDemo from "@/components/sections/agency/AgencyWorkDemo";
import AgencyFounderStory from "@/components/sections/agency/AgencyFounderStory";
import AgencyWhyUs from "@/components/sections/agency/AgencyWhyUs";
import AgencyTrust from "@/components/sections/agency/AgencyTrust";
import AgencyProcess from "@/components/sections/agency/AgencyProcess";
import AgencyCta from "@/components/sections/agency/AgencyCta";

export const metadata = {
  title: "White-Label Production Partner | CINROOM",
  description: "Scale your agency without hiring more creatives. Premium creative production delivered under your brand.",
};

export default function AgencyLandingPage() {
  return (
    <div className="bg-[#02050a] min-h-screen text-white selection:bg-white/20 selection:text-white">
      <AgencyHero />
      <AgencyProblem />
      <AgencySolution />
      <AgencyServices />
      <AgencyWorkDemo />
      <AgencyFounderStory />
      <AgencyWhyUs />
      <AgencyTrust />
      <AgencyProcess />
      <AgencyCta />
    </div>
  );
}
