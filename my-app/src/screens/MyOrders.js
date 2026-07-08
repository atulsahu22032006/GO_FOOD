import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config/api";

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { authToken, isLoggedIn, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_URL}/myorders`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    },
                });

                const json = await response.json();

                if (!json.success) {
                    setError(json.error || "Unable to load your orders.");
                    return;
                }

                setOrders(json.orders || []);
            } catch (err) {
                setError("Unable to connect to the server.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [authToken, isLoggedIn, isLoading, navigate]);

    return (
        <>
            <Navbar />

            <section className="orders-section">
                <div className="container">
                    <div className="mb-4">
                        <p className="section-eyebrow mb-2">Order history</p>
                        <h2 className="food-section-title">My Orders</h2>
                        <p className="food-section-subtitle mb-0">
                            Track everything you have ordered from GoFood.
                        </p>
                    </div>

                    {loading && (
                        <div className="text-center py-5">
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Loading orders...</span>
                            </div>
                            <p className="mt-3 text-muted mb-0">Loading your orders...</p>
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    {!loading && !error && orders.length === 0 && (
                        <div className="cart-empty text-center py-5">
                            <i className="ri-file-list-3-line cart-empty-icon" />
                            <h3 className="mb-2">No orders yet</h3>
                            <p className="text-muted mb-4">
                                Place your first order from the menu.
                            </p>
                            <Link to="/" className="btn food-add-btn px-4">
                                Order Now
                            </Link>
                        </div>
                    )}

                    {!loading && !error && orders.length > 0 && (
                        <div className="orders-list">
                            {orders.map((order) => (
                                <div className="order-card" key={order._id}>
                                    <div className="order-card-header">
                                        <div>
                                            <p className="order-id mb-1">
                                                Order #{order._id.slice(-6).toUpperCase()}
                                            </p>
                                            <p className="order-date mb-0">
                                                {formatDate(order.orderDate)}
                                            </p>
                                        </div>
                                        <div className="text-end">
                                            <span className="order-status-badge">
                                                {order.status}
                                            </span>
                                            <p className="order-total mb-0">
                                                ₹{order.totalAmount}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="order-items">
                                        {order.order_data.map((item, index) => (
                                            <div
                                                className="order-item-row"
                                                key={`${order._id}-${index}`}
                                            >
                                                <span>
                                                    {item.name} ·{" "}
                                                    {item.size.charAt(0).toUpperCase() +
                                                        item.size.slice(1)}{" "}
                                                    × {item.qty}
                                                </span>
                                                <span>₹{item.totalPrice}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
