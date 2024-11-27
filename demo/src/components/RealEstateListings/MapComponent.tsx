// MapComponent
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, BedDouble, Bath, Sparkles } from 'lucide-react';

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibmV1cm9kaXZlcmdlbnRzZXJpZXMiLCJhIjoiY20zenhkeWkyMmF1ejJsc2Z6dTRlaXhlYiJ9.h6MGz9q6p0T65MQK7A91lg';

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

interface MapComponentProps {
    listings: Listing[];
    bathrooms: number;
    setBathrooms: (bathrooms: number) => void;
    bedrooms: number;
    setBedrooms: (bedrooms: number) => void;
    radius: number;
    setRadius: (radius: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
    listings,
    bathrooms,
    setBathrooms,
    bedrooms,
    setBedrooms,
    radius,
    setRadius
}) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [mapInitialized, setMapInitialized] = useState(false);

    useEffect(() => {
        if (!mapContainer.current || mapInitialized) return;

        try {
            const newMap = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/dark-v11',
                center: [-74.0060, 40.7128],
                zoom: 12,
                interactive: true
            });

            newMap.addControl(new mapboxgl.NavigationControl({
                showCompass: false
            }), 'top-right');

            newMap.on('load', () => {
                map.current = newMap;
                setMapInitialized(true);
                addMapFeatures();
            });

        } catch (error) {
            console.error('Error initializing map:', error);
        }

        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, [mapInitialized]);

    const addMapFeatures = () => {
        const currentMap = map.current;
        if (!currentMap) return;

        // Remove existing layers and sources
        ['search-radius-fill', 'search-radius-outline'].forEach(layerId => {
            if (currentMap.getLayer(layerId)) {
                currentMap.removeLayer(layerId);
            }
        });

        if (currentMap.getSource('radius-source')) {
            currentMap.removeSource('radius-source');
        }

        // Create and add circle
        const circleFeature = createCirclePolygon([-74.0060, 40.7128], radius);

        // Check if the source exists before trying to add it
        if (!currentMap.getSource('radius-source')) {
            currentMap.addSource('radius-source', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [circleFeature]
                }
            });
        }

        // Add fill layer
        currentMap.addLayer({
            id: 'search-radius-fill',
            type: 'fill',
            source: 'radius-source',
            paint: {
                'fill-color': '#f472b6',
                'fill-opacity': 0.1
            }
        });

        // Add outline layer
        currentMap.addLayer({
            id: 'search-radius-outline',
            type: 'line',
            source: 'radius-source',
            paint: {
                'line-color': '#f472b6',
                'line-width': 2,
                'line-dasharray': [2, 2]
            }
        });

        // Add markers
        addMarkers(currentMap);
    };

    const addMarkers = (currentMap: mapboxgl.Map) => {
        // Remove existing markers if any
        const markers = document.getElementsByClassName('marker');
        while (markers[0]) {
            markers[0].parentNode?.removeChild(markers[0]);
        }

        listings.filter(listing => {
            if (bathrooms > 0 && listing.baths < bathrooms) return false;
            if (bedrooms > 0 && listing.beds < bedrooms) return false;
            return true;
        }).forEach(listing => {
            // Create markers and add them to the map
            // (same as before)
        });
    };

    const createCirclePolygon = (center: [number, number], radiusMiles: number): GeoJSON.Feature => {
        const points = 64;
        const km = radiusMiles * 1.60934;
        const distanceX = km / (111.32 * Math.cos(center[1] * Math.PI / 180));
        const distanceY = km / 110.574;

        const coordinates: [number, number][] = [];
        for (let i = 0; i < points; i++) {
            const angle = (i / points) * (2 * Math.PI);
            const x = center[0] + distanceX * Math.cos(angle);
            const y = center[1] + distanceY * Math.sin(angle);
            coordinates.push([x, y]);
        }
        coordinates.push(coordinates[0]);

        return {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [coordinates]
            },
            properties: {}
        };
    };

    return (
        <div className="relative">
            <div
                ref={mapContainer}
                className="w-full h-full border border-gray-800 rounded-lg"
            />

            <div className="absolute bottom-6 left-6 bg-gray-900/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-800">
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-300">
                        Search Radius:
                    </label>
                    <span className="text-pink-500 font-semibold">{radius} miles <Sparkles className="w-4 h-4" /></span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #f472b6 0%, #f472b6 ${(radius - 1) * 11.11}%, #374151 ${(radius - 1) * 11.11}%, #374151 100%)`
                    }}
                />

                <div className="flex items-center justify-between mt-4">
                    <label className="block text-sm font-medium text-gray-300">
                        Bathrooms:
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(Number(e.target.value))}
                        className="w-20 bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-white text-sm"
                    />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <label className="block text-sm font-medium text-gray-300">
                        Bedrooms:
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="w-20 bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-white text-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default MapComponent;