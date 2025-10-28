import connection from "../config/db.js";

/**
 * Get all movies with pagination
 */
export const getAllMovies = (limit, offset) => {
  return new Promise((resolve, reject) => {
    // Get total count
    const countSql = "SELECT COUNT(*) as total FROM movies";
    connection.query(countSql, (err, countResults) => {
      if (err) return reject(err);

      const total = countResults[0].total;

      // Get paginated results
      const sql = "SELECT * FROM movies LIMIT ? OFFSET ?";
      connection.query(sql, [limit, offset], (err, results) => {
        if (err) return reject(err);

        resolve({
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
};

/**
 * Search movies
 */
export const searchMovies = (searchParams) => {
  return new Promise((resolve, reject) => {
    const { title, genre, director, year } = searchParams;

    let sql = "SELECT * FROM movies WHERE 1=1";
    const params = [];

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
      sql += " AND year = ?";
      params.push(parseInt(year));
    }

    connection.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

/**
 * Find movie by ID
 */
export const findMovieById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM movies WHERE id = ?";
    connection.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

/**
 * Create new movie
 */
export const createMovie = (movieData) => {
  return new Promise((resolve, reject) => {
    const { title, year, genre, director } = movieData;
    const sql = "INSERT INTO movies (title, year, genre, director) VALUES (?, ?, ?, ?)";

    connection.query(sql, [title, year, genre, director], (err, result) => {
      if (err) return reject(err);
      resolve({
        id: result.insertId,
        title,
        year,
        genre,
        director
      });
    });
  });
};

/**
 * Update movie
 */
export const updateMovie = (id, movieData) => {
  return new Promise((resolve, reject) => {
    const { title, year, genre, director } = movieData;
    const sql = "UPDATE movies SET title = ?, year = ?, genre = ?, director = ? WHERE id = ?";

    connection.query(sql, [title, year, genre, director, id], (err, result) => {
      if (err) return reject(err);
      resolve({
        id: parseInt(id),
        title,
        year,
        genre,
        director
      });
    });
  });
};

/**
 * Delete movie
 */
export const deleteMovie = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM movies WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};
