"use client";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowDown, ChevronRight, Check, Plus, GripVertical } from "lucide-react";
import React from "react";
import { LazyVideo } from "@/components/ui/LazyVideo";

// Shared FlowNode
const FlowNode = ({ text, isLast = false, highlight = false, size = 'normal' }: { text: string, isLast?: boolean, highlight?: boolean, size?: 'normal' | 'small' }) => (
  <div className="flex flex-col items-center">
    <div className={`rounded-xl border font-sans tracking-[0.1em] uppercase shadow-xl backdrop-blur-md text-center
        ${size === 'small' ? 'px-4 py-3 text-[10px] md:text-xs' : 'px-6 py-4 text-xs md:text-sm'}
        ${highlight ? 'bg-white text-black border-white' : 'bg-white/5 text-white/80 border-white/10'}`}>
      {text}
    </div>
    {!isLast && (
      <div className={`w-[1px] ${size === 'small' ? 'h-6' : 'h-8'} bg-white/20 my-2 relative`}>
        <ArrowDown size={size === 'small' ? 10 : 12} className={`absolute ${size === 'small' ? '-bottom-[10px] -left-[4.5px]' : '-bottom-3 -left-[5.5px]'} text-white/40`} />
      </div>
    )}
  </div>
);

// Section Title
const SectionTitle = ({ num, title }: { num: string, title: string }) => (
  <div className="mb-12 md:mb-16">
    <span className="text-4xl md:text-5xl font-serif text-white/20 block mb-4">{num}</span>
    <h2 className="text-4xl md:text-6xl font-serif leading-tight">{title}</h2>
  </div>
);

// Ask Yourself
const AskYourself = ({ takeaway, question }: { takeaway: string, question: string }) => (
  <div className="mt-16 p-8 md:p-12 border border-white/10 bg-white/[0.02] rounded-3xl shadow-2xl">
    <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-white/40 block mb-4 font-bold">The Business Takeaway</span>
    <p className="text-xl md:text-2xl font-serif text-white/90 mb-8 pb-8 border-b border-white/10 leading-relaxed">
      {takeaway}
    </p>
    <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-blue-400 block mb-4 font-bold">Ask Yourself</span>
    <p className="text-2xl md:text-3xl font-serif text-white italic leading-snug">
      "{question}"
    </p>
  </div>
);

// Interactive Comparison Slider
const ComparisonSlider = ({ beforeImage, afterImage }: { beforeImage: string, afterImage: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchEnd={() => setIsDragging(false)}
      onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
    >
      <Image src={beforeImage} alt="Average AI" fill className="object-cover pointer-events-none" />
      <div className="absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-sans tracking-[0.2em] uppercase text-white/80 border border-white/10 shadow-lg">
        Average AI
      </div>

      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-20"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image src={afterImage} alt="Luxury Production" fill className="object-cover" />
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-sans tracking-[0.2em] uppercase text-black font-bold shadow-lg">
          Luxury Production
        </div>
      </div>

      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize pointer-events-none z-30"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] text-black border-2 border-black/10">
          <GripVertical size={18} />
        </div>
      </div>
    </div>
  );
};

export default function HiddenCostPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDoubtOpen, setIsDoubtOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  const videos = [
    "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Sunset%20Elegance%20reduce%20size.mp4",
    "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Island%20Vows%20reduce%20size.mp4",
    "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Golden%20Serpent%20reduce%20size.mp4",
    "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Emerald%20Precision%20reduce%20size.mp4",
    "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Alpine%20Sapphire%20reduce%20size.mp4",
    "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Royal%20Radiance%20%20reduce%20size.mp4",
    "https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/The%20Blue%20Dynasty%20reduce%20size.mp4"
  ];

  return (
    <main className="min-h-screen bg-[#071220] text-white font-sans selection:bg-white/20 selection:text-white pb-0">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 md:h-1.5 bg-white z-50 origin-left shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyVideo 
            src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Alpine%20Sapphire%20reduce%20size.mp4" 
            posterSrc="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/BANNER/hero.webp"
            priority={true}
            className="w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071220]/50 via-[#071220]/80 to-[#071220]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto pt-32 pb-24 flex flex-col justify-center items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.05] mb-8"
          >
            Bad AI Doesn't Save Money.<br/>
            <span className="text-white/60">It Costs Sales.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-3xl font-serif text-white/90 leading-relaxed max-w-4xl mb-8"
          >
            The 7 reasons luxury jewelry brands are quietly losing customers—and how the fastest-growing brands are fixing it.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-12 flex items-center gap-2 text-white/40 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <span className="text-lg">🕒</span>
            <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase font-bold">5 minute read</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <a href="https://cal.com/omnivinci/30min" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-4 bg-white text-black px-10 py-5 rounded-full text-xs font-sans tracking-[0.2em] uppercase hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] w-full sm:w-auto">
              Book Strategy Call <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-24 bg-white/[0.01] border-y border-white/5 relative z-10 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-serif mb-12">What you'll learn</h2>
            <p className="text-xl md:text-2xl font-serif text-white/50 mb-8 italic">In 5 minutes you'll learn:</p>
            <ul className="flex flex-col gap-6">
              {[
                "Why bad AI quietly costs sales",
                "Why customers trust some brands instantly",
                "Why competitors using better creative are growing faster",
                "Why premium visuals justify premium pricing",
                "Why AI alone isn't enough",
                "How Hollywood production workflows change the result",
                "What a ₹15,000 campaign actually looks like"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 bg-white/10 p-1 rounded-full"><Check size={16} className="text-white" /></div>
                  <span className="text-lg md:text-xl font-serif text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-16 md:py-24 bg-[#071220] relative z-10 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Two ways brands lose sales */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Two ways brands are losing sales today</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-col items-center p-10 border border-white/10 bg-white/[0.02] rounded-[2rem]">
              <span className="text-4xl font-serif text-white/20 mb-6 block">①</span>
              <h3 className="text-2xl font-serif text-white mb-10">Using cheap AI</h3>
              <FlowNode text="Customers lose trust" />
              <FlowNode text="Lower perceived value" />
              <div className="px-8 py-5 rounded-2xl border font-sans tracking-[0.1em] uppercase text-sm md:text-base shadow-xl text-center bg-white/5 text-white/80 border-white/10 w-full mt-4">
                Lower conversion
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col items-center p-10 border border-white/10 bg-white/[0.02] rounded-[2rem]">
              <span className="text-4xl font-serif text-white/20 mb-6 block">②</span>
              <h3 className="text-2xl font-serif text-white mb-10">Not using AI at all</h3>
              <FlowNode text="Competitors launch faster" />
              <FlowNode text="More campaigns" />
              <FlowNode text="More testing" />
              <FlowNode text="More visibility" />
              <div className="px-8 py-5 rounded-2xl border font-sans tracking-[0.1em] uppercase text-sm md:text-base shadow-xl text-center bg-white/5 text-white/80 border-white/10 w-full mt-4">
                Market share shifts
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 01: The Hidden Cost (Slider) */}
      <section className="py-24 md:py-32 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <SectionTitle num="01" title="Hidden Cost of Bad AI" />
            
            <ComparisonSlider 
              beforeImage="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/post.webp" 
              afterImage="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/poster.webp" 
            />

            <AskYourself 
              takeaway="Most customers won't say, 'This looks AI.' They simply stop trusting the brand." 
              question="Would you confidently spend ₹80,000 on jewelry from your current Instagram page?" 
            />
          </motion.div>
        </div>
      </section>

      {/* 02: Customer Journey Flowchart */}
      <section className="py-24 md:py-32 px-6 bg-[#071220]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="text-center md:text-left">
              <SectionTitle num="02" title="Premium Products Need Premium Presentation" />
            </div>
            <div className="mb-16">
              <FlowNode text="Ad" />
              <FlowNode text="Instagram" />
              <FlowNode text="Website" />
              <FlowNode text="Shares with Partner" />
              <FlowNode text="Trust" />
              <FlowNode text="Purchase" isLast highlight />
            </div>
            
            <AskYourself 
              takeaway="Your campaign isn't only selling jewelry. It's building confidence." 
              question="If your product looks identical to a cheaper competitor, why should they buy from you?" 
            />
          </motion.div>
        </div>
      </section>

      {/* 03: Bad AI Doubts Accordion */}
      <section className="py-24 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <SectionTitle num="03" title="Bad AI Creates Small Doubts" />
          </motion.div>
          
          <div className="border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-colors hover:bg-white/[0.04] rounded-3xl overflow-hidden mb-16">
            <button 
              onClick={() => setIsDoubtOpen(!isDoubtOpen)}
              className="w-full text-left px-8 py-10 flex items-center justify-between group"
            >
              <span className="text-2xl md:text-3xl font-serif text-white/90">"Something Feels Off."</span>
              <div className="flex items-center gap-4 text-white/50 group-hover:text-white transition-colors">
                 <span className="text-xs font-sans tracking-[0.2em] uppercase font-bold hidden md:block">
                   {isDoubtOpen ? 'Close' : 'See Examples'}
                 </span>
                 <motion.div animate={{ rotate: isDoubtOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
                   <ChevronRight size={24} />
                 </motion.div>
              </div>
            </button>
            <AnimatePresence>
              {isDoubtOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                  <div className="px-8 pb-12 flex flex-col md:flex-row gap-12 pt-4">
                    <ul className="flex flex-col gap-6 text-lg font-serif text-white/60 list-disc list-inside shrink-0">
                      <li>Unnatural skin</li>
                      <li>Fake reflections</li>
                      <li>Incorrect shadows</li>
                      <li>Plastic looking diamonds</li>
                      <li>Wrong proportions</li>
                      <li>Poor luxury styling</li>
                    </ul>
                    <div className="flex-1 md:border-l md:border-white/10 md:pl-12 flex items-center">
                      <p className="text-2xl md:text-3xl font-serif text-white/80 leading-relaxed">
                        Customers rarely identify the technical issue—they simply lose confidence in the brand.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AskYourself 
            takeaway="Trust is fragile. A single unnatural reflection can destroy the premium positioning you spent years building." 
            question="Are your current visuals justifying your price tag, or apologizing for it?" 
          />
        </div>
      </section>

      {/* 04: Good Marketing Can't Fix Weak Creative */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <SectionTitle num="04" title="Good Marketing Can't Fix Weak Creative" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start mb-16">
              {/* Weak Funnel */}
              <div className="flex flex-col items-center p-10 border border-red-500/10 bg-red-500/5 rounded-[2rem]">
                <FlowNode text="Bad Creative" size="small" />
                <FlowNode text="Lower Trust" size="small" />
                <FlowNode text="Lower Click Through" size="small" />
                <FlowNode text="Lower Conversion" size="small" />
                <div className="px-8 py-4 rounded-xl border font-sans tracking-[0.1em] uppercase text-sm shadow-xl text-center bg-red-950/50 text-red-300 border-red-500/20 w-full mt-2">
                  Lower Revenue
                </div>
              </div>

              {/* Premium Funnel */}
              <div className="flex flex-col items-center p-10 border border-blue-500/20 bg-blue-500/5 rounded-[2rem] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <FlowNode text="Premium Creative" size="small" />
                <FlowNode text="Higher Trust" size="small" />
                <FlowNode text="Higher Attention" size="small" />
                <FlowNode text="Higher Conversion" size="small" />
                <div className="px-8 py-4 rounded-xl border font-sans tracking-[0.1em] uppercase text-sm shadow-xl text-center bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.1)] w-full mt-2 font-bold">
                  Higher Revenue
                </div>
              </div>
            </div>

            <AskYourself 
              takeaway="Advertising amplifies what's already there. Pushing budget into weak creative just scales inefficiency." 
              question="Are you blaming your ad strategy for a problem created by your visual assets?" 
            />
          </motion.div>
        </div>
      </section>

      {/* 05: AI Doesn't Win. Execution Does. */}
      <section className="py-24 md:py-32 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <SectionTitle num="05" title="AI Doesn't Win. Execution Does." />
            
            <div className="mb-16">
              <FlowNode text="Creative Direction" />
              <FlowNode text="Art Direction" />
              <FlowNode text="AI Generation" />
              <FlowNode text="CGI Enhancement" />
              <FlowNode text="Multi-layer Compositing" />
              <FlowNode text="Luxury Retouching" />
              <FlowNode text="Hollywood Color Finishing" />
              <FlowNode text="Final Quality Review" isLast highlight />
            </div>

            <AskYourself 
              takeaway="AI is a tool, not a strategy. True luxury requires multi-stage artistic direction, not just a text prompt." 
              question="Are you trying to automate taste?" 
            />
          </motion.div>
        </div>
      </section>

      {/* 06: Your Competitor Is Producing More Than You */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <SectionTitle num="06" title="Your Competitor Is Producing More Than You." />
            
            <p className="text-xl md:text-2xl font-serif text-white/80 leading-relaxed mb-16">
              The brands growing fastest today aren't always making better products. They're creating more campaigns, testing more creatives and staying visible more often. If your production pipeline can't keep up, your marketing can't either.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center mb-20">
              <div className="flex flex-col items-center p-8 border border-white/10 bg-white/[0.02] rounded-3xl">
                <span className="text-sm font-sans tracking-[0.2em] uppercase text-white/50 mb-8 font-bold">Traditional Production</span>
                <div className="w-[1px] h-12 bg-white/20 mb-2 relative">
                  <ArrowDown size={12} className="absolute -bottom-3 -left-[5.5px] text-white/40" />
                </div>
                <div className="px-8 py-5 rounded-xl border border-white/10 font-sans tracking-[0.1em] uppercase shadow-xl text-center text-white/80 w-full mt-4">
                  2 campaigns/month
                </div>
              </div>

              <div className="flex flex-col items-center p-8 border border-white/20 bg-white/5 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-white"></div>
                <span className="text-sm font-sans tracking-[0.2em] uppercase text-white mb-8 font-bold">Modern Production</span>
                <div className="w-[1px] h-12 bg-white/50 mb-2 relative">
                  <ArrowDown size={12} className="absolute -bottom-3 -left-[5.5px] text-white" />
                </div>
                <div className="px-8 py-5 rounded-xl font-sans tracking-[0.1em] uppercase shadow-[0_0_30px_rgba(255,255,255,0.2)] text-center bg-white text-black font-bold w-full mt-4">
                  20 creatives/month
                </div>
              </div>
            </div>

            <div className="mb-16 p-10 border border-blue-500/20 bg-blue-900/10 rounded-3xl relative overflow-hidden">
              <h3 className="text-3xl font-serif text-white mb-6">The Cost of Waiting</h3>
              <p className="text-xl font-serif text-white/70 leading-relaxed">
                Every month you delay improving your creative, competitors continue launching campaigns, testing creatives and learning faster.<br/><br/>
                Marketing compounds.<br/>
                Creative compounds.<br/>
                <span className="text-white">Brands compound.</span>
              </p>
            </div>

            <AskYourself 
              takeaway="Speed to market with premium visuals is the ultimate modern moat." 
              question="How much market share is your slow production timeline costing you every quarter?" 
            />
          </motion.div>
        </div>
      </section>

      {/* 07: Why CINROOM Looks Different */}
      <section className="py-24 md:py-32 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <SectionTitle num="07" title="Why CINROOM Looks Different" />
            
            <div className="text-xl md:text-2xl font-serif text-white/80 leading-relaxed mb-16 space-y-8">
              <p>Everyone has AI. Very few have Hollywood production experience.</p>
              
              <div className="p-10 border border-white/10 rounded-3xl bg-[#071220]">
                <p className="mb-6 text-white/50 italic">Hollywood taught us:</p>
                <ul className="flex flex-col gap-4 text-3xl font-serif text-white">
                  <li>Story.</li>
                  <li>Composition.</li>
                  <li>Lighting.</li>
                  <li>Attention to detail.</li>
                  <li>Consistency.</li>
                </ul>
              </div>

              <p>We simply apply those same production principles to modern AI workflows. That's your unfair advantage.</p>
            </div>

            <AskYourself 
              takeaway="To look like a category leader, you need to produce like one." 
              question="Are you ready to stop looking like everyone else?" 
            />
          </motion.div>
        </div>
      </section>

      {/* Our Work (Carousel) */}
      <section id="our-work" className="py-24 md:py-32 overflow-hidden bg-[#071220]">
        <div className="px-6 mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
            See What's Possible
          </h2>
          <p className="text-xl md:text-2xl font-serif text-white/60">
            Every campaign below is a 15-second hero film created for premium jewelry marketing.
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-6 px-6 md:px-12 pb-12">
          {videos.map((src, idx) => (
            <div key={idx} className="snap-center shrink-0 w-[80vw] md:w-[40vw] lg:w-[25vw] flex flex-col gap-4">
              <div className="aspect-[9/16] bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-xl transition-all">
                <LazyVideo 
                  src={src} 
                  posterSrc="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/magazine%20cover.webp"
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
          <div className="shrink-0 w-6"></div>
        </div>
      </section>

      {/* Launch Offer */}
      <section className="py-24 md:py-32 bg-white/[0.01] border-y border-white/5 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-[#071220] border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
            <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-white/60 block mb-6 font-bold">Launch Offer</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Premium 15-Second Hero Campaign Video
            </h2>
            <p className="text-lg font-serif text-white/60 mb-10 leading-relaxed max-w-lg">
              Designed for ambitious lab-grown diamond brands that want luxury campaign quality without traditional production complexity.
            </p>
            <div className="flex flex-col gap-6 mb-12">
              {['15-second Hero Campaign Video', 'Commercial Usage', 'Luxury Creative Direction'].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <Check size={20} className="text-white/40 shrink-0" />
                  <span className="text-lg md:text-xl font-serif text-white/90">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col gap-2">
              <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-white/40">Starting from</span>
              <span className="text-3xl md:text-4xl font-serif text-white">₹15,000</span>
            </div>
          </motion.div>
          
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="text-sm md:text-base font-serif text-white/40 mt-8 text-center italic max-w-md mx-auto leading-relaxed">
            Need multiple videos or an ongoing campaign? Custom production plans are available after the strategy call.
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-6 bg-[#071220]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center md:text-left">FAQ</h2>
          <div className="flex flex-col border-t border-white/10">
            {[
              { q: "Will customers know it's AI?", a: "Not if it's done correctly. Our multi-layer compositing and Hollywood-level color finishing ensures the final output looks like a high-end commercial shoot, completely avoiding the 'plastic' AI look." },
              { q: "How long does production take?", a: "Most 15-second hero campaigns are completed within 7–10 days from concept approval, significantly faster than traditional 6-week studio productions." },
              { q: "Can you match our brand?", a: "Yes. Every campaign starts with Art Direction. We analyze your brand guidelines, past successful creatives, and aesthetic goals before generating a single frame." },
              { q: "Can we use our own jewelry?", a: "Absolutely. We can incorporate your actual product CADs or high-res photography into the cinematic environments using advanced compositing." }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-white/10 overflow-hidden bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-8 md:py-10 flex items-center justify-between"
                >
                  <span className="text-xl md:text-2xl font-serif text-white/90 pr-8">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === idx ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-white/40 shrink-0">
                    <Plus size={20} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <div className="px-6 pb-10 text-lg md:text-xl font-serif text-white/60 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-40 md:py-56 flex flex-col justify-center px-6 overflow-hidden text-center bg-[#071220]">
        <div className="absolute inset-0 z-0">
          <LazyVideo 
            src="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/videos/reduce%20size/Island%20Vows%20reduce%20size.mp4" 
            posterSrc="https://pub-e4b98781681b4d27a8e28caaf73b8ca4.r2.dev/CINROOM%20WEBSITE%20ASSESTS/porfolio/The%20Blue%20Dynasty/image/end%20poster%20(1).jpg"
            className="w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071220] via-transparent to-[#071220]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight">
            Luxury isn't about spending more.<br/>
            <span className="text-white/50">It's about looking unforgettable.</span>
          </motion.h2>
          
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl md:text-2xl font-serif text-white/70 mb-16">
            Your next collection deserves a campaign customers remember.
          </motion.p>
          
          <motion.a initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
            href="https://cal.com/omnivinci/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full text-sm font-sans tracking-[0.2em] uppercase hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Book Strategy Call <ArrowUpRight size={18} />
          </motion.a>
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
