"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, ChevronRight, Check } from "lucide-react";
import React from "react";
import { LazyVideo } from "@/components/ui/LazyVideo";

const FlowNode = ({ text, isLast = false, highlight = false }: { text: string, isLast?: boolean, highlight?: boolean }) => (
  <div className="flex flex-col items-center">
    <div className={`px-6 py-4 rounded-xl border font-sans tracking-[0.1em] uppercase text-xs md:text-sm shadow-xl backdrop-blur-md text-center
        ${highlight ? 'bg-white text-black border-white' : 'bg-white/5 text-white/80 border-white/10'}`}>
      {text}
    </div>
    {!isLast && (
      <div className="w-[1px] h-8 bg-white/20 my-2 relative">
        <ArrowDown size={12} className="absolute -bottom-3 -left-[5.5px] text-white/40" />
      </div>
    )}
  </div>
);

type ShiftCardProps = {
  num: string;
  concept: string;
  headline: React.ReactNode;
  summary: string;
  paragraphs: string[];
  animation: React.ReactNode;
  media: { type: 'video' | 'image', src: string };
  takeaway: string;
  isOpen: boolean;
  onToggle: () => void;
};

const AccordionCard = ({ num, concept, headline, summary, paragraphs, animation, media, takeaway, isOpen, onToggle }: ShiftCardProps) => {
  return (
    <div className="w-full border-b border-white/10 last:border-0 bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-colors hover:bg-white/[0.04]">
      
      {/* Header (Always Visible) */}
      <button 
        onClick={onToggle}
        className="w-full text-left px-6 py-8 md:py-12 flex flex-col md:flex-row md:items-start justify-between gap-6 relative"
      >
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="text-xl md:text-2xl font-serif text-white/40">{num}</span>
            <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase text-blue-400 font-bold">{concept}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight text-white/90">
            {headline}
          </h2>
          <p className="text-lg font-serif text-white/60">
            {summary}
          </p>
        </div>

        <div className="flex items-center gap-2 text-white/50 group shrink-0 mt-4 md:mt-0">
          <span className="text-xs font-sans tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors">
            {isOpen ? 'Close' : 'Learn Why'}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="group-hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </motion.div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-12 md:pb-16 flex flex-col gap-16 max-w-4xl mx-auto">
              
              {/* Paragraphs */}
              <div className="flex flex-col gap-6 text-xl md:text-2xl font-serif text-white/80 leading-relaxed border-l border-blue-500/30 pl-6">
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Animation (Flowchart) */}
              <div className="bg-black/40 border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center">
                 {animation}
              </div>

              {/* Diagram (Media) */}
              <div className="relative w-full aspect-[9/16] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40">
                {media.type === 'video' ? (
                  <LazyVideo 
                    src={media.src} 
                    posterSrc="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/magazine%20cover.webp"
                    className="w-full h-full" 
                  />
                ) : (
                  <Image src={media.src} alt={concept} fill className="object-cover" />
                )}
              </div>

              {/* Key Takeaway */}
              <div className="bg-white text-black rounded-2xl p-8 md:p-10 shadow-[0_10px_40px_rgba(255,255,255,0.1)]">
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-black/50 block mb-4 font-bold">Key Takeaway</span>
                <p className="text-xl md:text-3xl font-serif leading-snug">
                  "{takeaway}"
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default function EditorialPage() {
  const [openShifts, setOpenShifts] = useState<string[]>([]);

  const toggleShift = (id: string) => {
    setOpenShifts(prev => 
      prev.includes(id) ? prev.filter(shift => shift !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#071220] text-white font-sans selection:bg-white/20 selection:text-white">
      
      {/* Navigation handled by global Navbar */}

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 max-w-4xl mx-auto flex flex-col justify-center text-left">
        <div className="mb-8">
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-white/50 flex items-center gap-2">
            6 Min Read
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.05] mb-8">
          The 7 Shifts That Separate Premium Lab-Grown Diamond Brands From Everyone Else
        </h1>
        
        <p className="text-xl md:text-2xl font-serif text-white/60 leading-relaxed max-w-2xl mb-16">
          The next decade won't be won by the brands with the best diamonds. It will be won by the brands that create the strongest perception, move the fastest, and build the deepest emotional connection.
        </p>

        {/* Launch Offer Block */}
        <div className="bg-blue-950/20 border border-blue-500/20 rounded-2xl p-8 md:p-10 max-w-xl shadow-[0_0_40px_rgba(59,130,246,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-blue-400 font-bold block mb-4">
            Launch Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
            Your First Luxury Campaign
          </h2>
          <p className="text-lg font-serif text-white/70 mb-6">
            A cinematic 15-second hero film for your next collection. Designed for modern lab-grown diamond brands.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-white/5 border border-white/10 text-white/80 px-4 py-2 rounded-full text-[10px] md:text-xs font-sans tracking-[0.1em] uppercase">
              15 sec Hero Film
            </span>
            <span className="bg-white/5 border border-white/10 text-white/80 px-4 py-2 rounded-full text-[10px] md:text-xs font-sans tracking-[0.1em] uppercase">
              Luxury Campaign Quality
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <a 
              href="https://cal.com/omnivinci/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Book Strategy Call <ArrowUpRight size={14} />
            </a>
            <div className="flex flex-col">
              <span className="text-[10px] font-sans tracking-[0.1em] uppercase text-white/40">Starting from</span>
              <span className="text-xl font-serif text-white">₹15,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="w-full max-w-[1200px] mx-auto mb-32 border-t border-white/10">
        
        <AccordionCard 
          num="01"
          concept="FIRST IMPRESSION"
          headline={<>Customers Don't Buy Diamonds.<br/>They Buy Confidence.</>}
          summary="People decide whether your brand feels premium before they ever compare your diamonds."
          isOpen={openShifts.includes("01")}
          onToggle={() => toggleShift("01")}
          paragraphs={[
            "Most founders believe they're selling diamonds. They're not. They're selling a first impression.",
            "Long before someone experiences your craftsmanship, they've already judged your brand through Instagram, Meta ads, Google, your website, WhatsApp, or a friend's recommendation."
          ]}
          animation={
            <div className="flex flex-col items-center">
              <FlowNode text="Instagram" />
              <FlowNode text="Website" />
              <FlowNode text="Share with Partner" />
              <FlowNode text="Compare Brands" />
              <FlowNode text="Purchase" isLast highlight />
            </div>
          }
          media={{ type: 'video', src: 'https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/The%20Blue%20Dynasty.mp4' }}
          takeaway="If your brand looks premium before customers compare prices, you've already won half the battle."
        />

        <AccordionCard 
          num="02"
          concept="BUYER PSYCHOLOGY"
          headline="You're Selling To More Than One Person."
          summary="People often ask partners, family or friends before buying jewelry. Your brand needs to impress all of them."
          isOpen={openShifts.includes("02")}
          onToggle={() => toggleShift("02")}
          paragraphs={[
            "People rarely buy expensive jewelry without another opinion.",
            "If someone shared your brand with the people they trust most, would your presentation strengthen that recommendation?"
          ]}
          animation={
            <div className="flex flex-col items-center">
              <FlowNode text="Buyer" />
              <FlowNode text="Partner" />
              <FlowNode text="Friend" />
              <FlowNode text="Family" />
              <FlowNode text="Purchase" isLast highlight />
            </div>
          }
          media={{ type: 'video', src: 'https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Royal%20Radiance%20.mp4' }}
          takeaway="If your brand doesn't impress everyone involved in the decision, someone else probably will."
        />

        <AccordionCard 
          num="03"
          concept="COMPETITION"
          headline="Your Biggest Competitor Isn't Natural Diamonds."
          summary="Customers already understand lab-grown. Now they're deciding which brand feels more trustworthy."
          isOpen={openShifts.includes("03")}
          onToggle={() => toggleShift("03")}
          paragraphs={[
            "Consumers increasingly accept lab-grown diamonds as a legitimate choice.",
            "As more brands enter the market, products become easier to compare. Brands become harder to remember."
          ]}
          animation={
            <div className="flex flex-col items-center w-full">
              <div className="flex gap-4 w-full mb-8 justify-center">
                <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-4 text-center">
                  <span className="font-sans tracking-[0.1em] uppercase text-xs text-red-200/50">Natural ❌</span>
                </div>
                <div className="bg-green-950/30 border border-green-500/30 rounded-xl p-4 text-center">
                  <span className="font-sans tracking-[0.1em] uppercase text-xs text-green-300 font-bold">Other Lab Brands ✅</span>
                </div>
              </div>
              <FlowNode text="Products become similar." />
              <FlowNode text="Brand becomes the differentiator." isLast highlight />
            </div>
          }
          media={{ type: 'video', src: 'https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Alpine%20Sapphire.mp4' }}
          takeaway="When you stop competing on product specs, you protect your margins."
        />

        <AccordionCard 
          num="04"
          concept="CONTENT ENGINE"
          headline="One Campaign. Twenty Assets."
          summary="The brands growing fastest don't create more campaigns. They create more assets from each campaign."
          isOpen={openShifts.includes("04")}
          onToggle={() => toggleShift("04")}
          paragraphs={[
            "Launching one campaign every few months is no longer enough.",
            "Modern brands need a continuous flow of premium creative across every customer touchpoint."
          ]}
          animation={
            <div className="flex flex-col items-center w-full">
              <div className="px-8 py-4 rounded-full bg-white text-black font-serif text-xl z-10 mb-8 text-center">
                One Shoot
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                {['Website', 'Instagram', 'Meta Ads', 'Stories', 'Email', 'Landing Page', 'Reels', 'WhatsApp', 'Marketplace'].map((platform) => (
                  <div key={platform} className="bg-white/5 border border-white/10 rounded-lg py-3 text-center">
                    <span className="font-sans tracking-[0.1em] uppercase text-[10px] text-white/80">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          }
          media={{ type: 'video', src: 'https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Emerald%20Precision.mp4' }}
          takeaway="Producing more assets from one campaign stretches your marketing budget."
        />

        <AccordionCard 
          num="05"
          concept="PREMIUM PERCEPTION"
          headline="People Buy Brands They Trust."
          summary="Luxury brands charge more because customers believe more."
          isOpen={openShifts.includes("05")}
          onToggle={() => toggleShift("05")}
          paragraphs={[
            "Luxury pricing is rarely justified by specifications alone.",
            "Customers often pay more because a brand feels established, consistent, and desirable. Trust is built long before a customer reaches the checkout page."
          ]}
          animation={
            <div className="flex flex-col items-center">
              <FlowNode text="Premium Brand" />
              <FlowNode text="Higher Trust" />
              <FlowNode text="More Website Visits" />
              <FlowNode text="More Time On Site" />
              <FlowNode text="More Add To Cart" />
              <FlowNode text="Higher Conversion" isLast highlight />
            </div>
          }
          media={{ type: 'video', src: 'https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Golden%20Serpent.mp4' }}
          takeaway="Consistent content gives your marketing team more opportunities to test and improve."
        />

        <AccordionCard 
          num="06"
          concept="NEXT-GEN PRODUCTION"
          headline="Marketing Can't Wait 45 Days."
          summary="The biggest cost isn't the production itself. It's waiting weeks while your competitors keep launching."
          isOpen={openShifts.includes("06")}
          onToggle={() => toggleShift("06")}
          paragraphs={[
            "Traditional production still has an important place in the industry.",
            "But many modern brands also need a faster and more flexible way to create premium campaigns."
          ]}
          animation={
            <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
              <div className="bg-black/40 border border-white/5 rounded-2xl p-6 text-center">
                <span className="font-sans tracking-[0.2em] uppercase text-[10px] text-white/30 block mb-4">Traditional</span>
                <span className="font-serif text-xl text-white/50">45 Days</span>
              </div>
              <div className="bg-blue-950/20 border border-blue-500/30 rounded-2xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <span className="font-sans tracking-[0.2em] uppercase text-[10px] text-blue-300 block mb-4">Next-Gen Workflow</span>
                <span className="font-serif text-2xl text-white">7–10 Days</span>
              </div>
            </div>
          }
          media={{ type: 'video', src: 'https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Island%20Vows.mp4' }}
          takeaway="Faster production cycles mean capturing market demand before competitors do."
        />

        <AccordionCard 
          num="07"
          concept="BRAND MEMORY"
          headline={<>Products Get Copied.<br/>Brands Don't.</>}
          summary="Customers remember brands long after they've forgotten specifications."
          isOpen={openShifts.includes("07")}
          onToggle={() => toggleShift("07")}
          paragraphs={[
            "The next generation of category leaders won't simply manufacture beautiful jewelry.",
            "They'll build memorable brands."
          ]}
          animation={
            <div className="flex flex-col items-center">
              <FlowNode text="Product" />
              <FlowNode text="Campaign" />
              <FlowNode text="Memory" />
              <FlowNode text="Brand" />
              <FlowNode text="Premium Pricing" isLast highlight />
            </div>
          }
          media={{ type: 'video', src: 'https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Sunset%20Elegance.mp4' }}
          takeaway="Memorable brands build equity that lasts decades."
        />

      </section>

      {/* WHAT WE CAN BUILD SECTION */}
      <section className="py-24 border-t border-white/5 bg-[#02050a] overflow-hidden">
        <div className="px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
            See What's Possible With One <br className="hidden md:block"/>15-Second Campaign Video
          </h2>
        </div>

        {/* Video Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-6 px-6 md:px-12 pb-12">
          
          {[
            "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/The%20Blue%20Dynasty.mp4",
            "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Royal%20Radiance%20.mp4",
            "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Alpine%20Sapphire.mp4",
            "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Emerald%20Precision.mp4",
            "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Golden%20Serpent.mp4",
            "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Island%20Vows.mp4",
            "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/Sunset%20Elegance.mp4"
          ].map((src, idx) => (
            <div key={idx} className="snap-center shrink-0 w-[80vw] md:w-[40vw] lg:w-[25vw] flex flex-col gap-4">
              <div className="aspect-[9/16] bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-xl transition-all hover:scale-[1.02]">
                <LazyVideo 
                  src={src} 
                  posterSrc="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/magazine%20cover.webp"
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}

          {/* Padding for last item */}
          <div className="shrink-0 w-6"></div>
        </div>
      </section>

      {/* WHAT YOU GET SECTION */}
      <section className="py-24 bg-[#071220] border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-10">
              15-Second Hero Campaign Film
            </h2>
            <div className="flex flex-col gap-6 mb-12">
              {['Premium Luxury Look', 'Commercial Usage', 'Creative Direction', '9:16 Delivery'].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <Check size={20} className="text-blue-400 shrink-0" />
                  <span className="text-lg md:text-xl font-serif text-white/90">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col">
              <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-2">Starting from</span>
              <span className="text-3xl md:text-4xl font-serif text-white">₹15,000</span>
            </div>
          </div>
          <p className="text-sm md:text-base font-serif text-white/40 mt-8 text-center italic max-w-lg mx-auto leading-relaxed">
            Need multiple videos or an ongoing content plan? We'll discuss custom packages during the strategy call.
          </p>
        </div>
      </section>

      {/* Minimal Credibility */}
      <section className="py-24 md:py-32 bg-[#071220]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8"
          >
            <div className="flex flex-col gap-2 border-l border-white/10 pl-6">
              <span className="text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-white/40">Hollywood</span>
              <span className="text-lg md:text-xl font-serif text-white/90 leading-snug">Built on Hollywood Craft</span>
            </div>

            <div className="flex flex-col gap-2 border-l border-white/10 pl-6">
              <span className="text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-white/40">Community</span>
              <span className="text-xl md:text-2xl font-serif text-white/90">33K+</span>
            </div>

            <div className="flex flex-col gap-2 border-l border-white/10 pl-6">
              <span className="text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-white/40">Reach</span>
              <span className="text-xl md:text-2xl font-serif text-white/90">600M+</span>
            </div>

            <div className="flex flex-col gap-2 border-l border-white/10 pl-6">
              <span className="text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-white/40">Clients</span>
              <span className="text-lg md:text-xl font-serif text-white/90 leading-snug">Samsung &bull; KKR &bull; IPL</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 border-t border-white/10 bg-[#02050a] text-center">
        <div className="max-w-2xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
            Ready To Launch Your Next Collection?
          </h2>
          <span className="text-xl md:text-2xl font-serif text-blue-400 block mb-3">Your First Luxury Campaign</span>
          <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-white/50 block mb-12">Starting from ₹15,000</span>
          
          <a 
            href="https://cal.com/omnivinci/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            Book Strategy Call <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* Global CSS for hiding scrollbar in carousels */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </main>
  );
}
