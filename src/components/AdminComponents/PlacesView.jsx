function PlacesView({ places }) {
    return (
        <div className="admin-section">
            <div className="admin-section__header admin-section__header--row">
                <div>
                    <h1 className="admin-section-title">Popular Places</h1>
                    <p className="admin-section-subtitle">Manage places </p>
                </div>

                <button type="button" className="admin-primary-btn">
                    Add Place
                </button>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>City</th>
                            <th>Category</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {places.map((place) => (
                            <tr key={place.id}>
                                <td>
                                    <div className="admin-place-cell">
                                        <span className="admin-place-cell__name">{place.name}</span>
                                        <span className="admin-place-cell__desc">
                                            {place.description?.slice(0, 55)}
                                            {place.description?.length > 55 ? "..." : ""}
                                        </span>
                                    </div>
                                </td>
                                <td>{place.city}</td>
                                <td className="admin-capitalize">{place.category}</td>
                                <td>{place.rating}</td>
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PlacesView;