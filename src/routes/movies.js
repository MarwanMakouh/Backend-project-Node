import express from "express";
import connection from "../config/db.js";
import { authenticateToken, isAdmin } from "../middleware/auth.js";
const router = express.Router();

// GET all movies (with pagination support)
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default 10 items per page
  const offset = parseInt(req.query.offset) || 0; // Default start at 0

  // Validate limit and offset
  if (limit < 1 || limit > 100) {
    return res.status(400).json({ error: "Limit must be between 1 and 100" });
  }

  if (offset < 0) {
    return res.status(400).json({ error: "Offset must be 0 or greater" });
  }

  // Get total count
  const countSql = "SELECT COUNT(*) as total FROM movies";
  connection.query(countSql, (err, countResults) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResults[0].total;

    // Get paginated results
    const sql = "SELECT * FROM movies LIMIT ? OFFSET ?";
    connection.query(sql, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        data: results,
        pagination: {
          total,
          limit,
          offset,
          count: results.length,
          hasMore: offset + results.length < total
        }
      });
    });
  });
});

// GET search movies (must be before /:id route)
router.get("/search", (req, res) => {
  const { title, genre, director, year } = req.query;

  // At least one search parameter is required
  if (!title && !genre && !director && !year) {
    return res.status(400).json({ error: "At least one search parameter is required (title, genre, director, or year)" });
  }

  let sql = "SELECT * FROM movies WHERE 1=1";
  const params = [];

  // Build dynamic query based on provided parameters
  if (title) {
    sql += " AND title LIKE ?";
    params.push(`%${title}%`);
  }

  if (genre) {
    sql += " AND genre LIKE ?";
    params.push(`%${genre}%`);
  }

  if (director) {
    sql += " AND director LIKE ?";
    params.push(`%${director}%`);
  }

  if (year) {
    const yearNum = parseInt(year);
    if (isNaN(yearNum)) {
      return res.status(400).json({ error: "Year must be a valid number" });
    }
    sql += " AND year = ?";
    params.push(yearNum);
  }

  connection.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      results: results,
      count: results.length,
      searchParams: { title, genre, director, year }
    });
  });
});

// GET movie by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM movies WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(results[0]);
  });
});

// POST - Create new movie (Admin only)
router.post("/", authenticateToken, isAdmin, (req, res) => {
  const { title, year, genre, director } = req.body;

  // Basic validation
  if (!title || !year || !genre || !director) {
    return res.status(400).json({ error: "Required fields: title, year, genre, director" });
  }

  // Validate title is not empty
  if (title.trim() === "") {
    return res.status(400).json({ error: "Title cannot be empty" });
  }

  // Validate year is a number and within reasonable range
  if (isNaN(year) || year < 1888 || year > 2100) {
    return res.status(400).json({ error: "Year must be a number between 1888 and 2100" });
  }

  // Validate genre is not empty
  if (genre.trim() === "") {
    return res.status(400).json({ error: "Genre cannot be empty" });
  }

  // Validate director is not empty
  if (director.trim() === "") {
    return res.status(400).json({ error: "Director cannot be empty" });
  }

  // Insert the movie
  const sql = "INSERT INTO movies (title, year, genre, director) VALUES (?, ?, ?, ?)";
  connection.query(sql, [title, year, genre, director], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: "Movie created successfully",
      id: result.insertId,
      movie: { id: result.insertId, title, year, genre, director }
    });
  });
});

// PUT - Update movie (Admin only)
router.put("/:id", authenticateToken, isAdmin, (req, res) => {
  const { id } = req.params;
  const { title, year, genre, director } = req.body;

  // Basic validation
  if (!title || !year || !genre || !director) {
    return res.status(400).json({ error: "Required fields: title, year, genre, director" });
  }

  // Validate title is not empty
  if (title.trim() === "") {
    return res.status(400).json({ error: "Title cannot be empty" });
  }

  // Validate year is a number and within reasonable range
  if (isNaN(year) || year < 1888 || year > 2100) {
    return res.status(400).json({ error: "Year must be a number between 1888 and 2100" });
  }

  // Validate genre is not empty
  if (genre.trim() === "") {
    return res.status(400).json({ error: "Genre cannot be empty" });
  }

  // Validate director is not empty
  if (director.trim() === "") {
    return res.status(400).json({ error: "Director cannot be empty" });
  }

  // First check if movie exists
  const checkMovieSql = "SELECT * FROM movies WHERE id = ?";
  connection.query(checkMovieSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Update the movie
    const updateSql = "UPDATE movies SET title = ?, year = ?, genre = ?, director = ? WHERE id = ?";
    connection.query(updateSql, [title, year, genre, director, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Movie updated successfully",
        movie: { id: parseInt(id), title, year, genre, director }
      });
    });
  });
});

// DELETE movie (Admin only)
router.delete("/:id", authenticateToken, isAdmin, (req, res) => {
  const { id } = req.params;

  // First check if movie exists
  const checkSql = "SELECT * FROM movies WHERE id = ?";
  connection.query(checkSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Delete the movie (reviews will be deleted automatically due to CASCADE)
    const deleteSql = "DELETE FROM movies WHERE id = ?";
    connection.query(deleteSql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Movie deleted successfully",
        id: parseInt(id)
      });
    });
  });
});

export default router;