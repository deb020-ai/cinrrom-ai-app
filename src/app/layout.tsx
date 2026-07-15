import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CINROOM | Luxury Visual Maison",
  description: "We create cinematic worlds for luxury jewelry brands.",
};

import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileCta from "@/components/layout/StickyMobileCta";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} dark`}>
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1654405178966771');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans selection:bg-primary selection:text-background cursor-none">
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1654405178966771&ev=PageView&noscript=1" alt="" />
        </noscript>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <StickyMobileCta />
        </SmoothScroll>
      </body>
    </html>
  );
}
