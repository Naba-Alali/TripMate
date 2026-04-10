import { useState } from "react";
import "../styles/auth.css";

const GOOGLE_LOGO = "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg";

const EyeIcon = ({ visible }) => visible ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);

function SignUp({ onNavigate, setUser }) {
    const [step, setStep] = useState(1);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});
    const [banner, setBanner] = useState(null);
    const [role, setRole] = useState("organizer");

    const validate = () => {
        const newErrors = {};
        if (!fullName.trim()) newErrors.fullName = "Full name is required.";
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
            setBanner(null);
            return;
        }
        setErrors({});
        setBanner(null);
        setStep(2);
    };

    const handleContinue = () => {
        // TODO: submit email + password + role to backend
        setUser({ name: fullName, email, role });
        setBanner({ type: "success", message: "Account created! Redirecting..." });
        setTimeout(() => onNavigate("profile"), 1500);
    };

    const Banner = () => banner ? (
        <div className={`auth-banner auth-banner--${banner.type}`}>
            <span className="auth-banner__icon">
                {banner.type === "success" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                )}
            </span>
            {banner.message}
        </div>
    ) : null;

    return (
        <div className="auth-page">
            <div className="auth-content">
                <div className="auth-card">

                    {step === 1 && (
                        <>
                            <h1 className="auth-title">
                                Start your journey with us <span>today</span>
                            </h1>

                            <Banner />

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="auth-field">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className={errors.fullName ? "input-error" : ""}
                                    />
                                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                                </div>

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
                                    <div className="auth-input-wrap">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={errors.password ? "input-error" : ""}
                                        />
                                        <button type="button" className="auth-eye" onClick={() => setShowPassword(v => !v)}>
                                            <EyeIcon visible={showPassword} />
                                        </button>
                                    </div>
                                    {errors.password && <span className="field-error">{errors.password}</span>}
                                </div>

                                <div className="auth-field">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="auth-input-wrap">
                                        <input
                                            id="confirmPassword"
                                            type={showConfirm ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={errors.confirmPassword ? "input-error" : ""}
                                        />
                                        <button type="button" className="auth-eye" onClick={() => setShowConfirm(v => !v)}>
                                            <EyeIcon visible={showConfirm} />
                                        </button>
                                    </div>
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
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <button className="auth-back" onClick={() => setStep(1)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                                </svg>
                                Back
                            </button>

                            <h1 className="auth-title auth-title--left">What's your role?</h1>
                            <p className="auth-subtitle">Choose how you'll be using <span>Trip Mate</span></p>

                            <Banner />

                            <div className="role-cards">
                                <button
                                    className={`role-card ${role === "organizer" ? "role-card--selected" : ""}`}
                                    onClick={() => setRole("organizer")}
                                    type="button"
                                >
                                    <div className="role-card__icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="2" width="6" height="4" rx="1"/>
                                            <path d="M5 4h-1a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1"/>
                                            <line x1="9" y1="12" x2="15" y2="12"/>
                                            <line x1="9" y1="16" x2="13" y2="16"/>
                                        </svg>
                                    </div>
                                    <h3 className="role-card__title">Organizer</h3>
                                    <p className="role-card__desc">Plan and manage trips for your group</p>
                                </button>

                                <button
                                    className={`role-card ${role === "member" ? "role-card--selected" : ""}`}
                                    onClick={() => setRole("member")}
                                    type="button"
                                >
                                    <div className="role-card__icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="8" r="4"/>
                                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                                        </svg>
                                    </div>
                                    <h3 className="role-card__title">Member</h3>
                                    <p className="role-card__desc">Join trips and explore with others</p>
                                </button>
                            </div>

                            <button className="auth-btn-primary" onClick={handleContinue}>
                                Continue
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

export default SignUp;
