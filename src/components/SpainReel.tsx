import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Translation } from "@/src/translations";

const SLIDES = [
  { 
    id: "es1", 
    url: "/images/spain/marbella-villa.jpg", 
    alt: "Marbella hilltop villa",
    fallback: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000"
  },
  { 
    id: "es2", 
    url: "/images/spain/madrid-salamanca.jpg", 
    alt: "Madrid Barrio de Salamanca",
    fallback: "https://images.unsplash.com/photo-1543783232-261ce8449f19?auto=format&fit=crop&q=80&w=2000"
  },
  { 
    id: "es3", 
    url: "/images/spain/ibiza-cliff-house.jpg", 
    alt: "Ibiza cliff-edge villa",
    fallback: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=2000"
  },
];

export default function SpainReel({ t }: { t: Translation }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="international" className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-[-8%] animate-kenburns bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${SLIDES[currentSlide].url}), url(${SLIDES[currentSlide].fallback})`
            }}
            role="img"
            aria-label={SLIDES[currentSlide].alt}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-navy/30 to-navy/70 z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent z-1" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 w-full relative z-10 flex flex-col items-end text-right">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-mono-label text-gold-light mb-5"
        >
          {t.international.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-white text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.05] max-w-2xl"
        >
           {t.international.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-base text-white/60 leading-[1.85] max-w-md mt-6 font-light"
        >
          {t.international.body}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-10 px-8 py-4 border border-gold/50 bg-navy/40 backdrop-blur-sm text-gold-light font-mono text-[10px] tracking-[2.5px] uppercase hover:bg-gold/15 transition-all"
        >
          {t.international.cta}
        </motion.button>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 bg-gold z-20 animate-[progress_7s_linear_infinite]" style={{ width: '100%' }} />
    </section>
  );
}
