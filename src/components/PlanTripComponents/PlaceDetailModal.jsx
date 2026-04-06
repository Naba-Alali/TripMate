import React from "react";
import "../../styles/PlaceDetailModal.css";

function PlaceDetailModal({ place, onClose, onAddToTrip }) {
    if (!place) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* 1. Modal Container */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                
                {/* 2. Top Section (Image + Text Overlays) */}
                <div className="modal-hero">
                    <img src={place.image} alt={place.name} className="modal-image" />
                    
                    {/* Positioned at top-right */}
                    <button className="modal-close" onClick={onClose}>&times;</button>
                    
                    {/* Positioned at bottom-left */}
                    <div className="modal-hero-text">
                        <span className="modal-badge">
                            <span className="modal-badge-icon">🏛️</span>
                            {place.category}
                        </span>
                        <h2 className="modal-title">{place.name}</h2>
                    </div>
                </div>

                {/* 3. Bottom Section (Info + Button) */}
                <div className="modal-info">
                    <div className="modal-meta">
                        <span className="meta-item location">📍 {place.city}</span>
                        <span className="meta-item rating">⭐ {place.rating}</span>
                        <span className="meta-item duration">⏱️ 2-3 hrs</span>
                    </div>
                    
                    <p className="modal-description">{place.description}</p>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default PlaceDetailModal;