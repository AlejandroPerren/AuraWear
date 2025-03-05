import { Get, Route, Tags, Query } from "tsoa";
import { IUsersController } from "../interfaces";
import { listOfUsersORM, searchUserORM } from "../../domain/orm/users.orm";
import { IFunctionResponse } from "../../types/functions.types";
import { IUser } from "../../types/auth.types";

/**
 * UsersController handles user-related operations.
 */
@Route("/api")
@Tags("UsersController")
export class UsersController implements IUsersController {
  /**
   * Retrieves a list of all users.
   * @returns {Promise<IFunctionResponse<IUser[] | null>>} - List of users or null if no users found.
   */
  @Get("users")
  public async getAllUsers(): Promise<IFunctionResponse<IUser[] | null>> {
    try {
      const users = await listOfUsersORM();
      return {
        status: 200,
        message: users ? "Users found" : "No users found",
        data: users,
      };
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      return {
        status: 500,
        message: "Error retrieving users",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Retrieves a user by email.
   * @param {string} email - User's email.
   * @returns {Promise<IFunctionResponse<IUser | null>>} - User details or null if not found.
   */
  @Get("userByEmail")
  public async getOneUserByEmail(
    @Query() email: string
  ): Promise<IFunctionResponse<IUser | null>> {
    try {
      const user = await searchUserORM(email);
      return {
        status: 200,
        message: user ? "User found" : "User not found",
        data: user,
      };
    } catch (error) {
      console.error("Error in getOneUserByEmail:", error);
      return {
        status: 500,
        message: "Error retrieving user",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
