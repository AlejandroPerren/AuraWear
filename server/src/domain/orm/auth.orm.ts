import { PrismaClient } from "@prisma/client";
import { IRegister, TLogin } from "../../types/auth.types";

const prisma = new PrismaClient();

export const registerUserORM = async (user: IRegister) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address || null,
        phone: user.phone || null,
      },
    });
    return newUser;
  } catch (error) {
    throw new Error("Error in ORM " + error);
  }
};

export const loginUserORM = async (user: TLogin) => {
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!foundUser || foundUser.password !== user.password) {
      return null; 
    }

    return foundUser;
  } catch (error) {
    throw new Error("Error en ORM " + error);
  }
};
