export default function AgencyCapacity() {
  const roles = [
    "Editors",
    "Motion Designers",
    "CG Artists",
    "Photographers",
    "Retouchers",
    "Creative Directors"
  ];

  return (
    <section className="py-32 bg-[#02050a] border-t border-white/5">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-12">
              Built To Scale.
            </h2>
            <h3 className="text-xs uppercase tracking-widest text-white/50 mb-6 font-sans">Instead of hiring</h3>
            <ul className="space-y-3 mb-12">
              {roles.map((role, i) => (
                <li key={i} className="flex items-center gap-3 text-white/40 font-sans line-through decoration-white/20">
                  {role}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-12 border border-white/10 rounded-2xl bg-white/[0.02]">
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-6 leading-snug">
              Partner with one production team.
            </h3>
            <p className="text-lg font-sans text-white/60 font-light">
              Scale your agency without increasing payroll.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
