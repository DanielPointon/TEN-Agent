// PropertyList.js

import React, { useState } from "react";
import ListComponent from "./ListComponent";
import MapComponent from "./MapComponent";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  lat: number;
  lng: number;
}

const PropertyList: React.FC = () => {
  const [radius, setRadius] = useState(2);
  const [listings, setListings] = useState<Listing[]>([
    {
      id: 1,
      title: "Modern Downtown Condo",
      description:
        "Stunning corner unit with floor-to-ceiling windows offering panoramic views of downtown Manhattan. Featuring high-end appliances, custom closets, and white oak flooring throughout. Building amenities include 24/7 doorman and rooftop lounge.",
      price: 750000,
      beds: 2,
      baths: 2,
      sqft: 1200,
      image:
        "https://images.nestseekers.com/_next/image?url=https://photos.nestseekers.com/Apt/DSC05571_1_ZEEk6gm.jpg&w=3840&q=70",
      lat: 40.7128,
      lng: -74.006,
    },
    // More listings...
  ]);

  const MOCK_BATHROOMS = 2;
  const MOCK_BEDROOMS = 2;
  const MOCK_RADIUS = 2;
  const filteredListings = listings.filter((listing) => {
    if (MOCK_BATHROOMS > 0 && listing.baths < MOCK_BATHROOMS) return false;
    if (MOCK_BEDROOMS > 0 && listing.beds < MOCK_BEDROOMS) return false;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111827", color: "#ffffff" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", height: "100vh" }} className="lg:grid-cols-2">
        <div style={{ position: "relative" }}>
          <MapComponent
            listings={filteredListings}
            radius={radius}
            setRadius={setRadius}
          />
        </div>
        <div style={{ padding: "1rem", overflow: "auto" }}>
          <ListComponent listings={filteredListings} />
        </div>
      </div>
    </div>
  );
};

export default PropertyList;