import connection from "../config/db.js";

/**
 * Find user by username
 */
export const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    connection.query(sql, [username], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

/**
 * Find user by email
 */
export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    connection.query(sql, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

/**
 * Find user by ID
 */
export const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, username, email, role, created_at FROM users WHERE id = ?";
    connection.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

/**
 * Create new user
 */
export const createUser = (username, email, hashedPassword, role = "user") => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    connection.query(sql, [username, email, hashedPassword, role], (err, result) => {
      if (err) return reject(err);
      resolve({
        id: result.insertId,
        username,
        email,
        role
      });
    });
  });
};
