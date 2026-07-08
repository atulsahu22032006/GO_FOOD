import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import dns from "dns";

dotenv.config();

// Set DNS servers to Google and Cloudflare to bypass local ISP DNS resolution issues
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

        const foodData = JSON.parse(
            fs.readFileSync("./foodData2.json", "utf8")
        );

        const foodCategoryData = JSON.parse(
            fs.readFileSync("./foodCategory.json", "utf8")
        );

        const db = mongoose.connection.db;

        // Drop / clear existing collections to prevent duplicates
        await db.collection("food_items").deleteMany({});
        await db.collection("foodCategory").deleteMany({});
        console.log("🗑️ Cleared existing database records in food_items and foodCategory");

        // Create collections and insert data
        await db.collection("food_items").insertMany(foodData);
        await db.collection("foodCategory").insertMany(foodCategoryData);

        console.log("🎉 Food Data & Food Categories Imported Successfully!");

        process.exit();
    } catch (err) {
        console.error("❌ Data import failed:", err);
        process.exit(1);
    }
};

importData();