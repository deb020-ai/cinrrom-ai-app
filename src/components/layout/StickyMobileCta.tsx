"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function StickyMobileCta() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isJewelryCampaign = pathname === "/in/jewelry-campaign";

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
      {isJewelryCampaign ? (
        <div className="flex flex-col gap-2 shadow-2xl">
          <a 
            href="https://cal.com/omnivinci/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-white text-black font-sans tracking-[0.1em] uppercase text-[10px] md:text-sm px-4 py-3 rounded-full font-bold"
          >
            Book Strategy Call <ArrowUpRight size={14} />
          </a>
          <a 
            href="https://wa.me/917003071256?text=Hi,%20I%20am%20interested%20in%20the%2015k%20jewelry%20campaign."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-sans tracking-[0.1em] uppercase text-[10px] md:text-sm px-4 py-3 rounded-full font-bold shadow-lg"
          >
            <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width={14} height={14} className="brightness-0 invert" unoptimized />
            Chat on WhatsApp
          </a>
        </div>
      ) : (
        <a 
          href="https://cal.com/omnivinci/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-white text-black font-sans tracking-[0.1em] uppercase text-xs md:text-sm px-6 py-4 rounded-full font-bold shadow-2xl"
        >
          Book Strategy Call <ArrowUpRight size={16} />
        </a>
      )}
    </div>
  );
}
