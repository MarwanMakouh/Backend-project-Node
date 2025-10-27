import express from "express";
const router = express.Router();

// Home pagina
router.get("/", (req, res) => {
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

export default router;
