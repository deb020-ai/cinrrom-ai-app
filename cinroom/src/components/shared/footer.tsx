import Link from "next/link";
import { Diamond } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#030304] py-16 text-neutral-400">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400/20 to-white/10 flex items-center justify-center border border-amber-200/30">
              <Diamond className="w-3 h-3 text-amber-200" />
            </div>
            <span className="font-medium text-sm tracking-[0.2em] text-white uppercase font-sans">
              CINROOM
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-mono">
            Luxury Jewelry Videos. Generated in Minutes.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-8 text-xs font-mono tracking-widest uppercase text-neutral-500">
          <Link href="#templates" className="hover:text-amber-200 transition-colors">Showcase</Link>
          <Link href="#features" className="hover:text-amber-200 transition-colors">Architecture</Link>
          <Link href="#pricing" className="hover:text-amber-200 transition-colors">Membership</Link>
          <Link href="#faq" className="hover:text-amber-200 transition-colors">FAQ</Link>
          <Link href="/privacy" className="hover:text-amber-200 transition-colors">Privacy</Link>
        </div>
        
        <div className="text-xs font-mono text-neutral-600">
          © {new Date().getFullYear()} CINROOM ATELIER INC. ALL RIGHTS RESERVED.
        </div>

      </div>
    </footer>
  );
}
