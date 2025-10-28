import jwt from "jsonwebtoken";

// Middleware to verify JWT token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    req.user = decoded; // Add user info to request
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admin privileges required." });
  }

  next();
};

// Middleware to check if user is the owner or admin
export const isOwnerOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const resourceUserId = parseInt(req.params.userId || req.params.id);

  if (req.user.role === "admin" || req.user.id === resourceUserId) {
    next();
  } else {
    return res.status(403).json({ error: "Access denied. You can only access your own resources." });
  }
};
