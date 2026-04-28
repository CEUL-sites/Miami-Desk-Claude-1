import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SLIDES = [
  { id: "es1", bg: "linear-gradient(155deg, #1A0A04 0%, #3D1A08 25%, #7A3810 45%, #B86020 65%, #D89848 80%, #F0C880 92%, #FBE8C0 100%)" },
  { id: "es2", bg: "linear-gradient(170deg, #0D0805 0%, #251508 20%, #503010 40%, #8A5820 60%, #C09040 78%, #E8C870 90%, #F8E8C0 100%)" },
  { id: "es3", bg: "linear-gradient(160deg, #050D08 0%, #0A1F0F 25%, #153520 45%, #285535 65%, #508060 80%, #80B090 92%, #B0D8C0 100%)" },
];

export default function SpainReel() {
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
            className="absolute inset-[-8%] animate-kenburns"
            style={{ background: SLIDES[currentSlide].bg, backgroundSize: 'cover' }}
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
          España · LATAM · Activation Bridge
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-white text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.05] max-w-2xl"
        >
          Your European<br />estate deserves<br /><em className="italic text-gold-light">American</em><br />buyers.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-base text-white/60 leading-[1.85] max-w-md mt-6 font-light"
        >
          The wealthiest buyers in the world are represented by agents inside the Miami MLS. A Marbella villa, a Barcelona penthouse, an Ibiza estate — activated through Carlos's U.S. license, they reach that market in 48 hours.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-10 px-8 py-4 border border-gold/50 bg-navy/40 backdrop-blur-sm text-gold-light font-mono text-[10px] tracking-[2.5px] uppercase hover:bg-gold/15 transition-all"
        >
          Activate your listing in Miami MLS →
        </motion.button>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 bg-gold z-20 animate-[progress_7s_linear_infinite]" style={{ width: '100%' }} />
    </section>
  );
}
