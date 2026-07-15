"use client";
import { motion } from "framer-motion";

export default function JewelryPsychology() {
  return (
    <section className="py-32 bg-[#050d18] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Editorial Text Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm font-sans tracking-[0.3em] uppercase text-blue-400 mb-6 font-bold"
          >
            Buyer Psychology
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-[1.1] mb-10"
          >
            Why Premium Visuals Matter.
          </motion.h3>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-base md:text-lg font-sans text-white/60 font-light leading-relaxed"
          >
            <p>
              Customers don't buy fine jewelry immediately. They compare. They share screenshots. They ask family. They look at your competitors.
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
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden group bg-[#02050a] border border-white/10">
           <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000 scale-105"
          >
            <source src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Island%20Vows%20reduce%20size.mp4" type="video/mp4" />
          </video>
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
