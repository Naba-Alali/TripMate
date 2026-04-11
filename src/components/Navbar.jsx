import "../styles/home.css";

function Navbar({ onNavigate, user }) {
    const firstName = user?.name?.split(" ")[0] || "";

    const handleUserButton = () => {
        if (user?.role === "Admin") {
            onNavigate("admin");
        } else {
            onNavigate("profile");
        }
    };

    return (
        <nav className="home-nav">
            <div className="home-nav__logo">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                </svg>
                Trip Mate
            </div>

            <ul className="home-nav__links">
                <li><button onClick={() => onNavigate("home")}>Home</button></li>
                <li><button onClick={() => onNavigate("explore")}>Explore</button></li>
                <li><button onClick={() => onNavigate("trip")}>Plan Trip</button></li>
            </ul>

            {user ? (
                <button className="home-nav__hello" onClick={handleUserButton}>
                    Hello, {firstName}
                </button>
            ) : (
                <button className="home-nav__cta" onClick={() => onNavigate("signup")}>
                    Get started
                </button>
            )}
        </nav>
    );
}

export default Navbar;