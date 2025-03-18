import { PrismaClient } from "@prisma/client";
import { IRegister, ILogin } from "../../types/index.types";

const prisma = new PrismaClient();

/**
 * Registers a new user in the database.
 *
 * @param {IRegister} user - The user data to be registered.
 * @returns {Promise<IUser>} The newly created user.
 * @throws {Error} If there is an issue creating the user.
 */
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

/**
 * Authenticates a user by checking their email and password.
 *
 * @param {ILogin} user - The login credentials.
 * @returns {Promise<IUser | null>} The user object if authentication is successful, otherwise null.
 * @throws {Error} If there is an issue during authentication.
 */
export const loginUserORM = async (user: ILogin) => {
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    // If the user is not found or the password does not match, return null.
    if (!foundUser || foundUser.password !== user.password) {
      return null;
    }

    return foundUser;
  } catch (error) {
    throw new Error("Error in ORM " + error);
  }
};
