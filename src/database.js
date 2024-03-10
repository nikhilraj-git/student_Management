const mysql = require("mysql2/promise");
const dotenv = require("dotenv").config({ path: ".env" });

let pool;

async function connectToDatabase() {
  try {
    pool = await mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "1234",
      database: process.env.DB_NAME || "v01",
    });
    console.log("Database connected....");
  } catch (err) {
    console.error("Error connecting to database: ", err);
    process.exit(1);
  }
}

async function executeQuery(sql, params = []) {
  if (!pool) {
    await connectToDatabase();
  }
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (err) {
    console.log("Error executing query: ", err);
    throw err;
  }
}

module.exports = {
  connectToDatabase,
  executeQuery,
};
