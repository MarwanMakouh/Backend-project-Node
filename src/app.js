import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import moviesRoutes from "./routes/movies.js";
import reviewsRoutes from "./routes/reviews.js";
import viewRoutes from "./routes/views.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend routes
app.use("/", viewRoutes);

// API routes
app.use("/api/movies", moviesRoutes);
app.use("/api/reviews", reviewsRoutes);

export default app;
