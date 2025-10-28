import express from "express";
import connection from "../config/db.js";
const router = express.Router();

// GET all movies
router.get("/", (req, res) => {
  const sql = "SELECT * FROM movies";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
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

// POST - Create new movie
router.post("/", (req, res) => {
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

// PUT - Update movie
router.put("/:id", (req, res) => {
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

// DELETE movie
router.delete("/:id", (req, res) => {
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