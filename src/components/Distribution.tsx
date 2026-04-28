import { motion } from "motion/react";
import type { Translation } from "@/src/translations";

interface DistributionProps {
  t: Translation;
}

const PORTALS = [
  "Realtor.com", "Homes.com", "Juwai", "Realopedia", "WorldProperties.com", 
  "InternationalMLS", "ProxioConnect", "GlobalPropertyXchange", "VendeTuCasa", 
  "SFPropertySearch", "CREXi", "Brevitas", "TerraFly PRO", "RealtyTrac", 
  "FloridaLivingNetwork", "RPR"
];

export default function Distribution({ t }: DistributionProps) {
  return (
    <section className="bg-bone py-28 px-[7vw]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="section-label">{t.distribution.label}</p>
        <h2 className="text-navy text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-8 max-w-2xl">
          {t.distribution.title1}<br />
          <em className="italic text-gold">{t.distribution.title2}</em>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 mt-16 border border-line">
        {[
          { n: "500+", l: "Global Portals" },
          { n: "19", l: "Languages" },
          { n: "260+", l: "U.S. MLSs" },
          { n: "437", l: "Intl. Agreements" }
        ].map((m, i) => (
          <div key={i} className="bg-white p-10 text-center border-r border-line last:border-none">
            <p className="font-serif text-5xl text-navy leading-none mb-3">{m.n}</p>
            <p className="text-mono-label text-muted">{m.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 border-t border-line pt-10 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...PORTALS, ...PORTALS].map((p, i) => (
            <span key={i} className="font-mono text-[10px] tracking-[1.5px] uppercase text-slate bg-white border border-line px-5 py-2 mx-2">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
