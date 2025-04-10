import { Get, Route, Tags, Query, Delete, Post, Body } from "tsoa";
import { IUsersController } from "../interfaces";
import {
  CreateAdminORM,
  deleteUserORM,
  listOfUsersORM,
  searchUserORM,
} from "../../domain/orm/users.orm";
import { IFunctionResponse } from "../../types/functions.types";
import { IRegister, IUser } from "../../types/index.types";
import bcrypt from "bcrypt";

/**
 * UsersController handles user-related operations.
 */
@Route("/api")
@Tags("Users")
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
   * @example email "john@example.com"
   * @example response - {
   *   "status": 200,
   *   "message": "User found",
   *   "data": { "id": 1, "name": "John Doe", "email": "john@example.com" }
   * }
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

  /**
   * Deletes a user by ID.
   * @param {number} id - User ID.
   * @returns {Promise<IFunctionResponse<null>>} - Status of the deletion.
   * @example id 1
   * @example response - {
   *   "status": 200,
   *   "message": "User Deleted"
   * }
   */
  @Delete("UserById/{id}")
  public async deleteUserByID(id: number): Promise<IFunctionResponse<null>> {
    try {
      await deleteUserORM(id);
      return {
        status: 200,
        message: "User Deleted",
      };
    } catch (error) {
      console.error("Error in DeleteUserById", error);
      return {
        status: 500,
        message: "Error deleting user",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Registers a new Admin.
   * @param {IRegister} user - User data.
   * @returns {Promise<IFunctionResponse<IRegister>>} - Registration result.
   */
  @Post("createAdmin")
  public async createAdmin(
    @Body() user: IRegister
  ): Promise<IFunctionResponse<IRegister>> {
    if (!user) {
      return { status: 400, message: "Datos Invalidos" };
    }

    // Hash Password
    user.password = bcrypt.hashSync(user.password, 10);

    try {
      const response = await CreateAdminORM(user);

      return {
        status: 201,
        message: "Usuario Creado Exitosamente",
        data: response,
      };
    } catch (error) {
      console.error("Error in Register Controller", error);
      return {
        status: 500,
        message: "Registration error",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
