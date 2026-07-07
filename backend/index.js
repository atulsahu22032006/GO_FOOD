import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

dotenv.config();

const app = express();

connectDB();

app.get("/", (req, res) => {
      res.send("Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
});