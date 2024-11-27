import React from 'react';
import './ListComponent.css';
import { MapPin, BedDouble, Bath, Square } from 'lucide-react';

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

interface ListComponentProps {
    listings: Listing[];
}

const ListComponent: React.FC<ListComponentProps> = ({ listings }) => {
    return (
        <div className="grid-container">
            {listings.map(listing => (
                <div
                    key={listing.id}
                    className="card"
                    onClick={() => {
                        // Implement map zoom and focus on clicked listing
                    }}
                >
                    <div className="relative overflow-hidden">
                        <img
                            src={listing.image}
                            alt={listing.title}
                            className="card-img"
                        />
                        <div className="price-tag">
                            <span>
                                ${listing.price.toLocaleString()}
                            </span>
                        </div>
                        {/* <div className="gradient-overlay" /> */}
                    </div>

                    <div className="card-content">
                        <h3 className="card-title">
                            {listing.title}
                        </h3>

                        <p className="card-description">
                            {listing.description}
                        </p>

                        <div className="card-details">
                            <div className="details-group">
                                <span className="details-item">
                                    <BedDouble className="icon" />
                                    {listing.beds}
                                </span>
                                <span className="details-item">
                                    <Bath className="icon" />
                                    {listing.baths}
                                </span>
                                <span className="details-item">
                                    <Square className="icon" />
                                    {listing.sqft.toLocaleString()}
                                </span>
                            </div>
                            <div className="icon-wrapper">
                                <MapPin className="icon" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListComponent;