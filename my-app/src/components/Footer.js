import React from "react";

export default function Footer() {
    return (
        <footer className="gofood-footer mt-5">
            <div className="container py-5">
                <div className="row">
                    {/* Brand */}
                    <div className="col-md-4 mb-4">
                        <h3 className="gofood-footer-brand">GoFood</h3>
                        <p className="text-secondary">
                            Delicious food delivered to your doorstep.
                            Fresh ingredients, fast delivery, and amazing taste.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-2 mb-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/" className="text-decoration-none text-secondary">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/login" className="text-decoration-none text-secondary">
                                    Login
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-decoration-none text-secondary">
                                    My Orders
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-decoration-none text-secondary">
                                    Cart
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-3 mb-4">
                        <h5>Contact</h5>
                        <p className="text-secondary mb-1">📍 Lucknow, India</p>
                        <p className="text-secondary mb-1">📞 +91 98765 43210</p>
                        <p className="text-secondary">📧 support@gofood.com</p>
                    </div>

                    {/* Social */}
                    <div className="col-md-3 mb-4">
                        <h5>Follow Us</h5>
                        <div className="d-flex gap-3 fs-4">
                            <a href="/" className="text-light">
                                <i className="ri-facebook-circle-fill"></i>
                            </a>
                            <a href="/" className="text-light">
                                <i className="ri-instagram-line"></i>
                            </a>
                            <a href="/" className="text-light">
                                <i className="ri-twitter-x-line"></i>
                            </a>
                            <a href="/" className="text-light">
                                <i className="ri-github-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="border-secondary opacity-25" />

                <div className="text-center text-secondary">
                    © {new Date().getFullYear()} GoFood. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
