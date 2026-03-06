import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import signRoutes from "./routes/signRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "https://digital-sign-app-eight.vercel.app"],
    credentials: true,
}));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// uploads directory absolute path
const uploadDir = path.join(__dirname, "uploads");

// create uploads directory if not exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Serve uploaded files
app.use("/uploads", express.static(uploadDir));


// Routes
app.get("/", (req, res) =>{
    res.send("Cross IP Server is working");
});
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/sign", signRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});