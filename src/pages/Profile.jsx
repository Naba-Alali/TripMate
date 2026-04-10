import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/profile.css";

const RECENT_TRIPS = [];

function Profile({ onNavigate, user }) {
    const [activeTab, setActiveTab] = useState("trips");
    const [photos, setPhotos] = useState([]);

    const name = user?.name || "Traveler";

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map(file => URL.createObjectURL(file));
        setPhotos(prev => [...prev, ...urls]);
        e.target.value = "";
    };

    return (
        <div className="profile-page">
            <Navbar onNavigate={onNavigate} user={user} />

            {/* Header */}
            <div className="profile-header">
                <div className="profile-header__content">
                    <h1 className="profile-header__name">{name}</h1>
                    <div className="profile-header__meta">
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                <circle cx="12" cy="9" r="2.5"/>
                            </svg>
                            San Francisco, CA
                        </span>
                        <span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            Joined January 2024
                        </span>
                    </div>
                    <p className="profile-header__bio">
                        Travel enthusiast and adventure seeker. Always planning the next trip!
                    </p>
                </div>
            </div>

            <div className="profile-body">
                {/* Stats */}
                <div className="profile-stats">
                    <div className="stat-card">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/>
                        </svg>
                        <div>
                            <span className="stat-card__number">{RECENT_TRIPS.length}</span>
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

                {/* Tabs */}
                <div className="profile-tabs">
                    <button
                        className={`profile-tab ${activeTab === "trips" ? "profile-tab--active" : ""}`}
                        onClick={() => setActiveTab("trips")}
                    >
                        Trips
                    </button>
                    <button
                        className={`profile-tab ${activeTab === "photos" ? "profile-tab--active" : ""}`}
                        onClick={() => setActiveTab("photos")}
                    >
                        Photos
                    </button>
                </div>
                <div className="profile-tabs__divider" />

                {/* Trips Tab */}
                {activeTab === "trips" && (
                    <div className="profile-trips">
                        <h2 className="profile-section-title">Recent Trips</h2>
                        <div className="trip-list">
                            {RECENT_TRIPS.length === 0 ? (
                                <p className="profile-empty">No trips yet. <button onClick={() => onNavigate("trip")}>Plan your first trip!</button></p>
                            ) : (
                                RECENT_TRIPS.map(trip => (
                                    <div key={trip.id} className="trip-item">
                                        <div className="trip-item__left">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 19-7z"/>
                                            </svg>
                                            <span className="trip-item__name">{trip.name}</span>
                                        </div>
                                        <span className="trip-item__date">{trip.date}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Photos Tab */}
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
                                        <img key={i} src={url} alt={`photo-${i}`} className="photo-item" />
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
        </div>
    );
}

export default Profile;
