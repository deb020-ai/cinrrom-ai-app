import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinroom - Premium AI Jewelry Video & Image Studio",
  description: "Luxury Jewelry Videos & Editorial Photography. Generated in Minutes.",
};

import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import { CookieBanner } from "@/components/shared/cookie-banner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <PostHogProvider>
          <SmoothScrollProvider>
            <TooltipProvider>
              {children}
              <CookieBanner />
            </TooltipProvider>
          </SmoothScrollProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
