import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize("railway", process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: 12308,
  dialect: "mysql",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a Railway MySQL con Sequelize 🚀");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
})();

export default sequelize;
