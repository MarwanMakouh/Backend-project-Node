import express from "express";
import connection from "../config/db.js";
const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM reviews";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

export default router;
