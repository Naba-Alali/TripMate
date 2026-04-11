import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";
import DashboardView from "../components/AdminComponents/DashboardView";
import UsersView from "../components/AdminComponents/UsersView";
import CitiesView from "../components/AdminComponents/CitiesView";
import PlacesView from "../components/AdminComponents/PlacesView";
import ReportsView from "../components/AdminComponents/ReportsView";
import initialPlaces from "../components/PlanTripComponents/data/places";
import "../styles/admin.css";

function AdminPage({ onNavigate, user }) {
    const [activeSection, setActiveSection] = useState("dashboard");

    const [users, setUsers] = useState([
        { id: 1, name: "Admin User", email: "admin@gmail.com", role: "Admin", status: "Active" },
        { id: 2, name: "Sara Ali", email: "sara@gmail.com", role: "Organizer", status: "Active" },
        { id: 3, name: "Ahmed Noor", email: "ahmed@gmail.com", role: "Member", status: "Active" },
    ]);

    const [places, setPlaces] = useState(initialPlaces);

    const [reports, setReports] = useState([
        { id: 1, content: "Spam review on a place", status: "Pending" },
        { id: 2, content: "Inappropriate comment", status: "Active" },
    ]);

    const cities = useMemo(() => {
        const uniqueCityNames = [...new Set(places.map((place) => place.city))];

        return uniqueCityNames.map((cityName, index) => ({
            id: index + 1,
            name: cityName,
        }));
    }, [places]);

    const renderSection = () => {
        if (activeSection === "dashboard") {
            return (
                <DashboardView
                    users={users}
                    cities={cities}
                    places={places}
                    reports={reports}
                />
            );
        }

        if (activeSection === "users") {
            return (
                <UsersView
                    users={users}
                    setUsers={setUsers}
                />
            );
        }

        if (activeSection === "cities") {
            return (
                <CitiesView
                    cities={cities}
                    places={places}
                />
            );
        }

        if (activeSection === "places") {
            return (
                <PlacesView
                    places={places}
                    setPlaces={setPlaces}
                    cities={cities}
                />
            );
        }

        return (
            <ReportsView
                reports={reports}
                setReports={setReports}
            />
        );
    };

    return (
        <div className="admin-page">
            <Navbar onNavigate={onNavigate} user={user} />

            <div className="admin-layout">
                <AdminSidebar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />

                <main className="admin-content">
                    {renderSection()}
                </main>
            </div>
        </div>
    );
}

export default AdminPage;
