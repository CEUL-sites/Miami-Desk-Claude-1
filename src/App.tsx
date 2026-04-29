import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import HomeValuation from "./components/HomeValuation";
import SellerExposure from "./components/SellerExposure";
import SellingProcess from "./components/SellingProcess";
import MiamiDeskBridge from "./components/MiamiDeskBridge";
import Ticker from "./components/Ticker";
import StatBlock from "./components/StatBlock";
import SpainReel from "./components/SpainReel";
import Distribution from "./components/Distribution";
import NetworkReel from "./components/NetworkReel";
import Outreach from "./components/Outreach";
import ListingBrowser from "./components/ListingBrowser";
import PathSplit from "./components/PathSplit";
import IntelligenceDesk from "./components/IntelligenceDesk";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import StickyMobileBar from "./components/StickyMobileBar";
import HomeValuation from "./components/HomeValuation";
import SellingProcess from "./components/SellingProcess";
import Testimonials from "./components/Testimonials";
import StickyMobileBar from "./components/StickyMobileBar";
import VoiceDesks from "./components/VoiceDesks";
import TrustBar from "./components/TrustBar";
import NetSheet from "./components/NetSheet";
import RecentThinking from "./components/RecentThinking";
import DualMarketMap from "./components/DualMarketMap";
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
        {/* 1. Hero Reel (DARK) */}
        <Hero t={t} />

        {/* 1.5 Trust Bar (LIGHT - STICKY) */}
        <TrustBar />

        {/* 2. Portal Ticker (LIGHT/NEUTRAL) */}
        <Ticker />

        {/* 3. Instant Valuation (LIGHT) */}
        <HomeValuation t={t} />

        {/* 4. The 87% Argument (DARK) */}
        <StatBlock t={t} />

        {/* 5. Distribution Engine (LIGHT) */}
        <Distribution t={t} />

        {/* Recently Sold / Featured Proof (LIGHT) */}
        <div id="listings" className="bg-white">
           <ListingBrowser t={t} />
        </div>

        {/* 6. The Method (Selling Process) (DARK) */}
        <SellingProcess t={t} />

        {/* Net Sheet Calculator (LIGHT) */}
        <NetSheet t={t} />

        {/* 7. International Activation (Spain Reel) (DARK) */}
        <SpainReel t={t} />

        {/* 8. Recent Thinking (Insights) (LIGHT) */}
        <RecentThinking t={t} />

        {/* 9. Institutional Network (93K) + Map (DARK) */}
        <NetworkReel />
        <DualMarketMap />

        {/* 10. Voice Desks (Direct Intake) (LIGHT) */}
        <VoiceDesks t={t} />

        {/* 11. AI Intelligence Desk (LIGHT) */}
        <div id="intelligence">
          <IntelligenceDesk />
        </div>

        {/* 12. Bridge/Path Split (DARK - Context transition) */}
        <div className="bg-navy">
          <PathSplit t={t} />
        </div>

        {/* 13. Testimonials (LIGHT) */}
        <Testimonials t={t} />

        {/* 14. About the Principal (DARK) */}
        <div id="about">
          <AboutCarlos t={t} />
        </div>

        {/* 15. Listing Intake & Contact (LIGHT) */}
        <ListingIntake t={t} locale={locale} />
        <ContactUs t={t} />
      </main>

      <Footer />
      <StickyMobileBar />
    </div>
  );
}
