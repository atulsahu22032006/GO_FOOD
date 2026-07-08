import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.post("/foodData", async (req, res) => {
      try {
            const food_items = await mongoose.connection.db
                  .collection("food_items")
                  .find({})
                  .toArray();
            const foodCategory = await mongoose.connection.db
                  .collection("foodCategory")
                  .find({})
                  .toArray();

            res.send([food_items, foodCategory]);
      } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
      }
});

export default router;
