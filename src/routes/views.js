import express from "express";
const router = express.Router();

// API Documentation (root - volgens opdracht vereisten)
router.get("/", (req, res) => {
  res.render("api-docs", { title: "FilmReview API Documentation" });
});

// Home pagina
router.get("/home", (req, res) => {
  res.render("index", { title: "FilmReview - Home" });
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
