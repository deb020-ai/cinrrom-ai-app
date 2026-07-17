import AgencyHero from "@/components/sections/agency/AgencyHero";
import AgencyTrust from "@/components/sections/agency/AgencyTrust";
import AgencyProblem from "@/components/sections/agency/AgencyProblem";
import AgencyServices from "@/components/sections/agency/AgencyServices";
import AgencyWhyUs from "@/components/sections/agency/AgencyWhyUs";
import AgencyProcess from "@/components/sections/agency/AgencyProcess";
import AgencyWorkDemo from "@/components/sections/agency/AgencyWorkDemo";
import AgencyPortfolioVerify from "@/components/sections/agency/AgencyPortfolioVerify";
import AgencyCapacity from "@/components/sections/agency/AgencyCapacity";
import AgencyAbout from "@/components/sections/agency/AgencyAbout";
import AgencyFaq from "@/components/sections/agency/AgencyFaq";
import AgencyCta from "@/components/sections/agency/AgencyCta";

export const metadata = {
  title: "White-Label Production Partner | CINROOM",
  description: "Scale your agency without hiring more creatives. Luxury jewelry campaign films delivered in 48 hours under your brand.",
};

export default function AgencyLandingPage() {
  return (
    <div className="bg-[#02050a] min-h-screen text-white selection:bg-white/20 selection:text-white">
      <AgencyHero />
      <AgencyTrust />
      <AgencyProblem />
      <AgencyServices />
      <AgencyWhyUs />
      <AgencyProcess />
      <AgencyWorkDemo />
      <AgencyPortfolioVerify />
      <AgencyCapacity />
      <AgencyAbout />
      <AgencyFaq />
      <AgencyCta />
    </div>
  );
}
