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
                <nav className="navbar navbar-expand-lg navbar-dark gofood-navbar">
                    <div className="container">
                        <Link className="navbar-brand gofood-brand" to="/">
                            GoFood
                        </Link>
                        <button
                            className="navbar-toggler"
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
                                    <Link className="nav-link active" aria-current="page" to="/">
                                        Home
                                    </Link>
                                </li>
                                {isLoggedIn ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/myorders">
                                                My Orders
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link cart-nav-link" to="/cart">
                                                Cart
                                                {cartCount > 0 && (
                                                    <span className="cart-badge">{cartCount}</span>
                                                )}
                                            </Link>
                                        </li>
                                        {displayName && (
                                            <li className="nav-item">
                                                <span className="nav-link text-white-50 small me-2">
                                                    {displayName}
                                                </span>
                                            </li>
                                        )}
                                        <li className="nav-item">
                                            <button
                                                className="btn btn-outline-danger btn-sm px-3 py-1.5"
                                                onClick={handleLogout}
                                                style={{ borderRadius: "6px" }}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">
                                                Login
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/signup">
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
