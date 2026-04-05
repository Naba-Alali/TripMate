import { useState, useEffect } from "react";
import TripForm from "../components/PlanTripComponents/TripForm";
import CategoryFilter from "../components/PlanTripComponents/CategoryFilter";
import DayTabs from "../components/PlanTripComponents/DayTabs";
import ItineraryPanel from "../components/PlanTripComponents/ItineraryPanel";
import MemberPanel from "../components/PlanTripComponents/MemberPanel";
import "../styles/createTrip.css";

function CreateTrip() {
    const [tripName, setTripName] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [numDays, setNumDays] = useState(1);
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeDay, setActiveDay] = useState(1);
    const [itinerary, setItinerary] = useState({ 1: [] });

    // Members state — organizer is always first
    const [members, setMembers] = useState([
        { id: 1, name: "You", email: "you@email.com", role: "Organizer" }
    ]);

    // Add member function
    const handleAddMember = (newMember) => {
        setMembers((prev) => [
            ...prev,
            { ...newMember, id: Date.now(), role: "Member" }
        ]);
    };

    // Remove member function
    const handleRemoveMember = (memberId) => {
        setMembers((prev) => prev.filter((m) => m.id !== memberId));
    };

    // Update itinerary structure when numDays changes
    useEffect(() => {
        setItinerary((prevItinerary) => {
            const newItinerary = {};
            for (let i = 1; i <= numDays; i++) {
                // keep existing places if the day already exists, otherwise empty array
                newItinerary[i] = prevItinerary[i] || [];
            }
            return newItinerary;
        });

        // Reset active day to 1 if the current active day no longer exists
        if (activeDay > numDays) {
            setActiveDay(1);
        }
    }, [numDays]);

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
                {/* LEFT SIDE: Exploration & Selection */}
                <div className="create-trip-main">
                    <CategoryFilter
                        selected={activeCategory}
                        onSelect={setActiveCategory}
                    />
                    <DayTabs
                        numDays={numDays}
                        activeDay={activeDay}
                        setActiveDay={setActiveDay}
                    />
                    <div className="place-cards-container">
                        <p style={{ color: "gray", marginTop: "20px" }}>
                            PlaceCards for Day {activeDay} ({activeCategory}) go here
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE: Summary & Collaboration */}
                <div className="create-trip-sidebar">
                    <ItineraryPanel
                        itinerary={itinerary}
                        numDays={numDays}
                        onRemove={handleRemovePlace}
                    />
                    <MemberPanel
                        members={members}
                        onAdd={handleAddMember}
                        onRemove={handleRemoveMember}
                        tripName={tripName}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateTrip;