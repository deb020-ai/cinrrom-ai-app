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
    <section className="py-16 md:py-24 bg-black border-b border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-4">
            Everything Your Clients Ask For.
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center text-center p-4 md:p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/[0.05] transition-all shadow-[0_4px_20px_rgba(255,255,255,0.01)]"
            >
              <div className="text-white/40 mb-3 md:mb-4">
                {service.icon}
              </div>
              <h3 className="text-[11px] md:text-sm font-sans text-white/90 font-medium leading-tight">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
        
        <div className="mt-8 md:mt-12 max-w-4xl mx-auto p-6 md:p-8 border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-md">
          <p className="text-sm md:text-base font-sans text-white/70 leading-relaxed font-light text-center">
            If physical product filming is required, your client handles the shoot locally. We take care of everything after that: from editing and VFX to CGI, motion graphics, AI production, sound, color, and final delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
