import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCart } from "../context/CartContext";

function FoodCard({ foodItem }) {
    const { addToCart } = useCart();

    const priceOptions = foodItem?.options?.[0] || {};
    const optionNames = Object.keys(priceOptions);
    const firstOption = optionNames[0] || "";

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(firstOption);

    const currentPrice = size && priceOptions[size] ? Number(priceOptions[size]) : 0;

    const handleAddToCart = () => {
        addToCart(foodItem, qty, size, currentPrice);
    };

    return (
        <Card className="food-card-ui h-100">
            <div className="food-card-img-wrapper">
                <Card.Img
                    variant="top"
                    src={foodItem.img}
                    alt={foodItem.name}
                    className="card-img-top"
                    onError={(e) => {
                        // Fallback for blocked/invalid image URLs (e.g., Mix Veg Pizza)
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500";
                    }}
                />
                <div className="food-card-overlay">
                    <span className="badge food-rating-badge">
                        ★ 4.5
                    </span>
                </div>
            </div>

            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <Card.Title className="fw-bold fs-5 mb-0" style={{ letterSpacing: "-0.5px" }}>
                            {foodItem.name}
                        </Card.Title>
                        <span className="text-muted fw-semibold small" style={{ color: "var(--primary-color) !important" }}>
                            ⏱ 25 mins
                        </span>
                    </div>

                    <Card.Text className="food-card-copy text-muted">
                        {foodItem.description}
                    </Card.Text>
                </div>

                <div className="row mb-3">
                    <div className="col-6">
                        <Form.Select
                            size="sm"
                            className="food-select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                        >
                            {[...Array(6)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Qty {i + 1}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="col-6">
                        <Form.Select
                            size="sm"
                            className="food-select"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {optionNames.map((optionName) => (
                                <option key={optionName} value={optionName}>
                                    {optionName}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="food-price mb-0">
                        ₹{currentPrice * qty}
                    </h4>

                    <Button className="food-add-btn" onClick={handleAddToCart}>
                        Add
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default FoodCard;
