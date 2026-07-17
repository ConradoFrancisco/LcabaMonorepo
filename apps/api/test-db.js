const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkDb() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  });

  try {
    const [rows] = await pool.query('DESCRIBE page_docs');
    console.log("page_docs:", rows);
  } catch (e) {
    console.error("Error checking page_docs:", e.message);
  }
  
  try {
    const [rows2] = await pool.query('DESCRIBE magazine_posts_docs');
    console.log("magazine_posts_docs:", rows2);
  } catch (e) {
    console.error(e.message);
  }

  process.exit(0);
}
checkDb();
