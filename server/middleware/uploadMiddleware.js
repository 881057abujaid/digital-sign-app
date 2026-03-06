import multer from "multer";
import path from "path";

// Common storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// PDF upload middleware
export const uploadPDF = multer({
    storage,
    fileFilter: (req, file, cb) =>{
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
