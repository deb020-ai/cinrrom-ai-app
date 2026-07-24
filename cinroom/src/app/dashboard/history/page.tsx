import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, MoreVertical, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const historyItems = [
  {
    id: "1",
    name: "Diamond Ring - Summer Campaign",
    date: "Oct 24, 2026",
    status: "Completed",
    template: "Luxury Rotation",
    thumbnail: "",
  },
  {
    id: "2",
    name: "Emerald Necklace Showcase",
    date: "Oct 23, 2026",
    status: "Rendering",
    template: "Hero Reveal",
    thumbnail: "",
  },
  {
    id: "3",
    name: "Sapphire Earrings IG Reel",
    date: "Oct 20, 2026",
    status: "Failed",
    template: "Instagram Reel Fast",
    thumbnail: "",
  },
  {
    id: "4",
    name: "Gold Bracelet Close-up",
    date: "Oct 15, 2026",
    status: "Completed",
    template: "Macro Close-up",
    thumbnail: "",
  }
];

export default function HistoryPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Generation History</h1>
        <p className="text-muted-foreground">View and manage your previously generated videos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {historyItems.map((item) => (
          <Card key={item.id} className="group bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-neutral-900 border-b border-white/10 flex items-center justify-center overflow-hidden">
                {/* Fake Thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 opacity-50" />
                
                {item.status === "Completed" && (
                  <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-sm">
                    <Play className="w-5 h-5 text-white ml-1" />
                  </div>
                )}

                {item.status === "Rendering" && (
                  <div className="flex flex-col items-center gap-2 z-10">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-medium text-primary">Rendering...</span>
                  </div>
                )}

                <div className="absolute top-2 right-2 z-10">
                  <Badge 
                    variant={item.status === "Completed" ? "default" : item.status === "Rendering" ? "secondary" : "destructive"}
                    className={
                      item.status === "Completed" ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" :
                      item.status === "Rendering" ? "bg-primary/20 text-primary hover:bg-primary/30" :
                      "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-white truncate" title={item.name}>{item.name}</h3>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white -mt-1 shrink-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Template: <span className="text-white/80">{item.template}</span></p>
                  <p>Date: <span className="text-white/80">{item.date}</span></p>
                </div>

                {item.status === "Completed" && (
                  <Button variant="secondary" className="w-full mt-4 bg-white/10 text-white hover:bg-white/20">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Project
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
