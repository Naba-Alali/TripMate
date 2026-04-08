import { useState } from "react";
import "../styles/auth.css";

const GOOGLE_LOGO = "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg";

function SignUp({ onNavigate }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email address.";
        if (!password) newErrors.password = "Password is required.";
        else if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";
        if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
        else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
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
        alert("Account created!");
    };

    return (
        <div className="auth-page">
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

                    <div className="auth-field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={errors.confirmPassword ? "input-error" : ""}
                        />
                        {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className="auth-btn-primary">Create Account</button>
                </form>

                <div className="auth-divider">or continue with</div>

                <button className="auth-btn-google" type="button">
                    <img src={GOOGLE_LOGO} alt="Google" />
                    Sign up with Google
                </button>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <button onClick={() => onNavigate("login")}>Log in</button>
                </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
