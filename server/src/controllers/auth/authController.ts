import { Body, Post, Route, Tags } from "tsoa";
import { IRegister, ILogin } from "../../types/index.types";
import { IAuthController } from "../interfaces";
import bcrypt from "bcrypt";
import { loginUserORM, registerUserORM } from "../../domain/orm/auth.orm";
import { IFunctionResponse } from "../../types/functions.types";
import { searchUserORM } from "../../domain/orm/users.orm";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UsersController } from "../users/UsersController";

dotenv.config();

const controllerUser = new UsersController();

const secretKey = process.env.TOKEN_JSON_KEY;

/**
 * AuthController handles user authentication and registration.
 */
@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  /**
   * Registers a new user.
   * @param {IRegister} user - User data.
   * @returns {Promise<IFunctionResponse<IRegister>>} - Registration result.
   */
  @Post("register")
  public async registerUser(
    @Body() user: IRegister
  ): Promise<IFunctionResponse<IRegister>> {
    if (!user) {
      return { status: 400, message: "Invalid data" };
    }

    // Hash Password
    user.password = bcrypt.hashSync(user.password, 10);

    try {
      const response = await registerUserORM(user);
      return {
        status: 201,
        message: "User successfully created",
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

  /**
   * Logs in a user.
   * @param {ILogin} user - User credentials.
   * @returns {Promise<IFunctionResponse<ILogin>>} - Login result with JWT token.
   */
  @Post("login")
  public async loginUser(
    @Body() user: ILogin
  ): Promise<IFunctionResponse<ILogin>> {
    if (!user || !user.email || !user.password) {
      return { status: 400, message: "Email and password are required" };
    }

    try {
      const userData = await searchUserORM(user.email);

      if (!userData) {
        return { status: 400, message: "Invalid credentials" };
      }

      const isValidPassword = await bcrypt.compare(
        user.password,
        userData.password
      );
      if (!isValidPassword) {
        return { status: 400, message: "Invalid credentials" };
      }

      const response = await loginUserORM(userData);
      if (!response) {
        return {
          status: 500,
          message: "Error generating authentication token",
        };
      }
      if (!secretKey) {
        throw new Error(
          "TOKEN_JSON_KEY is not defined in environment variables"
        );
      }

      const token = jwt.sign(
        { id: userData.id, email: userData.email, role: userData.role },
        secretKey,
        { expiresIn: "7d" }
      );
      return {
        status: 201,
        message: "User successfully authenticated",
        data: response,
        token: token,
      };
    } catch (error) {
      console.error("Error in Login Controller", error);
      return {
        status: 500,
        message: "Login error",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
