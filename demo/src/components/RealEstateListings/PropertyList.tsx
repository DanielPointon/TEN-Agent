// PropertyList.js

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MapComponent from './MapComponent';
import ListComponent from './ListComponent';

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
    const [searchParams, setSearchParams] = useSearchParams();
    const [bathrooms, setBathrooms] = useState(
        searchParams.get('bathrooms') ? Number(searchParams.get('bathrooms')) : 0
    );
    const [bedrooms, setBedrooms] = useState(
        searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : 0
    );
    const [radius, setRadius] = useState(
        searchParams.get('radius') ? Number(searchParams.get('radius')) : 2
    );
    const [listings, setListings] = useState<Listing[]>([
        {
            id: 1,
            title: 'Modern Downtown Condo',
            description: 'Stunning corner unit with floor-to-ceiling windows offering panoramic views of downtown Manhattan. Featuring high-end appliances, custom closets, and white oak flooring throughout. Building amenities include 24/7 doorman and rooftop lounge.',
            price: 750000,
            beds: 2,
            baths: 2,
            sqft: 1200,
            image: 'https://images.nestseekers.com/_next/image?url=https://photos.nestseekers.com/Apt/DSC05571_1_ZEEk6gm.jpg&w=3840&q=70',
            lat: 40.7128,
            lng: -74.0060
        },
        // More listings...
    ]);

    useEffect(() => {
        // Update the URL parameters based on the current state
        const params = new URLSearchParams();
        if (radius !== 2) params.set('radius', radius.toString());
        if (bathrooms !== 0) params.set('bathrooms', bathrooms.toString());
        if (bedrooms !== 0) params.set('bedrooms', bedrooms.toString());
        setSearchParams(params);
    }, [radius, bathrooms, bedrooms, setSearchParams]);

    const filteredListings = listings.filter(listing => {
        if (bathrooms > 0 && listing.baths < bathrooms) return false;
        if (bedrooms > 0 && listing.beds < bedrooms) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                <div className="p-4 overflow-auto">
                    <ListComponent listings={filteredListings} />
                </div>
                <div className="relative">
                    <MapComponent
                        listings={filteredListings}
                        bathrooms={bathrooms}
                        setBathrooms={setBathrooms}
                        bedrooms={bedrooms}
                        setBedrooms={setBedrooms}
                        radius={radius}
                        setRadius={setRadius}
                    />
                </div>
            </div>
        </div>
    );
};

export default PropertyList;