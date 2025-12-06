import express from "express";
import { login, register, verifyToken } from "../controller/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/register", register); // Optional - remove in production if not needed

// Protected route
router.get("/verify", authenticate, verifyToken);

export default router;


