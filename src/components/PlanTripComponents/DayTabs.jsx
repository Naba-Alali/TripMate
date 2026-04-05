
function DayTabs({ numDays, activeDay, setActiveDay }) {

    // Create an array of day numbers based on numDays
    const days = Array.from({ length: numDays }, (_, i) => i + 1);

    return (
        <div className="day-tabs">
            {days.map((day) => (
                <button
                    key={day}
                    className={`day-tabs__btn ${activeDay === day ? "day-tabs__btn--active" : ""}`}
                    onClick={() => setActiveDay(day)}
                >
                    Day {day}
                </button>
            ))}
        </div>
    );
}

export default DayTabs;