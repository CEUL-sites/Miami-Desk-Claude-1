export interface ListingMedia {
  MediaURL: string;
}

export interface RawListing {
  ListingKey: string;
  ListPrice: number;
  UnparsedAddress: string;
  City: string;
  SubdivisionName: string;
  BedroomsTotal: number;
  BathroomsTotalInteger: number;
  LivingArea: number;
  PublicRemarks: string;
  Media: ListingMedia[];
  PropertyType: string;
  Country: string;
  ModificationTimestamp: string;
  ListOfficeName: string;
}

interface ListingFilter {
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  zone?: string;
  propertyType?: string;
  minBeds?: number;
  international?: boolean;
  top?: number;
  orderBy?: 'price-desc' | 'price-asc' | 'newest';
}

// Mock Data for Phase 3 Visualization
const MOCK_LISTINGS: RawListing[] = [
  {
    ListingKey: "1",
    ListPrice: 12500000,
    UnparsedAddress: "1421 Brickell Ave #PH",
    City: "Miami",
    SubdivisionName: "Brickell",
    BedroomsTotal: 4,
    BathroomsTotalInteger: 5,
    LivingArea: 4200,
    PublicRemarks: "Penthouse with panoramic bay views.",
    Media: [{ MediaURL: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200" }],
    PropertyType: "Condominium",
    Country: "US",
    ModificationTimestamp: new Date().toISOString(),
    ListOfficeName: "United Realty Group"
  },
  {
    ListingKey: "2",
    ListPrice: 8900000,
    UnparsedAddress: "4200 Gables Ct",
    City: "Coral Gables",
    SubdivisionName: "Coral Gables",
    BedroomsTotal: 6,
    BathroomsTotalInteger: 7,
    LivingArea: 8500,
    PublicRemarks: "Mediterranean estate in the heart of the Gables.",
    Media: [{ MediaURL: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200" }],
    PropertyType: "Residential",
    Country: "US",
    ModificationTimestamp: new Date().toISOString(),
    ListOfficeName: "United Realty Group"
  },
  {
    ListingKey: "3",
    ListPrice: 15700000,
    UnparsedAddress: "92 Ocean Dr",
    City: "Key Biscayne",
    SubdivisionName: "Key Biscayne",
    BedroomsTotal: 5,
    BathroomsTotalInteger: 6,
    LivingArea: 6200,
    PublicRemarks: "Modern waterfront masterpiece.",
    Media: [{ MediaURL: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200" }],
    PropertyType: "Residential",
    Country: "US",
    ModificationTimestamp: new Date().toISOString(),
    ListOfficeName: "United Realty Group"
  }
];

export async function fetchListings(filter: ListingFilter = {}): Promise<RawListing[]> {
  try {
    const params = new URLSearchParams();
    if (filter.top) params.set("limit", filter.top.toString());
    if (filter.minPrice) params.set("minPrice", filter.minPrice.toString());
    
    const queryString = params.toString();
    const res = await fetch(`/api/bridge/listings${queryString ? `?${queryString}` : ""}`);
    
    if (!res.ok) throw new Error("Failed to fetch from proxy");
    const data = await res.json();
    
    const listingsResult = data.bundle || data.value;
    const listings = Array.isArray(listingsResult) ? listingsResult : [];
    
    if (listings.length === 0) return MOCK_LISTINGS;
    
    return listings.map((l: any) => ({
      ListingKey: l.ListingKey || l.ListingId,
      ListPrice: l.ListPrice,
      UnparsedAddress: l.UnparsedAddress,
      City: l.City || "Miami",
      SubdivisionName: l.SubdivisionName || "",
      BedroomsTotal: l.BedroomsTotal,
      BathroomsTotalInteger: l.BathroomsTotalInteger,
      LivingArea: l.LivingArea,
      PublicRemarks: l.PublicRemarks || "",
      Media: l.Media || [],
      PropertyType: l.PropertyType || "Residential",
      Country: l.Country || "US",
      ModificationTimestamp: l.ModificationTimestamp || new Date().toISOString(),
      ListOfficeName: l.ListOfficeName || "Listing Brokerage"
    }));
  } catch (error: any) {
    console.error("Bridge API fetch detail:", error?.message || error);
    return MOCK_LISTINGS;
  }
}
