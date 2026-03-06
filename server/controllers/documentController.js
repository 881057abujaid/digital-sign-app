import Document from "../models/Document.js";
import crypto from "crypto";
import Signer from "../models/Signer.js";
import Activity from "../models/Activity.js";
import path from "path";

// Get All Documents for Logged-in User
export const getUserDocuments = async (req, res) =>{
    try {
        const documents = await Document.find({
            ownerId: req.user._id,
        }).sort({ createdAt: -1 });

        // Calculate signer counts for each document
        const documentsWithCounts = await Promise.all(
            documents.map(async (doc) => {
                const signers = await Signer.find({ documentId: doc._id });
                const totalSigners = signers.length;
                const completedSigners = signers.filter(s => s.hasSigned).length;
                const pendingSigners = totalSigners - completedSigners;

                return {
                    ...doc.toObject(),
                    totalSigners,
                    completedSigners,
                    pendingSigners
                };
            })
        );

        res.status(200).json(documentsWithCounts);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Documents Invited to the Logged-in User
export const getInvitedDocuments = async (req, res) =>{
    try {
        // Find all signer records for the logged-in user that haven't been signed yet
        const invitedSigners = await Signer.find({
            signerEmail: req.user.email,
            hasSigned: false
        }).populate({
            path: "documentId",
            populate: {
                path: "ownerId",
                select: "name email"
            }
        }).sort({ createdAt: -1 });

        res.status(200).json(invitedSigners);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Activity
export const getUserActivity = async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.user._id })
            .populate("documentId", "originalFileName")
            .sort({ createdAt: -1 })
            .limit(50);
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Upload Document
export const uploadDocument = async (req, res) =>{
    try {
        if(!req.file){
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Ensure relative path is stored if it's absolute (useful for Render/Docker environments)
        let relativePath = req.file.path.replace(/\\/g, "/");
        if (path.isAbsolute(relativePath)) {
            // If absolute, extract the 'uploads/...' part
            const uploadsIdx = relativePath.indexOf("uploads/");
            if (uploadsIdx !== -1) {
                relativePath = relativePath.substring(uploadsIdx);
            }
        }
        
        const document = await Document.create({
            ownerId: req.user._id,
            originalFileName: req.file.originalname,
            originalFileUrl: relativePath,
            currentFileUrl: relativePath,
            status: "pending"
        });

        // Create owner as first signer
        const token = crypto.randomBytes(32).toString("hex");

        const selfSigner = await Signer.create({
            documentId: document._id,
            signerEmail: req.user.email,
            token,
            hasSigned: false,
            tokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        // Log Activity
        await Activity.create({
            userId: req.user._id,
            action: "created",
            documentId: document._id,
            details: `Uploaded ${document.originalFileName}`
        });

        res.status(201).json({
            documentId: document._id,
            selfSignToken: selfSigner.token
        });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

// Invite Signer
export const inviteSigner = async (req, res) =>{
    try {
        const { emails } = req.body; // Expect an array of emails
        const { id } = req.params;

        if(!emails || !Array.isArray(emails) || emails.length === 0){
            return res.status(400).json({ message: "Please provide an array of emails" });
        }

        // Check document exists
        const document = await Document.findById(id);
        if(!document){
            return res.status(404).json({ message: "Document not found" });
        }

        // Ensure owner only can invite
        if(document.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only owner can invite signers" });
        }

        const invitedSigners = [];
        const existingSigners = [];

        for(const email of emails){
            // Check if signer already exists
            const existing = await Signer.findOne({
                documentId: id,
                signerEmail: email
            });

            if(existing){
                existingSigners.push(email);
                continue;
            }

            const token = crypto.randomBytes(32).toString("hex");

            const signer = await Signer.create({
                documentId: id,
                signerEmail: email,
                token,
                tokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            });

            invitedSigners.push({
                email,
                signerLink: `http://localhost:5173/sign/${signer.token}`
            });
        }

        // Log Activity if anyone was successfully invited
        if(invitedSigners.length > 0) {
            const invitedEmails = invitedSigners.map(s => s.email).join(", ");
            await Activity.create({
                userId: req.user._id,
                action: "invited",
                documentId: document._id,
                details: `Invited ${invitedEmails} to sign ${document.originalFileName}`
            });
        }

        res.status(201).json({
            message: `Successfully invited ${invitedSigners.length} signers.`,
            invitedSigners,
            existingSigners
        });

    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Document
export const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findById(id);
        
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        // Ensure only owner can delete
        if(document.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only owner can delete documents" });
        }

        // Delete related signers and activities
        await Signer.deleteMany({ documentId: id });
        await Activity.deleteMany({ documentId: id });
        
        // Delete the document
        await Document.findByIdAndDelete(id);

        // Log Activity for deletion (no documentId since it's deleted)
        await Activity.create({
            userId: req.user._id,
            action: "deleted",
            details: `Deleted document: ${document.originalFileName}`
        });

        res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};