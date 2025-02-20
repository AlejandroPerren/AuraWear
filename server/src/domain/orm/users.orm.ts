import { RowDataPacket } from "mysql2/promise";
import connection from "../config/index";


export const listOfUsersORM = async (): Promise<RowDataPacket[] | null> => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM users`);
    return rows.length > 0 ? rows : null;
  } catch (error) {
    throw new Error("Error en ORM" + error);
  }
};