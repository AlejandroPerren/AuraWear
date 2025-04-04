import { PrismaClient } from "@prisma/client";
import { IUser } from "../../types/index.types";
import { ParamsDictionary } from "express-serve-static-core";
const prisma = new PrismaClient();
/**
 * Retrieves a list of all users from the database.
 *
 * @returns {Promise<IUser[] | null>} A list of users or null if no users are found.
 * @throws {Error} If there is an issue retrieving the users.
 */
export const listOfUsersORM = async (): Promise<IUser[] | null> => {
  try {
    const users = await prisma.user.findMany();
    return users.length > 0 ? users : null;
  } catch (error) {
    throw new Error("Error in ORM: " + error);
  }
};

/**
 * Searches for a user by email in the database.
 *
 * @param {string} email - The email of the user to search for.
 * @returns {Promise<IUser | null>} The user object if found, otherwise null.
 * @throws {Error} If there is an issue retrieving the user.
 */
export const searchUserORM = async (email: string): Promise<IUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user || null;
  } catch (error) {
    throw new Error("Error in ORM: " + error);
  }
};

/**
 * Deletes a user from the database by their ID.
 *
 * @param {number} id - The ID of the user to be deleted.
 * @returns {Promise<null>} Resolves to `null` if deletion is successful.
 * @throws {Error} If the user is not found or the operation fails.
 */
export const deleteUserORM = async (id: number): Promise<null> => {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return null;
  } catch (error) {
    throw new Error("Error in ORM " + error);
  }
};
