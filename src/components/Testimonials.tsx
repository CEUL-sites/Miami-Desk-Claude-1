import React from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import type { Translation } from "@/src/translations";

const Testimonials: React.FC<{ t: Translation }> = ({ t }) => {
  return (
    <section className="py-28 px-[7vw] bg-white border-b border-line-light overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-20">
          <span className="section-label">{t.testimonials.eyebrow}</span>
        </div>

        <div className="flex flex-col items-center justify-center py-20 bg-bone border border-line-light">
          <Quote className="w-12 h-12 text-gold/20 mb-8" />
          <p className="font-mono text-[9px] tracking-[3.5px] uppercase text-muted italic">
             {t.testimonials.placeholder}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
