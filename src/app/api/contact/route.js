import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Contact from "@/app/models/contact";

const connectWithTimeout = (timeout = 5000) => {
    return Promise.race([
        connectDB(),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Database connection timed out")), timeout)
        )
    ]);
};

export async function POST(req) {
    const { fullname, email, message } = await req.json();
    console.log("Received data:", { fullname, email, message }); // Log incoming data

    try {
        await connectWithTimeout();
        const newContact = await Contact.create({ fullname, email, message });
        console.log("Contact created:", newContact); // Log the created contact

        return NextResponse.json({
            msg: "Message sent successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error:", error); // Log the error
        if (error instanceof mongoose.Error.ValidationError) {
            const errorList = Object.values(error.errors).map(e => e.message);
            return NextResponse.json({ msg: errorList, success: false });
        } else {
            return NextResponse.json({
                msg: "An unexpected error occurred.",
                error: error.message,
                success: false,
            });
        }
    }
}
