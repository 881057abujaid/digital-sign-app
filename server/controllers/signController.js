import Signer from "../models/Signer.js";
import Activity from "../models/Activity.js";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// GET - Validate token
export const validateToken = async (req, res) =>{
    try {
        const { token } = req.params;

        const  signer = await Signer.findOne({ token }).populate("documentId");

        if(!signer) {
            return res.status(404).json({ message: "Invalid token" });
        }

        if(signer.tokenExpiresAt < new Date()) {
            return res.status(400).json({ message: "Token expired" });
        }

        res.status(200).json({
            documentId: signer.documentId._id,
            documentName: signer.documentId.originalFileName,
            hasSigned: signer.hasSigned
        });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

// Submit Signature
export const submitSignature = async (req, res) =>{
  try {
    const { token } = req.params;
    const { signatures } = req.body;
    console.log("BODY", req.body);

    if(!signatures || !Array.isArray(signatures) || signatures.length === 0){
      return res.status(400).json({ message: "NO signatures provided" });
    }

    const signer = await Signer.findOne({ token }).populate("documentId");

    if(!signer){
      return res.status(404).json({ message: "Invalid token" });
    }

    if(signer.tokenExpiresAt < new Date()){
      return res.status(400).json({ message: "Token expired" });
    }

    if(signer.hasSigned){
      return res.status(400).json({ message: "Already signed" });
    }

    const document = signer.documentId;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const pdfPath = path.join(__dirname, "..", document.currentFileUrl);
    const existingPdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();

    // Loop through all signatures
    for(const sig of signatures){
      const { signatureImage, page } = sig;
      if(!signatureImage) continue;

      const base64Data = signatureImage.includes(",") ? signatureImage.split(",")[1] : signatureImage;
      const imageBuffer = Buffer.from(base64Data, "base64");
      const embeddedImage = await pdfDoc.embedPng(imageBuffer);
      const pageIndex = parseInt(page, 10);

      if(!pages[pageIndex]){
        return res.status(400).json({ message: "Invalid page number" });
      }

      pages[pageIndex].drawImage(embeddedImage, {
        x: Number(sig.x),
        y: Number(sig.y),
        width: Number(sig.width),
        height: Number(sig.height),
      });

      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const timeStamp = new Date().toISOString();

      pages[pageIndex].drawText(
        `Signed by: ${signer.signerEmail}`,
        {
          x: Number(sig.x),
          y: Number(sig.y) - 12,
          size: 8,
          font,
          color: rgb(0.3, 0.3, 0.3),
        },
      );

      pages[pageIndex].drawText(
        `Signed at: ${timeStamp}`,
        {
          x: Number(sig.x),
          y: Number(sig.y) - 24,
          size: 8,
          font,
          color: rgb(0.3, 0.3, 0.3),
        },
      );
    }

    const pdfBytes = await pdfDoc.save();
    const newFileName = `signed-${Date.now()}.pdf`;
    const newPath = path.join(__dirname, "..", "uploads", newFileName);

    await fs.promises.writeFile(newPath, pdfBytes);

    document.currentFileUrl = `uploads/${newFileName}`;
    await document.save();

    signer.hasSigned = true;
    await signer.save();

    // Log Activity
    await Activity.create({
        userId: document.ownerId,
        action: "signed",
        documentId: document._id,
        details: `${signer.signerEmail} signed ${document.originalFileName}`
    });

    const remaining = await Signer.find({
      documentId: document._id,
      hasSigned: false,
    });

    if(remaining.length === 0){
      document.status = "completed";
      await document.save();
    }

    res.json({
      message: "Signature submitted successfully",
      fileUrl: `/uploads/${newFileName}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Decline Signature
export const declineSignature = async (req, res) => {
    try {
        const { token } = req.params;
        const signer = await Signer.findOne({ token }).populate("documentId");

        if(!signer){
            return res.status(404).json({ message: "Invalid or expired token" });
        }

        if(signer.hasSigned){
            return res.status(400).json({ message: "Document already signed" });
        }

        const document = signer.documentId;

        // Log Activity
        await Activity.create({
            userId: document.ownerId,
            action: "declined",
            documentId: document._id,
            details: `${signer.signerEmail} declined to sign ${document.originalFileName}`
        });

        // Delete the signer
        await Signer.findByIdAndDelete(signer._id);

        // Check if document is now completed
        const remaining = await Signer.find({
            documentId: document._id,
            hasSigned: false,
        });

        if(remaining.length === 0){
            document.status = "completed";
            await document.save();
        }

        res.status(200).json({ message: "Signature declined successfully" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};