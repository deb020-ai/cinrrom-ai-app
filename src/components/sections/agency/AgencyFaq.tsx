"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function AgencyFaq() {
  const faqs = [
    { question: "Can you work under our brand?", answer: "Yes. We operate completely white-label. Your clients will never know CINROOM exists unless you tell them." },
    { question: "Do clients know CINROOM exists?", answer: "No. All assets are delivered without CINROOM branding, ready for you to present as your own." },
    { question: "Can we resell your work?", answer: "Yes. Our pricing is fixed, allowing you to mark up the final deliverables to your high-ticket clients with healthy margins." },
    { question: "Can we request revisions?", answer: "Yes. We include a revision round to ensure the creative perfectly aligns with your agency's standard before final client delivery." },
    { question: "Do you sign NDAs?", answer: "Absolutely. We are happy to sign standard non-disclosure and non-compete agreements for your agency." },
    { question: "Can we use Slack?", answer: "Yes. We can integrate directly into your agency's Slack workspace as an external channel for seamless communication." },
    { question: "Can we scale to dozens of campaigns?", answer: "Yes. Our AI-augmented workflow and infrastructure allow us to scale production bandwidth instantly." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-[#02050a] border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            Partnership Details
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/10 pb-4">
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
