"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Monitor, Smartphone, Square, Wand2, Settings2 } from "lucide-react";
import { motion } from "framer-motion";

export default function GenerateSettingsPage() {
  const router = useRouter();
  
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("10s");
  const [resolution, setResolution] = useState("4K");
  const [motionSpeed, setMotionSpeed] = useState("Medium");
  const [background, setBackground] = useState("Luxury Studio");

  const handleGenerate = () => {
    // In a real app, this would dispatch to a store or API
    router.push("/dashboard/render");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Configure Video</h1>
        <p className="text-muted-foreground">Fine-tune the output settings for your jewelry video.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Preview (Mock) */}
        <div className="md:col-span-1 space-y-4">
          <div className="aspect-[9/16] bg-black rounded-xl overflow-hidden relative border border-white/10 flex items-center justify-center">
             <div className="text-center p-6 text-muted-foreground flex flex-col items-center gap-3">
               <Wand2 className="w-8 h-8 opacity-50" />
               <p className="text-sm">Preview will be available during generation.</p>
             </div>
          </div>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated Cost:</span>
              <span className="text-white font-medium">1 Generation Credit</span>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Settings */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <Settings2 className="w-5 h-5 text-primary" />
                Output Settings
              </CardTitle>
              <CardDescription>Select the format and quality for your video.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Aspect Ratio */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white">Aspect Ratio</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "16:9", icon: Monitor, label: "Landscape" },
                    { id: "9:16", icon: Smartphone, label: "Portrait" },
                    { id: "1:1", icon: Square, label: "Square" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setAspectRatio(option.id)}
                      className={`flex flex-col items-center justify-center py-4 rounded-lg border transition-all ${
                        aspectRatio === option.id 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <option.icon className="w-5 h-5 mb-2" />
                      <span className="text-xs font-medium">{option.id}</span>
                      <span className="text-[10px] opacity-70">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white">Duration</label>
                <div className="grid grid-cols-3 gap-3">
                  {["5s", "10s", "15s"].map((val) => (
                    <button
                      key={val}
                      onClick={() => setDuration(val)}
                      className={`py-2 rounded-md text-sm transition-all border ${
                        duration === val 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-transparent bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white">Resolution</label>
                <div className="grid grid-cols-2 gap-3">
                  {["1080p", "4K"].map((val) => (
                    <button
                      key={val}
                      onClick={() => setResolution(val)}
                      className={`py-2 rounded-md text-sm transition-all border ${
                        resolution === val 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-transparent bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {val} {val === "4K" && <span className="text-[10px] ml-1 bg-primary text-primary-foreground px-1 py-0.5 rounded">PRO</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Motion & Background */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white">Camera Motion</label>
                  <select 
                    value={motionSpeed}
                    onChange={(e) => setMotionSpeed(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="Slow">Slow & Elegant</option>
                    <option value="Medium">Medium</option>
                    <option value="Fast">Fast & Dynamic</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white">Background</label>
                  <select 
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="Black">Solid Black</option>
                    <option value="White">Solid White</option>
                    <option value="Luxury Studio">Luxury Studio</option>
                    <option value="Transparent">Transparent (Alpha)</option>
                  </select>
                </div>
              </div>

            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button 
              size="lg" 
              onClick={handleGenerate}
              className="w-full sm:w-auto h-14 px-10 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Generate Video
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
