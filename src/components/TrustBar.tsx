import { siteContent } from "@/src/content/site";

export default function TrustBar() {
  return (
    <div className="sticky top-[72px] z-40 w-full bg-white/95 border-b border-line-light backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="font-mono text-[8.5px] tracking-[2px] uppercase text-navy/60 leading-relaxed">
          {siteContent.licenseDisplay} · {siteContent.brokerage}
        </p>
        <div className="flex flex-wrap gap-4 md:gap-8">
          {siteContent.brokerageFacts.map((fact) => (
            <span key={fact} className="font-mono text-[8px] tracking-[2px] uppercase text-gold/80">
              {fact}
            </span>
          ))}
import React from 'react';
import { motion } from 'motion/react';

export const TrustBar = () => {
  return (
    <div className="sticky top-20 z-40 w-full h-[60px] bg-white border-b border-black/5 backdrop-blur-md flex items-center overflow-hidden">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-8 md:gap-16 grayscale opacity-40 hover:opacity-80 transition-all overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-mono text-[9px] tracking-widest text-navy">REALTOR®</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-mono text-[9px] tracking-widest text-navy">CLHMS™</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-mono text-[9px] tracking-widest text-navy">MIAMI REALTORS®</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-mono text-[9px] tracking-widest text-navy">UNITED REALTY GROUP</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-mono text-[9px] tracking-widest text-navy">EQUAL HOUSING</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-12">
           <span className="font-mono text-[8px] tracking-[3px] text-navy/40">LICENSED FLORIDA PRINCIPAL · 2001—2026</span>
        </div>
      </div>
    </div>
  );
}
};

export default TrustBar;
