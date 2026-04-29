import { siteContent } from "@/src/content/site";

export default function TrustBar() {
  return (
    <div className="sticky top-[72px] z-40 w-full bg-white/95 border-b border-line-light backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="font-mono text-[8.5px] tracking-[2px] uppercase text-navy/60 leading-relaxed">
          {siteContent.licenseDisplay} · {siteContent.brokerage}
        </p>
        <div className="flex flex-wrap gap-4 md:gap-8">
          {siteContent.brokerageFacts.map((fact) => (
            <span key={fact} className="font-mono text-[8px] tracking-[2px] uppercase text-gold/80">
              {fact}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
