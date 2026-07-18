import { MessageSquare, Smartphone, Mail, Zap, Clock } from "lucide-react";

export default function AgencyCommunication() {
  const points = [
    { icon: <MessageSquare size={20} />, text: "Dedicated Slack" },
    { icon: <Smartphone size={20} />, text: "WhatsApp" },
    { icon: <Mail size={20} />, text: "Email" },
    { icon: <Zap size={20} />, text: "Fast replies" },
    { icon: <Clock size={20} />, text: "Clear timelines" },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#02050a] border-b border-white/5">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight text-center mb-12">
          Real Communication
        </h2>
        
        <p className="text-center text-lg font-sans text-white/50 mb-12 max-w-2xl mx-auto font-light">
          Agency owners hate disappearing freelancers. We don't disappear.
        </p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {points.map((point, index) => (
            <div key={index} className="flex items-center gap-3 px-6 py-4 bg-white/[0.03] border border-white/10 rounded-full hover:bg-white/[0.05] transition-colors">
              <span className="text-blue-400">{point.icon}</span>
              <span className="text-white/80 font-sans font-medium">{point.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
