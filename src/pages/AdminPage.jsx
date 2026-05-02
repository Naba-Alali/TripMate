import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";
import DashboardView from "../components/AdminComponents/DashboardView";
import UsersView from "../components/AdminComponents/UsersView";
import CitiesView from "../components/AdminComponents/CitiesView";
import PlacesView from "../components/AdminComponents/PlacesView";
import ReportsView from "../components/AdminComponents/ReportsView";
import "../styles/admin.css";
 
const API = "https://tripmate-ctqk.onrender.com/";
const getToken = () => localStorage.getItem("tripmate_token");
 
function AdminPage({ onNavigate, user, currentPage, setUser, isGuest }) {
    const [activeSection, setActiveSection] = useState("dashboard");
    const [places, setPlaces] = useState([]);
    const [cities, setCities] = useState([]);
    const [users, setUsers] = useState([
        { id: 1, name: "Admin User", email: "admin@gmail.com", role: "Admin", status: "Active" },
        { id: 2, name: "Sara Ali", email: "sara@gmail.com", role: "Organizer", status: "Active" },
        { id: 3, name: "Ahmed Noor", email: "ahmed@gmail.com", role: "Member", status: "Active" },
    ]);
    const [reports, setReports] = useState([
        { id: 1, content: "Spam review on a place", status: "Pending" },
        { id: 2, content: "Inappropriate comment", status: "Active" },
    ]);
 
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const res = await fetch(`${API}/places`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                const data = await res.json();
                setPlaces(Array.isArray(data) ? data : []);
            } catch {
                setPlaces([]);
            }
        };
        fetchPlaces();
    }, []);
 
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await fetch(`${API}/admin/cities-list`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                const data = await res.json();
                setCities(Array.isArray(data) ? data.map((c, i) => ({ id: i + 1, name: c.name })) : []);
            } catch {
                setCities([]);
            }
        };
        fetchCities();
    }, []);
 
    // Places handlers — just update local state, API call is in PlacesView
    const handleAddPlace = (newPlace) => {
        setPlaces((prevPlaces) => [...prevPlaces, newPlace]);
    };
 
    const handleEditPlace = (updatedPlace) => {
        setPlaces((prevPlaces) =>
            prevPlaces.map((place) =>
                (place._id || place.id) === (updatedPlace._id || updatedPlace.id) ? updatedPlace : place
            )
        );
    };
 
    const handleDeletePlace = (placeId) => {
        setPlaces((prevPlaces) =>
            prevPlaces.filter((place) => (place._id || place.id) !== placeId)
        );
    };
 
    const handleEditUser = (updatedUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((userItem) =>
                userItem.id === updatedUser.id
                    ? { ...userItem, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role, status: updatedUser.status }
                    : userItem
            )
        );
    };
 
    const handleDeleteUser = (userId) => {
        setUsers((prevUsers) =>
            prevUsers.filter((userItem) => userItem.id !== userId)
        );
    };
 
    const handleRemoveReport = (reportId) => {
        setReports((prevReports) =>
            prevReports.filter((report) => report.id !== reportId)
        );
    };
 
    const handleReviewReport = (reportId) => {
        setReports((prevReports) =>
            prevReports.map((report) =>
                report.id === reportId ? { ...report, status: "Reviewed" } : report
            )
        );
    };
 
    const handleAddCity = async (cityName) => {
        const trimmedName = cityName.trim();
        if (!trimmedName) return;
 
        try {
            const res = await fetch(`${API}/admin/cities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ cityName: trimmedName }),
            });
 
            const data = await res.json();
            if (!res.ok) {
                alert(data.message);
                return;
            }
 
            setCities(prev => [...prev, { id: Date.now(), name: trimmedName }]);
        } catch {
            alert("Server error.");
        }
    };
 
    const handleEditCity = (oldCityName, newCityName) => {
        const trimmedNewName = newCityName.trim();
        if (!trimmedNewName) {
            alert("City name is required.");
            return;
        }
        setCities(prev => prev.map(c =>
            c.name === oldCityName ? { ...c, name: trimmedNewName } : c
        ));
    };
 
    const handleDeleteCity = (cityName) => {
        setCities(prev => prev.filter(c => c.name !== cityName));
    };
 
    const renderSection = () => {
        if (activeSection === "dashboard") {
            return <DashboardView users={users} cities={cities} places={places} reports={reports} />;
        }
        if (activeSection === "users") {
            return <UsersView users={users} onDeleteUser={handleDeleteUser} onEditUser={handleEditUser} />;
        }
        if (activeSection === "cities") {
            return <CitiesView cities={cities} places={places} onAddCity={handleAddCity} onEditCity={handleEditCity} onDeleteCity={handleDeleteCity} />;
        }
        if (activeSection === "places") {
            return <PlacesView places={places} cities={cities} onAddPlace={handleAddPlace} onEditPlace={handleEditPlace} onDeletePlace={handleDeletePlace} />;
        }
        return <ReportsView reports={reports} onRemoveReport={handleRemoveReport} onReviewReport={handleReviewReport} />;
    };
 
    return (
        <div className="admin-page">
            <Navbar onNavigate={onNavigate} user={user} currentPage={currentPage} setUser={setUser} isGuest={isGuest} />
            <div className="admin-layout">
                <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
                <main className="admin-content">{renderSection()}</main>
            </div>
        </div>
    );
}
 
export default AdminPage;