import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Translation } from "@/src/translations";

interface HeroProps {
  t: Translation;
}

const SLIDES = [
  {
    id: "miami-aerial",
    url: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: "luxury-living",
    url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: "skyscrapers",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: "modern-villa",
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2000",
  },
];

export default function Hero({ t }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-navy">
      {/* Cinematic Reel Background */}
      <div className="absolute inset-0 z-0">
        {!prefersReducedMotion ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero/01-brickell-skyline-dusk.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/images/hero/hero-loop.mp4" type="video/mp4" />
            {/* Fallback to images if video not available or supported */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div 
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${SLIDES[currentSlide].url})` }}
                />
              </motion.div>
            </AnimatePresence>
          </video>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${SLIDES[currentSlide].url})` }}
              />
            </motion.div>
          </AnimatePresence>
        )}
        {/* Overlays for contrast */}
        <div className="absolute inset-0 bg-navy/50 mix-blend-multiply z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/90 z-[2]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-[9px] tracking-[4px] uppercase text-gold mb-8 block"
          >
            {t.hero.label}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white text-5xl md:text-8xl lg:text-[9.5rem] font-serif font-light leading-[0.92] tracking-tight mb-12"
          >
            {t.hero.title.line1}<br />
            {t.hero.title.line2}<br />
            <em className="italic text-gold">{t.hero.title.line3}</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="italic font-serif text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] leading-[1.35] text-gold-light border-l border-gold pl-8 max-w-2xl font-light mb-16"
          >
            {t.hero.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <button className="btn-gold" onClick={() => document.getElementById('valuation')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.hero.ctaList}
            </button>
            <button className="btn-ghost" onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.hero.ctaActivate}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats Readouts */}
      <div className="absolute right-[7vw] top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-12 items-end">
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5 }}
          src="/clhms-logo.png" 
          alt="CLHMS Certified"
          className="w-20 h-20 mb-4"
        />
        {[
          { n: "25", l: t.stats.experience },
          { n: "93K", l: t.stats.members },
          { n: "$69B", l: t.stats.volume }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + (i * 0.1) }}
            className="flex flex-col items-end"
          >
            <span className="font-serif text-4xl text-gold-light leading-none">{stat.n}</span>
            <span className="text-mono-label text-white/30 mt-2">{stat.l}</span>
          </motion.div>
        ))}
      </div>

      {/* Visual Accent */}
      <div className="absolute right-[7vw] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent z-5" />

      {/* Progress Bar (Visual only to match design) */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gold z-20 animate-[progress_8s_linear_infinite]" style={{ width: '100%' }} />
    </section>
  );
}
