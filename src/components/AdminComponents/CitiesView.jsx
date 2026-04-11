function CitiesView({ cities = [], places = [] }) {
    return (
        <div className="admin-section">
            <div className="admin-section__header admin-section__header--row">
                <div>
                    <h1 className="admin-section-title">Cities</h1>
                    <p className="admin-section-subtitle">Manage cities </p>
                </div>

                <button type="button" className="admin-primary-btn">
                    Add City
                </button>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Places</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cities.length > 0 ? (
                            cities.map((city) => {
                                const placeCount = places.filter(
                                    (place) => place.city === city.name
                                ).length;

                                return (
                                    <tr key={city.id}>
                                        <td>{city.name}</td>
                                        <td>{placeCount}</td>
                                        <td>
                                            <div className="admin-actions">
                                                <button type="button" className="admin-action-btn">
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="admin-action-btn admin-action-btn--danger"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="3">No cities found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CitiesView;