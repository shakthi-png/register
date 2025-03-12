import mongoose, { Schema } from "mongoose";

// Define the contact schema
const contactSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        trim: true,
        minLength: [2, "Fullname must be at least 2 characters"],
        maxLength: [100, "Fullname must be at most 100 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email address"],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Pre-save hook to log data before saving
contactSchema.pre('save', function(next) {
    console.log("Preparing to save contact:", this); // Log the contact data
    next();
});

// Post-save hook to log after saving
contactSchema.post('save', function(doc) {
    console.log("Contact saved successfully:", doc); // Log the saved contact document
});

// Create the Contact model
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
