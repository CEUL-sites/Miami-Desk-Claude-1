import { motion } from "motion/react";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { siteContent } from "@/src/content/site";

export default function ContactUs() {
  return (
    <section id="contact" className="py-28 px-[7vw] bg-navy overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,132,74,0.10)_0%,transparent_55%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-16 relative z-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="section-label !text-gold/70">Contact / WhatsApp CTA</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-[1.05]">
            Start with a confidential seller strategy review.
          </h2>
          <p className="text-white/50 text-lg leading-[1.8] font-light max-w-2xl">
            Share your property address and timing, or contact Carlos directly by WhatsApp, phone, or email. The seller form above is configured for Netlify Forms.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#valuation" className="btn-gold inline-flex items-center gap-4">
              Request Review <ArrowRight className="w-4 h-4" />
            </a>
            <a href={siteContent.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex items-center gap-4">
              WhatsApp <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 p-8 md:p-10"
        >
          <p className="text-mono-label text-gold mb-6">Verified Contact</p>
          <h3 className="font-serif text-3xl text-white mb-5">{siteContent.principal}</h3>
          <p className="text-white/55 text-sm leading-[1.8] mb-8">
            {siteContent.licenseDisplay}<br />
            {siteContent.brokerage}<br />
            {siteContent.officeAddress}
          </p>
          <div className="space-y-4">
            <a className="flex items-center gap-4 text-white/75 hover:text-gold transition-colors" href={siteContent.directPhoneHref}>
              <Phone className="w-5 h-5 text-gold" /> {siteContent.directPhoneDisplay}
            </a>
            <a className="flex items-center gap-4 text-white/75 hover:text-gold transition-colors" href={siteContent.whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 text-gold" /> WhatsApp Carlos
            </a>
            <a className="flex items-center gap-4 text-white/75 hover:text-gold transition-colors" href={`mailto:${siteContent.email}`}>
              <Mail className="w-5 h-5 text-gold" /> {siteContent.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
