import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import StatBlock from "./components/StatBlock";
import SpainReel from "./components/SpainReel";
import Distribution from "./components/Distribution";
import NetworkReel from "./components/NetworkReel";
import Outreach from "./components/Outreach";
import FeaturedListings from "./components/FeaturedListings";
import ListingBrowser from "./components/ListingBrowser";
import PathSplit from "./components/PathSplit";
import IntelligenceDesk from "./components/IntelligenceDesk";
import ListingIntake from "./components/ListingIntake";
import AboutCarlos from "./components/AboutCarlos";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import { translations, Locale } from "./translations";

export default function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];

  return (
    <div className="min-h-screen bg-bone text-navy selection:bg-gold selection:text-white">
      <Navbar locale={locale} setLocale={setLocale} t={t} />
      
      <main>
        {/* 1. Hero Reel */}
        <Hero t={t} />

        {/* 2. Portal Ticker */}
        <Ticker />

        {/* 3. The 87% Argument */}
        <StatBlock t={t} />

        {/* 4. Luxury Inventory Browser */}
        <div id="listings" className="bg-white">
           <FeaturedListings t={t} />
           <ListingBrowser t={t} />
        </div>

        {/* 5. International Activation (Spain Reel) */}
        <SpainReel />

        {/* 6. The Distribution Engine */}
        <Distribution t={t} />

        {/* 7. Institutional Network (93K) */}
        <NetworkReel />

        {/* 8. Active Outreach campaigns */}
        <Outreach />

        {/* 9. The Dual Mandate Path */}
        <PathSplit t={t} />

        {/* 10. AI Intelligence Desk */}
        <div id="intelligence">
          <IntelligenceDesk />
        </div>

        {/* 11. Listing Intake Flow */}
        <div id="list">
          <ListingIntake t={t} locale={locale} />
        </div>

        {/* 12. About the Principal */}
        <div id="about">
          <AboutCarlos t={t} />
        </div>

        <ContactUs t={t} />
      </main>

      <Footer />
    </div>
  );
}
