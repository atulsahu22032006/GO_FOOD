import React from "react";

const QUICK_SEARCHES = ["Biryani", "Pizza", "Starter"];

export default function Carousal({ searchQuery, onSearchChange, onSearchSubmit }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSearchSubmit?.();
    };

    const handleQuickSearch = (term) => {
        onSearchChange(term);
        onSearchSubmit?.();
    };

    return (
        <div className="carousel-hero position-relative">
            <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600"
                            className="d-block w-100 carousel-hero-img"
                            alt="Pizza"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600"
                            className="d-block w-100 carousel-hero-img"
                            alt="Burger"
                        />
                    </div>

                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600"
                            className="d-block w-100 carousel-hero-img"
                            alt="Salad"
                        />
                    </div>
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon"></span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

            <div className="carousel-hero-gradient" aria-hidden="true" />

            <div className="carousel-search-overlay">
                <div className="hero-content text-center">
                    <p className="hero-eyebrow mb-3">Delivering in Lucknow</p>
                    <h1 className="hero-brand mb-3">GoFood</h1>
                    <p className="hero-tagline mb-4">
                        Discover restaurants, track orders, and get food delivered fast.
                    </p>

                    <form className="hero-search-form" onSubmit={handleSubmit}>
                        <div className="hero-search-field">
                            <i className="ri-search-line hero-search-icon" aria-hidden="true" />
                            <input
                                type="search"
                                className="hero-search-input"
                                placeholder="Search pizza, biryani, starters..."
                                value={searchQuery}
                                onChange={(event) => onSearchChange(event.target.value)}
                                aria-label="Search food items"
                            />
                            <button type="submit" className="hero-search-btn">
                                Search
                            </button>
                        </div>
                    </form>

                    <div className="hero-quick-search">
                        <span className="hero-quick-label">Popular:</span>
                        {QUICK_SEARCHES.map((term) => (
                            <button
                                key={term}
                                type="button"
                                className="hero-quick-chip"
                                onClick={() => handleQuickSearch(term)}
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
