import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function FoodCard({ foodItem }) {
    const priceOptions = foodItem?.options?.[0] || {};
    const optionNames = Object.keys(priceOptions);
    const firstOption = optionNames[0] || "";
    const firstPrice = firstOption ? priceOptions[firstOption] : "";

    return (
        <Card className="food-card-ui h-100">
            <Card.Img
                variant="top"
                src={foodItem.img}
                alt={foodItem.name}
                style={{
                    height: "220px",
                    objectFit: "cover",
                }}
            />

            <Card.Body>
                <Card.Title className="fw-bold fs-4">
                    {foodItem.name}
                </Card.Title>

                <Card.Text className="food-card-copy">
                    {foodItem.description}
                </Card.Text>

                <div className="d-flex justify-content-between mb-3">
                    <span className="badge food-rating-badge">
                        ★ 4.5
                    </span>

                    <span className="text-warning fw-bold">
                        ⏱ 25 mins
                    </span>
                </div>

                <div className="row mb-3">
                    <div className="col-6">
                        <Form.Select size="sm" className="food-select">
                            {[...Array(6)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Qty {i + 1}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="col-6">
                        <Form.Select size="sm" className="food-select" defaultValue={firstOption}>
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
                        ₹{firstPrice}
                    </h4>

                    <Button className="food-add-btn">
                        Add
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default FoodCard;
