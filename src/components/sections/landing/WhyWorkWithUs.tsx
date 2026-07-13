"use client";
import React, { useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";

const points = [
  {
    title: "Hollywood Direction",
    desc: "Cinematic vision built by industry veterans."
  },
  {
    title: "Next-Gen AI",
    desc: "High-end visual fidelity without heavy equipment."
  },
  {
    title: "Luxury Visuals",
    desc: "Aesthetic mastery designed for premium jewelry."
  },
  {
    title: "Delivered In Days",
    desc: "Go from concept to launch faster than ever."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function WhyWorkWithUs() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for mobile carousel
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollInterval: NodeJS.Timeout;
    let isUserInteracting = false;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (isUserInteracting) return;
        
        // Check if we are at the end, if so, loop back to start
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: container.clientWidth * 0.75, behavior: 'smooth' });
        }
      }, 3000); // Swipe every 3 seconds
    };

    const handleTouchStart = () => { isUserInteracting = true; };
    const handleTouchEnd = () => {
      isUserInteracting = false;
      // Reset the timer when they stop touching
      clearInterval(scrollInterval);
      startAutoScroll();
    };

    // Only apply event listeners and interval if it's scrollable (i.e. mobile view)
    const checkScrollability = () => {
      if (container.scrollWidth > container.clientWidth) {
        startAutoScroll();
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);
        container.addEventListener('mousedown', handleTouchStart);
        container.addEventListener('mouseup', handleTouchEnd);
      } else {
        clearInterval(scrollInterval);
      }
    };

    // Give DOM time to render before checking width
    setTimeout(checkScrollability, 500);

    return () => {
      clearInterval(scrollInterval);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleTouchStart);
      container.removeEventListener('mouseup', handleTouchEnd);
    };
  }, []);

  return (
    <section className="py-10 md:py-20 bg-[#050d18] border-t border-white/5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-16 text-left md:text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-serif text-white tracking-tight md:mb-6">
            Why Modern Lab-Grown Brands Work With CINROOM
          </h2>
        </div>

        {/* Horizontal Swipe on Mobile, Grid on Desktop */}
        <motion.div 
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
        >
          {points.map((point, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="snap-center shrink-0 w-[75vw] md:w-auto p-6 md:p-10 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-500 backdrop-blur-sm flex flex-col gap-3"
            >
              <h3 className="text-lg md:text-2xl font-serif text-white/90 leading-snug">
                {point.title}
              </h3>
              <p className="text-[11px] md:text-base font-sans text-white/50 leading-relaxed font-light mt-auto">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
