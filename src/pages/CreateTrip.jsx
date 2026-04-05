import { useState } from "react";
import TripForm from "../components/PlanTripComponents/TripForm";
import "../styles/createTrip.css";

function CreateTrip() {

    const [tripName, setTripName] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [numDays, setNumDays] = useState(3);

    return (
        <div className="create-trip-page">

            {/* Page Title */}
            <h1 className="create-trip-title">
                Plan Your <span className="create-trip-title--highlight">Trip</span>
            </h1>
            <p className="create-trip-subtitle">
                Choose a destination, set your days, and build your itinerary!
            </p>

            {/* TripForm gets values + setters as props */}
            <TripForm
                tripName={tripName}
                setTripName={setTripName}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                numDays={numDays}
                setNumDays={setNumDays}
            />

            {/* Placeholder — we'll replace these as we build */}
            <p style={{ color: "gray" }}>CategoryFilter goes here</p>
            <p style={{ color: "gray" }}>PlaceCards go here</p>

        </div>
    );
}

export default CreateTrip;