import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Contact from "@/app/models/contact";

export async function POST(req) {
    // Assuming req is treated as 'any'
    const { fullname, email, message } = await req.json();

    try {
        await connectDB();
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
            return NextResponse.json({
                msg: "An unexpected error occurred.",
                error: error.message,
                success: false,
            });
        }
    }
}
