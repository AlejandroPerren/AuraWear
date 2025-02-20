import { RowDataPacket, ResultSetHeader } from "mysql2";
import connection from "../config/index";
import { IUser, TLogin } from "../../types/auth.types";


export const registerUserORM = async (user: IUser): Promise<ResultSetHeader> => {
    try {
    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO users (name, email, password, address, phone) VALUES (?, ?, ?, ?, ?)`,
      [user.name, user.email, user.password, user.address, user.phone]
    );
    return result;
  } catch (error) {
    throw new Error("Error in ORM " + error);
  }
};

export const loginUserORM = async (user: TLogin): Promise<RowDataPacket | null> => {
   try{ 
    const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT id, name, email, password, address, phone FROM users WHERE email = ?`,
        [user.email]
      );
  
      if (rows.length === 0) return null;
  
      const foundUser = rows[0];
  
      return foundUser;
    } catch (error) {
      throw new Error("Error en ORM " + error);
    }
};

export const listOfUsers = async (): Promise<RowDataPacket[] | null> => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM users`
    );
    if(rows.length === 0) return null;

    const foundUsers = rows;
    return foundUsers

  } catch (error) {
    throw new Error("Error en ORM" + error);
  }
}
