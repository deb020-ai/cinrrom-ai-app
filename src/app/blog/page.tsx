import Link from "next/link";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "The 7 Shifts That Separate Premium Lab-Grown Diamond Brands From Everyone Else",
    desc: "Why some brands command premium pricing while others compete on discounts.",
    href: "/the-7-shifts",
    readTime: "5 Min Read",
  },
  {
    title: "Bad AI Doesn't Save Money. It Costs Sales.",
    desc: "The 7 Hidden Costs of Average AI Creative (And Why Premium Brands Are Switching to Next-Generation Production.)",
    href: "/the-hidden-cost-of-bad-ai",
    readTime: "3 Min Read",
  },
  {
    title: "6 Benefits of Using CINROOM",
    desc: "How our modern campaign production system elevates your brand and accelerates your launch.",
    href: "/benefits",
    readTime: "4 Min Read",
  }
];

export default function BlogHub() {
  return (
    <main className="min-h-screen bg-[#071220] text-white pt-32 pb-24 px-6">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-16 md:mb-24">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-white/50 block mb-4">
            Insights & Strategy
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[1.1]">
            The CINROOM Blog
          </h1>
          <p className="mt-6 text-lg md:text-xl font-sans text-white/60 max-w-2xl font-light leading-relaxed">
            Strategic insights on luxury positioning, campaign production, and modern visual identity for lab-grown diamond brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <Link 
              key={index} 
              href={article.href}
              className={`group relative p-8 md:p-12 rounded-3xl bg-[#0a1829] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col gap-6 ${index === 0 ? 'md:col-span-2' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-blue-400 mb-4 font-bold">
                  {article.readTime}
                </span>
                
                <h2 className="text-2xl md:text-4xl font-serif text-white/90 leading-snug mb-4 group-hover:text-white transition-colors duration-300">
                  {article.title}
                </h2>
                
                <p className="text-sm md:text-base font-sans text-white/50 leading-relaxed font-light mb-8 max-w-3xl">
                  {article.desc}
                </p>
                
                <div className="mt-auto flex items-center gap-3 text-[11px] font-sans tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors duration-300">
                  Read Article
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
