"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function JewelryFounder() {
  return (
    <section className="py-24 bg-[#02050a] border-y border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/3 shrink-0"
          >
            <div className="aspect-[3/4] relative rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/10">
              <Image 
                src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/founder%20image/image000222.png" 
                alt="Debabrata Bairagy" 
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-white font-serif text-xl mb-1">Debabrata Bairagy</h4>
                <p className="text-white/60 font-sans text-xs uppercase tracking-widest">Founder & Creative Director</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-2/3 flex flex-col justify-center"
          >
            <h2 className="text-sm font-sans tracking-[0.3em] uppercase text-blue-400 mb-4 font-bold">
              The Vision
            </h2>
            <h3 className="text-2xl md:text-4xl font-serif text-white tracking-tight mb-6">
              Hollywood scale. AI velocity.
            </h3>
            <div className="space-y-4 text-sm md:text-base font-sans text-white/60 font-light leading-relaxed mb-8">
              <p>
                As a former Hollywood VFX Artist, Debabrata has worked on some of the world's largest productions, including <strong>Spider-Man</strong>, <strong>House of the Dragon</strong>, and <strong>Prey</strong>.
              </p>
              <p>
                CINROOM was built to bring that exact level of cinematic craft to premium brands. By combining elite art direction with proprietary AI workflows, we help modern jewelry brands launch with campaigns that feel expensive, without the traditional friction of luxury production.
              </p>
            </div>
            
            <div className="flex gap-6 text-[10px] font-sans tracking-[0.2em] uppercase">
              <a href="https://www.linkedin.com/in/debabrata-bairagy/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1">
                LinkedIn
              </a>
              <a href="https://www.imdb.com/name/nm13973251/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1">
                IMDb Profile
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
