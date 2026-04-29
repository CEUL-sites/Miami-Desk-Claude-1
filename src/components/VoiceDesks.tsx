import React from "react";
import { motion } from "motion/react";
import { Mic2, ArrowRight } from "lucide-react";
import type { Translation } from "@/src/translations";

const VoiceDesks: React.FC<{ t: Translation }> = ({ t }) => {
  return (
    <section id="voice-desks" className="py-28 px-[7vw] bg-white border-t border-line-light overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-20">
          <span className="section-label">{t.voice.label}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy leading-[1.1] mb-6">
            {t.voice.title}
          </h2>
          <p className="text-muted text-lg leading-[1.8] max-w-[580px]">
            {t.voice.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(t.voice.agents).map(([key, agent], index) => {
            const agentData = agent as { title: string; sub: string; desc: string };
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-bone p-8 border border-line-light group hover:border-gold transition-all duration-500 flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-10 shadow-sm border border-line-light group-hover:bg-gold/5 transition-colors">
                   <Mic2 className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-xl font-serif text-navy mb-1">{agentData.title}</h3>
                <p className="text-mono-label text-gold/60 mb-6">{agentData.sub}</p>
                <p className="text-muted text-sm leading-[1.7] mb-10 flex-grow font-light">
                  {agentData.desc}
                </p>
                <button 
                  onClick={() => document.getElementById('intelligence')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-3 font-mono text-[9px] tracking-[2.5px] uppercase text-navy border-b border-navy/20 pb-2 w-fit group-hover:text-gold group-hover:border-gold transition-all"
                >
                  {t.voice.cta} <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VoiceDesks;
