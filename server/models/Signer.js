import mongoose from "mongoose";

const signerSchema = new mongoose.Schema(
    {
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
            required: true
        },
        signerEmail: {
            type: String,
            required: true
        },
        hasSigned: {
            type: Boolean,
            default: false
        },
        token: {
            type: String,
            required: true
        },
        tokenExpiresAt: {
            type: Date,
            required: true
        },
        signatureMeta: {
            page: Number,
            x: Number,
            y: Number
        }
    },
    { timestamps: true }
);
export default mongoose.model("Signer", signerSchema);