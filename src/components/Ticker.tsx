import { motion } from "motion/react";

const PORTALS = [
  "Realtor.com", "Homes.com", "Juwai", "WorldProperties.com", "InternationalMLS", 
  "ProxioConnect", "GlobalPropertyXchange", "VendeTuCasa", "CREXi", "Brevitas", 
  "TerraFly PRO", "Realopedia", "FloridaLivingNetwork"
];

export default function Ticker() {
  return (
    <div className="bg-navy py-4 border-t border-gold/15 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...PORTALS, ...PORTALS].map((portal, i) => (
          <div key={i} className="flex items-center gap-8 px-8 group">
            <span className="font-mono text-[10px] tracking-[2px] uppercase text-white/35 group-hover:text-gold-light transition-colors">
              {portal} <span className="text-gold/50 ml-4">·</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
