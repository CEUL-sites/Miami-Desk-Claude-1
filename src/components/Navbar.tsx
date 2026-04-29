import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { siteContent } from "@/src/content/site";
import { cn } from "@/src/lib/utils";
import type { Locale, Translation } from "@/src/translations";

interface NavbarProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
}

export default function Navbar({ locale, setLocale, t: _t }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Seller Review", href: "#valuation" },
    { name: "Exposure", href: "#seller-exposure" },
    { name: "Strategy", href: "#strategy" },
    { name: "Miami Desk", href: "#miami-desk" },
    { name: "AI Desk", href: "#intelligence" },
  ];

  const languages: { code: Locale; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "pt", label: "PT" },
  ];

  return (
    <nav className={cn("fixed top-0 left-0 w-full z-[100] transition-all duration-700 px-[5vw]", isScrolled ? "bg-bone-dark py-4 shadow-xl border-b border-line" : "bg-transparent py-7")}>
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
        <a href="/" className={cn("font-serif text-[1.45rem] font-light transition-colors duration-500", isScrolled ? "text-navy" : "text-white")}>
          Miami<span className={cn("italic", isScrolled ? "text-gold" : "text-gold-light")}>Desk</span>
        </a>

        <div className="hidden xl:flex flex-col items-start leading-none">
          <span className={cn("font-mono text-[8px] tracking-[2px] uppercase", isScrolled ? "text-navy/45" : "text-white/45")}>{siteContent.licenseDisplay}</span>
          <span className={cn("font-mono text-[8px] tracking-[2px] uppercase mt-2", isScrolled ? "text-navy/35" : "text-white/35")}>{siteContent.brokerage}</span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={cn("nav-item", isScrolled ? "text-navy/70 hover:text-navy" : "text-white/60 hover:text-white")}>
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-4">
            {languages.map((lang) => (
              <button key={lang.code} onClick={() => setLocale(lang.code)} className={cn("font-mono text-[9px] tracking-[1.5px] py-1", locale === lang.code ? "text-gold border-b border-gold" : isScrolled ? "text-navy/30 hover:text-navy" : "text-white/30 hover:text-white")}>
                {lang.label}
              </button>
            ))}
          </div>
          <a href={siteContent.whatsappHref} target="_blank" rel="noopener noreferrer" className={cn("font-mono text-[9px] tracking-[2.5px] uppercase transition-all px-6 py-2.5 bg-transparent border", isScrolled ? "text-gold border-gold hover:bg-gold hover:text-white" : "text-gold-light border-gold/40 hover:bg-gold/10")}>
            WhatsApp
          </a>
        </div>

        <button className={cn("lg:hidden p-2 transition-colors", isScrolled ? "text-navy" : "text-white")} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open navigation menu">
          {isMobileMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="absolute top-full left-0 w-full bg-navy/95 backdrop-blur-3xl border-b border-gold/15 lg:hidden py-10 px-[5vw] flex flex-col gap-8 overflow-hidden">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-2xl font-serif text-white/90" onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </a>
            ))}
            <p className="text-mono-label text-white/35 leading-relaxed">{siteContent.licenseDisplay}<br />{siteContent.brokerage}</p>
            <a href={siteContent.whatsappHref} className="btn-gold text-center py-5">WhatsApp Carlos</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
