import { Controller, Body, Post, Route, Tags } from "tsoa";
import { IUser } from "../../types/auth.types";
import { IAuthController, IFunctionResponse } from "../interfaces";
import bcrypt  from "bcrypt"
import {registerUserORM} from "../../domain/orm/auth.orm"
import { ResultSetHeader } from "mysql2";


//Controller of Authentication
@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
    @Post("register")
    public async registerUser(@Body() user: IUser): Promise<IFunctionResponse<ResultSetHeader>> {
        //If user data not exist of is invalid
        if(!user){
            return { status: 400, message: "Datos Invalidos" };
        }

        //Hash Password
        user.password = bcrypt .hashSync(user.password, 10);

        //try Register User
        try {
            const response = await registerUserORM(user);
            return{
                status: 200,
                message: "Usuario Creado Exitosamente",
                data: response
            }
        } catch (error) {
            console.log("Error in Register Controller" + error);
            return {
                status: 500, 
                message: "Error in register", 
                error: error instanceof Error ? error.message : "Error desconocido"};
        }


    }
}