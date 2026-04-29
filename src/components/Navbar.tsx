import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { Locale, Translation } from "@/src/translations";

interface NavbarProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
}

export default function Navbar({ locale, setLocale, t }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.sell, href: "#valuation" },
    { name: t.nav.international, href: "#international" },
    { name: t.nav.listings, href: "#listings" },
    { name: t.nav.intelligence, href: "#intelligence" },
    { name: t.nav.about, href: "#about" },
  ];

  const languages: { code: Locale; label: string; full: string }[] = [
    { code: "en", label: "EN", full: "English" },
    { code: "es", label: "ES", full: "Español" },
    { code: "pt", label: "PT", full: "Português" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-700 px-[5vw]",
        isScrolled
          ? "bg-bone-dark py-4 shadow-xl border-b border-line"
          : "bg-transparent py-8"
      )}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className={cn(
          "font-serif text-[1.45rem] font-light tracking-[0.5px] transition-colors duration-500",
          isScrolled ? "text-navy" : "text-white"
        )}>
          Miami<span className={cn(
            "italic",
            isScrolled ? "text-gold" : "text-gold-light"
          )}>Desk</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "nav-item",
                isScrolled ? "text-navy/70 hover:text-navy" : "text-white/60 hover:text-white"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center bg-black/5 rounded-full p-1 border border-black/5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                title={lang.full}
                className={cn(
                  "relative font-mono text-[9px] tracking-[1.5px] px-3 py-1.5 transition-colors duration-300",
                  locale === lang.code 
                    ? (isScrolled ? "text-white" : "text-navy") 
                    : (isScrolled ? "text-navy/40 hover:text-navy" : "text-white/40 hover:text-white")
                )}
              >
                <span className="relative z-10">{lang.label}</span>
                {locale === lang.code && (
                  <motion.span
                    layoutId="lang-pill"
                    className={cn(
                      "absolute inset-0 rounded-full z-0",
                      isScrolled ? "bg-navy" : "bg-gold-light"
                    )}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
          <a
            href="https://wa.me/19548656622"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "font-mono text-[9px] tracking-[2.5px] uppercase transition-all px-6 py-2.5 bg-transparent border",
              isScrolled 
                ? "text-gold border-gold hover:bg-gold hover:text-white" 
                : "text-gold-light border-gold/40 hover:bg-gold/10"
            )}
          >
            {t.nav.whatsapp}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "lg:hidden p-2 transition-colors",
            isScrolled ? "text-navy" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-navy/95 backdrop-blur-3xl border-b border-gold/15 lg:hidden py-10 px-[5vw] flex flex-col gap-8 overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-serif text-white/90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-6 border-t border-gold/10 flex flex-col gap-8">
              <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5 self-start">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocale(lang.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "relative font-mono text-xs tracking-widest px-6 py-3 transition-colors duration-300",
                      locale === lang.code ? "text-navy" : "text-white/40"
                    )}
                  >
                    <span className="relative z-10">{lang.label}</span>
                    {locale === lang.code && (
                      <motion.span
                        layoutId="lang-pill-mobile"
                        className="absolute inset-0 bg-gold rounded-full z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <a
                href="https://wa.me/19548656622"
                className="btn-gold text-center py-5"
              >
                {t.nav.whatsapp}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
