import mongoose from "mongoose";
import dns from "dns";

// Set DNS servers to Google and Cloudflare to bypass local ISP DNS resolution issues
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
      try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("✅ MongoDB Atlas Connected");

            const fetched_data = await mongoose.connection.db.collection("food_items");
            const foodData = await fetched_data.find({}).toArray();

            const foodCategoryCollection = await mongoose.connection.db.collection("foodCategory");
            const categoryData = await foodCategoryCollection.find({}).toArray();

            global.food_items = foodData;
            global.foodCategory = categoryData;

            console.log("🎒 Loaded food items and categories successfully from DB!");
      } catch (error) {
            console.error("Database connection failed:", error.message);
            process.exit(1);
      }
};

export default connectDB;