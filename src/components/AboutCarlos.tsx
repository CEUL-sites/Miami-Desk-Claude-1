import { motion } from "motion/react";
import type { Translation } from "@/src/translations";

interface AboutProps {
  t: Translation;
}

export default function AboutCarlos({ t }: AboutProps) {
  return (
    <section id="about" className="bg-navy py-28 px-[7vw] grid grid-cols-1 md:grid-cols-[220px_1fr] gap-20 items-start">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="w-[220px] h-[280px] bg-gradient-to-br from-[#1e3a5f] via-[#2a5080] to-[#3d6fa0] relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/70" />
          <div className="absolute bottom-4 left-4 font-serif italic text-sm text-white/40">
            Carlos Uzcategui
          </div>
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
            alt="Carlos Uzcategui"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <div className="section-label" style={{ color: 'var(--color-gold)' }}>The Principal</div>
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-[1.2] mb-6">
          Carlos Uzcategui<br />
          Florida Licensed Realtor®<br />
          Since 2001
        </h2>

        <div className="flex flex-wrap gap-3 mb-10">
           {["CLHMS", "25 YEARS", "UNITED REALTY GROUP", "MIAMI ASSOCIATION"].map(badge => (
             <span key={badge} className="font-mono text-[9px] tracking-[2px] uppercase border border-gold/35 text-gold-light px-4 py-1.5 bg-gold/5">
                {badge}
             </span>
           ))}
        </div>

        <p className="text-white/50 text-[0.88rem] leading-[1.9] mb-6 max-w-2xl font-light">
          Twenty-five years as a licensed principal in South Florida is not a credential — it is a record of discretion. High-net-worth clients, complex international transactions, and off-market negotiations require a principal who has seen every market cycle, every regulatory shift, and every negotiation dynamic this market produces.
        </p>
        <p className="text-white/50 text-[0.88rem] leading-[1.9] mb-10 max-w-2xl font-light">
          As a member of the Miami and South Florida REALTORS® — 93,000 members, the largest local Realtor association in the world — Carlos's listings benefit from the deepest professional network and the widest global distribution platform in the industry.
        </p>

        <button className="btn-gold">
          Schedule a confidential consultation →
        </button>
      </motion.div>
    </section>
  );
}
