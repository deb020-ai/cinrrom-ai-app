"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-colors duration-700",
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <Link href="/" className="hover:opacity-70 transition-opacity flex items-center">
        <Image 
          src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/logo/hf_20260711_160628_c7c5043e-511d-4805-a3e1-0f34f103d583.png" 
          alt="CINROOM Logo" 
          width={140} 
          height={140} 
          className="mix-blend-screen h-12 w-auto object-contain"
          unoptimized
        />
      </Link>

      <div className="hidden md:flex items-center gap-8 text-[10px] font-sans tracking-[0.2em] uppercase text-primary/80">
        <Link href="/exhibition" className="hover:text-primary transition-colors">Work</Link>
        <Link href="/#services" className="hover:text-primary transition-colors">Services</Link>
        <Link href="/#process" className="hover:text-primary transition-colors">Process</Link>
      </div>

      <a 
        href="https://cal.com/omnivinci/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex text-[10px] font-sans tracking-[0.2em] uppercase border border-white/20 px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-all"
      >
        Book Call
      </a>

      {/* Mobile only Contact/Book link since the Sticky CTA handles the button on mobile */}
      <a 
        href="https://cal.com/omnivinci/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden text-[10px] font-sans tracking-[0.2em] uppercase border-b border-transparent hover:border-primary transition-colors pb-1"
      >
        Book
      </a>
    </motion.nav>
  );
}
