import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const connection = mysql.createConnection({
  host: 'mysql.railway.internal',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'railway',
  port: 3306
});

connection.connect(err => {
  if (err) throw err;
  console.log('Conectado a Railway MySQL 🚀');
});

module.exports = connection;
