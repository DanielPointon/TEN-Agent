import React, { useState } from "react";
import ListComponent from "./ListComponent";
import MapComponent from "./MapComponent";
import { useLocalStorage } from "./useLocalStorage";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  location: "Angel" | "Covent Garden" | "Soho";
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
      location: "Soho",
      lat: 40.7128,
      lng: -74.006,
    },
    {
      id: 2,
      title: "Luxury Beachfront Villa",
      description:
        "Exclusive villa with private beach access, infinity pool, and breathtaking ocean views. Fully furnished with designer furniture and state-of-the-art appliances.",
      price: 2500000,
      beds: 5,
      baths: 4,
      sqft: 4500,
      image: "https://example.com/images/villa.jpg",
      location: "Angel",
      lat: 34.0195,
      lng: -118.4912,
    },
    {
      id: 3,
      title: "Cozy Suburban Home",
      description:
        "Charming 3-bedroom home in a quiet suburban neighborhood. Features a spacious backyard, modern kitchen, and a two-car garage.",
      price: 350000,
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: "https://example.com/images/suburban_home.jpg",
      location: "Covent Garden",
      lat: 37.7749,
      lng: -122.4194,
    },
    {
      id: 4,
      title: "Penthouse Suite",
      description:
        "Top-floor penthouse with stunning city views, private elevator access, and luxurious finishes throughout. Includes access to building amenities such as a gym and pool.",
      price: 1200000,
      beds: 3,
      baths: 3,
      sqft: 2200,
      image: "https://example.com/images/penthouse.jpg",
      location: "Soho",
      lat: 40.7306,
      lng: -73.9352,
    },
    {
      id: 5,
      title: "Rustic Cabin",
      description:
        "Secluded cabin in the woods with a cozy fireplace, large deck, and beautiful mountain views. Perfect for a weekend getaway.",
      price: 200000,
      beds: 2,
      baths: 1,
      sqft: 900,
      image: "https://example.com/images/cabin.jpg",
      location: "Angel",
      lat: 39.7392,
      lng: -104.9903,
    },
    {
      id: 6,
      title: "Urban Loft",
      description:
        "Stylish loft in the heart of the city with exposed brick walls, high ceilings, and an open floor plan. Close to public transportation and nightlife.",
      price: 600000,
      beds: 1,
      baths: 1,
      sqft: 1000,
      image: "https://example.com/images/loft.jpg",
      location: "Covent Garden",
      lat: 34.0522,
      lng: -118.2437,
    },
    {
      id: 7,
      title: "Country Estate",
      description:
        "Expansive estate with rolling hills, private lake, and equestrian facilities. The main house features a gourmet kitchen, home theater, and wine cellar.",
      price: 5000000,
      beds: 7,
      baths: 6,
      sqft: 8000,
      image: "https://example.com/images/estate.jpg",
      location: "Soho",
      lat: 36.7783,
      lng: -119.4179,
    },
  ]);

  const [localStorageLocation] = useLocalStorage("location", "Soho");
  const [localStorageBedrooms] = useLocalStorage("bedrooms", 2);

  const MOCK_BATHROOMS = 2;
  const MOCK_BEDROOMS = 2;
  const MOCK_RADIUS = 2;
  const filteredListings = listings.filter((listing) => {
    if (listing.location != null && listing.location !== localStorageLocation)
      return false;
    if (MOCK_BATHROOMS > 0 && listing.baths < MOCK_BATHROOMS) return false;
    if (localStorageBedrooms != null && listing.beds !== localStorageBedrooms)
      return false;
    return true;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111827",
        color: "#ffffff",
      }}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr", height: "100vh" }}
        className="lg:grid-cols-2"
      >
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
