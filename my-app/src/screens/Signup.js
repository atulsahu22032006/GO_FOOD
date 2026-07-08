import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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
            const response = await fetch(`${API_BASE_URL}/api/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const json = await response.json();

            if (!json.success) {
                const message =
                    json.error || json.errors?.[0]?.msg || "Unable to create your account";
                setError(message);
                return;
            }

            navigate("/login");
        } catch (err) {
            setError("Unable to connect to the server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="z-auth-page">
            <div className="container">
                <div className="z-auth-shell">
                    <section className="z-auth-visual">
                        <Link className="z-auth-logo" to="/">
                            GoFood
                        </Link>
                        <h1>Find your next favourite meal.</h1>
                        <p>
                            Sign up to unlock faster checkout, saved addresses, and
                            recommendations from restaurants near you.
                        </p>
                    </section>

                    <section className="z-auth-card">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h2 className="mb-0">Sign up</h2>
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
                                    type="text"
                                    className="form-control form-control-lg"
                                    name="name"
                                    placeholder="Full Name"
                                    value={credentials.name}
                                    onChange={handleChange}
                                    required
                                    minLength={3}
                                />
                            </div>

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
                                    minLength={5}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    name="location"
                                    placeholder="Location"
                                    value={credentials.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <label className="z-auth-check mb-3">
                                <input type="checkbox" required />
                                <span>
                                    I agree to GoFood's Terms of Service, Privacy Policy and
                                    Content Policies
                                </span>
                            </label>

                            <button
                                type="submit"
                                className="btn z-auth-primary w-100"
                                disabled={loading}
                            >
                                {loading ? "Creating account..." : "Create account"}
                            </button>
                        </form>

                        <div className="z-auth-divider">
                            <span>or</span>
                        </div>

                        <button className="btn z-auth-alt w-100" type="button">
                            Continue with Google
                        </button>

                        <p className="z-auth-footer mb-0">
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
