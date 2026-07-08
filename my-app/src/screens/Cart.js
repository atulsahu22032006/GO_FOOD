import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import API_URL from "../config/api";

const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500";

export default function Cart() {
    const { cartItems, cartTotal, removeFromCart, updateCartQty, clearCart } = useCart();
    const { authToken, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handlePlaceOrder = async () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/orderData`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                },
                body: JSON.stringify({
                    order_data: cartItems,
                    totalAmount: cartTotal,
                }),
            });

            const json = await response.json();

            if (!json.success) {
                setError(json.error || "Unable to place your order.");
                return;
            }

            clearCart();
            setSuccess("Order placed successfully!");
            setTimeout(() => navigate("/myorders"), 1200);
        } catch (err) {
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <section className="cart-section">
                <div className="container">
                    <div className="mb-4">
                        <p className="section-eyebrow mb-2">Your order</p>
                        <h2 className="food-section-title">Cart</h2>
                        <p className="food-section-subtitle mb-0">
                            Review items before checkout.
                        </p>
                    </div>

                    {error && (
                        <div className="gofood-page-message">
                            <div className="gofood-banner gofood-banner-danger" role="alert">
                                <div className="gofood-banner-icon">!</div>
                                <div className="gofood-banner-body">
                                    <div className="gofood-banner-title">Something went wrong</div>
                                    <p className="gofood-banner-text">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="gofood-page-message">
                            <div className="gofood-banner gofood-banner-success" role="alert">
                                <div className="gofood-banner-icon">✓</div>
                                <div className="gofood-banner-body">
                                    <div className="gofood-banner-title">Order placed</div>
                                    <p className="gofood-banner-text">{success}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {cartItems.length === 0 ? (
                        <div className="cart-empty text-center py-5">
                            <i className="ri-shopping-cart-2-line cart-empty-icon" />
                            <h3 className="mb-2">Your cart is empty</h3>
                            <p className="text-muted mb-4">
                                Add some delicious food from the menu.
                            </p>
                            <Link to="/" className="btn food-add-btn px-4">
                                Browse Menu
                            </Link>
                        </div>
                    ) : (
                        <div className="row g-4">
                            <div className="col-lg-8">
                                <div className="cart-items-list">
                                    {cartItems.map((item) => (
                                        <div className="cart-item" key={item.id}>
                                            <img
                                                src={item.img || FALLBACK_IMG}
                                                alt={item.name}
                                                className="cart-item-img"
                                            />

                                            <div className="cart-item-details">
                                                <h5 className="mb-1">{item.name}</h5>
                                                <p className="cart-item-meta mb-2">
                                                    {item.category} ·{" "}
                                                    {item.size.charAt(0).toUpperCase() +
                                                        item.size.slice(1)}
                                                </p>
                                                <p className="cart-item-price mb-0">
                                                    ₹{item.pricePerUnit} each
                                                </p>
                                            </div>

                                            <div className="cart-item-actions">
                                                <div className="cart-qty-controls">
                                                    <button
                                                        type="button"
                                                        className="cart-qty-btn"
                                                        onClick={() =>
                                                            updateCartQty(
                                                                item.id,
                                                                item.qty - 1
                                                            )
                                                        }
                                                        disabled={item.qty <= 1}
                                                    >
                                                        −
                                                    </button>
                                                    <span className="cart-qty-value">
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="cart-qty-btn"
                                                        onClick={() =>
                                                            updateCartQty(
                                                                item.id,
                                                                item.qty + 1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <p className="cart-item-total mb-2">
                                                    ₹{item.totalPrice}
                                                </p>

                                                <button
                                                    type="button"
                                                    className="cart-remove-btn"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="cart-summary">
                                    <h4 className="mb-3">Order Summary</h4>

                                    <div className="cart-summary-row">
                                        <span>Items</span>
                                        <span>{cartItems.length}</span>
                                    </div>

                                    <div className="cart-summary-row">
                                        <span>Delivery</span>
                                        <span className="text-success">Free</span>
                                    </div>

                                    <div className="cart-summary-total">
                                        <span>Total</span>
                                        <span>₹{cartTotal}</span>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn food-add-btn w-100 mt-3"
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                    >
                                        {loading ? "Placing Order..." : "Place Order"}
                                    </button>

                                    <Link
                                        to="/"
                                        className="btn gofood-btn-outline w-100 mt-2"
                                    >
                                        Continue Ordering
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
