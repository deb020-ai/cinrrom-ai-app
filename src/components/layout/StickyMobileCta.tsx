"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function StickyMobileCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`md:hidden fixed bottom-6 left-0 right-0 px-6 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <a 
        href="https://cal.com/omnivinci/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-white text-black font-sans tracking-[0.1em] uppercase text-xs md:text-sm px-6 py-4 rounded-full font-bold shadow-2xl"
      >
        Book Strategy Call <ArrowUpRight size={16} />
      </a>
    </div>
  );
}
