import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/loginuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const json = await response.json();

            if (!json.success) {
                const message =
                    json.error || json.errors?.[0]?.msg || "Unable to log in";
                setError(message);
                return;
            }

            login(json.authToken, { email: credentials.email, name: json.user?.name || "" });
            navigate("/");
        } catch (err) {
            setError("Unable to connect to the server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="z-auth-page z-login-page">
            <div className="container">
                <div className="z-auth-shell z-login-shell">
                    <section className="z-auth-visual z-login-visual">
                        <Link className="z-auth-logo" to="/">
                            GoFood
                        </Link>
                        <h1>Welcome back to Lucknow's food scene.</h1>
                        <p>
                            Log in to reorder favourites, track deliveries, and explore
                            restaurants around you.
                        </p>
                    </section>

                    <section className="z-auth-card">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h2 className="mb-0">Log in</h2>
                            <Link className="z-auth-close" to="/">
                                ×
                            </Link>
                        </div>

                        {error && (
                            <div className="alert alert-danger py-2" role="alert">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    name="email"
                                    placeholder="Email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    name="password"
                                    placeholder="Password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn z-auth-primary w-100"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Log in"}
                            </button>
                        </form>

                        <div className="z-auth-divider">
                            <span>or</span>
                        </div>

                        <button className="btn z-auth-alt w-100" type="button">
                            <i className="ri-google-fill" style={{ color: "var(--primary-color)", fontSize: "1.2rem", marginRight: "8px" }}></i> Continue with Google
                        </button>

                        <p className="z-auth-footer mb-0">
                            New to GoFood? <Link to="/signup">Create account</Link>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
