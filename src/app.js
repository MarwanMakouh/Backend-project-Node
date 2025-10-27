import express from "express";
import cors from "cors";
import moviesRoutes from "./routes/movies.js";
import reviewsRoutes from "./routes/reviews.js";

const app = express();
app.use(cors());
app.use(express.json());

// Basis route (documentatiepagina)
app.get("/", (req, res) => {
  res.send(`
    <h1>🎬 FilmReview API</h1>
    <p>Beschikbare endpoints:</p>
    <ul>
      <li>GET /api/movies</li>
      <li>GET /api/movies/:id</li>
      <li>POST /api/movies</li>
      <li>PUT /api/movies/:id</li>
      <li>DELETE /api/movies/:id</li>
      <li>GET /api/reviews</li>
      <li>POST /api/reviews</li>
    </ul>
  `);
});

app.use("/api/movies", moviesRoutes);
app.use("/api/reviews", reviewsRoutes);

export default app;
