import connection from "../config/db.js";

export const getAllReviews = (req, res) => {
  const sql = "SELECT * FROM reviews";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getReviewById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM reviews WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(results[0]);
  });
};

export const createReview = (req, res) => {
  const { reviewer_name, rating, comment, movie_id } = req.body;

  // Basic validation
  if (!reviewer_name || !rating || !movie_id) {
    return res.status(400).json({ error: "Required fields: reviewer_name, rating, movie_id" });
  }

  // Validate reviewer_name is not empty
  if (reviewer_name.trim() === "") {
    return res.status(400).json({ error: "Reviewer name cannot be empty" });
  }

  // Validate rating is a number between 1 and 5
  if (isNaN(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be a number between 1 and 5" });
  }

  // Validate movie_id is a number
  if (isNaN(movie_id)) {
    return res.status(400).json({ error: "Movie ID must be a number" });
  }

  // First check if movie exists
  const checkMovieSql = "SELECT * FROM movies WHERE id = ?";
  connection.query(checkMovieSql, [movie_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "Movie not found. Cannot create review for non-existent movie." });
    }

    // Insert the review
    const sql = "INSERT INTO reviews (reviewer_name, rating, comment, movie_id) VALUES (?, ?, ?, ?)";
    connection.query(sql, [reviewer_name, rating, comment || null, movie_id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        message: "Review created successfully",
        id: result.insertId,
        review: { id: result.insertId, reviewer_name, rating, comment, movie_id }
      });
    });
  });
};

export const updateReview = (req, res) => {
  const { id } = req.params;
  const { reviewer_name, rating, comment, movie_id } = req.body;

  // Basic validation
  if (!reviewer_name || !rating || !movie_id) {
    return res.status(400).json({ error: "Required fields: reviewer_name, rating, movie_id" });
  }

  // Validate reviewer_name is not empty
  if (reviewer_name.trim() === "") {
    return res.status(400).json({ error: "Reviewer name cannot be empty" });
  }

  // Validate rating is a number between 1 and 5
  if (isNaN(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be a number between 1 and 5" });
  }

  // Validate movie_id is a number
  if (isNaN(movie_id)) {
    return res.status(400).json({ error: "Movie ID must be a number" });
  }

  // First check if review exists
  const checkReviewSql = "SELECT * FROM reviews WHERE id = ?";
  connection.query(checkReviewSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Check if movie exists
    const checkMovieSql = "SELECT * FROM movies WHERE id = ?";
    connection.query(checkMovieSql, [movie_id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(404).json({ error: "Movie not found. Cannot update review with non-existent movie." });
      }

      // Update the review
      const updateSql = "UPDATE reviews SET reviewer_name = ?, rating = ?, comment = ?, movie_id = ? WHERE id = ?";
      connection.query(updateSql, [reviewer_name, rating, comment || null, movie_id, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
          message: "Review updated successfully",
          review: { id: parseInt(id), reviewer_name, rating, comment, movie_id }
        });
      });
    });
  });
};

export const deleteReview = (req, res) => {
  const { id } = req.params;

  // First check if review exists
  const checkSql = "SELECT * FROM reviews WHERE id = ?";
  connection.query(checkSql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Delete the review
    const deleteSql = "DELETE FROM reviews WHERE id = ?";
    connection.query(deleteSql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Review deleted successfully",
        id: parseInt(id)
      });
    });
  });
};
