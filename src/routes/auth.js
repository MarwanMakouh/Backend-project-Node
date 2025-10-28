import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../config/db.js";

const router = express.Router();

// POST - Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Find user by username
  const sql = "SELECT * FROM users WHERE username = ?";
  connection.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = results[0];

    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  });
});

// POST - Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }

  // Validate username (no spaces, min 3 chars)
  if (username.length < 3) {
    return res.status(400).json({ error: "Username must be at least 3 characters long" });
  }

  if (username.includes(" ")) {
    return res.status(400).json({ error: "Username cannot contain spaces" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Validate password (min 6 chars)
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }

  // Check if username already exists
  const checkUsernameSql = "SELECT * FROM users WHERE username = ?";
  connection.query(checkUsernameSql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Check if email already exists
    const checkEmailSql = "SELECT * FROM users WHERE email = ?";
    connection.query(checkEmailSql, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        return res.status(409).json({ error: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      const insertSql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
      connection.query(insertSql, [username, email, hashedPassword, "user"], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // Generate JWT token
        const token = jwt.sign(
          { id: result.insertId, username, role: "user" },
          process.env.JWT_SECRET || "your-secret-key",
          { expiresIn: "24h" }
        );

        res.status(201).json({
          message: "User registered successfully",
          token,
          user: {
            id: result.insertId,
            username,
            email,
            role: "user"
          }
        });
      });
    });
  });
});

// GET - Get current user (requires token)
router.get("/me", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

    const sql = "SELECT id, username, email, role, created_at FROM users WHERE id = ?";
    connection.query(sql, [decoded.id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ user: results[0] });
    });
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
