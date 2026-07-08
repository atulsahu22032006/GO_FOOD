import express from "express";
import Order from "../models/Orders.js";
import fetchData from "../middleware/fetchData.js";

const router = express.Router();

router.post("/orderData", fetchData, async (req, res) => {
      try {
            const { order_data, totalAmount } = req.body;

            if (!order_data?.length) {
                  return res.status(400).json({
                        success: false,
                        error: "Your cart is empty.",
                  });
            }

            if (!totalAmount || totalAmount <= 0) {
                  return res.status(400).json({
                        success: false,
                        error: "Invalid order total.",
                  });
            }

            await Order.create({
                  userId: req.user.id,
                  order_data,
                  totalAmount,
            });

            res.json({ success: true });
      } catch (error) {
            console.error(error.message);
            res.status(500).json({
                  success: false,
                  error: "Server error while placing order.",
            });
      }
});

router.post("/myorders", fetchData, async (req, res) => {
      try {
            const orders = await Order.find({ userId: req.user.id }).sort({
                  orderDate: -1,
            });

            res.json({ success: true, orders });
      } catch (error) {
            console.error(error.message);
            res.status(500).json({
                  success: false,
                  error: "Server error while fetching orders.",
            });
      }
});

export default router;
