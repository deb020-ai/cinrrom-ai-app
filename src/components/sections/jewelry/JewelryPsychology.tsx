"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function JewelryPsychology() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section ref={ref} className="py-16 md:py-32 bg-[#050d18] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
        
        {/* Editorial Text Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-white/70 font-serif text-lg md:text-xl leading-relaxed"
          >
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 tracking-tight">
              The Psychology of Premium.
            </h2>
            <p>
              When a potential customer clicks your Meta Ad, they aren't just looking at the jewelry. They are subconsciously evaluating your brand's status.
            </p>
            <p className="text-white/90 font-medium">
              The brand that feels more premium usually earns trust first.
            </p>
            <p>
              Your craftsmanship is already exceptional. But if your Meta Ads and website videos look generic, you are losing sales to brands with inferior products but superior visual storytelling.
            </p>
          </motion.div>
        </div>

        {/* Visual / Illustration Side */}
        <div className="w-full lg:w-1/2 relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden group bg-[#02050a] border border-white/10 mt-10 lg:mt-0">
          {isInView && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000 scale-105"
            >
              <source src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/compress/Island%20Vows%20Reduce%20Size.mp4" type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050d18] via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-8 left-8 right-8 p-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl">
            <div className="text-sm font-serif italic text-white/70">
              "We elevated our visuals and our ROAS doubled. Trust is everything in this industry."
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
