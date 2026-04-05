import "../../styles/PlaceCard.css";

function PlaceCard({ place }) {
  return (
    <div className="place-card">

      {/* ── Image section ── */}
      <div className="card-image-wrapper">
        <img src={place.image} alt={place.name} className="card-image" />

        {/* Category badge on top of the image */}
        <span className="card-badge">{place.category}</span>
      </div>

      {/* ── Info section ── */}
      <div className="card-info">
        <h3 className="card-name">{place.name}</h3>
        <p className="card-description">{place.description}</p>

        {/* Rating and duration on the same row */}
        <div className="card-footer">
          <span className="card-rating">⭐ {place.rating}</span>
        </div>
      </div>

    </div>
  );
}

export default PlaceCard;