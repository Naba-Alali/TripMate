import { useState } from "react";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import ExplorePlaces from "./pages/ExplorePlaces";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
    const [page, setPage] = useState("home");

    if (page === "home") return <Home onNavigate={setPage} />;
    if (page === "login") return <Login onNavigate={setPage} />;
    if (page === "signup") return <SignUp onNavigate={setPage} />;
    if (page === "explore") return <ExplorePlaces onNavigate={setPage} />;
    return <CreateTrip onNavigate={setPage} />;
}

export default App;