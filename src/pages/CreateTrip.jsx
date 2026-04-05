import { useState, useEffect } from "react";
import TripForm from "../components/PlanTripComponents/TripForm";
import CategoryFilter from "../components/PlanTripComponents/CategoryFilter";
import DayTabs from "../components/PlanTripComponents/DayTabs";
import ItineraryPanel from "../components/PlanTripComponents/ItineraryPanel";
import MemberPanel from "../components/PlanTripComponents/MemberPanel";
import PlaceCard from "../components/PlanTripComponents/PlaceCard";
import placesData from "../components/PlanTripComponents/data/places";
import "../styles/createTrip.css";

function CreateTrip() {
    const [tripName, setTripName] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [numDays, setNumDays] = useState(1);
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeDay, setActiveDay] = useState(1);
    // Collection of all trips
    const [trips, setTrips] = useState([]);
    const [activeTripId, setActiveTripId] = useState(null);

    // Get the currently selected trip object
    const activeTrip = trips.find(t => t.id === activeTripId);

    // Create a new Trip entry
    const handleCreateNewTrip = () => {
        if (!tripName.trim() || !selectedCity) {
            alert("Please enter a Trip Name and select a Destination first");
            return;
        }

        const newItinerary = {};
        for (let i = 1; i <= numDays; i++) {
            newItinerary[i] = [];
        }

        const newTrip = {
            id: Date.now(),
            name: tripName,
            city: selectedCity,
            days: numDays,
            itinerary: newItinerary,
            members: [{ id: 1, name: "You", email: "you@email.com", role: "Organizer" }]
        };

        setTrips([...trips, newTrip]);
        setActiveTripId(newTrip.id); // Automatically switch to the new trip panel

        // Reset inputs for the next trip
        setTripName("");
        setSelectedCity("");
        setNumDays(1);
    };

    // Add place to the ACTIVE trip
    const handleAddPlace = (place) => {
        if (!activeTrip) {
            alert("Please select or create a trip from the sidebar first!");
            return;
        }

        setTrips(prevTrips => prevTrips.map(trip => {
            if (trip.id === activeTripId) {
                const currentDayPlaces = trip.itinerary[activeDay] || [];
                if (currentDayPlaces.find(p => p.id === place.id)) return trip;

                return {
                    ...trip,
                    itinerary: {
                        ...trip.itinerary,
                        [activeDay]: [...currentDayPlaces, place]
                    }
                };
            }
            return trip;
        }));
    };

    const handleRemovePlace = (day, placeId) => {
        setTrips(prevTrips => prevTrips.map(trip => {
            if (trip.id === activeTripId) {
                return {
                    ...trip,
                    itinerary: {
                        ...trip.itinerary,
                        [day]: trip.itinerary[day].filter(p => p.id !== placeId)
                    }
                };
            }
            return trip;
        }));
    };

    const handleAddMember = (newMember) => {
        setTrips(prevTrips => prevTrips.map(trip => {
            if (trip.id === activeTripId) {
                return { ...trip, members: [...trip.members, { ...newMember, id: Date.now(), role: "Member" }] };
            }
            return trip;
        }));
    };

    //Remove member from the ACTIVE trip
    const handleRemoveMember = (memberId) => {
        setTrips(prevTrips => prevTrips.map(trip => {
            if (trip.id === activeTripId) {
                return { ...trip, members: trip.members.filter(m => m.id !== memberId) };
            }
            return trip;
        }));
    };

    const filteredPlaces = placesData.filter(p => {
        const cityMatch = activeTrip ? p.city === activeTrip.city : p.city === selectedCity;
        return cityMatch && (activeCategory === "all" || p.category === activeCategory);
    });

    return (
        <div className="create-trip-page">
            <h1 className="create-trip-title">Plan Your <span className="create-trip-title--highlight">Trip</span></h1>

            <div className="trip-creation-header">
                <TripForm
                    tripName={tripName}
                    setTripName={setTripName}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    numDays={numDays}
                    setNumDays={setNumDays}
                    onCreate={handleCreateNewTrip}
                />
            </div>

            <div className="create-trip-layout">
                <div className="create-trip-main">
                    <CategoryFilter selected={activeCategory} onSelect={setActiveCategory} />
                    {activeTrip && (
                        <DayTabs
                            numDays={activeTrip.days}
                            activeDay={activeDay}
                            setActiveDay={setActiveDay}
                        />
                    )}

                    <div className="place-cards-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                        {filteredPlaces.map(place => (
                            <PlaceCard key={place.id} place={place} onAdd={handleAddPlace} />
                        ))}
                    </div>
                </div>

                <div className="create-trip-sidebar">
                    <h3 className="sidebar-section-title">Your Trips</h3>
                    <div className="trip-selector-list">
                        {trips.map(t => (
                            <button
                                key={t.id}
                                className={`trip-tab ${activeTripId === t.id ? 'active' : ''}`}
                                onClick={() => setActiveTripId(t.id)}
                            >
                                {t.name} ({t.city})
                            </button>
                        ))}
                    </div>

                    {activeTrip ? (
                        <>
                            <ItineraryPanel
                                itinerary={activeTrip.itinerary}
                                numDays={activeTrip.days}
                                onRemove={handleRemovePlace}
                            />
                            <MemberPanel
                                members={activeTrip.members}
                                onAdd={handleAddMember}
                                onRemove={handleRemoveMember}
                                tripName={activeTrip.name}
                            />
                        </>
                    ) : (
                        <p className="no-trip-msg">Select a trip to view its details</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateTrip;