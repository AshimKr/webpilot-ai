import express from "express";
import { processAIRequest } from "../controllers/aiController.js";

const router = express.Router();

router.post("/", processAIRequest);

export default router;