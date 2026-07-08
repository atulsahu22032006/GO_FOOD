import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useAuth();
    const { cartCount } = useCart();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const displayName = user.name || user.email;

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light gofood-navbar py-3 shadow-sm bg-white">
                    <div className="container">
                        <Link className="navbar-brand gofood-brand text-danger" to="/">
                            Go<span style={{ color: "var(--primary-color)" }}>Food</span>
                        </Link>
                        <button
                            className="navbar-toggler border-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
                                <li className="nav-item">
                                    <Link className="nav-link active fw-medium" aria-current="page" to="/">
                                        Home
                                    </Link>
                                </li>
                                {isLoggedIn ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-medium" to="/myorders">
                                                My Orders
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link cart-nav-link fw-medium position-relative" to="/cart">
                                                Cart
                                                {cartCount > 0 && (
                                                    <span className="badge bg-danger rounded-pill ms-1 align-middle">{cartCount}</span>
                                                )}
                                            </Link>
                                        </li>
                                        {displayName && (
                                            <li className="nav-item">
                                                <span className="nav-link user-greeting me-2">
                                                    👋 {displayName}
                                                </span>
                                            </li>
                                        )}
                                        <li className="nav-item">
                                            <button
                                                className="btn gofood-btn-primary"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link fw-medium" to="/login">
                                                Login
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="btn gofood-btn-outline" to="/signup">
                                                Signup
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
