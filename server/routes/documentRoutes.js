import express from "express";
import { uploadDocument, inviteSigner, getUserDocuments, getInvitedDocuments, getUserActivity, deleteDocument } from "../controllers/documentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadPDF } from "../middleware/uploadMiddleware.js"; 

const router = express.Router();

router.post("/upload", protect, uploadPDF.single("file"), uploadDocument);
router.post("/:id/invite", protect, inviteSigner);
router.get("/invited", protect, getInvitedDocuments);
router.get("/activity", protect, getUserActivity);
router.get("/", protect, getUserDocuments);
router.delete("/:id", protect, deleteDocument);

export default router;