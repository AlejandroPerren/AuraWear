import { RowDataPacket, ResultSetHeader } from "mysql2";

import { IUser, TLogin } from "../../types/auth.types";


export const registerUserORM = async (user: IUser) => {
  try {
    const newUser = await user.create(user);
    return newUser;
  } catch (error) {
    throw new Error("Error in ORM " + error);
  }
};

export const loginUserORM = async (user: TLogin) => {
  try {
    const foundUser = await user.findOne({
      where: {
        email: user.email,
        password: user.password,
      },
    });
    return foundUser;
  } catch (error) {
    throw new Error("Error en ORM " + error);
  }
};


