import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Check if already connected
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 10000, // Set a longer timeout (10 seconds)
            });
            console.log("Connected to MongoDB");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Database connection failed");
    }
};

export default connectDB;
