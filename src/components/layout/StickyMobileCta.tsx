"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function StickyMobileCta() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isJewelryCampaign = pathname === "/in/jewelry-campaign" || pathname === "/in/jewelry-launch" || pathname === "/us/jewelry-launch";
  const isUs = pathname === "/us/jewelry-launch";
  
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
      className={`md:hidden fixed bottom-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      {isJewelryCampaign ? (
        <div className="bg-[#02050a]/80 backdrop-blur-xl border-t border-white/10 p-3 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <a
            href={`https://wa.me/917003071256?text=Hi,%20I%20am%20interested%20in%20the%20${isUs ? '%24399' : '20k'}%20jewelry%20launch%20kit.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl text-[10px] sm:text-xs font-sans tracking-[0.1em] uppercase font-bold hover:bg-[#20b858] transition-colors"
          >
            <Image src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width={16} height={16} className="brightness-0 invert" unoptimized />
            WhatsApp
          </a>
          <a
            href="https://cal.com/omnivinci/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[1.5] flex items-center justify-center gap-2 bg-white text-black py-3.5 rounded-xl text-[10px] sm:text-xs font-sans tracking-[0.1em] uppercase font-bold hover:bg-gray-200 transition-colors"
          >
            Get Campaign Plan <ArrowUpRight size={14} />
          </a>
        </div>
      ) : (
        <div className="px-6 pb-6">
          <a 
            href="https://cal.com/omnivinci/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-white text-black font-sans tracking-[0.1em] uppercase text-xs md:text-sm px-6 py-4 rounded-full font-bold shadow-2xl"
          >
            {pathname === '/agency' ? 'Get White-Label Plan' : 'Get Campaign Plan'} <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </div>
  );
}
