import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getUserTrips } from "../utils/trips";
import "../styles/profile.css";

const API = "https://tripmate-ctqk.onrender.com/api";
const getToken = () => localStorage.getItem("tripmate_token");

function Profile({ onNavigate, user, currentPage, setUser }) {
    const [activeTab, setActiveTab] = useState("trips");
    const [photos, setPhotos] = useState([]);
    const [location, setLocation] = useState("Detecting location...");
    const [trips, setTrips] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [newEmail, setNewEmail] = useState(user?.email || "");
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [photoToDelete, setPhotoToDelete] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            const data = await getUserTrips();
            setTrips(Array.isArray(data) ? data : []);
        };
        if (user) fetchTrips();
    }, [user]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const res = await fetch(`${API}/auth/photos`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                if (!res.ok) return;
                const data = await res.json();
                if (Array.isArray(data)) setPhotos(data);
            } catch {
                // network error — leave photos as empty
            }
        };
        if (user) fetchPhotos();
    }, [user]);

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation("Location unavailable");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
                    );
                    const data = await res.json();
                    const city = data.address.city || data.address.town || data.address.village || "";
                    const country = data.address.country || "";
                    setLocation([city, country].filter(Boolean).join(", "));
                } catch {
                    setLocation("Location unavailable");
                }
            },
            () => setLocation("Location unavailable")
        );
    }, []);

    const handleUpdateEmail = async () => {
        try {
            const res = await fetch(`${API}/auth/update-email`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ email: newEmail }),
            });
            const data = await res.json();
            if (res.ok) {
                setUser({ ...user, email: newEmail });
                setEditMode(false);
            } else {
                alert(data.message);
            }
        } catch {
            alert("Server error.");
        }
    };

    const handleDeletePhoto = async (index) => {
        try {
            await fetch(`${API}/auth/photos/${index}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            setPhotos(prev => prev.filter((_, i) => i !== index));
        } catch {
            console.error("Failed to delete photo");
        }
    };

    const handlePhotoChange = async (e) => {
        const files = Array.from(e.target.files);
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = async () => {
                const base64 = reader.result;
                setPhotos(prev => [...prev, base64]);
                try {
                    const res = await fetch(`${API}/auth/photos`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${getToken()}`,
                        },
                        body: JSON.stringify({ photo: base64 }),
                    });
                    if (!res.ok) {
                        console.error("Failed to save photo to DB");
                        setPhotos(prev => prev.filter(p => p !== base64));
                    }
                } catch {
                    console.error("Failed to save photo");
                    setPhotos(prev => prev.filter(p => p !== base64));
                }
            };
            reader.readAsDataURL(file);
        }
        e.target.value = "";
    };

    const name = user?.name || "Traveler";
    const joinedLabel = user?.joinedAt
        ? new Date(user.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : "Recently";

    return (
        <div className="profile-page">
            <Navbar onNavigate={onNavigate} user={user} currentPage={currentPage} setUser={setUser} />

            <div className="profile-header">
                <div className="profile-header__content">
                    <h1 className="profile-header__name">{name}</h1>
                    <div className="profile-header__meta">
                        <span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                <circle cx="12" cy="9" r="2.5"/>
                            </svg>
                            {location}
                        </span>
                        <span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            Joined {joinedLabel}
                        </span>
                        <span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,12 2,6"/>
                            </svg>
                            {user?.email}
                        </span>
                    </div>

                    <p className="profile-header__bio">
                        Travel enthusiast and adventure seeker. Always planning the next trip!
                    </p>

                    {editMode ? (
                        <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
                            />
                            <button onClick={handleUpdateEmail} style={{ padding: "8px 16px", backgroundColor: "#1a6fb5", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Save</button>
                            <button onClick={() => setEditMode(false)} style={{ padding: "8px 16px", backgroundColor: "#ccc", border: "none", borderRadius: "8px", cursor: "pointer" }}>Cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => setEditMode(true)} style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "#1a6fb5", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            <div className="profile-body">
                <div className="profile-stats">
                    <div className="stat-card">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/>
                        </svg>
                        <div>
                            <span className="stat-card__number">{trips.length}</span>
                            <span className="stat-card__label">Trips</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                            <circle cx="12" cy="13" r="4"/>
                        </svg>
                        <div>
                            <span className="stat-card__number">{photos.length}</span>
                            <span className="stat-card__label">Photos</span>
                        </div>
                    </div>
                </div>

                <div className="profile-tabs">
                    <button className={`profile-tab ${activeTab === "trips" ? "profile-tab--active" : ""}`} onClick={() => setActiveTab("trips")}>Trips</button>
                    <button className={`profile-tab ${activeTab === "photos" ? "profile-tab--active" : ""}`} onClick={() => setActiveTab("photos")}>Photos</button>
                </div>
                <div className="profile-tabs__divider" />

                {activeTab === "trips" && (
                    <div className="profile-trips">
                        <h2 className="profile-section-title">Recent Trips</h2>
                        <div className="trip-list">
                            {trips.length === 0 ? (
                                <p className="profile-empty">No trips yet. <button onClick={() => onNavigate("trip")}>Plan your first trip!</button></p>
                            ) : (
                                trips.map(trip => (
                                    <div key={trip._id} className="trip-item">
                                        <div className="trip-item__left">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/>
                                            </svg>
                                            <span className="trip-item__name">{trip.name} — {trip.destination}</span>
                                        </div>
                                        <div className="trip-item__right">
                                        <span className={`trip-item__badge ${trip.userRole === "Member" ? "trip-item__badge--member" : ""}`}>
                                            {trip.userRole || "Organizer"}
                                        </span>
                                        <span className="trip-item__date">
                                                {new Date(trip.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                            </span>
                                            <div className="trip-item__menu-wrap">
                                                <button
                                                    className="trip-item__menu-btn"
                                                    onClick={() => setOpenMenuId(openMenuId === trip._id ? null : trip._id)}
                                                >
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </button>
                                                {openMenuId === trip._id && (
                                                    <div className="trip-item__dropdown">
                                                        <button onClick={() => { setSelectedTrip(trip); setOpenMenuId(null); }}>
                                                            View Details
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "photos" && (
                    <div className="profile-photos">
                        {photos.length === 0 ? (
                            <div className="photo-add">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                    <circle cx="12" cy="13" r="4"/>
                                </svg>
                                <p>No photos yet</p>
                                <label className="photo-add__btn">
                                    + Add Photo
                                    <input type="file" accept="image/*" multiple hidden onChange={handlePhotoChange} />
                                </label>
                            </div>
                        ) : (
                            <>
                                <div className="photo-grid">
                                    {photos.map((url, i) => (
                                        <div key={i} className="photo-item-wrap">
                                            <img src={url} alt={`photo-${i}`} className="photo-item" />
                                            <button className="photo-delete-btn" onClick={() => setPhotoToDelete(i)}>✕</button>
                                        </div>
                                    ))}
                                </div>
                                <label className="photo-add__btn photo-add__btn--inline">
                                    + Add More
                                    <input type="file" accept="image/*" multiple hidden onChange={handlePhotoChange} />
                                </label>
                            </>
                        )}
                    </div>
                )}
            </div>

        {photoToDelete !== null && (
            <div className="confirm-overlay" onClick={() => setPhotoToDelete(null)}>
                <div className="confirm-modal" onClick={e => e.stopPropagation()}>
                    <h3>Delete Photo</h3>
                    <p>Are you sure you want to delete this photo? This cannot be undone.</p>
                    <div className="confirm-modal__actions">
                        <button className="confirm-modal__cancel" onClick={() => setPhotoToDelete(null)}>Cancel</button>
                        <button className="confirm-modal__confirm" onClick={() => { handleDeletePhoto(photoToDelete); setPhotoToDelete(null); }}>Delete</button>
                    </div>
                </div>
            </div>
        )}

        {selectedTrip && (
            <div className="trip-modal-overlay" onClick={() => setSelectedTrip(null)}>
                <div className="trip-modal" onClick={e => e.stopPropagation()}>
                    <div className="trip-modal__header">
                        <h2 className="trip-modal__title">{selectedTrip.name}</h2>
                        <button className="trip-modal__close" onClick={() => setSelectedTrip(null)}>✕</button>
                    </div>

                    <div className="trip-modal__meta">
                        <span>📍 {selectedTrip.destination}</span>
                        <span>🗓 {selectedTrip.duration} {selectedTrip.duration === 1 ? "day" : "days"}</span>
                        <span>🕒 {new Date(selectedTrip.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                    </div>

                    {selectedTrip.members?.length > 0 && (
                        <div className="trip-modal__section">
                            <h3>Members</h3>
                            <ul className="trip-modal__members">
                                {selectedTrip.members.map((m, i) => (
                                    <li key={i}>
                                        <span className="trip-modal__member-name">{m.name}</span>
                                        <span className="trip-modal__member-role">{m.role}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {selectedTrip.itinerary && Object.keys(selectedTrip.itinerary).length > 0 && (
                        <div className="trip-modal__section">
                            <h3>Itinerary</h3>
                            {Object.entries(selectedTrip.itinerary).map(([day, places]) => (
                                Array.isArray(places) && places.length > 0 && (
                                    <div key={day} className="trip-modal__day">
                                        <h4>Day {day}</h4>
                                        <ul>
                                            {places.map((p, i) => (
                                                <li key={i}>{p.name} <span className="trip-modal__place-city">— {p.city}</span></li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )}
        </div>
    );
}

export default Profile;