import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, TrendingUp } from "lucide-react";
import { siteContent } from "@/src/content/site";

export default function StickyMobileBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 620);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-navy/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 flex items-center justify-between gap-3 shadow-[0_-20px_40px_rgba(0,0,0,0.35)]"
        >
          <a href={siteContent.directPhoneHref} className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white rounded-sm py-3 font-mono text-[9px] tracking-[1.5px] uppercase">
            <Phone className="w-3 h-3" /> Call
          </a>
          <a href={siteContent.whatsappHref} className="flex-1 flex items-center justify-center gap-2 bg-gold text-navy rounded-sm py-3 font-mono text-[9px] tracking-[1.5px] uppercase font-bold">
            <MessageCircle className="w-3 h-3" /> WhatsApp
          </a>
          <a href="#valuation" className="flex-1 flex items-center justify-center gap-2 bg-white text-navy rounded-sm py-3 font-mono text-[9px] tracking-[1.5px] uppercase font-bold">
            <TrendingUp className="w-3 h-3" /> Review
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
