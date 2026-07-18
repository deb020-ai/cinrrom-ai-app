import { Film, Video, Play, Sparkles, MonitorPlay, Clapperboard, MonitorSmartphone, Megaphone, Smartphone, Presentation } from "lucide-react";

export default function AgencyServices() {
  const services = [
    { title: "Luxury Campaign Videos", icon: <Film size={24} /> },
    { title: "CGI Commercials", icon: <MonitorPlay size={24} /> },
    { title: "AI Video Production", icon: <Sparkles size={24} /> },
    { title: "AI Product Films", icon: <Play size={24} /> },
    { title: "Motion Graphics", icon: <Presentation size={24} /> },
    { title: "Video Editing", icon: <Clapperboard size={24} /> },
    { title: "Meta & TikTok Ad Creatives", icon: <MonitorSmartphone size={24} /> },
    { title: "AI UGC (Natural US Accents)", icon: <Smartphone size={24} /> },
    { title: "Product Launch Videos", icon: <Megaphone size={24} /> },
    { title: "Creative Direction & VFX", icon: <Video size={24} /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#050914] border-b border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight text-center mb-16 md:mb-24">
          What We Produce
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center text-center p-8 border border-white/10 rounded-2xl bg-[#02050a] hover:bg-white/[0.03] transition-colors"
            >
              <div className="text-white/40 mb-6">
                {service.icon}
              </div>
              <h3 className="text-sm md:text-base font-sans text-white font-medium">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
        
        <div className="mt-16 md:mt-24 max-w-4xl mx-auto p-8 md:p-12 border border-white/10 rounded-3xl bg-white/[0.02]">
          <p className="text-lg md:text-xl font-sans text-white/70 leading-relaxed font-light text-center">
            If physical product filming is required, your client handles the shoot locally. We take care of everything after that—from editing and VFX to CGI, motion graphics, AI production, sound, color, and final delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
