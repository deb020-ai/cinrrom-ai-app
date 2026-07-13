import Benefits from "@/components/sections/Benefits";
import Cta from "@/components/sections/Cta";

export const metadata = {
  title: "6 Benefits of Using CINROOM",
  description: "Hollywood-Level Quality. Launch Campaigns Faster. Premium Look, Better Perception.",
};

export default function BenefitsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32">
      <Benefits />
      <Cta />
    </main>
  );
}
