import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IUser } from "../../types/auth.types"
import { IFunctionResponse } from "../../types/functions.types";



export interface IAuthController {
    //register Controller
    registerUser(user: IUser): Promise<IFunctionResponse<ResultSetHeader>>;
}


export interface IUsersController {
    getAllUsers(): Promise<IFunctionResponse<RowDataPacket[] | null>>;
}