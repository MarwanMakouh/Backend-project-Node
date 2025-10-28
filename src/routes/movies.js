import express from "express";
import * as moviesController from "../controllers/moviesController.js";
import { authenticateToken, isAdmin } from "../middleware/auth.js";
const router = express.Router();

// GET all movies (with pagination support)
router.get("/", moviesController.getAllMovies);

// GET search movies (must be before /:id route)
router.get("/search", moviesController.searchMovies);

// GET movie by ID
router.get("/:id", moviesController.getMovieById);

// POST - Create new movie (Admin only)
router.post("/", authenticateToken, isAdmin, moviesController.createMovie);

// PUT - Update movie (Admin only)
router.put("/:id", authenticateToken, isAdmin, moviesController.updateMovie);

// DELETE movie (Admin only)
router.delete("/:id", authenticateToken, isAdmin, moviesController.deleteMovie);

export default router;