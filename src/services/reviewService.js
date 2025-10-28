import connection from "../config/db.js";

/**
 * Get all reviews
 */
export const getAllReviews = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM reviews";
    connection.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Find review by ID
 */
export const findReviewById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM reviews WHERE id = ?";
    connection.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

/**
 * Create new review
 */
export const createReview = (reviewData) => {
  return new Promise((resolve, reject) => {
    const { reviewer_name, rating, comment, movie_id } = reviewData;
    const sql = "INSERT INTO reviews (reviewer_name, rating, comment, movie_id) VALUES (?, ?, ?, ?)";

    connection.query(sql, [reviewer_name, rating, comment || null, movie_id], (err, result) => {
      if (err) return reject(err);
      resolve({
        id: result.insertId,
        reviewer_name,
        rating,
        comment,
        movie_id
      });
    });
  });
};

/**
 * Update review
 */
export const updateReview = (id, reviewData) => {
  return new Promise((resolve, reject) => {
    const { reviewer_name, rating, comment, movie_id } = reviewData;
    const sql = "UPDATE reviews SET reviewer_name = ?, rating = ?, comment = ?, movie_id = ? WHERE id = ?";

    connection.query(sql, [reviewer_name, rating, comment || null, movie_id, id], (err, result) => {
      if (err) return reject(err);
      resolve({
        id: parseInt(id),
        reviewer_name,
        rating,
        comment,
        movie_id
      });
    });
  });
};

/**
 * Delete review
 */
export const deleteReview = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM reviews WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};
