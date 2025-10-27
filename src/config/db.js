import dotenv from "dotenv";
dotenv.config(); // MOET bovenaan

import mysql from "mysql2";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect(err => {
  if (err) {
    console.error("❌ Database connectie mislukt:", err);
  } else {
    console.log("✅ Verbonden met MariaDB (XAMPP)!");
  }
});

export default connection;
