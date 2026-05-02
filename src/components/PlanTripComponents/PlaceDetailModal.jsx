import { useState, useEffect } from "react";
import "../../styles/PlaceDetailModal.css";

const API = "https://tripmate-ctqk.onrender.com/api";
const getToken = () => localStorage.getItem("tripmate_token");

function PlaceDetailModal({ place, onClose, onAddToTrip, user, onRatingUpdate }) {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchReviews = async () => {
        try {
            const res = await fetch(`${API}/reviews/${place._id}`);
            const data = await res.json();
            setReviews(Array.isArray(data) ? data : []);
        } catch {
            setReviews([]);
        }
    };

    useEffect(() => {
        if (place?._id) fetchReviews();
    }, [place?._id]);

    // هنا بعد كل الـ hooks
    if (!place) return null;

    const avgRating =
        reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : place.rating;

    const handleAddReview = async () => {
        if (!comment || rating === 0) {
            setError("Please enter a comment and select a rating.");
            return;
        }

        if (!user || !getToken()) {
            setError("You must be logged in to add a review.");
            return;
        }

        try {
            const res = await fetch(`${API}/reviews/${place._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ rating, comment }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Failed to submit review.");
                return;
            }

            await fetchReviews();

            const updatedReviews = await (await fetch(`${API}/reviews/${place._id}`)).json();
            if (onRatingUpdate && updatedReviews.length > 0) {
                const newAvg = (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1);
                onRatingUpdate(place._id, newAvg);
            }

            setComment("");
            setRating(0);
            setError("");
            setSuccess("Review submitted! ✅");
            setTimeout(() => setSuccess(""), 3000);

        } catch {
            setError("Server error. Please try again.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <div className="modal-hero">
                    <img
                        src={place.image?.startsWith('http') ? place.image : new URL(`../../assets/imgs/${place.image}`, import.meta.url).href}
                        alt={place.name}
                        className="modal-image"
                    />
                    <button className="modal-close" onClick={onClose}>&times;</button>
                    <div className="modal-hero-text">
                        <span className="modal-badge">
                            <span className="modal-badge-icon">🏛️</span>
                            {place.category}
                        </span>
                        <h2 className="modal-title">{place.name}</h2>
                    </div>
                </div>

                <div className="modal-info">
                    <div className="modal-meta">
                        <span className="meta-item location">📍 {place.city}</span>
                        <span className="meta-item rating">⭐ {avgRating} ({reviews.length})</span>
                        <span className="meta-item duration">⏱️ 2-3 hrs</span>
                    </div>

                    <p className="modal-description">{place.description}</p>

                    <div className="review-section">
                        <h3>Add Review</h3>

                        {!user ? (
                            <p style={{ color: "#888" }}>Please log in to add a review.</p>
                        ) : (
                            <>
                                <textarea
                                    placeholder="Write your comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />

                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => setRating(star)}
                                            style={{
                                                cursor: "pointer",
                                                color: star <= rating ? "gold" : "#ccc",
                                                fontSize: "22px",
                                            }}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                                {error && <p style={{ color: "red" }}>{error}</p>}
                                {success && <p style={{ color: "green" }}>{success}</p>}

                                <button
                                    onClick={handleAddReview}
                                    disabled={!comment || rating === 0}
                                    style={{ opacity: (!comment || rating === 0) ? 0.5 : 1 }}
                                >
                                    Submit Review
                                </button>
                            </>
                        )}
                    </div>

                    <div className="reviews-list">
                        <h3>Reviews</h3>
                        {reviews.length === 0 ? (
                            <p>No reviews yet</p>
                        ) : (
                            reviews.map((rev, index) => (
                                <div key={index} className="review-item">
                                    <strong>{rev.userName}</strong>
                                    <div>
                                        {"★".repeat(rev.rating)}
                                        {"☆".repeat(5 - rev.rating)}
                                    </div>
                                    <p>{rev.comment}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceDetailModal;