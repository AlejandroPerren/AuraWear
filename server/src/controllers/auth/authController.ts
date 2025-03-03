import { Body, Post, Route, Tags } from "tsoa";
import { IRegister, TLogin } from "../../types/auth.types";
import { IAuthController } from "../interfaces";
import bcrypt from "bcrypt";
import { loginUserORM, registerUserORM } from "../../domain/orm/auth.orm";
import { IFunctionResponse } from "../../types/functions.types"
import { UsersController } from "../users/UsersController";

const controllerUser = new UsersController();

//Controller of Authentication
@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  @Post("register")
  public async registerUser(@Body() user: IRegister): Promise<IFunctionResponse<IRegister>> {
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
  public async loginUser(@Body() user: TLogin): Promise<IFunctionResponse<TLogin>> {
  
      if(!user){
        return { status: 400, message: "Datos Invalidos"};
      }

    try{
      const response = await loginUserORM(user);

      if(response === null){
        return {
          status: 500,
          message: "Error en los datos ingresados"
        }
      }

      return {
        status: 200,
        message: "Usuario Encontrado Correctamente",
        data: response,
      }

    }catch(error) {
      console.error("Error en Login Controller", error);
      return {
        status: 500,
        message: "Error en el ingreso",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }

  } 
}
