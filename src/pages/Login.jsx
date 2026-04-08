import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/auth.css";

function Login({ onNavigate }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email address.";
        if (!password) newErrors.password = "Password is required.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        // TODO: connect to auth backend
        onNavigate("home");
    };

    return (
        <div className="auth-page">
            <Navbar onNavigate={onNavigate} />
            <div className="auth-content">
                <div className="auth-card">
                <h1 className="auth-title">
                    Start your journey with us <span>Today</span>
                </h1>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="auth-field">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? "input-error" : ""}
                        />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? "input-error" : ""}
                        />
                        {errors.password && <span className="field-error">{errors.password}</span>}
                    </div>

                    <button type="submit" className="auth-btn-primary">Login</button>
                </form>

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <button onClick={() => onNavigate("signup")}>Sign up</button>
                </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
