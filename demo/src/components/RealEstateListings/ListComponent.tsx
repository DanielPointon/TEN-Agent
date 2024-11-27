// ListComponent
import React from 'react';
import { MapPin, BedDouble, Bath, Square, Sparkles } from 'lucide-react';

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
        <div className="grid grid-cols-1 gap-4">
            {listings.map(listing => (
                <div
                    key={listing.id}
                    className="group bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-pink-500/50 cursor-pointer"
                    onClick={() => {
                        // Implement map zoom and focus on clicked listing
                    }}
                >
                    <div className="relative overflow-hidden">
                        <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                            <span className="font-semibold text-white text-sm">
                                ${listing.price.toLocaleString()}
                            </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-16" />
                    </div>

                    <div className="p-4">
                        <h3 className="text-base font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors">
                            {listing.title}
                        </h3>

                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                            {listing.description}
                        </p>

                        <div className="flex justify-between items-center text-gray-400">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1.5">
                                    <BedDouble className="w-4 h-4" />
                                    {listing.beds}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Bath className="w-4 h-4" />
                                    {listing.baths}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Square className="w-4 h-4" />
                                    {listing.sqft.toLocaleString()}
                                </span>
                            </div>
                            <div className="h-7 w-7 rounded-full bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListComponent;