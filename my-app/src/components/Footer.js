import React from "react";

export default function Footer() {
    return (
        <footer className="gofood-footer mt-5">
            <div className="container py-5">
                <div className="gofood-footer-inner">
                    <div className="footer-top">
                        <div className="row align-items-start">
                            {/* Brand */}
                            <div className="col-lg-4 mb-4">
                                <div className="footer-brand-block">
                                    <h3 className="gofood-footer-brand mb-2">
                                        Go<span style={{ color: "var(--primary-color)" }}>Food</span>
                                    </h3>

                                    <p className="footer-brand-text">
                                        Premium meals, fast delivery, and a cart that’s always ready. Built for your Lucknow cravings.
                                    </p>

                                    <div className="footer-badges">
                                        <div className="footer-badge">
                                            <span className="footer-badge-icon">⚡</span>
                                            <span>Quick Checkout</span>
                                        </div>
                                        <div className="footer-badge">
                                            <span className="footer-badge-icon">🛡️</span>
                                            <span>Secure Login</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Menu */}
                            <div className="col-md-3 mb-4">
                                <h6 className="footer-heading">Explore</h6>
                                <ul className="footer-links">
                                    <li>
                                        <a href="/">Home</a>
                                    </li>
                                    <li>
                                        <a href="/cart">Cart</a>
                                    </li>
                                    <li>
                                        <a href="/myorders">My Orders</a>
                                    </li>
                                    <li>
                                        <a href="/login">Login</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Help */}
                            <div className="col-md-3 mb-4">
                                <h6 className="footer-heading">Help</h6>
                                <ul className="footer-links">
                                    <li>
                                        <a href="/" className="footer-link-muted">FAQs</a>
                                    </li>
                                    <li>
                                        <a href="/" className="footer-link-muted">Track Orders</a>
                                    </li>
                                    <li>
                                        <a href="/" className="footer-link-muted">Contact Support</a>
                                    </li>
                                </ul>

                                <div className="footer-contact">
                                    <div className="footer-contact-row">
                                        <span className="footer-contact-icon">📍</span>
                                        <span>Lucknow, India</span>
                                    </div>
                                    <div className="footer-contact-row">
                                        <span className="footer-contact-icon">📞</span>
                                        <span>+91 98765 43210</span>
                                    </div>
                                    <div className="footer-contact-row">
                                        <span className="footer-contact-icon">📧</span>
                                        <span>support@gofood.com</span>
                                    </div>
                                </div>
                            </div>

                            {/* Social + Newsletter (unique) */}
                            <div className="col-lg-2 mb-4">
                                <h6 className="footer-heading">Follow</h6>
                                <div className="footer-social">
                                    <a href="/" aria-label="Facebook" className="footer-social-btn">
                                        <i className="ri-facebook-circle-fill"></i>
                                    </a>
                                    <a href="/" aria-label="Instagram" className="footer-social-btn">
                                        <i className="ri-instagram-line"></i>
                                    </a>
                                    <a href="/" aria-label="Twitter" className="footer-social-btn">
                                        <i className="ri-twitter-x-line"></i>
                                    </a>
                                    <a href="/" aria-label="GitHub" className="footer-social-btn">
                                        <i className="ri-github-fill"></i>
                                    </a>
                                </div>

                                <div className="footer-newsletter">
                                    <div className="footer-newsletter-title">Get offers</div>
                                    <div className="footer-newsletter-subtitle">Weekly picks for food lovers.</div>
                                    <div className="footer-newsletter-form">
                                        <input
                                            type="email"
                                            className="footer-newsletter-input"
                                            placeholder="Email address"
                                            aria-label="Email address"
                                            disabled
                                        />
                                        <button className="footer-newsletter-btn" type="button" disabled>
                                            Notify me
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-divider" />

                    <div className="footer-bottom">
                        <div className="footer-copy">
                            © {new Date().getFullYear()} GoFood. All Rights Reserved. लखनऊ, भारत.
                        </div>
                        <div className="footer-mini-links">
                            <a href="/" className="footer-mini-link">Privacy</a>
                            <span className="footer-mini-sep">•</span>
                            <a href="/" className="footer-mini-link">Terms</a>
                            <span className="footer-mini-sep">•</span>
                            <a href="/" className="footer-mini-link">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
