import { motion } from "motion/react";
import { ArrowRight, Globe2, Landmark, UsersRound } from "lucide-react";
import { siteContent } from "@/src/content/site";

const points = [
  {
    icon: Landmark,
    title: "South Florida listing strategy",
    body: "Prepare the property for MLS visibility, buyer-agent conversations, and professional presentation before launch."
  },
  {
    icon: Globe2,
    title: "Madrid and Spain bridge",
    body: "Keep The Miami Desk positioned for Spanish-language exposure, referral relationships, and cross-border seller conversations."
  },
  {
    icon: UsersRound,
    title: "International referral relationships",
    body: "Support qualified introductions between owners, agencies, investors, and buyers without claiming live IDX or portal syndication until connected."
  }
];

export default function MiamiDeskBridge() {
  return (
    <section id="miami-desk" className="bg-bone py-28 px-[7vw] border-t border-line">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-16 items-end mb-16">
          <div>
            <span className="section-label">The Miami Desk</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] text-navy max-w-4xl">
              South Florida property exposure with a Madrid and Spain-facing desk.
            </h2>
          </div>
          <p className="text-muted text-base leading-[1.9] max-w-xl">
            Phase 1 keeps the international positioning, but presents it cleanly: The Miami Desk is a seller exposure platform connecting South Florida listings, United Realty Group infrastructure, professional agent distribution, and Spain-facing referral conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white border border-line-light p-8 min-h-[280px] flex flex-col"
              >
                <Icon className="w-6 h-6 text-gold mb-8" />
                <h3 className="text-2xl font-serif text-navy mb-4">{point.title}</h3>
                <p className="text-sm leading-[1.8] text-muted flex-1">{point.body}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 bg-navy text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8 justify-between">
          <div>
            <p className="text-mono-label text-gold mb-3">Exposure Notes</p>
            <p className="text-white/60 text-sm leading-[1.8] max-w-3xl">
              {siteContent.exposureNotes.join(" · ")}
            </p>
          </div>
          <a href="#valuation" className="btn-gold inline-flex items-center gap-4 shrink-0">
            Request a Seller Strategy Review <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
