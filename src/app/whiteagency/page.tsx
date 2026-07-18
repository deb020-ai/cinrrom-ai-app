import AgencyHero from "@/components/sections/agency/AgencyHero";
import AgencyWorkDemo from "@/components/sections/agency/AgencyWorkDemo";
import AgencyTechStack from "@/components/sections/agency/AgencyTechStack";
import AgencyProblem from "@/components/sections/agency/AgencyProblem";
import AgencySolution from "@/components/sections/agency/AgencySolution";
import AgencyServices from "@/components/sections/agency/AgencyServices";
import AgencyCapacity from "@/components/sections/agency/AgencyCapacity";
import AgencyFounderStory from "@/components/sections/agency/AgencyFounderStory";
import AgencyWhySwitch from "@/components/sections/agency/AgencyWhySwitch";
import AgencyCommunication from "@/components/sections/agency/AgencyCommunication";
import AgencyTrust from "@/components/sections/agency/AgencyTrust";
import AgencyProcess from "@/components/sections/agency/AgencyProcess";
import AgencyFaq from "@/components/sections/agency/AgencyFaq";
import AgencyCta from "@/components/sections/agency/AgencyCta";

export const metadata = {
  title: "White-Label Production Partner | CINROOM",
  description: "Scale your agency without hiring more creatives. Premium creative production delivered under your brand.",
};

export default function AgencyLandingPage() {
  return (
    <div className="bg-[#02050a] min-h-screen text-white selection:bg-white/20 selection:text-white">
      <AgencyHero />
      <AgencyWorkDemo />
      <AgencyTechStack />
      <AgencyProblem />
      <AgencySolution />
      <AgencyServices />
      <AgencyCapacity />
      <AgencyFounderStory />
      <AgencyWhySwitch />
      <AgencyCommunication />
      <AgencyTrust />
      <AgencyProcess />
      <AgencyFaq />
      <AgencyCta />
    </div>
  );
}
