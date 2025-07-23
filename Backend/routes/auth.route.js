import express from "express";
const router = express.Router();
import { register, login, googleAuth, profile, logout } from "../controllers/auth.controller.js";
import { protect, isAdmin, isUser } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validation.js";


// Public routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/google", googleAuth);

// Protected routes
// The isAdmin middleware seems too restrictive for a general profile/logout,
// so I'm only applying protect and isUser. Adjust as needed.
router.get("/profile", protect, isUser, profile);
router.post("/logout", protect, logout);

export default router;
