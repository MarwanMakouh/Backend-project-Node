import express from "express";
const router = express.Router();

// Home pagina (root)
router.get("/", (req, res) => {
  res.render("index", { title: "FilmReview - Home" });
});

// API Documentation
router.get("/api-docs", (req, res) => {
  res.render("api-docs", { title: "FilmReview API Documentation" });
});

// Movies overzicht
router.get("/movies", (req, res) => {
  res.render("movies", { title: "Films" });
});

// Reviews overzicht
router.get("/reviews", (req, res) => {
  res.render("reviews", { title: "Reviews" });
});

// Login pagina
router.get("/login", (req, res) => {
  res.render("login", { title: "Inloggen - FilmReview" });
});

// Register pagina
router.get("/register", (req, res) => {
  res.render("register", { title: "Registreren - FilmReview" });
});

export default router;
