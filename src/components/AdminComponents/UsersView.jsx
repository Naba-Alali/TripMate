import { useState } from "react";

const API = "https://tripmate-ctqk.onrender.com/api";
const getToken = () => localStorage.getItem("tripmate_token");

function UsersView({ users = [], onDeleteUser, onEditUser }) {
    const emptyForm = {
        _id: null,
        fullName: "",
        email: "",
        role: "Member",
    };

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [message, setMessage] = useState("");

    const showMessage = (text) => {
        setMessage(text);
        setTimeout(() => setMessage(""), 2000);
    };

    const handleOpenEditForm = (user) => {
        setFormData({
            _id: user._id || user.id,
            fullName: user.fullName || user.name || "",
            email: user.email || "",
            role: user.role || "Member",
        });
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormData(emptyForm);
        setIsFormOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.fullName.trim() || !formData.email.trim()) {
            alert("Please fill in name and email.");
            return;
        }

        try {
            const res = await fetch(`${API}/admin/users/${formData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ fullName: formData.fullName, email: formData.email }),
            });
            const data = await res.json();
            if (!res.ok) { alert(data.message); return; }
            onEditUser({ ...data, _id: formData._id });
            showMessage("User updated successfully.");
            handleCloseForm();
        } catch {
            alert("Server error.");
        }
    };

    const handleDelete = async (userId) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (!confirmed) return;

        try {
            const res = await fetch(`${API}/admin/users/${userId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (!res.ok) { alert("Failed to delete."); return; }
            onDeleteUser(userId);
            showMessage("User deleted successfully.");
        } catch {
            alert("Server error.");
        }
    };

    return (
        <div className="admin-section">
            <div className="admin-section__header">
                <h1 className="admin-section-title">Users</h1>
                <p className="admin-section-subtitle">Manage users</p>
            </div>

            {message && <div className="admin-success-message">{message}</div>}

            {isFormOpen && (
                <div className="admin-form-card">
                    <h2 className="admin-form-title">Edit User</h2>
                    <div className="admin-form">
                        <div className="admin-form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter user name"
                            />
                        </div>
                        <div className="admin-form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="admin-form-actions">
                            <button type="button" className="admin-action-btn" onClick={handleCloseForm}>Cancel</button>
                            <button type="button" className="admin-primary-btn" onClick={handleSubmit}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id || user.id}>
                                <td>{user.fullName || user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <div className="admin-actions">
                                        <button
                                            type="button"
                                            className="admin-action-btn"
                                            onClick={() => handleOpenEditForm(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="admin-action-btn admin-action-btn--danger"
                                            onClick={() => handleDelete(user._id || user.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersView;