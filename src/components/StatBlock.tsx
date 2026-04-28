import { motion } from "motion/react";
import type { Translation } from "@/src/translations";

interface StatBlockProps {
  t: Translation;
}

export default function StatBlock({ t }: StatBlockProps) {
  return (
    <section className="bg-navy py-28 px-[7vw] grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="font-serif text-[clamp(8rem,18vw,16rem)] font-light text-gold leading-none tracking-[-4px] relative inline-block">
          {t.buyerArgument.stat}
          <span className="absolute top-[0.1em] -right-[0.3em] text-[0.3em] text-gold-light tracking-normal">
            {t.buyerArgument.statPercent}
          </span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[2px] text-white/25 mt-2">
          {t.buyerArgument.statLabel}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl leading-[1.2] mb-6">
          {t.buyerArgument.title1}<br />
          <em className="italic text-gold-light">{t.buyerArgument.title2}</em>
        </h2>
        <p className="text-white/55 text-sm md:text-base leading-[1.9] mb-4 font-light">
          {t.buyerArgument.body}
        </p>
        <div className="mt-8 p-6 border-l border-gold bg-gold/5">
          <p className="text-white/75 text-sm md:text-base leading-[1.8] font-light italic">
            {t.buyerArgument.insight}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
