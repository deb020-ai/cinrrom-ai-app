"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does the process work?",
    answer: "It's simple. We start with a brief strategy call or WhatsApp chat to align on your brand's aesthetic. Once confirmed, our creative direction team handles the entire production using our AI workflow, delivering the final premium asset within 48 hours."
  },
  {
    question: "What do you need from us?",
    answer: "Just high-resolution product images (flat lays or e-commerce shots) and your brand guidelines (logos, fonts, mood board if available). We take care of the rest, transforming simple assets into cinematic campaigns."
  },
  {
    question: "How long does it take?",
    answer: "For the ₹15,000 Campaign Launch package, delivery is guaranteed within 48 hours of asset receipt and kickoff."
  },
  {
    question: "Can this be used for Meta Ads?",
    answer: "Absolutely. The video is exported in multiple formats specifically optimized for Meta Ads, Instagram Reels, and your website's hero section, complete with a commercial license."
  },
  {
    question: "Can we request additional videos?",
    answer: "This package includes one premium 15-second concept and delivery without revisions. If you need multiple concepts or consistent monthly deliverables, we recommend our Creative Partner retainer."
  },
  {
    question: "Can we upgrade later?",
    answer: "Yes. Many of our clients start with the ₹15,000 package to experience our quality, and then upgrade to our ₹2,00,000/month Creative Partner tier for ongoing monthly campaign production."
  }
];

export default function JewelryFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-[#050d18]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-white/10 pb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-4 text-left group"
              >
                <span className="text-base md:text-lg font-serif text-white/90 group-hover:text-white transition-colors">
                  {faq.question}
                </span>
                <span className="ml-4 shrink-0 text-white/50 group-hover:text-white transition-colors">
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm md:text-base font-sans text-white/50 pb-6 pr-8 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
