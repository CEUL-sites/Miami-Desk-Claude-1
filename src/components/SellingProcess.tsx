import React from "react";
import { motion } from "motion/react";
import type { Translation } from "@/src/translations";

const SellingProcess: React.FC<{ t: Translation }> = ({ t }) => {
  return (
    <section id="method" className="py-28 px-[7vw] bg-navy overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-20">
          <span className="section-label !text-gold/60">{t.sellingProcess.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] max-w-2xl">
            {t.sellingProcess.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
          {t.sellingProcess.steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="font-mono text-gold text-xs tracking-[4px] mb-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                0{index + 1}
              </div>
              <h3 className="text-xl font-medium text-white mb-4 group-hover:text-gold transition-colors duration-500">
                {step.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-[320px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="flex flex-col justify-center items-start lg:items-center bg-white/5 border border-white/10 p-12 lg:text-center"
          >
             <h3 className="text-xl font-serif text-white mb-6">Ready to begin?</h3>
             <a href="#valuation" className="btn-gold py-4 px-8 w-full lg:w-fit">
               {t.sellingProcess.cta}
             </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SellingProcess;
