import { useState } from "react";
import TripForm from "../components/PlanTripComponents/TripForm";
import CategoryFilter from "../components/PlanTripComponents/CategoryFilter";
import "../styles/createTrip.css";

function CreateTrip() {
    const [tripName, setTripName] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [numDays, setNumDays] = useState(3);
    const [activeCategory, setActiveCategory] = useState("all");

    return (
        <div className="create-trip-page">
            <h1 className="create-trip-title">
                Plan Your <span className="create-trip-title--highlight">Trip</span>
            </h1>
            <p className="create-trip-subtitle">
                Choose a destination, set your days, and build your itinerary!
            </p>

            <TripForm
                tripName={tripName}
                setTripName={setTripName}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                numDays={numDays}
                setNumDays={setNumDays}
            />

            {/* prop names match CatagoryFilter.jsx */}
            <CategoryFilter
                selected={activeCategory}
                onSelect={setActiveCategory}
            />

            <p style={{ color: "gray" }}>PlaceCards go here</p>
        </div>
    );
}

export default CreateTrip;