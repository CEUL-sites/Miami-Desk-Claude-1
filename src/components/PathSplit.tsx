import { motion } from "motion/react";
import type { Translation } from "@/src/translations";

interface PathsProps {
  t: Translation;
}

export default function PathSplit({ t }: PathsProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[65vh]">
      {/* Path 1: Sellers */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center px-[5vw] py-24 bg-bone-dark border-r border-line"
      >
        <p className="font-mono text-[9px] tracking-[3px] uppercase text-gold mb-6">{t.paths.seller.label}</p>
        <h3 className="text-navy text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-10 leading-[1.2]">
          Your property.<br />Every buyer<br />in the world.
        </h3>
        <p className="text-muted text-sm leading-[1.85] font-light max-w-md mb-8">
          25 years of hyperlocal South Florida market knowledge means your listing is priced to attract competition, not concessions — then backed by the most powerful distribution network in the industry.
        </p>
        <button className="btn-gold w-fit" onClick={() => document.getElementById('list')?.scrollIntoView({ behavior: 'smooth' })}>
          {t.paths.seller.cta}
        </button>
      </motion.div>

      {/* Path 2: Agency Bridge */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center px-[5vw] py-24 bg-navy"
      >
        <p className="font-mono text-[9px] tracking-[3px] uppercase text-gold mb-6">{t.paths.agency.label}</p>
        <h3 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-10 leading-[1.2]">
          Your inventory.<br />The Miami MLS.<br /><em className="italic text-gold-light">Our license.</em>
        </h3>
        <p className="text-white/50 text-sm leading-[1.85] font-light max-w-md mb-8">
          Carlos is the licensed principal of record that activates your European or Latin American inventory into the U.S. professional ecosystem — from the MLS to 500 global portals in 48 hours.
        </p>
        <button className="btn-gold w-fit" onClick={() => document.getElementById('international')?.scrollIntoView({ behavior: 'smooth' })}>
          {t.paths.agency.cta}
        </button>
      </motion.div>
    </section>
  );
}
