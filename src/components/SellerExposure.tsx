import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Network, Presentation, ShieldCheck } from "lucide-react";
import { siteContent } from "@/src/content/site";

const cards = [
  {
    icon: Network,
    title: "Agent-to-agent exposure",
    body: "Your property is positioned for the agents already advising qualified South Florida, Madrid, Spain, and Latin American buyers."
  },
  {
    icon: Presentation,
    title: "Professional presentation",
    body: "Pricing, photography, narrative, and launch timing are planned before the listing is published."
  },
  {
    icon: ShieldCheck,
    title: "Licensed representation",
    body: "Carlos leads the seller conversation directly as a Florida Licensed Realtor® associated with United Realty Group."
  }
];

export default function SellerExposure() {
  return (
    <section id="seller-exposure" className="bg-white py-28 px-[7vw] border-t border-line-light">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="section-label">Seller Exposure Advantage</span>
          <h2 className="text-4xl md:text-6xl font-serif leading-[1.08] text-navy max-w-3xl">
            South Florida sellers need more than a listing. They need a launch strategy.
          </h2>
          <p className="body-editorial">
            The Miami Desk helps prepare a property for professional exposure across the Miami MLS ecosystem,
            United Realty Group infrastructure, agent relationships, and international referral conversations.
          </p>
          <a href="#valuation" className="btn-gold inline-flex items-center gap-4 w-fit">
            Request a Seller Strategy Review <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-bone border border-line-light p-8"
              >
                <Icon className="w-6 h-6 text-gold mb-8" />
                <h3 className="text-2xl font-serif mb-4 text-navy">{card.title}</h3>
                <p className="text-sm leading-[1.8] text-muted">{card.body}</p>
              </motion.div>
            );
          })}
          <div className="bg-navy p-8 border border-gold/20">
            <p className="text-mono-label text-gold mb-5">Verified Identity</p>
            <p className="font-serif text-2xl text-white leading-snug mb-4">{siteContent.principal}</p>
            <p className="text-sm leading-[1.8] text-white/50">{siteContent.licenseDisplay}<br />{siteContent.brokerage}</p>
            <ul className="mt-6 space-y-3">
              {siteContent.brokerageFacts.map((fact) => (
                <li key={fact} className="flex gap-3 text-xs text-white/55 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
