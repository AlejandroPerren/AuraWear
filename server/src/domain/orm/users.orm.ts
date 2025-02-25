import { RowDataPacket } from "mysql2/promise";
import connection from "../config/index";
import { IUser } from "../../types/auth.types";


export const listOfUsersORM = async (): Promise<RowDataPacket[] | null> => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM users`);
    return rows.length > 0 ? rows : null;
  } catch (error) {
    throw new Error("Error en ORM" + error);
  }
};

export const searchUserORM = async(email: string): Promise<RowDataPacket[] | null> =>{
  try {
  const [response] = await connection.query<RowDataPacket[]>(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  )
  return response.length > 0 ? response : null;

  } catch (error) {
    throw new Error("Error en ORM " + error);
  }
}