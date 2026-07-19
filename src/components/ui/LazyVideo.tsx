"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  posterSrc?: string;
  priority?: boolean;
}

export const LazyVideo = ({ 
  src, 
  posterSrc, 
  priority = false, 
  className,
  ...props 
}: LazyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIntersecting] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(priority);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          videoRef.current?.play().catch(() => {
            // Autoplay may be blocked by browser, ignore quietly
          });
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "0px" } // Stricter lazy loading for performance
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Poster Image (Visible until video is fully loaded/playing) */}
      {!isLoaded && posterSrc && (
        <Image
          src={posterSrc}
          alt="Video Poster"
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover z-10"
          placeholder={posterSrc.includes('unsplash') ? 'empty' : 'blur'}
          blurDataURL={posterSrc}
        />
      )}

      {/* Loading Spinner for when there is no poster and video is loading */}
      {!isLoaded && !posterSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10">
          <div className="w-8 h-8 md:w-10 md:h-10 border-[3px] border-white/10 border-t-white/80 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Actual Video */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100 z-20' : 'opacity-0'}`}
        preload={priority ? "auto" : "none"}
        autoPlay={priority}
        muted={props.muted !== undefined ? props.muted : true}
        loop
        playsInline
        onCanPlay={() => setIsLoaded(true)}
        {...props}
      >
        {isIntersecting && <source src={src} type="video/mp4" />}
      </video>
    </div>
  );
};
