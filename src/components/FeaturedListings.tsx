import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { fetchListings, RawListing } from "@/src/lib/bridge";
import type { Translation } from "@/src/translations";
import { cn } from "@/src/lib/utils";

const ListingCard: React.FC<{ listing: RawListing; t: Translation }> = ({ listing, t }) => {
  const images = listing.Media?.length 
    ? listing.Media.map(m => m.MediaURL) 
    : ["https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1200"];

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const activeImageIdx = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const translatedPropertyType = t.listings.propertyTypes[listing.PropertyType] || listing.PropertyType;
  const locationKey = listing.SubdivisionName || listing.City;
  const translatedLocation = t.listings.locations[locationKey] || locationKey;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(listing.ListPrice);

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        className="group relative aspect-[4/5] overflow-hidden bg-navy shadow-3xl cursor-pointer card-luxury !p-0"
        onClick={() => setIsQuickViewOpen(true)}
      >
        <div className="absolute top-8 left-8 z-10 pointer-events-none">
          <span className="bg-navy/40 backdrop-blur-md border border-white/10 px-4 py-1.5 text-[8px] text-gold-light font-mono uppercase tracking-[3px]">
            {translatedPropertyType}
          </span>
        </div>

        <img
          src={images[0]}
          alt={listing.UnparsedAddress}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/5 to-transparent opacity-80" />
        
        <div className="absolute bottom-0 left-0 w-full p-10 text-white">
          <p className="font-mono text-[8px] tracking-[3px] uppercase text-gold mb-4 border-b border-gold/20 pb-3 w-fit">
            {translatedLocation}
          </p>
          <h3 className="text-4xl font-serif font-light mb-4 leading-none tracking-tight">
            {formattedPrice}
          </h3>
          <div className="flex gap-6 text-[10px] font-mono tracking-[2px] text-white/50 mb-8">
            <span>{listing.BedroomsTotal} {t.listings.beds}</span>
            <span>{listing.BathroomsTotalInteger} {t.listings.baths}</span>
            <span>{listing.LivingArea} {t.listings.sqft}</span>
          </div>
          
          <div className="pt-6 border-t border-white/5 opacity-40">
             <p className="text-[8px] text-white tracking-[2px] uppercase leading-tight line-clamp-1">
               {t.listings.courtesy}: {listing.ListOfficeName}
             </p>
          </div>

          <div className="overflow-hidden mt-8">
            <button 
              className="text-[9px] font-mono tracking-[3px] uppercase text-gold-light opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 flex items-center gap-3 outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
            >
              {t.listings.secure} <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isQuickViewOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-navy/95 backdrop-blur-xl"
            onClick={() => setIsQuickViewOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-bone w-full max-w-6xl max-h-[90vh] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsQuickViewOpen(false)}
                className="absolute top-6 right-6 z-50 p-2 bg-navy text-white hover:bg-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Gallery Side */}
              <div className="relative h-[300px] lg:h-full bg-navy overflow-hidden touch-none">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={page}
                    src={images[activeImageIdx]}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }}
                    className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
                  />
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <div className="absolute inset-x-0 bottom-8 flex justify-center gap-2 z-20 pointer-events-none">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            const diff = idx - activeImageIdx;
                            if (diff !== 0) paginate(diff);
                          }}
                          className={cn(
                            "w-12 h-1 transition-all pointer-events-auto",
                            activeImageIdx === idx ? "bg-gold" : "bg-white/20 hover:bg-white/40"
                          )}
                        />
                      ))}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        paginate(-1);
                      }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-navy/40 text-white backdrop-blur-md hover:bg-gold transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        paginate(1);
                      }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-navy/40 text-white backdrop-blur-md hover:bg-gold transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Data Side */}
              <div className="p-8 md:p-20 overflow-y-auto bg-white-pure">
                <div className="mb-14">
                  <p className="font-mono text-[9px] tracking-[4px] uppercase text-gold mb-6">{t.listings.dossier}</p>
                  <h2 className="text-5xl md:text-6xl font-serif text-navy leading-[1.1] mb-6">
                    {listing.UnparsedAddress || "Address Protected"}
                  </h2>
                  <p className="text-3xl font-serif text-gold italic">{formattedPrice}</p>
                </div>

                <div className="grid grid-cols-3 gap-12 pb-14 border-b border-line-light mb-14">
                  <div>
                    <p className="font-mono text-[8px] tracking-[2px] uppercase text-muted mb-3">{t.listings.composition}</p>
                    <p className="text-2xl font-serif text-navy italic">{listing.BedroomsTotal} {t.listings.beds} / {listing.BathroomsTotalInteger} {t.listings.baths}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[8px] tracking-[2px] uppercase text-muted mb-3">{t.listings.dimension}</p>
                    <p className="text-2xl font-serif text-navy italic">{listing.LivingArea} {t.listings.sqft}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[8px] tracking-[2px] uppercase text-muted mb-3">{t.listings.assetClass}</p>
                    <p className="text-2xl font-serif text-navy italic">{translatedPropertyType}</p>
                  </div>
                </div>

                <div className="space-y-12 mb-16">
                   <div>
                     <p className="font-mono text-[8px] tracking-[2px] uppercase text-muted mb-4">{t.listings.analysis}</p>
                     <p className="text-[1rem] text-slate leading-[2.1] font-light italic">
                       Situated within the <span className="font-semibold text-navy not-italic">{translatedLocation}</span> precinct. 
                       This specific asset has been vetted for institutional-grade acquisition standards.
                     </p>
                   </div>
                   <div>
                     <p className="font-mono text-[8px] tracking-[2px] uppercase text-muted mb-4">{t.listings.broker}</p>
                     <p className="text-3xl font-serif text-navy">{listing.ListOfficeName}</p>
                     <p className="font-mono text-[8px] tracking-[3px] uppercase text-gold mt-2 opacity-60">Verified U.S. Professional Affiliate</p>
                   </div>
                </div>

                <div className="flex flex-col gap-6">
                  <button className="btn-gold w-full flex items-center justify-center gap-4 py-6">
                    {t.listings.initiate} <ChevronRight className="w-4 h-4" />
                  </button>
                  <p className="font-mono text-[8px] text-muted/40 text-center uppercase tracking-[3px]">
                    Confidential mapping via Miami MLS IDEX
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function FeaturedListings({ t }: { t: Translation }) {
  const [listings, setListings] = useState<RawListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchListings({ top: 6 })
      .then(setListings)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section id="listings" className="bg-bone py-28 px-[7vw] border-t border-line-light">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-label !mb-0">Institutional Inventory</span>
              <div className="h-px w-12 bg-gold/30" />
              <span className="font-mono text-[9px] tracking-[2px] uppercase text-gold">Miami MLS IDX Portal</span>
            </div>
            <h2 className="text-navy text-5xl md:text-6xl lg:text-7xl font-serif italic leading-[1.1] max-w-4xl">
              South Florida — <span className="not-italic">live asset flow.</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-3 translate-y-2">
            <p className="font-mono text-[9px] tracking-[2px] uppercase text-muted/60 text-right">
              Powered by MIAMI REALTORS® <br />
              Authorized Data Exchange
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] bg-navy/5 animate-pulse border border-line-light" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 animate-in fade-in duration-1000">
            {Array.isArray(listings) && listings.map((item) => (
              <ListingCard key={item.ListingKey} listing={item} t={t} />
            ))}
          </div>
        )}

        <div className="pt-16 border-t border-line-light flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="flex items-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
             <div className="flex flex-col">
               <span className="font-serif text-xl text-navy">REALTOR®</span>
               <span className="font-mono text-[7px] tracking-[2px] uppercase -mt-1">MIAMI Association</span>
             </div>
             <div className="w-px h-10 bg-navy/20" />
             <div className="flex gap-4">
               <div className="w-8 h-8 border border-navy flex items-center justify-center font-bold text-[10px]">EHO</div>
               <div className="w-8 h-8 border border-navy flex items-center justify-center font-bold text-[10px]">IDX</div>
             </div>
          </div>

          <div className="max-w-2xl">
            <p className="text-muted text-[9px] tracking-[1.5px] uppercase opacity-50 leading-relaxed text-left lg:text-right">
              Listing information is provided in part by the Internet Data Exchange (IDX) Program of the Miami and South Florida REALTORS®. 
              Information deemed reliable but not guaranteed. Properties displayed may be listed by brokerages other than United Realty Group. 
              The data relating to real estate for sale on this website comes in part from the Miami MLS. 
              Last synchronized: {new Date().toLocaleTimeString()} · {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
