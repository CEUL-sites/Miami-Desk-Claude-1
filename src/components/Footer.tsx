import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="bg-[#050C16] py-20 px-[7vw] flex flex-wrap justify-between items-start gap-16 border-t border-gold/10">
      <div className="max-w-[700px] flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="font-serif text-[1.4rem] font-light text-white">
            Miami<span className="text-gold italic">Desk</span>
          </p>
          <p className="font-mono text-[8.5px] leading-[2.4] text-white/20 tracking-[2px] uppercase">
            Institutional Activation Hub for International Agency Partners
          </p>
        </div>

        <p className="font-mono text-[9px] leading-[2.2] text-white/20 tracking-[1px] font-light">
          Listing information is handled through the Internet Data Exchange Program of Miami and South Florida REALTORS®. 
          While deemed reliable, all data should be independently verified. Carlos Uzcategui operates as a Licensed Realtor® 
          under United Realty Group (Lic. # BK3015406). Institutional agreements and distribution mandates are strictly confidential.
        </p>

        <div className="flex flex-wrap gap-8 opacity-20">
           <span className="font-mono text-[8px] tracking-[2.5px] uppercase text-white">Equal Housing Opportunity</span>
           <span className="font-mono text-[8px] tracking-[2.5px] uppercase text-white">REALTOR®</span>
           <span className="font-mono text-[8px] tracking-[2.5px] uppercase text-white">CLHMS</span>
           <span className="font-mono text-[8px] tracking-[2.5px] uppercase text-white">Miami REALTORS®</span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[8px] tracking-[3px] uppercase text-gold/40 mb-2">Primary Desk</span>
          <a href="tel:+19544502000" className="font-serif text-2xl text-white/80 hover:text-gold transition-colors italic">
            +1 954 450 2000
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[8px] tracking-[3px] uppercase text-gold/40 mb-2">Activation Office</span>
          <a href="mailto:contact@carlosre.com" className="font-serif text-2xl text-white/80 hover:text-gold transition-colors italic">
            contact@carlosre.com
          </a>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <a href="#contact" className="font-mono text-[9px] tracking-[3px] uppercase text-gold hover:text-white transition-colors border-b border-gold/30 pb-1 w-fit">
            Open Direct Mandate →
          </a>
        </div>
        <div className="mt-6">
           <p className="font-mono text-[8px] tracking-[2px] uppercase text-white/20">
             15951 SW 41 St #700<br />
             Weston, Florida 33331
           </p>
        </div>
      </div>
    </footer>
  );
}
