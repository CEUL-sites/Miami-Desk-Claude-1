import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { fetchListings, RawListing } from "@/src/lib/bridge";
import type { Translation } from "@/src/translations";
import { cn } from "@/src/lib/utils";

const ZONES = [
  "All", "Brickell", "Coconut Grove", "Coral Gables", "Key Biscayne", 
  "Bal Harbour", "Sunny Isles", "Aventura", "Weston", "Pinecrest", 
  "Fisher Island", "Indian Creek"
];

const PROPERTY_TYPES = ["Residential", "Condominium", "Land"];

export default function ListingBrowser({ t }: { t: Translation }) {
  const zones = Object.entries(t.listings.locations).map(([id, label]) => ({ id, label }));
  const propertyTypes = Object.entries(t.listings.propertyTypes).map(([id, label]) => ({ id, label }));

  const [activeZone, setActiveZone] = useState("All");
  const [activeType, setActiveType] = useState("Residential");
  const [listings, setListings] = useState<RawListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchListings({ 
      zone: activeZone === "All" ? undefined : activeZone,
      propertyType: activeType 
    }).then((data) => {
      setListings(data);
      setIsLoading(false);
    });
  }, [activeZone, activeType]);

  return (
    <section id="listings" className="bg-white py-28 px-[7vw] border-t border-line">
      <div className="mb-20">
        <p className="section-label">{t.nav.intelligence}</p>
        <h2 className="text-navy text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-[1.2]">
          {t.valuation.title}
        </h2>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col gap-10 mb-20">
        {/* Zone Tabs */}
        <div className="flex overflow-x-auto pb-6 gap-6 no-scrollbar border-b border-line items-center">
          <span className="font-mono text-[9px] tracking-[2px] uppercase text-gold mr-4">Zones</span>
          <button
            onClick={() => setActiveZone("All")}
            className={cn(
              "whitespace-nowrap font-mono text-[10px] tracking-[2px] uppercase transition-all pb-4 border-b",
              activeZone === "All" 
                ? "border-gold text-navy" 
                : "border-transparent text-slate/40 hover:text-navy"
            )}
          >
            All
          </button>
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setActiveZone(zone.id)}
              className={cn(
                "whitespace-nowrap font-mono text-[10px] tracking-[2px] uppercase transition-all pb-4 border-b",
                activeZone === zone.id 
                  ? "border-gold text-navy" 
                  : "border-transparent text-slate/40 hover:text-navy"
              )}
            >
              {zone.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Property Type Segmented Control */}
          <div className="flex bg-navy p-1">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={cn(
                  "px-6 py-2.5 font-mono text-[9px] tracking-[2px] uppercase transition-all transition-colors",
                  activeType === type.id ? "bg-gold text-navy font-bold" : "text-white/40 hover:text-white"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5 text-[10px] font-mono tracking-[2px] uppercase text-slate cursor-not-allowed opacity-40">
             Advanced Parameters <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>

        {/* Listings Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-[3/4] bg-bone-warm animate-pulse border border-line" />
                ))}
              </motion.div>
            ) : listings.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
              >
                {Array.isArray(listings) && listings.map((item) => (
                  <ListingThumbnail key={item.ListingKey} item={item} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-32 border-2 border-dashed border-line">
                <p className="text-serif text-2xl text-graphite/40">No listings found matching these criteria.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="mt-20 flex justify-center">
            <button className="border border-gold text-gold px-12 py-5 text-xs font-semibold tracking-[2.5px] uppercase hover:bg-gold hover:text-white transition-all">
                Load more results
            </button>
        </div>
    </section>
  );
}

const ListingThumbnail: React.FC<{ item: RawListing }> = ({ item }) => {
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(item.ListPrice);

    return (
        <div className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden relative mb-6">
                <img 
                    src={item.Media[0]?.MediaURL} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={item.UnparsedAddress}
                />
                <div className="absolute top-4 right-4 bg-navy/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Search className="w-4 h-4" />
                </div>
            </div>
            <div>
                <p className="text-mono-label text-gold mb-2">{item.SubdivisionName || item.City}</p>
                <h4 className="text-2xl font-serif mb-2 group-hover:text-gold transition-colors">{formattedPrice}</h4>
                <div className="flex gap-4 text-[10px] font-mono tracking-widest text-graphite/60 uppercase">
                    <span>{item.BedroomsTotal} BD</span>
                    <span>{item.BathroomsTotalInteger} BA</span>
                    <span>{item.LivingArea} SQFT</span>
                </div>
            </div>
        </div>
    )
}
