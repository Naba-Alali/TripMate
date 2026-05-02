import { useState, useEffect } from "react";

const API = "https://tripmate-ctqk.onrender.com/api";
const getToken = () => localStorage.getItem("tripmate_token");

function ReportsView() {
    const [reports, setReports] = useState([]);
    const [message, setMessage] = useState("");

    const showMessage = (text) => {
        setMessage(text);
        setTimeout(() => setMessage(""), 2000);
    };

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await fetch(`${API}/admin/reports`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                const data = await res.json();
                setReports(Array.isArray(data) ? data : []);
            } catch {
                setReports([]);
            }
        };
        fetchReports();
    }, []);

    const handleReview = async (reportId) => {
        try {
            const res = await fetch(`${API}/admin/reports/${reportId}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (!res.ok) { alert("Failed to update."); return; }
            setReports(prev => prev.map(r => r._id === reportId ? { ...r, status: "Reviewed" } : r));
            showMessage("Report reviewed successfully.");
        } catch {
            alert("Server error.");
        }
    };

    const handleRemove = async (reportId) => {
        const confirmed = window.confirm("Are you sure you want to remove this report?");
        if (!confirmed) return;

        try {
            const res = await fetch(`${API}/admin/reports/${reportId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (!res.ok) { alert("Failed to delete."); return; }
            setReports(prev => prev.filter(r => r._id !== reportId));
            showMessage("Report removed successfully.");
        } catch {
            alert("Server error.");
        }
    };

    return (
        <div className="admin-section">
            <div className="admin-section__header">
                <h1 className="admin-section-title">Reports</h1>
                <p className="admin-section-subtitle">Manage reports</p>
            </div>

            {message && <div className="admin-success-message">{message}</div>}

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
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <tr key={report._id}>
                                <td>{report.content || "No content"}</td>
                                <td>
                                        <span className={`admin-status-badge ${report.status === "Reviewed" ? "" : "admin-status-badge--warning"}`}>
                                            {report.status || "Pending"}
                                        </span>
                                </td>
                                <td>
                                    <div className="admin-actions">
                                        <button type="button" className="admin-action-btn" onClick={() => handleReview(report._id)}>Review</button>
                                        <button type="button" className="admin-action-btn admin-action-btn--danger" onClick={() => handleRemove(report._id)}>Remove</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="3">No reports found.</td></tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReportsView;