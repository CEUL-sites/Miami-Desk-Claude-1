import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import HomeValuation from "./components/HomeValuation";
import SellerExposure from "./components/SellerExposure";
import SellingProcess from "./components/SellingProcess";
import MiamiDeskBridge from "./components/MiamiDeskBridge";
import IntelligenceDesk from "./components/IntelligenceDesk";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import StickyMobileBar from "./components/StickyMobileBar";
import { translations, Locale } from "./translations";

export default function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];

  return (
    <div className="min-h-screen bg-bone text-navy selection:bg-gold selection:text-white">
      <Navbar locale={locale} setLocale={setLocale} t={t} />

      <main>
        <Hero t={t} />
        <TrustBar />
        <SellerExposure />
        <HomeValuation />
        <SellingProcess t={t} />
        <MiamiDeskBridge />
        <IntelligenceDesk />
        <ContactUs />
      </main>

      <Footer />
      <StickyMobileBar />
    </div>
  );
}
