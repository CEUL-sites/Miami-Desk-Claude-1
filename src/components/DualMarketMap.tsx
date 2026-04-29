import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export const DualMarketMap = () => {
  return (
    <section className="py-40 bg-navy relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="font-mono text-[9px] tracking-[4px] uppercase text-gold">Institutional Presence</span>
              <h2 className="font-serif text-6xl font-light text-white leading-none">
                Two Markets. <br /> <span className="italic text-gold">One Desk.</span>
              </h2>
            </div>
            
            <p className="font-serif text-xl text-white/50 leading-relaxed max-w-lg">
              Miami Desk operates a continuous activation bridge between South Florida and the Iberian Peninsula. We provide on-the-ground principal presence in both lead-source and asset-destination markets.
            </p>

            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gold">
                  <MapPin className="w-5 h-5" />
                  <span className="font-mono text-xs tracking-widest uppercase">Weston HQ</span>
                </div>
                <address className="not-italic font-serif text-lg text-white/70 space-y-1">
                  <p>15951 SW 41 St #700</p>
                  <p>Weston, FL 33331</p>
                </address>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gold">
                  <MapPin className="w-5 h-5" />
                  <span className="font-mono text-xs tracking-widest uppercase">Madrid Partner</span>
                </div>
                <address className="not-italic font-serif text-lg text-white/70 space-y-1">
                  <p>Barrio de Salamanca</p>
                  <p>Madrid, ES</p>
                </address>
              </div>
            </div>
          </div>

          <div className="relative aspect-square md:aspect-[4/3] bg-white/5 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
             {/* Simple Stylized Map SVG Concept */}
             <svg viewBox="0 0 800 400" className="w-full h-auto opacity-20">
                <path d="M150,150 Q250,100 350,150 T650,150" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" strokeDasharray="4 4" />
                <circle cx="200" cy="220" r="4" fill="currentColor" className="text-gold">
                  <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="600" cy="120" r="4" fill="currentColor" className="text-gold">
                  <animate attributeName="r" values="4;8;4" dur="3.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.2;1" dur="3.2s" repeatCount="indefinite" />
                </circle>
             </svg>

             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="font-mono text-[8px] tracking-[5px] text-white/20 uppercase">Transatlantic Bridge</div>
             </div>
          </div>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
};

export default DualMarketMap;
