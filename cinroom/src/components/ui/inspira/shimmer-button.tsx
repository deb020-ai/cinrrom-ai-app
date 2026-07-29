"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.1em",
      shimmerDuration = "2.5s",
      borderRadius = "0.75rem",
      background = "linear-gradient(135deg, #dc2626 0%, #990000 100%)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white border border-red-400/40 shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          "rounded-[var(--radius)] [background:var(--bg)]",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]"
          )}
        >
          {/* spark */}
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [linear-gradient(0deg,transparent_0%,var(--shimmer-color)_50%,transparent_100%)] [offset-path:rect(0_100%_100%_0_round_var(--radius))]" />
        </div>
        {children}

        {/* highlight */}
        <div
          className={cn(
            "inset-0 flex size-full transform-gpu self-none transition-all duration-300 ease-in-out font-semibold text-white pointer-events-none"
          )}
        />

        {/* backdrop glow */}
        <div className="absolute -inset-px -z-20 rounded-[var(--radius)] bg-gradient-to-r from-red-600 via-rose-600 to-red-800 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
