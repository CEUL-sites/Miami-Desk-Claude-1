import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SLIDES = [
  { id: "ag1", bg: "linear-gradient(155deg, #050A15 0%, #0A1828 25%, #102540 45%, #183858 60%, #205080 78%, #3878B0 92%, #60A8E0 100%)" },
  { id: "ag2", bg: "linear-gradient(170deg, #030810 0%, #060F1E 25%, #0A1830 45%, #102840 60%, #1A3850 78%, #2A5070 92%, #4888B0 100%)" },
  { id: "ag3", bg: "linear-gradient(160deg, #060408 0%, #110A0F 25%, #201015 45%, #381520 60%, #581830 75%, #882848 88%, #B05878 100%)" },
];

export default function NetworkReel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="network" className="relative h-[85vh] min-h-[580px] flex items-center overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-[-8%] animate-kenburns"
            style={{ background: SLIDES[currentSlide].bg, backgroundSize: 'cover' }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/45 via-navy/20 to-navy/75 z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-transparent z-1" />
      </div>

      <div className="max-w-[1440px] mx-auto px-[7vw] w-full relative z-10 flex flex-col justify-end h-full pb-[7vh]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-mono-label text-gold-light mb-5"
        >
          United Realty Group · Miami and South Florida REALTORS®
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-white text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.05] max-w-3xl"
        >
          List here.<br />Reach <em className="italic text-gold-light">every agent</em><br />in the world's<br />wealthiest market.
        </motion.h2>
        <div className="flex flex-wrap gap-4 mt-8">
          {[
            "93,000 member agents",
            "3,500+ URG agents",
            "20 South Florida offices",
            "Active outreach campaigns",
            "HNW buyer pipeline"
          ].map((pill) => (
            <span key={pill} className="font-mono text-[9px] tracking-[2px] uppercase text-white/60 bg-navy/40 backdrop-blur-md px-4 py-2 border border-white/15">
              {pill}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute right-[8vw] top-1/2 -translate-y-1/2 z-10 text-right opacity-20">
        <p className="font-serif text-[clamp(5rem,14vw,12rem)] font-light text-gold-light leading-none tracking-[-4px]">93K</p>
        <p className="font-mono text-[9px] tracking-[2px] uppercase text-white/30 -mt-2">Member Agents</p>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 bg-gold z-20 animate-[progress_5.5s_linear_infinite]" style={{ width: '100%' }} />
    </section>
  );
}
