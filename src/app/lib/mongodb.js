import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Check if already connected
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect("mongodb+srv://shakthir9380:P7an73Vna0fUXK0R@cluster0.1u0cs.mongodb.net/contact_db", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Connected to MongoDB");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Database connection failed");
    }
};

export default connectDB;
