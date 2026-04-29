import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteContent } from "@/src/content/site";
import type { Translation } from "@/src/translations";

interface HeroProps {
  t: Translation;
}

const SLIDES = [
  {
    id: "miami-waterfront",
    url: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&q=85&w=2200",
  },
  {
    id: "south-florida-home",
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=85&w=2200",
  },
  {
    id: "madrid-architecture",
    url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&q=85&w=2200",
  },
];

export default function Hero({ t }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[760px] h-screen flex items-center overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={SLIDES[currentSlide].id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDES[currentSlide].url})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-navy/60 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy z-[2]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10 pt-24">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-mono-label text-gold mb-6 block"
          >
            {siteContent.licenseDisplay} · {siteContent.brokerage}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="text-white text-5xl md:text-7xl lg:text-[8.25rem] font-serif font-light leading-[0.94] mb-8"
          >
            Sell your South Florida home with a Miami and Spain-facing desk.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="font-serif text-2xl md:text-3xl text-gold-light leading-[1.35] max-w-3xl mb-12"
          >
            Carlos helps homeowners prepare, price, and expose their property through professional representation, United Realty Group infrastructure, and The Miami Desk international referral platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="flex flex-wrap gap-4"
          >
            <button className="btn-gold inline-flex items-center gap-4" onClick={() => document.getElementById("valuation")?.scrollIntoView({ behavior: "smooth" })}>
              Request a Seller Strategy Review <ArrowRight className="w-4 h-4" />
            </button>
            <a className="btn-ghost inline-flex items-center gap-4" href={siteContent.whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp Carlos <MessageCircle className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12 lg:left-24 lg:right-24 z-10 flex flex-wrap gap-6 text-white/45 text-[10px] font-mono uppercase tracking-[2px]">
        <span>South Florida Sellers</span>
        <span>Madrid / Spain Exposure</span>
        <span>Agent Distribution</span>
        <span>AI-Assisted Intake Coming Soon</span>
      </div>
    </section>
  );
}
