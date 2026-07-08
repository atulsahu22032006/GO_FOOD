import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FoodCard from "../components/Card";
import Carousal from "../components/Carousal";
import API_BASE_URL from "../config";

export default function Home() {
    const [foodItems, setFoodItems] = useState([]);
    const [foodCategory, setFoodCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const loadData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/foodData`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            setFoodItems(data[0] || []);
            setFoodCategory(data[1] || []);
        } catch (err) {
            setError("Unable to load food items");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Navbar />
            <Carousal searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            <section className="food-list-section">
                <div className="container">
                    <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-4">
                        <div>
                            <p className="section-eyebrow mb-2">Lucknow favourites</p>
                            <h2 className="food-section-title">Order food online</h2>
                            <p className="food-section-subtitle mb-0">
                                Fresh meals, quick delivery, and comfort food from around the city.
                            </p>
                        </div>
                    </div>

                    {loading && (
                        <div className="alert alert-light border" role="status">
                            Loading food items...
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    {!loading && !error && foodCategory.map((category) => {
                        const filteredItems = foodItems.filter((item) =>
                            item.CategoryName === category.CategoryName &&
                            item.name.toLowerCase().includes(searchQuery.toLowerCase())
                        );

                        if (filteredItems.length === 0) return null;

                        return (
                            <div className="mb-5" key={category.CategoryName}>
                                <h3 className="category-title mb-3">
                                    {category.CategoryName}
                                </h3>

                                <div className="row g-4">
                                    {filteredItems.map((item) => (
                                        <div className="col-lg-4 col-md-6" key={item._id || item.name}>
                                            <FoodCard foodItem={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <Footer />
        </>
    );
}
