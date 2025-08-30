import express from "express";
const router = express.Router();
import { createPlanner } from "../controllers/planner.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { getPlanners } from "../controllers/planner.controller.js";

// नया प्लानर बनाने के लिए रूट (सिर्फ लॉगिन यूज़र के लिए)
router.post("/create", protect, createPlanner);
// सभी प्लानर लाने के लिए रूट (सिर्फ लॉगिन यूज़र के लिए)
router.get("/all", protect, getPlanners);


export default router;
