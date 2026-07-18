"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Do my clients know you're involved?",
    answer: "No. Everything is delivered under your brand."
  },
  {
    question: "Can you match our style?",
    answer: "Yes. We follow your references and brand guidelines."
  },
  {
    question: "How fast are revisions?",
    answer: "Usually within 24–48 hours."
  },
  {
    question: "Who owns the files?",
    answer: "Your agency. Always."
  }
];

export default function AgencyFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-[#050914] border-t border-white/5">
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight text-center mb-16">
          FAQ
        </h2>
        
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-white/10 bg-white/[0.02] rounded-2xl overflow-hidden transition-colors hover:bg-white/[0.04]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
              >
                <span className="text-lg md:text-xl font-sans text-white/90 font-medium">
                  {faq.question}
                </span>
                <span className="text-white/50 ml-4 flex-shrink-0">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 text-white/70 font-sans font-light leading-relaxed">
                      {faq.answer}
                    </div>
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
