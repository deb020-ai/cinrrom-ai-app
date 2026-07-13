import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">
        <div className="flex flex-col gap-4">
          <Link href="/" className="hover:opacity-70 transition-opacity inline-block">
            <Image 
              src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/logo/hf_20260711_160628_c7c5043e-511d-4805-a3e1-0f34f103d583.png" 
              alt="CINROOM Logo" 
              width={160} 
              height={160} 
              className="mix-blend-screen h-16 w-auto object-contain"
              unoptimized
            />
          </Link>
          <p className="text-[10px] font-sans tracking-widest text-secondary/60 uppercase pl-2">
            Luxury Visual Maison
          </p>
        </div>

        <div className="flex flex-wrap gap-8 text-[10px] font-sans tracking-[0.2em] uppercase text-secondary">
          <Link href="#work" className="hover:text-primary transition-colors">Work</Link>
          <Link href="#services" className="hover:text-primary transition-colors">Services</Link>
          <a href="mailto:contact@cinroom.com" className="hover:text-primary transition-colors">Email</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
        </div>
      </div>
      <div className="mt-16 md:mt-24 text-[9px] text-secondary/40 font-sans tracking-widest uppercase flex justify-between items-center">
        <span>&copy; {new Date().getFullYear()} CINROOM. All rights reserved.</span>
        <span>Crafted with restraint.</span>
      </div>
    </footer>
  );
}
