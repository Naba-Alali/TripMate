function UsersView({ users }) {
    return (
        <div className="admin-section">
            <div className="admin-section__header">
                <h1 className="admin-section-title">Users</h1>
                <p className="admin-section-subtitle">Manage users </p>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <span className="admin-status-badge">
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="admin-actions">
                                        <button type="button" className="admin-action-btn">
                                            Edit
                                        </button>
                                        <button type="button" className="admin-action-btn admin-action-btn--danger">
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

export default UsersView;