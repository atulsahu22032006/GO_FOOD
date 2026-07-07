import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.error("dsfj");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;