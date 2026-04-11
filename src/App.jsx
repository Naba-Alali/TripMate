import { useState } from "react";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import ExplorePlaces from "./pages/ExplorePlaces";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AdminPage from "./pages/AdminPage";

function App() {
    const [page, setPage] = useState("home");
    const [user, setUser] = useState(null);

    if (page === "home") return <Home onNavigate={setPage} user={user} />;
    if (page === "login") return <Login onNavigate={setPage} setUser={setUser} />;
    if (page === "signup") return <SignUp onNavigate={setPage} setUser={setUser} />;
    if (page === "explore") return <ExplorePlaces onNavigate={setPage} user={user} />;
    if (page === "profile") return <Profile onNavigate={setPage} user={user} />;
    if (page === "trip") return <CreateTrip onNavigate={setPage} user={user} />;
    if (page === "admin") return <AdminPage onNavigate={setPage} user={user} />;

    return <Home onNavigate={setPage} user={user} />;
}

export default App;