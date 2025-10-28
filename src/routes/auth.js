import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

// POST - Login
router.post("/login", authController.login);

// POST - Register
router.post("/register", authController.register);

// GET - Get current user (requires token)
router.get("/me", authController.getCurrentUser);

export default router;
