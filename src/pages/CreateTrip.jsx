import { useState, useEffect } from "react"; // add useEffect
import TripForm from "../components/PlanTripComponents/TripForm";
import CategoryFilter from "../components/PlanTripComponents/CategoryFilter";
import DayTabs from "../components/PlanTripComponents/DayTabs";
import ItineraryPanel from "../components/PlanTripComponents/ItineraryPanel";
import "../styles/createTrip.css";

function CreateTrip() {
    const [tripName, setTripName] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [numDays, setNumDays] = useState(1);
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeDay, setActiveDay] = useState(1);
    const [itinerary, setItinerary] = useState({ 1: [] });

    // When numDays changes, rebuild the itinerary object with the correct number of days
    useEffect(() => {
        const newItinerary = {};
        for (let i = 1; i <= numDays; i++) {
            // keep existing places if the day already exists, otherwise empty array
            newItinerary[i] = itinerary[i] || [];
        }
        setItinerary(newItinerary);
        // also reset active day to 1 when days change
        setActiveDay(1);
    }, [numDays]); // runs every time numDays changes

    const handleRemovePlace = (day, placeId) => {
        setItinerary((prev) => ({
            ...prev,
            [day]: prev[day].filter((p) => p.id !== placeId)
        }));
    };

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

            <div className="create-trip-layout">

                {/* LEFT SIDE */}
                <div className="create-trip-main">
                    {/* CategoryFilter and DayTabs only here — NOT outside the layout */}
                    <CategoryFilter selected={activeCategory} onSelect={setActiveCategory} />
                    <DayTabs numDays={numDays} activeDay={activeDay} setActiveDay={setActiveDay} />
                    <p style={{ color: "gray" }}>PlaceCards go here</p>
                </div>

                {/* RIGHT SIDE */}
                <div className="create-trip-sidebar">
                    <ItineraryPanel
                        itinerary={itinerary}
                        numDays={numDays}
                        onRemove={handleRemovePlace}
                    />
                </div>

            </div>
        </div>
    );
}

export default CreateTrip;