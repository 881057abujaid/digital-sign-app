import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        originalFileName: {
            type: String,
            required: true
        },
        originalFileUrl: {
            type: String,
            required: true
        },
        currentFileUrl: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending"
        }
    },
    { timestamps: true }
);
export default mongoose.model("Document", documentSchema);