"use client";

import { useState } from "react";
import { Play, Clock, Ratio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export interface Template {
  id: string;
  title: string;
  description: string;
  duration: string;
  aspectRatio: string;
  category: string;
  previewUrl: string;
}

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="glass-panel glass-panel-hover rounded-2xl overflow-hidden group flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Preview Area */}
        <div className="relative aspect-[4/3] bg-black overflow-hidden">
          <img 
            src={template.previewUrl || "/hero-ring.png"} 
            alt={template.title} 
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-black/30" />
          
          {/* Hover Play State */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
            <div className="w-14 h-14 rounded-full bg-amber-200/20 backdrop-blur-md border border-amber-200/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <Play className="w-6 h-6 text-amber-100 ml-0.5" />
            </div>
          </div>
          
          {/* Top Tags */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono text-neutral-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-200" />
              {template.duration}
            </span>
            <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono text-amber-200 flex items-center gap-1">
              <Ratio className="w-3 h-3 text-amber-200" />
              {template.aspectRatio}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">
            {template.category}
          </span>
          <h3 className="text-lg font-medium text-white mb-2 group-hover:text-amber-100 transition-colors">
            {template.title}
          </h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            {template.description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0">
        <Link href={`/dashboard/generate?template=${template.id}`}>
          <Button className="w-full h-10 text-xs font-mono tracking-wider uppercase rounded-xl bg-white/[0.04] hover:bg-amber-400/15 hover:border-amber-200/40 text-neutral-200 hover:text-amber-100 border border-white/10 transition-all">
            Select Preset & Configure
          </Button>
        </Link>
      </div>
    </div>
  );
}
