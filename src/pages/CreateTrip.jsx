import { useState, useEffect } from "react";
import TripForm from "../components/PlanTripComponents/TripForm";
import CategoryFilter from "../components/PlanTripComponents/CategoryFilter";
import DayTabs from "../components/PlanTripComponents/DayTabs";
import ItineraryPanel from "../components/PlanTripComponents/ItineraryPanel";
import MemberPanel from "../components/PlanTripComponents/MemberPanel";
import PlaceCard from "../components/PlanTripComponents/PlaceCard";
import Navbar from "../components/Navbar";
import { saveUserTrip, deleteUserTrip } from "../utils/trips";
import "../styles/createTrip.css";
import { checkEmailExists } from "../utils/auth";

const API = "https://tripmate-ctqk.onrender.com/api";
const getToken = () => localStorage.getItem("tripmate_token");

const saveTripToDB = async (trip) => {
    if (!trip?._id) {
        console.log("No _id found, skipping save");
        return;
    }
    console.log("Saving trip to DB:", trip._id, "members:", trip.members);
    try {
        const res = await fetch(`${API}/trips/${trip._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({
                name: trip.name,
                destination: trip.city,
                duration: trip.days,
                itinerary: trip.itinerary,
                members: trip.members,
            }),
        });
        const data = await res.json();
        console.log("Save response:", res.status, data);
    } catch (err) {
        console.error("Failed to save trip:", err);
    }
};

function CreateTrip({ onNavigate, user, currentPage, setUser }) {
    const [tripName, setTripName] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [numDays, setNumDays] = useState(1);
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeDay, setActiveDay] = useState(1);
    const [trips, setTrips] = useState([]);
    const [activeTripId, setActiveTripId] = useState(null);
    const [formError, setFormError] = useState("");
    const [placeError, setPlaceError] = useState("");
    const [placesData, setPlacesData] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const res = await fetch(`${API}/places`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                const data = await res.json();
                setPlacesData(Array.isArray(data) ? data : []);
            } catch {
                setPlacesData([]);
            }
        };
        fetchPlaces();
    }, []);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const res = await fetch(`${API}/trips`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                const data = await res.json();
                if (Array.isArray(data)) {
                    const formatted = data.map(t => ({
                        ...t,
                        id: t._id,
                        city: t.destination,
                        days: t.duration,
                    }));
                    setTrips(formatted);
                }
            } catch {
                console.error("Failed to fetch trips");
            }
        };
        fetchTrips();
    }, []);

    const activeTrip = trips.find(t => t.id === activeTripId);

    const handleCreateNewTrip = async () => {
        if (!tripName.trim()) {
            setFormError("Please enter a trip name.");
            setTimeout(() => setFormError(""), 3000);
            return;
        }
        if (!selectedCity) {
            setFormError("Please select a destination.");
            setTimeout(() => setFormError(""), 3000);
            return;
        }

        const newItinerary = {};
        for (let i = 1; i <= numDays; i++) {
            newItinerary[i] = [];
        }

        const newTrip = {
            name: tripName,
            city: selectedCity,
            days: numDays,
            itinerary: newItinerary,
            members: [{ name: user?.name || "You", email: user?.email || "", role: "Organizer" }]
        };

        const saved = await saveUserTrip(newTrip);
        const tripWithId = { ...newTrip, id: saved?._id || Date.now(), _id: saved?._id };

        setTrips([...trips, tripWithId]);
        setActiveTripId(tripWithId.id);
        setTripName("");
        setSelectedCity("");
        setNumDays(1);
    };

    const handleAddPlace = (place) => {
        if (!activeTrip) {
            setPlaceError("Please select or create a trip first!");
            setTimeout(() => setPlaceError(""), 3000);
            return;
        }
        setPlaceError("");

        setTrips(prevTrips => {
            const updated = prevTrips.map(trip => {
                if (trip.id === activeTripId) {
                    const currentDayPlaces = trip.itinerary[activeDay] || [];
                    if (currentDayPlaces.find(p => p._id === place._id)) return trip;
                    return {
                        ...trip,
                        itinerary: {
                            ...trip.itinerary,
                            [activeDay]: [...currentDayPlaces, place]
                        }
                    };
                }
                return trip;
            });
            const updatedTrip = updated.find(t => t.id === activeTripId);
            saveTripToDB(updatedTrip);
            return updated;
        });
    };

    const handleRemovePlace = (day, placeId) => {
        setTrips(prevTrips => {
            const updated = prevTrips.map(trip => {
                if (trip.id === activeTripId) {
                    return {
                        ...trip,
                        itinerary: {
                            ...trip.itinerary,
                            [day]: trip.itinerary[day].filter(p => p._id !== placeId)
                        }
                    };
                }
                return trip;
            });
            const updatedTrip = updated.find(t => t.id === activeTripId);
            saveTripToDB(updatedTrip);
            return updated;
        });
    };

    const handleAddMember = async (newMember) => {
        if (newMember.email.toLowerCase() === user?.email?.toLowerCase()) {
            return "self";
        }

        const exists = await checkEmailExists(newMember.email);
        if (!exists) {
            return false;
        }

        setTrips(prevTrips => {
            const updated = prevTrips.map(trip => {
                if (trip.id === activeTripId) {
                    return { ...trip, members: [...trip.members, { ...newMember, id: Date.now(), role: "Member" }] };
                }
                return trip;
            });
            const updatedTrip = updated.find(t => t.id === activeTripId);
            saveTripToDB(updatedTrip);
            return updated;
        });
    };

    const handleRemoveMember = (memberId) => {
        setTrips(prevTrips => {
            const updated = prevTrips.map(trip => {
                if (trip.id === activeTripId) {
                    return { ...trip, members: trip.members.filter(m => m.id !== memberId) };
                }
                return trip;
            });
            const updatedTrip = updated.find(t => t.id === activeTripId);
            saveTripToDB(updatedTrip);
            return updated;
        });
    };

    const normalize = (str = "") => str.trim().toLowerCase().replace(/\s+/g, "");

    const filteredPlaces = placesData.filter((p) => {
        const currentCity = activeTrip ? activeTrip.city : selectedCity;

        const cityMatch =
            !currentCity ||
            normalize(currentCity) === "all" ||
            normalize(p.city) === normalize(currentCity);

        const categoryMatch =
            activeCategory === "all" || p.category === activeCategory;

        return cityMatch && categoryMatch;
    });

    const handleDeleteTrip = async (tripId) => {
        setTrips(prevTrips => prevTrips.filter(t => t.id !== tripId));
        if (activeTripId === tripId) setActiveTripId(null);
        await deleteUserTrip(tripId);
    };

    const handleAddDay = () => {
        if (!activeTrip || activeTrip.days >= 12) return;

        setTrips(prevTrips => {
            const updated = prevTrips.map(trip => {
                if (trip.id === activeTripId) {
                    return {
                        ...trip,
                        days: trip.days + 1,
                        itinerary: {
                            ...trip.itinerary,
                            [trip.days + 1]: []
                        }
                    };
                }
                return trip;
            });
            const updatedTrip = updated.find(t => t.id === activeTripId);
            saveTripToDB(updatedTrip);
            return updated;
        });
    };

    const handleRemoveDay = (dayToRemove) => {
        if (!activeTrip || activeTrip.days <= 1) return;

        if (activeDay === dayToRemove) setActiveDay(1);

        setTrips(prevTrips => {
            const updated = prevTrips.map(trip => {
                if (trip.id === activeTripId) {
                    const updatedItinerary = {};
                    let newDayNumber = 1;
                    for (let i = 1; i <= trip.days; i++) {
                        if (i === dayToRemove) continue;
                        updatedItinerary[newDayNumber] = trip.itinerary[i] || [];
                        newDayNumber++;
                    }
                    return {
                        ...trip,
                        days: trip.days - 1,
                        itinerary: updatedItinerary
                    };
                }
                return trip;
            });
            const updatedTrip = updated.find(t => t.id === activeTripId);
            saveTripToDB(updatedTrip);
            return updated;
        });
    };

    return (
        <div style={{ overflowX: "hidden" }}>
            <Navbar onNavigate={onNavigate} user={user} currentPage={currentPage} setUser={setUser} />
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
                        formError={formError}
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
                                onAddDay={handleAddDay}
                                onRemoveDay={handleRemoveDay}
                            />
                        )}

                        {placeError && (
                            <p className="place-error">{placeError}</p>
                        )}

                        <div className="place-cards-container">
                            {filteredPlaces.map(place => (
                                <PlaceCard key={place._id} place={place} onAdd={handleAddPlace} />
                            ))}
                        </div>
                    </div>

                    <div className="create-trip-sidebar">
                        <h3 className="sidebar-section-title">Your Trips</h3>
                        <div className="trip-selector-list">
                            {trips.map(t => (
                                <div key={t.id} className="trip-tab-row">
                                    <button
                                        className={`trip-tab ${activeTripId === t.id ? 'active' : ''}`}
                                        onClick={() => setActiveTripId(t.id)}
                                    >
                                        {t.name} ({t.city})
                                    </button>
                                    <button
                                        className="trip-tab__delete"
                                        onClick={() => handleDeleteTrip(t.id)}
                                        title="Delete trip"
                                    >
                                        🗑️
                                    </button>
                                </div>
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
        </div>
    );
}

export default CreateTrip;