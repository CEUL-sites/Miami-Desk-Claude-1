import { motion } from "motion/react";
import type { Translation } from "@/src/translations";
import EditorialFigure from "./EditorialFigure";

interface AboutProps {
  t: Translation;
}

export default function AboutCarlos({ t }: AboutProps) {
  return (
    <section id="about" className="bg-navy py-40 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="space-y-6">
              <span className="font-mono text-[9px] tracking-[4px] uppercase text-gold">The Principal</span>
              <h2 className="text-white text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-light leading-[1.05] tracking-tight">
                Carlos Uzcategui.<br />
                <span className="italic text-gold">Licensed Since 2001.</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
               {["CLHMS™", "25+ Years Experience", "United Realty Group", "Miami Realtors Delegate"].map(badge => (
                 <span key={badge} className="font-mono text-[9px] tracking-[2.5px] uppercase border border-white/10 text-white/50 px-5 py-2 hover:border-gold/50 hover:text-gold transition-all cursor-default">
                    {badge}
                 </span>
               ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12 pt-8">
              <p className="font-serif text-xl text-white/50 leading-relaxed italic border-l border-gold/30 pl-8">
                "Twenty-five years as a licensed principal in South Florida is not a credential — it is a record of discretion."
              </p>
              <div className="space-y-6">
                <p className="font-serif text-lg text-white/40 leading-relaxed">
                  High-net-worth clients, complex international transactions, and off-market negotiations require a principal who has seen every market cycle, every regulatory shift, and every negotiation dynamic this market produces.
                </p>
                <p className="font-serif text-lg text-white/40 leading-relaxed">
                  As a member of the Miami and South Florida REALTORS® — 93,000 members — Carlos's listings benefit from the deepest professional network and the widest global distribution platform in the world.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <button className="btn-gold px-12 py-5 text-sm uppercase tracking-[3px]">
                Schedule a confidential consultation
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <EditorialFigure 
              src="/Carlos Uzcategui headshot CEUL headshot.png"
              alt="Carlos Uzcategui"
              caption="Carlos Uzcategui · Principal of Record"
              aspectRatio="aspect-[4/5]"
              imageClassName="grayscale-0"
            />
            
            <div className="grid grid-cols-2 gap-6">
               <EditorialFigure 
                src="https://images.unsplash.com/photo-1541914283415-38527a00d02a?auto=format&fit=crop&q=80&w=800"
                alt="Environmental context"
                caption="Coral Gables context"
                aspectRatio="aspect-[3/4]"
              />
               <EditorialFigure 
                src="https://images.unsplash.com/photo-1628592102751-ba83b03bc677?auto=format&fit=crop&q=80&w=800"
                alt="Environmental context"
                caption="Weston Office"
                aspectRatio="aspect-[3/4]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
