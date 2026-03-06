import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        action: {
            type: String,
            required: true,
            enum: ["created", "invited", "signed", "deleted", "declined"]
        },
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
            required: false
        },
        details: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
