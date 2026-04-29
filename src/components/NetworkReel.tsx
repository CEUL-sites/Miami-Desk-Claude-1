import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SLIDES = [
  { 
    id: "ag1", 
    url: "/images/network/miami-aerial-night.jpg",
    fallback: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?auto=format&fit=crop&q=80&w=2000"
  },
  { 
    id: "ag2", 
    url: "/images/network/coral-gables-aerial-day.jpg",
    fallback: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&q=80&w=2000"
  },
  { 
    id: "ag3", 
    url: "/images/network/sunny-isles-towers.jpg",
    fallback: "https://images.unsplash.com/photo-1549467793-02079e2b58ea?auto=format&fit=crop&q=80&w=2000"
  },
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
            className="absolute inset-[-8%] animate-kenburns bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${SLIDES[currentSlide].url}), url(${SLIDES[currentSlide].fallback})`
            }}
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
