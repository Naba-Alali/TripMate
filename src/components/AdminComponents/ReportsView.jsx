function ReportsView({ reports }) {
    return (
        <div className="admin-section">
            <div className="admin-section__header">
                <h1 className="admin-section-title">Reports</h1>
                <p className="admin-section-subtitle">Manage reports </p>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Content</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.content}</td>
                                <td>
                                    <span className="admin-status-badge admin-status-badge--warning">
                                        {report.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="admin-actions">
                                        <button type="button" className="admin-action-btn">
                                            Review
                                        </button>
                                        <button
                                            type="button"
                                            className="admin-action-btn admin-action-btn--danger"
                                        >
                                            Remove
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

export default ReportsView;