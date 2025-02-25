import { Get, Route, Tags, Query } from "tsoa";
import { IUsersController } from "../interfaces";
import { listOfUsersORM, searchUserORM } from "../../domain/orm/users.orm";
import { IFunctionResponse } from "../../types/functions.types";
import { IUser } from "../../types/auth.types";

@Route("/api")
@Tags("UsersController")
export class UsersController implements IUsersController {
  
  @Get("users")
  public async getAllUsers(): Promise<IFunctionResponse<IUser[] | null>> {
    try {
      const users = await listOfUsersORM();
      return {
        status: 200,
        message: users ? "Usuarios encontrados" : "No se encuentran usuarios",
        data: users,
      };
    } catch (error) {
      console.error("Error en getAllUsers:", error);
      return {
        status: 500,
        message: "Error al obtener usuarios",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  @Get("userByEmail")
  public async getOneUserByEmail(
    @Query() email: string
  ): Promise<IFunctionResponse<IUser | null>> {
    try {
      const user = await searchUserORM(email);
      return {
        status: 200,
        message: user ? "Usuario encontrado" : "No se encuentra el usuario",
        data: user,
      };
    } catch (error) {
      console.error("Error en getOneUserByEmail:", error);
      return {
        status: 500,
        message: "Error al obtener usuario",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }
}
