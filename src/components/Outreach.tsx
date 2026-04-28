import { motion } from "motion/react";

const CAMPAIGNS = [
  {
    title: "South Florida Luxury Tier",
    badge: "Active",
    desc: "Properties $1M+ in Brickell, Coral Gables, Key Biscayne, Coconut Grove, and Bal Harbour — marketed to 93,000 Miami Association member agents and 8,000+ international buyer agents.",
    stat: "93,000 agents · 500+ portals"
  },
  {
    title: "España — Miami Pipeline",
    badge: "Activating",
    desc: "Spanish and European luxury properties in active onboarding into the Miami MLS through Carlos's license. Featured on Juwai, Realopedia, and GlobalPropertyXchange.",
    stat: "Marbella · Ibiza · Barcelona"
  },
  {
    title: "LATAM Buyer Mandates",
    badge: "Open",
    desc: "Active buyer mandates from Venezuela, Colombia, Brazil, Argentina, and Mexico — HNW individuals seeking South Florida residential and investment property.",
    stat: "$500K – $25M Range · Active 2026"
  }
];

const STEPS = [
  { num: "01", t: "MLS Activation", d: "Your listing enters the Miami MLS and propagates across 260+ U.S. MLSs and 500+ global portals in 19 languages within 24 hours." },
  { num: "02", t: "Agent Intelligence", d: "Direct outreach via the MIAMI Association network. We target agents with active buyer mandates in your exact price bracket and zone." },
  { num: "03", t: "International Activation", d: "Via 437 signed international agreements and Juwai, reaching HNW buyers in Spain, LATAM, and Asia-Pacific." }
];

export default function Outreach() {
  return (
    <section className="bg-navy-light py-28 px-[7vw] grid grid-cols-1 lg:grid-cols-2 gap-20 items-start overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-label">Active Agent Outreach</div>
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl leading-[1.2] mb-8">
          We don't just list.<br />
          We <em className="italic text-gold-light">campaign</em><br />
          to agents.
        </h2>
        <p className="text-white/55 text-sm md:text-base leading-[1.9] mb-12 font-light max-w-lg">
          The Miami Desk goes further than any portal. We identify which agents in the 93,000-member association have active buyer mandates in your price range and zone, and we reach them directly.
        </p>

        <div className="space-y-6">
          {STEPS.map((step) => (
            <div key={step.num} className="flex gap-6 py-6 border-b border-gold/10 last:border-none">
              <span className="font-serif text-3xl text-gold-light/40 leading-none min-w-[3rem]">{step.num}</span>
              <div>
                <p className="font-mono text-[10px] tracking-[2px] uppercase text-gold-light mb-2">{step.t}</p>
                <p className="text-sm text-white/60 leading-relaxed font-light">{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-4"
      >
        {CAMPAIGNS.map((c) => (
          <div key={c.title} className="bg-white/[0.04] border border-gold/15 p-8 transition-colors hover:border-gold/40 group">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-serif text-2xl text-white font-light">{c.title}</h3>
              <span className="font-mono text-[9px] tracking-[2px] uppercase bg-gold/15 text-gold-light px-3 py-1 border border-gold/20">
                {c.badge}
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed font-light mb-6">{c.desc}</p>
            <p className="font-mono text-[9px] tracking-[2px] uppercase text-gold font-medium">{c.stat}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
