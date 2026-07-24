"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Image as ImageIcon, X, RefreshCw, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function UploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>("/hero-ring.png");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selected = acceptedFiles[0];
      setFile(selected);
      const objectUrl = URL.createObjectURL(selected);
      setPreview(objectUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
  });

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
  };

  const useSampleImage = (url: string) => {
    setPreview(url);
    setFile(new File([], "sample-jewel.png", { type: "image/png" }));
  };

  return (
    <div className="w-full glass-panel rounded-2xl overflow-hidden gold-border-glow shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <div
              {...getRootProps()}
              className={`min-h-[420px] flex flex-col items-center justify-center p-12 cursor-pointer border-2 border-dashed transition-all duration-300 ${
                isDragActive ? "border-amber-200 bg-amber-400/10" : "border-white/10 hover:border-amber-200/40 hover:bg-white/[0.02]"
              }`}
            >
              <input {...getInputProps()} />
              <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                <UploadCloud className={`w-8 h-8 ${isDragActive ? "text-amber-200" : "text-neutral-400"}`} />
              </div>
              <h3 className="text-xl font-light text-white mb-2">Upload High-Jewelry Master Image</h3>
              <p className="text-xs font-mono tracking-wide text-neutral-400 mb-8 text-center max-w-sm">
                Drag & drop high-resolution photograph (PNG, JPG, WEBP up to 50MB)
              </p>
              
              <div className="flex gap-3 items-center">
                <span className="px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] font-mono text-neutral-400">STUDIO MASTER PNG</span>
                <span className="px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] font-mono text-neutral-400">RAW JPG</span>
                <span className="px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] font-mono text-neutral-400">WEBP</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-[440px] flex flex-col group bg-black"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[#050505] p-6">
              <img 
                src={preview} 
                alt="Jewelry Master" 
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-amber-200">
                <Diamond className="w-3 h-3 text-amber-200" />
                <span>GEOMETRY ANALYZED — READY FOR LIGHTING PRESETS</span>
              </div>

              <div className="pointer-events-auto flex gap-2">
                <Button 
                  size="sm"
                  variant="secondary" 
                  className="h-8 px-3 text-[10px] font-mono uppercase bg-black/60 text-white hover:bg-white/20 backdrop-blur-md border border-white/10"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <RefreshCw className="w-3 h-3 mr-1.5" />
                  Replace
                </Button>
                <Button 
                  size="sm"
                  variant="destructive" 
                  onClick={clearFile}
                  className="h-8 px-3 text-[10px] font-mono uppercase bg-red-950/60 text-red-300 hover:bg-red-900/80 backdrop-blur-md border border-red-500/20"
                >
                  <X className="w-3 h-3 mr-1.5" />
                  Remove
                </Button>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 z-20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-amber-400/10 border border-amber-200/30 flex items-center justify-center text-amber-200">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white truncate max-w-[200px]">
                    {file?.name || "diamond_solitaire_master.png"}
                  </p>
                  <p className="text-[10px] font-mono text-neutral-400">Resolution: 3840x2160 • Color Space: sRGB</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase mr-1">Load Demo Asset:</span>
                <button 
                  onClick={() => useSampleImage("/hero-ring.png")}
                  className={`w-7 h-7 rounded border transition-all ${preview === "/hero-ring.png" ? "border-amber-200 ring-2 ring-amber-400/20" : "border-white/10 opacity-60 hover:opacity-100"}`}
                >
                  <img src="/hero-ring.png" className="w-full h-full object-cover rounded-[2px]" />
                </button>
                <button 
                  onClick={() => useSampleImage("/emerald-necklace.png")}
                  className={`w-7 h-7 rounded border transition-all ${preview === "/emerald-necklace.png" ? "border-amber-200 ring-2 ring-amber-400/20" : "border-white/10 opacity-60 hover:opacity-100"}`}
                >
                  <img src="/emerald-necklace.png" className="w-full h-full object-cover rounded-[2px]" />
                </button>
                <button 
                  onClick={() => useSampleImage("/gold-bracelet.png")}
                  className={`w-7 h-7 rounded border transition-all ${preview === "/gold-bracelet.png" ? "border-amber-200 ring-2 ring-amber-400/20" : "border-white/10 opacity-60 hover:opacity-100"}`}
                >
                  <img src="/gold-bracelet.png" className="w-full h-full object-cover rounded-[2px]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
