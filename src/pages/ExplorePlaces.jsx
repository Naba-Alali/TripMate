import { useState } from "react";
import CategoryFilter from "../components/PlanTripComponents/CategoryFilter";
import PlaceCard from "../components/PlanTripComponents/PlaceCard";
import places from "../components/PlanTripComponents/data/places";
import "../styles/ExplorePlaces.css";
import CityTabs from '../components/PlanTripComponents/CityTabs';

function ExplorePlaces() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    // Default to 'rome' as per your CityTabs IDs
    const [selectedCity, setSelectedCity] = useState("rome");

    // Filter logic: Category + Search + City
    const filteredPlaces = places
        // 1. Filter by City
        .filter((place) => 
            place.id === 1 ? selectedCity === "rome" : // Specific logic if IDs are tied to cities
            place.city?.toLowerCase().includes(selectedCity) // General logic if data has city names
        )
        // 2. Filter by Category
        .filter((place) =>
            activeCategory === "all" ? true : place.category === activeCategory
        )
        // 3. Filter by Search Query
        .filter((place) =>
            place.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="explore-page">

            {/* ── Page Title ── */}
            <h1 className="explore-title">
                <span className="explore-title--highlight">Explore</span> New Places
            </h1>

            {/* ── City Tabs (Placed above search as per design) ── */}
            <CityTabs 
                selected={selectedCity} 
                onSelect={setSelectedCity} 
            />

            {/* ── Search + Category Row ── */}
            <div className="explore-controls">
                
                {/* Search input */}
                <div className="explore-search">
                    <span className="explore-search__icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search places..."
                        className="explore-search__input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Category filter pills */}
                <CategoryFilter
                    selected={activeCategory}
                    onSelect={setActiveCategory}
                />
            </div>

            {/* ── Places Grid or Empty State ── */}
            {filteredPlaces.length > 0 ? (
                <div className="places-grid">
                    {filteredPlaces.map((place) => (
                        <PlaceCard key={place.id} place={place} />
                    ))}
                </div>
            ) : (
                <div className="explore-empty">
                    <p className="explore-empty__text">No places found in this city..</p>
                    <span className="explore-empty__icon">📍</span>
                </div>
            )}
        </div>
    );
}

export default ExplorePlaces;