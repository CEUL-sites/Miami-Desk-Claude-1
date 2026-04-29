import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight } from 'lucide-react';
import { Translation } from '../translations';

export const NetSheet: React.FC<{ t: Translation }> = ({ t }) => {
  const [listPrice, setListPrice] = useState<number>(1000000);
  const [mortgage, setMortgage] = useState<number>(0);
  const [netProceeds, setNetProceeds] = useState<number>(0);

  useEffect(() => {
    // Estimations: 
    // - 6% commission (standard placeholder)
    // - Title insurance (~0.6%)
    // - Doc stamps (FL: 0.7%)
    // - Prorated taxes and misc (~0.5%)
    const commissions = listPrice * 0.06;
    const taxes = listPrice * 0.007;
    const title = listPrice * 0.006;
    const misc = listPrice * 0.005;
    
    const proceeds = listPrice - mortgage - commissions - taxes - title - misc;
    setNetProceeds(Math.max(0, proceeds));
  }, [listPrice, mortgage]);

  return (
    <section className="py-32 bg-white border-y border-black/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-gold" />
            </div>
            <span className="font-mono text-[10px] tracking-[3px] uppercase text-gold">Financial Clarity</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-serif text-5xl font-light text-navy leading-tight">
                Calculate your <br /> <span className="italic">Institutional Net.</span>
              </h2>
              <p className="font-serif text-xl text-slate leading-relaxed opacity-70">
                A quantitative estimate of your proceeds after commissions, Florida documentary stamps, and closing costs.
              </p>

              <div className="space-y-6 pt-8">
                <div className="space-y-2">
                  <label className="font-mono text-[9px] tracking-widest uppercase text-navy/40">Estimated List Price</label>
                  <div className="relative">
                    <span className="absolute left-0 bottom-3 text-2xl font-serif text-navy">$</span>
                    <input 
                      type="number"
                      value={listPrice}
                      onChange={(e) => setListPrice(Number(e.target.value))}
                      className="w-full bg-transparent border-b border-navy/10 py-3 pl-6 font-serif text-3xl text-navy focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] tracking-widest uppercase text-navy/40">Mortgage Balance (Optional)</label>
                  <div className="relative">
                    <span className="absolute left-0 bottom-3 text-xl font-serif text-navy/60">$</span>
                    <input 
                      type="number"
                      value={mortgage}
                      onChange={(e) => setMortgage(Number(e.target.value))}
                      className="w-full bg-transparent border-b border-navy/10 py-2 pl-6 font-serif text-xl text-navy focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative p-12 bg-navy rounded-2xl overflow-hidden">
              <div className="relative z-10 space-y-12">
                <div className="space-y-2">
                  <span className="font-mono text-[9px] tracking-[3px] uppercase text-gold/60">Estimated Net Proceeds</span>
                  <div className="text-6xl font-mono text-gold tabular-nums">
                    ${netProceeds.toLocaleString()}
                  </div>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                   <div className="flex justify-between text-white/40 font-mono text-[10px]">
                      <span>COMMISSIONS (EST.)</span>
                      <span>- ${(listPrice * 0.06).toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-white/40 font-mono text-[10px]">
                      <span>CLOSING COSTS / STAMPS</span>
                      <span>- ${(listPrice * 0.018).toLocaleString()}</span>
                   </div>
                </div>

                <button className="w-full py-5 bg-gold hover:bg-gold-light text-navy font-mono text-xs tracking-[2px] uppercase transition-all flex items-center justify-center gap-3 rounded-lg group">
                  Request Detailed Net Sheet
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32 -mt-32" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetSheet;
