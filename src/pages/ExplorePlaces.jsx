import { useState } from "react";
import CategoryFilter from "../components/PlanTripComponents/CategoryFilter";
import PlaceCard from "../components/PlanTripComponents/PlaceCard";
import places from "../components/PlanTripComponents/data/places";
import CityTabs from '../components/PlanTripComponents/CityTabs';
import "../styles/ExplorePlaces.css";

function ExplorePlaces() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState("All"); 

    // Combined Filter Logic
    const filteredPlaces = places.filter((place) => {
    // 1. City Filter: If selectedCity is "all", it returns true for EVERY place.
    // If it's NOT "all", it then looks for a match in the data.
    const matchesCity = selectedCity === "All" || place.city === selectedCity;

    // 2. Category Filter
    const matchesCategory = activeCategory === "all" || place.category === activeCategory;

    // 3. Search Filter
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCity && matchesCategory && matchesSearch;
});

    return (
        <div className="explore-page">

            <h1 className="explore-title">
                <span className="explore-title--highlight">Explore</span> New Places
            </h1>

            {/* City Selection Row */}
            <CityTabs 
                selected={selectedCity} 
                onSelect={setSelectedCity} 
            />

            {/* Search + Category Controls */}
            <div className="explore-controls">
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

                <CategoryFilter
                    selected={activeCategory}
                    onSelect={setActiveCategory}
                />
            </div>

            {/* Results Grid */}
            {filteredPlaces.length > 0 ? (
                <div className="places-grid">
                    {filteredPlaces.map((place) => (
                        <PlaceCard key={place.id} place={place} />
                    ))}
                </div>
            ) : (
                <div className="explore-empty">
                    <p className="explore-empty__text">No results found for this selection.</p>
                    <span className="explore-empty__icon">📍</span>
                </div>
            )}
        </div>
    );
}

export default ExplorePlaces;