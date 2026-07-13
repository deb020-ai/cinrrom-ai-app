import Link from "next/link";

export default function Journal() {
  const articles = [
    {
      title: "Behind the Campaign: Crafting Emotion",
      category: "Creative Direction",
      date: "Oct 12, 2026"
    },
    {
      title: "How We Built The Blue Dynasty",
      category: "Case Study",
      date: "Sep 28, 2026"
    },
    {
      title: "Lighting Breakdown: High Jewelry",
      category: "Photography",
      date: "Sep 05, 2026"
    },
    {
      title: "CGI Breakdown: The Emerald Precision",
      category: "VFX & Post",
      date: "Aug 14, 2026"
    }
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        <div className="md:w-1/3">
          <h2 className="text-xs font-sans tracking-[0.3em] uppercase text-secondary">
            Journal
          </h2>
        </div>
        
        <div className="md:w-2/3 flex flex-col gap-12">
          {articles.map((article, i) => (
            <Link key={i} href="#" className="group block border-b border-white/10 pb-12 transition-colors hover:border-white/40">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <span className="text-[10px] font-sans tracking-[0.2em] text-secondary/60 uppercase group-hover:text-primary transition-colors">
                  {article.category}
                </span>
                <span className="text-[10px] font-sans tracking-[0.2em] text-secondary/60 uppercase mt-2 md:mt-0">
                  {article.date}
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-serif text-secondary group-hover:text-primary group-hover:italic transition-all duration-500">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
