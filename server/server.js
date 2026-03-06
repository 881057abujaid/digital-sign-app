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
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.get("/", (req, res) =>{
    res.send("Cross IP Server is working");
});
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/sign", signRoutes);

const HOST = "localhost";
const PORT = process.env.PORT || 5000;

app.listen(PORT, HOST, () =>{
    console.log(`Server running at http://${HOST}:${PORT}`);
});