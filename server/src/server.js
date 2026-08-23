import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*"
  })
);

app.use(express.json({
  limit: "1mb"
}));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "WebPilot AI server is running."
  });
});

app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
  console.log(`WebPilot AI server running on port ${PORT}`);
});