import express from "express";
import * as reviewsController from "../controllers/reviewsController.js";
import { authenticateToken, isAdmin } from "../middleware/auth.js";
const router = express.Router();

// GET all reviews
router.get("/", reviewsController.getAllReviews);

// GET review by ID
router.get("/:id", reviewsController.getReviewById);

// POST - Create new review (Authenticated users only)
router.post("/", authenticateToken, reviewsController.createReview);

// PUT - Update review (Admin only)
router.put("/:id", authenticateToken, isAdmin, reviewsController.updateReview);

// DELETE review (Admin only)
router.delete("/:id", authenticateToken, isAdmin, reviewsController.deleteReview);

export default router;
