import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Translation } from '../translations';

const ARTICLES = [
  {
    id: "01",
    title: "Why South Florida luxury inventory sat longer in Q1 2026",
    description: "A measured analysis of DOM trends across Coral Gables, Bal Harbour, and Key Biscayne.",
    tag: "Market Analysis"
  },
  {
    id: "02",
    title: "The post-merger MLS — what 93,000 agents means for a Brickell seller",
    description: "The mechanics of the May 2026 merger and its practical effect on listing exposure.",
    tag: "Institutional"
  },
  {
    id: "03",
    title: "Why the Madrid–Miami buyer corridor is real, not marketing",
    description: "Transaction data from 2024–2026 showing the specific Spanish capital flow into South Florida.",
    tag: "Capital Flow"
  }
];

export const RecentThinking: React.FC<{ t: Translation }> = ({ t }) => {
  return (
    <section className="py-40 bg-bone">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <span className="font-mono text-[9px] tracking-[4px] uppercase text-gold">Insights</span>
            <h2 className="font-serif text-6xl font-light text-navy leading-none">
              Recent <br /> <span className="italic">Thinking.</span>
            </h2>
          </div>
          <p className="font-serif text-xl text-slate max-w-md opacity-60">
            Measured commentary on current market conditions, institutional shifts, and transatlantic capital flow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ARTICLES.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-navy overflow-hidden mb-8">
                {/* Placeholder for real imagery */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />
                <div className="absolute top-8 left-8">
                   <span className="font-mono text-[9px] tracking-widest uppercase text-gold/80 px-3 py-1 border border-gold/30 rounded-full backdrop-blur-sm">
                      {article.tag}
                   </span>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                   <span className="font-mono text-4xl text-white/10">{article.id}</span>
                </div>
              </div>
              
              <h3 className="font-serif text-2xl text-navy group-hover:text-gold transition-colors mb-4 line-clamp-2">
                {article.title}
              </h3>
              <p className="font-serif text-lg text-slate leading-relaxed opacity-60 mb-6 line-clamp-3">
                {article.description}
              </p>
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[2px] uppercase text-navy group-hover:gap-4 transition-all">
                Read Publication <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentThinking;
