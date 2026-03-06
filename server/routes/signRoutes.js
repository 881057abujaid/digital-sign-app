import express from "express";
import { submitSignature, validateToken, declineSignature } from "../controllers/signController.js";

const router = express.Router();

router.get("/:token", validateToken);
router.post("/:token", submitSignature);
router.post("/decline/:token", declineSignature);

export default router;