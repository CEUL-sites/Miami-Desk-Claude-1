import { motion } from "motion/react";
import { ArrowRight, Bot, CheckCircle2 } from "lucide-react";

const capabilities = [
  "Qualify seller, buyer, investor, and agency inquiries",
  "Route South Florida and Madrid / Spain requests to the right follow-up",
  "Prepare cleaner intake summaries before a personal conversation with Carlos",
  "Support English and Spanish lead qualification once activated"
];

export default function IntelligenceDesk() {
  return (
    <section id="intelligence" className="bg-white py-28 px-[7vw] border-t border-line-light">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="section-label">AI Intelligence Desk</span>
          <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] text-navy">
            AI-assisted intake is planned. The live chatbot is not active yet.
          </h2>
          <p className="body-editorial">
            The Miami Desk is being built to help qualify seller, buyer, investor, and agency inquiries before they reach Carlos. Phase 1 keeps the promise visible without launching an untested live AI workflow.
          </p>
          <a href="#valuation" className="btn-gold inline-flex items-center gap-4 w-fit">
            Request a Seller Strategy Review <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-navy border border-gold/20 p-8 md:p-12 shadow-3xl"
        >
          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-10">
            <Bot className="w-7 h-7 text-gold" />
          </div>
          <p className="text-mono-label text-gold mb-6">Phase 2 Roadmap</p>
          <ul className="space-y-5">
            {capabilities.map((item) => (
              <li key={item} className="flex gap-4 text-sm leading-[1.8] text-white/60">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
