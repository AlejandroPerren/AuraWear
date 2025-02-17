import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()



const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'railway',
  port: 12308
});

connection.connect(err => {
  if (err) throw err;
  console.log('Conectado a Railway MySQL 🚀');
});

export default connection.promise();
