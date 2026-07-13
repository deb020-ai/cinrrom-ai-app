import Campaigns from "@/components/sections/Campaigns";
import Archive from "@/components/sections/Archive";

export default function ExhibitionPage() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="pt-48 pb-12 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-secondary/60 block mb-6">
          Selected Works &mdash; 2024 / 2026
        </span>
        <h1 className="text-4xl md:text-6xl font-serif text-white tracking-wide">
          The <span className="italic font-light">Atelier.</span>
        </h1>
      </div>
      
      {/* We reuse the components directly */}
      <Campaigns />
      <Archive />
    </div>
  );
}
