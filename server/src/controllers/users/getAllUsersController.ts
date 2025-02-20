import { Get, Route, Tags } from "tsoa";
import { IUsersController } from "../interfaces";
import { RowDataPacket } from "mysql2";
import { listOfUsersORM } from "../../domain/orm/users.orm";
import { IFunctionResponse } from "../../types/functions.types";

@Route("/api")
@Tags("getAllUsersController")
export class getAllUsersController implements IUsersController {
  @Get("users")
  public async getAllUsers(): Promise<
    IFunctionResponse<RowDataPacket[] | null>
  > {
    try {
      const response = await listOfUsersORM();
      if (response === null) {
        return {
          status: 200,
          message: "No se encuentan Usuarios",
        };
      }
      return {
        status: 200,
        message: "Usuarios encontrados",
        data: response
      };
    } catch (error) {
      console.log("Error in getAllUsers Controller" + error);
      return {
        status: 500,
        message: "Error in Get Users",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }
}
