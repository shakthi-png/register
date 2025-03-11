import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Contact from "@/app/models/contact";

export async function POST(req) {
    const { fullname, email, message } = await req.json();
  

    try{
        await connectDB();
        await Contact.create({fullname,email,message});
        return NextResponse.json({
            msg: ["Message sent successfully"], success: true
        })
    }catch(error){
        if(error instanceof mongoose.Error.ValidationError){
            let errorList = [];
            for (let e in error.errors){
                errorList.push(e.message);
            }

            return NextResponse.json({msg:errorList})
        }
        else{
            return NextResponse.json(error)
        }

    }

}