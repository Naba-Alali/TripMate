function ItineraryPanel({ itinerary, numDays, onRemove }) {

    // Create array of day numbers to loop through
    const days = Array.from({ length: numDays }, (_, i) => i + 1);

    return (
        <div className="itinerary-panel">

            {/* Panel Title */}
            <h2 className="itinerary-panel__title">🗒️ Your Itinerary</h2>

            {/* One section per day */}
            {days.map((day) => {

                // Get places for this day, default to empty array
                const places = itinerary[day] || [];

                return (
                    <div key={day} className="itinerary-panel__day">

                        {/* Day header — shows how many places */}
                        <div className="itinerary-panel__day-header">
                            <span>Day {day}</span>
                            <span className="itinerary-panel__count">
                {places.length} {places.length === 1 ? "place" : "places"}
              </span>
                        </div>

                        {/* If no places added yet */}
                        {places.length === 0 ? (
                            <p className="itinerary-panel__empty">No places added yet</p>
                        ) : (
                            // List of added places
                            <ul className="itinerary-panel__list">
                                {places.map((place) => (
                                    <li key={place.id} className="itinerary-panel__item">

                                        {/* Place name */}
                                        <span>{place.name}</span>

                                        {/* Remove button */}
                                        <button
                                            className="itinerary-panel__remove"
                                            onClick={() => onRemove(day, place.id)}  // tell parent to remove
                                        >
                                            ✕
                                        </button>

                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ItineraryPanel;