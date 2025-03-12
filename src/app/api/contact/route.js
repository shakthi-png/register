import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Contact from "@/app/models/contact";

const connectWithTimeout = (timeout = 50000) => {
    return Promise.race([
        connectDB(),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Database connection timed out")), timeout)
        )
    ]);
};

export async function POST(req) {
    const { fullname, email, message } = await req.json();

    try {
        await connectWithTimeout(); // Use the new connectWithTimeout function
        await Contact.create({ fullname, email, message });

        return NextResponse.json({
            msg: "Message sent successfully",
            success: true,
        });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const errorList = Object.values(error.errors).map(e => e.message);
            return NextResponse.json({ msg: errorList, success: false });
        } else {
            console.error("Error:", error); // Log the error for debugging
            return NextResponse.json({
                msg: "An unexpected error occurred.",
                error: error.message,
                success: false,
            });
        }
    }
}
