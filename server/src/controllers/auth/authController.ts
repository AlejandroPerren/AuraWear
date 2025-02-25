import { Body, Post, Route, Tags } from "tsoa";
import { IUser, TLogin } from "../../types/auth.types";
import { IAuthController } from "../interfaces";
import bcrypt from "bcrypt";
import { registerUserORM } from "../../domain/orm/auth.orm";
import { IFunctionResponse } from "../../types/functions.types"
import { UsersController } from "../users/UsersController";

const controllerUser = new UsersController();

//Controller of Authentication
@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  @Post("register")
  public async registerUser(@Body() user: IUser): Promise<IFunctionResponse<IUser>> {
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
  public async loginUser(@Body() user: TLogin): Promise<IFunctionResponse<Omit<IUser, "password"> | null>> {
    if (!user) {
      return { status: 400, message: "Datos incorrectos" };
    }

    try {
      const userData = await controllerUser.getOneUserByEmail(user.email);
      if (!userData || userData.data === null) {
        return { status: 401, message: "Credenciales incorrectas" };
      }

      const storedUser = userData.data;
      // Comparar contraseñas
      const passwordMatch = bcrypt.compareSync(user.password, storedUser.password);
      if (!passwordMatch) {
        return { status: 401, message: "Credenciales incorrectas" };
      }

      // Retornar usuario sin contraseña
      const { password, ...userWithoutPassword } = storedUser;
      return {
        status: 200,
        message: "Inicio de sesión exitoso",
        data: userWithoutPassword,
      };
    } catch (error) {
      console.error("Error en Login Controller", error);
      return {
        status: 500,
        message: "Error en login",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }
}
