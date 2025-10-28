import dotenv from "dotenv";
dotenv.config(); // MOET bovenaan

import mysql from "mysql2";

// Use connection pool instead of single connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connectie mislukt:", err);
  } else {
    console.log("✅ Verbonden met MariaDB (XAMPP)!");
    connection.release(); // Release connection back to pool
  }
});

export default pool;
