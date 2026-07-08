import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import createUserRouter from "./Routes/CreateUser.js";
import displayDataRouter from "./Routes/DisplayData.js";
import orderDataRouter from "./Routes/OrderData.js";

dotenv.config();

const app = express();

connectDB();

const allowedOrigins = [
      process.env.CLIENT_URL,
      "http://localhost:3000",
].filter(Boolean);

app.use(
      cors({
            origin(origin, callback) {
                  if (!origin || allowedOrigins.includes(origin)) {
                        callback(null, true);
                        return;
                  }

                  callback(new Error("Not allowed by CORS"));
            },
      })
);
app.use(express.json());
app.use("/api", createUserRouter);
app.use("/api", displayDataRouter);
app.use("/api", orderDataRouter);

app.get("/", (req, res) => {
      res.send("Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
});
