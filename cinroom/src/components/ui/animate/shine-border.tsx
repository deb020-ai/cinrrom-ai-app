"use client";

import { cn } from "@/lib/utils";

type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: React.ReactNode;
}

export function ShineBorder({
  borderRadius = 16,
  borderWidth = 1,
  duration = 10,
  color = ["#ef4444", "#990000", "#ffffff"],
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative grid min-h-[60px] w-full place-items-center rounded-[var(--border-radius)] p-px bg-[#0a0a0d]",
        className
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${
              Array.isArray(color) ? color.join(",") : color
            },transparent,transparent)`,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none before:bg-shine-border absolute inset-0 size-full rounded-[var(--border-radius)] p-[var(--border-width)] [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:var(--mask-linear-gradient)]",
          "before:absolute before:aspect-square before:w-full before:animate-shine-border before:opacity-[0.4] before:[background-image:var(--background-radial-gradient)]"
        )}
      />
      {children}
    </div>
  );
}
