import { siteContent } from "@/src/content/site";

export default function Footer() {
  return (
    <footer className="bg-[#050C16] py-20 px-[7vw] border-t border-gold/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16">
        <div className="max-w-[760px] flex flex-col gap-8">
          <div>
            <p className="font-serif text-[1.6rem] font-light text-white">
              Miami<span className="text-gold italic">Desk</span>
            </p>
            <p className="font-mono text-[8.5px] leading-[2.2] text-white/25 tracking-[2px] uppercase mt-4">
              South Florida seller exposure platform with Madrid / Spain-facing referral positioning
            </p>
          </div>

          <p className="font-mono text-[9px] leading-[2.2] text-white/30 tracking-[1px] font-light">
            {siteContent.licenseDisplay}. Associate with {siteContent.brokerage}. The Miami Desk is a professional seller intake and exposure platform for South Florida property owners and international referral conversations. MLS, portal, language, and association statistics should be verified before publishing any expanded claim.
          </p>

          <div className="flex flex-wrap gap-6 opacity-35">
            <span className="font-mono text-[8px] tracking-[2.5px] uppercase text-white">Equal Housing Opportunity</span>
            <span className="font-mono text-[8px] tracking-[2.5px] uppercase text-white">REALTOR®</span>
            <span className="font-mono text-[8px] tracking-[2.5px] uppercase text-white">United Realty Group</span>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:items-end lg:text-right">
          <div>
            <span className="font-mono text-[8px] tracking-[3px] uppercase text-gold/50 mb-2 block">Direct Phone / WhatsApp</span>
            <a href={siteContent.directPhoneHref} className="font-serif text-2xl text-white/85 hover:text-gold transition-colors italic">
              {siteContent.directPhoneDisplay}
            </a>
          </div>
          <div>
            <span className="font-mono text-[8px] tracking-[3px] uppercase text-gold/50 mb-2 block">Email</span>
            <a href={`mailto:${siteContent.email}`} className="font-serif text-2xl text-white/85 hover:text-gold transition-colors italic">
              {siteContent.email}
            </a>
          </div>
          <a href="#valuation" className="font-mono text-[9px] tracking-[3px] uppercase text-gold hover:text-white transition-colors border-b border-gold/30 pb-1 w-fit">
            Request Seller Strategy Review
          </a>
          <p className="font-mono text-[8px] tracking-[2px] uppercase text-white/25 leading-relaxed">
            {siteContent.officeAddress}
          </p>
        </div>
      </div>
    </footer>
  );
}
