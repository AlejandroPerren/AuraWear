import { PrismaClient } from "@prisma/client";
import { IUser } from "../../types/auth.types";

const prisma = new PrismaClient();
/**
 * Retrieves a list of all users from the database.
 *
 * @returns {Promise<IUser[] | null>} A list of users or null if no users are found.
 * @throws {Error} If there is an issue retrieving the users.
 */
export const listOfUsersORM = async () => {
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
