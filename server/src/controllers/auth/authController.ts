import { Body, Post, Route, Tags } from "tsoa";
import { TRegister, TLogin } from "../../types/auth.types";
import { IAuthController } from "../interfaces";
import bcrypt from "bcrypt";
import { loginUserORM, registerUserORM } from "../../domain/orm/auth.orm";
import { IFunctionResponse } from "../../types/functions.types";
import { UsersController } from "../users/UsersController";
import { searchUserORM } from "../../domain/orm/users.orm";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const controllerUser = new UsersController();

const secretKey = process.env.TOKEN_JSON_KEY;

//Controller of Authentication
@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  @Post("register")
  public async registerUser(
    @Body() user: TRegister
  ): Promise<IFunctionResponse<TRegister>> {
    if (!user) {
      return { status: 400, message: "Datos inválidos" };
    }

    // Hash Password
    user.password = bcrypt.hashSync(user.password, 10);

    try {
      const response = await registerUserORM(user);
      return {
        status: 200,
        message: "Usuario creado exitosamente",
        data: response,
      };
    } catch (error) {
      console.error("Error en Register Controller", error);
      return {
        status: 500,
        message: "Error en el registro",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  @Post("login")
  public async loginUser(
    @Body() user: TLogin
  ): Promise<IFunctionResponse<TLogin>> {
    if (!user || !user.email || !user.password) {
      return { status: 400, message: "Email y contraseña son obligatorios" };
    }

    try {
      const userData = await searchUserORM(user.email);

      if (!userData) {
        return { status: 400, message: "Datos incorrectos" };
      }

      const isValidPassword = await bcrypt.compare(
        user.password,
        userData.password
      );
      if (!isValidPassword) {
        return { status: 400, message: "Datos incorrectos" };
      }

      const response = await loginUserORM(userData);
      if (!response) {
        return {
          status: 500,
          message: "Error al generar el token de autenticación",
        };
      }
      if (!secretKey) {
        throw new Error(
          "TOKEN_JSON_KEY is not defined in environment variables"
        );
      }

      const token = jwt.sign(
        { id: userData.id, email: userData.email },
        secretKey,
        { expiresIn: "7d" }
      );
      return {
        status: 200,
        message: "Usuario autenticado correctamente",
        data: response,
        token: token
      };
    } catch (error) {
      console.error("Error en Login Controller", error);
      return {
        status: 500,
        message: "Error en el ingreso",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }
}
