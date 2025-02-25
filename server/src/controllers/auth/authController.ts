import { Body, Post, Route, Tags } from "tsoa";
import { IUser, TLogin } from "../../types/auth.types";
import { IAuthController } from "../interfaces";
import bcrypt from "bcrypt";
import { loginUserORM, registerUserORM } from "../../domain/orm/auth.orm";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IFunctionResponse } from "../../types/functions.types";
import { getAllUsersController } from "../users/UsersController";

const controllerUser = new getAllUsersController();

//Controller of Authentication
@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  @Post("register")
  public async registerUser(
    @Body() user: IUser
  ): Promise<IFunctionResponse<ResultSetHeader>> {
    //If user data not exist of is invalid
    if (!user) {
      return { status: 400, message: "Datos Invalidos" };
    }

    //Hash Password
    user.password = bcrypt.hashSync(user.password, 10);

    //try Register User
    try {
      const response = await registerUserORM(user);
      return {
        status: 200,
        message: "Usuario Creado Exitosamente",
        data: response,
      };
    } catch (error) {
      console.log("Error in Register Controller" + error);
      return {
        status: 500,
        message: "Error in register",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }
  @Post("login")
  public async loginUser(
    user: TLogin
  ): Promise<IFunctionResponse<RowDataPacket | null>> {
    if (!user) {
      return { status: 400, message: "Datos Incorrectos" };
    }

    const userData = await controllerUser.getOneUserByEmail(user.email);

    if (!userData || userData.data === null) {
      return { status: 401, message: "Credenciales incorrectas" };
    }
    const storedUser = userData.data 

    // Comparar contraseñas
    const passwordMatch = bcrypt.compareSync(user.password, storedUser.password);
    if (!passwordMatch) {
      return { status: 401, message: "Credenciales incorrectas" };
    }

    // Retornar usuario sin contraseña
    return {
      status: 200,
      message: "Inicio de sesión exitoso",
      data: {
        email: storedUser.email,
        name: storedUser.name,
      },
    };
    } catch (error) {
      console.log("Error in Login Controller" + error);
      return {
        status: 500,
        message: "Error in login",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }
}
